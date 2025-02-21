<template>
	<AdminModalMessage
		v-model:is_open="modal_data.is_open"
		:labels="{
				header: modal_data.header,
				confirm: 'Confirmar',
				description: 'Debes indicar una razón para realizar esta acción.',
				loading: loading_toggle_active,
				error,
		}"
		:on_submit="submit"
		:on_close="close_modal"
		:schema="message_schema"
	/>

	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Panel',
      to: '/admin'
		}, {
			label: 'Usuarios',
      to: '/admin/users'
		},
		]"/>

		<!--		TODO: Agregar loading -->
		<UCard>
			<template #header>Usuarios</template>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2 justify-end w-64 self-end">
					<UInput
						icon="ri:search-2-line"
						v-model="q"
						placeholder="Filtrar resultados"
						color="gray"
						class="w-full"
					/>
					<USelectMenu
						icon="ri:checkbox-multiple-line"
						v-model="selectedColumns"
						:options="columns"
						multiple
						placeholder="Columns"
						aria-multiselectable="false"
						color="gray"
						size="md"
						class="w-full"
					>
						<template #label>
							{{ selectedColumns.length }} {{ selectedColumns.length > 1 ? 'seleccionados' : 'seleccionado' }}
						</template>
					</USelectMenu>
					<USelect
						color="gray"
						size="md"
						placeholder="Filtrar por estado"
						icon="ri:filter-line"
						v-model="search_by_status"
						:options="[
              {label: 'Todos', value: undefined},
              {label: 'Activo', value: 'Activo'},
              {label: 'Inactivo', value: 'Inactivo'},
              {label: 'Sin verificar', value: 'Sin verificar'}
          ]"
					/>
					<USelect
						color="gray"
						size="md"
						placeholder="Filtrar por rol"
						icon="ri:filter-line"
						v-model="search_by_role"
						:options="[
              {label: 'Todos', value: undefined},
              {label: 'Super usuario', value: 'SUPERUSER'},
              {label: 'Administrador', value: 'ADMIN'},
              {label: 'Empleador', value: 'EMPLOYER'},
              {label: 'Aplicante', value: 'SEEKER'},
          ]"
					/>
				</div>

				<UTable
					:rows="rows.results"
					:columns="selectedColumns"
					:loading="loading"
					:sort="{ column: 'created_at', direction: 'desc' }"
				>
					<template #image-data="{row}">
						<img
							:src="row.image || '/images/empleame_user_silhouette.png'"
							class="border rounded-full w-10 aspect-square"
							alt="Foto de perfil"
						/>
					</template>
					<template #status-data="{row}">
						<UBadge
							variant="soft"
							:color="row.status.color"
						>{{ row.status.label }}
						</UBadge>
					</template>
					<template #actions-data="{row}">
						<UDropdown :items="options(row)"
						           v-if="(
								user_role as any === 'SUPERUSER' &&
								row.role_raw !== 'SUPERUSER'
							) || (
								user_role as any === 'ADMIN' &&
								!['SUPERUSER','ADMIN'].includes(row.role_raw)
							)"
						>
							<UButton color="gray" variant="ghost" icon="ri:more-fill"/>
						</UDropdown>

					</template>
				</UTable>
			</div>
			<template #footer>
				<div class="w-full flex flex-row justify-end gap-4">
					<UPagination v-model="page" :page-count="pageCount" :total="rows.total" size="md" v-if="rows.total"/>
				</div>
			</template>
		</UCard>
	</div>

</template>

<script setup lang="ts">
import {gqlUser} from "~/queries";
import type {UserInterface} from "~/interfaces";
import {es_date} from "~/helpers/es_date";
import type {TableColumn} from "#ui/types";
import {message_schema} from "~/schemas";
import {RolesEnum} from "~/enums/server/roles.enum";

definePageMeta({
	middleware: 'role',
	roles: ['ADMIN', 'SUPERUSER']
})
useHead({
	title: 'Usuarios'
})

const {user_role} = useUserStore()

const {load, result, loading, refetch} = useLazyQuery<{ userFindAll: UserInterface[] }>(gqlUser.find_all)

onMounted(() => {
	load()
})

const users: ComputedRef = computed(() => (result.value?.userFindAll && result.value?.userFindAll.length > 0) ?
	result.value?.userFindAll.map((e) => ({
		id: e.id,
		image: e.image,
		username: e.username,
		email: e.email,
		role_raw: e.role,
		role: RolesEnum[e.role as unknown as keyof typeof RolesEnum],
		//role: RolesEnum(e.role as keyof typeof RolesEnum),
		is_google_linked: e.google_id,
		is_facebook_linked: e.facebook_id,
		is_active: e.is_active,
		has_activated: e.has_activated,
		created_at: es_date(e.created_at),
		full_name: `${e.contact.first_name} ${e.contact.last_name}`,
		phone: e.contact.phone,
		gender: e.contact.gender,
		date_of_birth: es_date(e.contact.date_of_birth),
		status: (e.has_activated && e.is_active) ? {
			label: 'Activo',
			color: 'green'
		} : (!e.is_active) ? {
			label: 'Inactivo',
			color: 'red'
		} : {
			label: 'Sin verificar',
			color: 'orange'
		}
	})) : [])

const columns: TableColumn[] = [
	{label: 'ID', key: 'id', sortable: true},
	{label: 'Foto de perfil', key: 'image', sortable: true},
	{label: 'Nombre de usuario', key: 'username', sortable: true},
	{label: 'Nombre completo', key: 'full_name', sortable: true},
	{label: 'Correo', key: 'email', sortable: true},
	{label: 'Rol', key: 'role', sortable: true},
	{label: 'Estado', key: 'status', sortable: true},
	{label: 'Creado', key: 'created_at', sortable: true},
	{label: 'Teléfono', key: 'phone', sortable: false},
	{label: 'Fecha de nacimiento', key: 'date_of_birth', sortable: false},
	{label: 'Acciones', key: 'actions', sortable: false},
]

const q = ref('')
const page = ref(1)
const pageCount = 6
const selectedColumns = ref([...columns])
const search_by_status = ref(undefined)
const search_by_role = ref(undefined)


const rows = computed(() => {
	let results = users.value;

	if (q.value) {
		results = results.filter((e: any) => {
			return Object.values(e).some((value) => {
				return String(value).toLowerCase().includes(q.value.toLowerCase())
			})
		});
	}

	if (search_by_status.value) {
		results = results.filter((e: any) => e.status.label.includes(search_by_status.value));
	}

	if (search_by_role.value) {
		results = results.filter((e: any) => e.role_raw.includes(search_by_role.value));
	}

	return {
		results: results.slice((page.value - 1) * pageCount, page.value * pageCount),
		total: results.length
	}
});

const options = (row: any) => [
	[
		{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: () => {
				modal_data.value.is_open = true
				modal_data.value.header = (row.is_active) ? 'Deshabilitar usuario' : 'Volver a habilitar usuario'
				modal_data.value.id = row.id
			}
		},
	]
]

const modal_data = ref({
	is_open: false,
	header: undefined as string | undefined,
	id: undefined as number | undefined
})

const close_modal = () => {
	modal_data.value.is_open = false
	modal_data.value.header = undefined
	modal_data.value.id = undefined
	error.value = null
}

const {mutate, error, loading: loading_toggle_active} = useMutation<{ userToggleActive: string }>(gqlUser.toggle_active)

const submit = async (message: string) => {
	await mutate({
		"userToggleActiveId": Number(modal_data.value.id),
		"messageInput": {
			"message": message
		},
	}).then(async (e) => {
		close_modal()
		useToast().add({title: `Usuario con cuenta ${e?.data?.userToggleActive} correctamente.`})
		await refetch();
	}).catch((e) => {
		console.log(e)
	})
}
</script>
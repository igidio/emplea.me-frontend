<template>
	
	<!--	<AdminModalActiveEmployer-->
	<!--		v-model="is_open_modal_active"-->
	<!--		:reload="reload"-->
	<!--	/>-->
	
	<UCard>
		<template #header>Publicaciones</template>
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
					{label: 'Disponible', value: 'Disponible'},
					{label: 'Ocupado', value: 'Ocupado'},
					{label: 'Deshabilitado', value: 'Deshabilitado'}
				]"
				/>
			
			</div>
			
			<UTable
				:columns="selectedColumns"
				:rows="rows"
				:loading="loading"
				:sort="{ column: 'created_at', direction: 'desc' }"
				v-model:expand="expand"
			>
				<template #status-data="{row}">
					<UBadge
						variant="soft"
						:color="row.status.color"
					>{{
							row.status.label
						}}
					</UBadge>
				</template>
				
				<template #category-data="{row}">
					
					<UIcon :name="row.category.icon" class="mr-1"/>
					{{ row.category?.name }}
				</template>
				
				<template #employer-data="{row}">
					<div class="flex flex-row gap-2 items-center">
						<img
							:src="row.employer.profile_image"
							class="border rounded-medium w-8 aspect-square"
							alt="Foto de perfil"
						/>
						{{ row.employer.name }}
					</div>
				</template>
				<template #employer_user-data="{row}">
					<div class="flex flex-row gap-2 items-center">
						<img
							:src="row.employer_user.user.image || '/images/empleame_user_silhouette.png'"
							class="border rounded-full w-8 aspect-square"
							alt="Foto de perfil"
						/>
						{{ row.employer_user.user.contact.first_name }} {{ row.employer_user.user.contact.last_name }}
					</div>
				</template>
				<template #is_featured-data="{row}">
					<UBadge
						:color="row.is_featured ? 'amber' : 'gray'"
						variant="soft"
					>{{ row.is_featured ? 'Destacado' : 'No destacado' }}
					</UBadge>
				</template>
				
				<template #salary-data="{row}">
					<div v-if="row.salary && row.salary_type">{{ row.salary }} Bs. -
						{{ SalaryEnum[row.salary_type as keyof typeof SalaryEnum] }}
					</div>
					<div v-else>No especificado</div>
				</template>
				<template #expand="{ row }">
					<div class="flex flex-col p-4 gap-1">
						<span class="inline-block font-semibold">Descripción</span>
						<p class="text-justify">{{ row.description }}</p>
						<div v-if="row.interaction && row.interaction.length > 0">
							<span class="font-semibold">Interacciones</span>
							<!--							{{ row.interaction.confirm }}-->
							<!--								TODO: Incluir usuarios que han interactuado con esto-->
							<!--							<table class="table-auto">-->
							<!--								<thead>-->
							<!--								<tr>-->
							<!--									<th>Nombre del interesado</th>-->
							<!--									<th>Confirmación</th>-->
							<!--								</tr>-->
							<!--								</thead>-->
							<!--								<tbody>-->
							<!--								<tr v-for="r in row.interaction">-->
							<!--									<td>{{r.seeker.user.contact.first_name}}</td>-->
							<!--									<td>{{r.confirm}}</td>-->
							<!--									-->
							<!--								</tr>-->
							<!--								</tbody>-->
							<!--							</table>-->
						</div>
					</div>
				</template>
				
				<template #options-data="{row}">
					<UDropdown :items="options(row)">
						<UButton color="gray" variant="ghost" icon="ri:more-fill"/>
					</UDropdown>
				</template>
			</UTable>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type {EmployerUserInterface, PostInterface} from "~/interfaces";
import type {TableColumn, TableRow} from "#ui/types";
import {es_date} from "~/helpers/es_date";
import {SalaryEnum} from "~/enums";

const props = defineProps<{
	posts: PostInterface[],
	reload: () => Promise<void>,
	loading: boolean
}>()

const route = useRoute()

// const is_open_modal_verify: Ref<{ modal: boolean, id?: number, name?: string }> = ref({
// 	modal: false,
// 	id: undefined,
// 	name: undefined
// })
// const set_open_modal_verify = (id: number, name: string) => {
// 	is_open_modal_verify.value.modal = true
// 	is_open_modal_verify.value.id = Number(id)
// 	is_open_modal_verify.value.name = name
// }
//
// const is_open_modal_active: Ref<{ modal: boolean, id?: number, name?: string, is_active: boolean }> = ref({
// 	modal: false,
// 	id: undefined,
// 	name: undefined,
// 	is_active: false
// })
//
// const set_open_modal_active = (id: number, name: string, is_active: boolean) => {
// 	is_open_modal_active.value.modal = true
// 	is_open_modal_active.value.id = Number(id)
// 	is_open_modal_active.value.name = name
// 	is_open_modal_active.value.is_active = is_active
//
// }

interface post_computed_interface {
	id: number,
	available: boolean,
	description: string,
	category: any,
	employer: any,
	employer_user: EmployerUserInterface,
	interaction: any,
	is_active: boolean,
	is_featured: boolean,
}

const posts: ComputedRef<post_computed_interface[]> = computed(() => (props.posts && props.posts.length > 0) ?
	props.posts.map((e: PostInterface) => ({
		id: e.id,
		name: e.name,
		created_at: es_date(new Date(e.created_at!), true),
		modified_at: es_date(new Date(e.modified_at!), true),
		modality: e.modality,
		available: e.available,
		description: e.description, // TODO: Va en expansible
		category: e.category,// TODO: Hacer template de esto
		employer: e.employer, // TODO: Hacer template de esto
		employer_user: e.employer_user,// TODO: Hacer template de esto
		interaction: e.interaction,
		is_active: e.is_active,
		is_featured: e.is_featured,
		salary: e.salary,
		salary_type: e.salary_type,
		status: (e.available && e.is_active) ? {color: 'green', label: 'Disponible'} :
			(!e.available && e.is_active) ? {color: 'orange', label: 'Ocupado'} :
				{color: 'red', label: 'Deshabilitado'},
	})) : []
)

const expand = ref({
	openedRows: [],
	row: {}
})

const columns: TableColumn[] = [
	{label: 'ID', key: 'id', sortable: true},
	{label: 'Título', key: 'name', sortable: true},
	{label: 'Fecha de creación', key: 'created_at', sortable: true},
	{label: 'Última modificación', key: 'modified_at', sortable: true},
	{label: 'Estado', key: 'status', sortable: true},
	{label: 'Categoría', key: 'category', sortable: true},
	{label: 'Empleador', key: 'employer', sortable: true},
	{label: 'Publicado por:', key: 'employer_user', sortable: true},
	{label: 'Destacado', key: 'is_featured', sortable: true},
	{label: 'Salario', key: 'salary', sortable: true},
	{label: 'Opciones', key: 'options', sortable: true},
]

const selectedColumns = ref([...columns])
const search_by_status = ref(undefined)
const page = ref(1)
const pageCount = 6

const options = (row: any) => [
	[
		...([{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			//click: () => set_open_modal_active(row.id, row.name, row.is_active)
			click: () => {
			} // TODO: Implementar
		}]),
		{
			label: 'Editar',
			icon: 'ri:edit-line',
			click: () => useRouter().push(`/admin/posts/${row.id}`)
		}
	],
	[
		{
			label: 'Ver detalles',
			icon: 'ri:align-left',
			click: () => useRouter().push(`/jobs/${row.id}`)
		},
	]
]

const q = ref('')
const rows: ComputedRef<post_computed_interface[]> = computed(() => {
	let results: post_computed_interface[] = [];
	if (!q.value) {
		results = posts.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
	}
	
	if (q.value) results = posts.value.filter((e: any) => {
		return Object.values(e).slice((page.value - 1) * pageCount, (page.value) * pageCount).some((value) => {
			return String(value).toLowerCase().includes(q.value.toLowerCase())
		})
	})
	
	if (search_by_status.value) {
		results = results.filter((e: any) => e.status.label.includes(search_by_status.value))
	}
	
	return results
})

onMounted(() => {
	if (route.query.q) {
		q.value = route.query.q as string
	}
})
</script>
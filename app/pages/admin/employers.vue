<template>
	<AdminModalVerifyEmployer
		v-model="is_open_modal_verify"
		:reload="fetch"
	/>
	<AdminModalActiveEmployer
		v-model="is_open_modal_active"
		:reload="fetch"
	/>
	
	<UCard>
		<template #header>Empleadores</template>
		<div class="flex flex-col gap-4">
			
			<div class="flex flex-row gap-2 justify-end">
				<UInput
					icon="ri:search-2-line"
					v-model="q"
					placeholder="Filtrar resultados"
					color="gray"
					class="w-64"
				/>
				
				<USelect
					color="gray"
					size="md"
					placeholder="Filtrar por estado"
					icon="ri:filter-line"
					v-model="search_by_status"
					:options="[
					{label: 'Todos', value: undefined},
					{label: 'Activo', value: 'Activo'},
					{label: 'No activo', value: 'No activo'},
					{label: 'No verificado', value: 'No verificado'}
				]"
				/>
			</div>
			
			<UTable
				:columns="columns"
				:rows="rows"
				:loading="loading"
				:sort="{ column: 'created_at', direction: 'desc' }"
				v-model:expand="expand"
			>
				<template #profile_image-data="{row}">
					<img :src="row.profile_image" class="border rounded-medium w-10 aspect-square" alt="Foto de perfil"/>
				</template>
				<template #status-data="{row}">
					<UBadge
						variant="soft"
						:color="row.status.color"
					>{{ row.status.label }}
					</UBadge>
				
				</template>
				<template #options-data="{row}">
					<UDropdown :items="options(row)">
						<UButton color="gray" variant="ghost" icon="ri:more-fill"/>
					</UDropdown>
				</template>
				<template #expand="{ row }">
					<div class="flex flex-col p-4 text-sm gap-1">
						<div><span class="font-semibold">Fecha de creación:</span> {{ row.created_at }}</div>
						<div><span class="font-semibold">Última modificación:</span> {{ row.modified_at }}</div>
						<span class="inline-block font-semibold">Descripción</span>
						<p class="text-justify">{{ row.description }}</p>
					</div>
				</template>
			</UTable>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import {employerFindAll} from "~/queries";
import type {EmployerInterface} from "~/interfaces";
import type {TableColumn, TableRow} from "#ui/types";
import {es_date} from "~/helpers/es_date";
import {last_time} from "~/helpers/last_time";

const is_open_modal_verify: Ref<{ modal: boolean, id?: number, name?: string }> = ref({
	modal: false,
	id: undefined,
	name: undefined
})
const set_open_modal_verify = (id: number, name: string) => {
	is_open_modal_verify.value.modal = true
	is_open_modal_verify.value.id = Number(id)
	is_open_modal_verify.value.name = name
}

const is_open_modal_active: Ref<{ modal: boolean, id?: number, name?: string, is_active: boolean }> = ref({
	modal: false,
	id: undefined,
	name: undefined,
	is_active: false
})

const set_open_modal_active = (id: number, name: string, is_active: boolean) => {
	is_open_modal_active.value.modal = true
	is_open_modal_active.value.id = Number(id)
	is_open_modal_active.value.name = name
	is_open_modal_active.value.is_active = is_active
	
}

const employers: ComputedRef = computed(() => (result.value?.employerFindAll && result.value?.employerFindAll.length > 0) ?
	result.value?.employerFindAll.map((e) => ({
		id: e.id,
		profile_image: e.profile_image,
		name: e.name,
		email: e.email,
		status:
			(e.is_verified && e.is_active) ? {label: 'Activo', color: 'green'}
				: (!e.is_verified) ? {label: 'No verificado', color: 'yellow'}
					: {label: 'No activo', color: 'red'},
		location: `${e.location.department}, ${e.location.province}, ${e.location.municipality}`,
		description: e.description,
		created_at: es_date(e.created_at),
		modified_at: last_time(new Date(e.modified_at)),
		is_verified: e.is_verified,
		is_active: e.is_active,
	})) : []
)

const expand = ref({
	openedRows: [],
	row: {}
})

const {result, refetch, loading} = useQuery<{
	"employerFindAll": EmployerInterface[]
}>(employerFindAll, {}, {prefetch: true})
const q = ref('')
const search_by_status = ref(undefined)

onMounted(async () => await fetch())

const fetch = async () => {
	await refetch()
}

const columns: TableColumn[] = [
	{label: 'ID', key: 'id', sortable: true},
	{label: 'Foto', key: 'profile_image'},
	{label: 'Nombre', key: 'name', sortable: true},
	{label: 'e-mail', key: 'email', sortable: true},
	{label: 'Estado', key: 'status', sortable: true},
	{label: 'Locación', key: 'location', sortable: true},
	{label: 'Opciones', key: 'options'},
]

const page = ref(1)
const pageCount = 6

const options = (row: any) => [
	[
		...((!row.is_verified) ? [{
			label: 'Verificar',
			icon: 'ri:checkbox-circle-line',
			click: () => set_open_modal_verify(row.id, row.name)
		},] : [{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: () => set_open_modal_active(row.id, row.name, row.is_active)
		}]),
	],
	[
		{
			label: 'Ver detalles',
			icon: 'ri:align-left',
			click: () => useRouter().push(`/employer/${row.id}`)
		},
		{
			label: 'Ver personal',
			icon: 'ri:parent-line'
		}
	]
]

const rows: ComputedRef<TableRow[]> = computed(() => {
	let results = [];
	
	if (!q.value) {
		results = employers.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
	}
	
	if (q.value) results = employers.value.filter((e) => {
		return Object.values(e).slice((page.value - 1) * pageCount, (page.value) * pageCount).some((value) => {
			return String(value).toLowerCase().includes(q.value.toLowerCase())
		})
	})
	
	if (search_by_status.value) {
		results = results.filter((e) => e.status.label.includes(search_by_status.value))
	}
	
	return results
})
</script>
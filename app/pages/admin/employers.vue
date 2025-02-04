<template>
	<UCard>
		<template #header>Empleadores</template>
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
					<p>{{ row.description }}</p>
				</div>
			</template>
		</UTable>
	</UCard>
</template>

<script setup lang="ts">
import {employerFindAll} from "~/queries";
import type {EmployerInterface} from "~/interfaces";
import type {TableColumn, TableRow} from "#ui/types";
import {es_date} from "~/helpers/es_date";
import {last_time} from "~/helpers/last_time";

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
	[{
		label: 'Verificar',
		icon: 'ri:checkbox-circle-line',
		click: () => console.log(row.id)
	}, {
		label: 'Deshabilitar',
		icon: 'ri:close-circle-line'
	}], [{
		label: 'Ver detalles',
		icon: 'ri:align-left'
	}, {
		label: 'Ver personal',
		icon: 'ri:parent-line'
	}]
]

const rows: ComputedRef<TableRow[]> = computed(() => {
	if (!q.value) {
		return employers.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
	}
	
	return employers.value.filter((e) => {
		return Object.values(e).slice((page.value - 1) * pageCount, (page.value) * pageCount).some((value) => {
			return String(value).toLowerCase().includes(q.value.toLowerCase())
		})
	})
})
</script>
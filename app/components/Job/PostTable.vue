<template>
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
				:rows="rows.results"
				:columns="selectedColumns"
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
					<NuxtLink
						class="flex flex-row gap-2 items-center"
						:to="`/employer/${row.employer.id}`"
					>
						<img
							:src="row.employer.profile_image"
							class="border rounded-medium w-8 aspect-square"
							alt="Foto de perfil"
						/>
						{{ row.employer.name }}
					</NuxtLink>
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
				<template #featured-data="{row}">
					<UBadge
						:color="row.featured ? 'amber' : 'gray'"
						variant="soft"
					>{{ row.featured ? 'Destacado' : 'No destacado' }}
					</UBadge>
				</template>
				<template #salary-data="{row}">
					<div v-if="row.salary && row.salary_type">{{ row.salary }} Bs. -
						{{ SalaryEnum[row.salary_type as keyof typeof SalaryEnum] }}
					</div>
					<div v-else>No especificado</div>
				</template>
				<template #expand="{ row }">
					<div
						class="flex flex-col p-4 gap-1"
						v-if="row.description"
					>
						<span class="inline-block font-semibold">Descripción</span>
						{{ row.description }}
					</div>
				</template>
				<template #options-data="{row}">
					<UDropdown
						:items="options(row)" :ui="{
						width: 'w-48'
					}"
						v-if="!(user_role as any == 'EMPLOYER' && row.has_disabled)"
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
</template>

<script setup lang="ts">
import type {EmployerUserInterface, FeaturedInterface, PostInterface} from "~/interfaces";
import type {TableColumn} from "#ui/types";
import {es_date} from "~/helpers/es_date";
import {SalaryEnum} from "~/enums";

const props = defineProps<{
	posts: PostInterface[],
	reload: () => Promise<void>,
	loading: boolean,
	options: (row: any) => any[]
}>()

const {user_role} = useUserStore()
const route = useRoute()
const page = ref(1)
const pageCount = 5

interface post_computed_interface {
	id: number,
	available: boolean,
	message: string,
	category: any,
	employer: any,
	employer_user: EmployerUserInterface,
	interaction: any,
	is_active: boolean,
	featured: FeaturedInterface,
}

const posts: ComputedRef = computed(() => (props.posts && props.posts.length > 0) ?
	props.posts.map((e: PostInterface) => ({
		id: e.id,
		name: e.name,
		created_at: es_date(new Date(e.created_at!), true),
		modified_at: es_date(new Date(e.modified_at!), true),
		modality: e.modality,
		available: e.available,
		description: e.description,
		category: e.category,
		employer: e.employer,
		employer_name: e.employer.name,
		employer_user: e.employer_user,
		employer_user_name: e.employer_user.user.contact.first_name + ' ' + e.employer_user.user.contact.last_name,
		interaction: e.interaction,
		is_active: e.is_active,
		featured: e.featured,
		salary: e.salary,
		salary_type: e.salary_type,
		has_disabled: e.has_disabled,
		status: (e.available && e.is_active) ? {color: 'green', label: 'Disponible'} :
			(!e.available && e.is_active) ? {color: 'orange', label: 'Ocupado'} :
				(e.available && !e.is_active && e.has_disabled) ? {color: 'red', label: 'Deshabilitado por el administrador'} :
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
	{label: 'Destacado', key: 'featured', sortable: true},
	{label: 'Salario', key: 'salary', sortable: true},
	{label: 'Opciones', key: 'options', sortable: true},
]

const selectedColumns = ref([...columns])
const search_by_status = ref(undefined)

const q = ref('')
const rows = computed(() => {
	let results = posts.value;

	if (q.value) {
		results = results.filter((e: any) => {
			return Object.values(e).some((value) => {
				return String(value).toLowerCase().includes(q.value.toLowerCase())
			})
		})
	}

	if (search_by_status.value) {
		results = results.filter((e: any) => e.status.label.includes(search_by_status.value))
	}

	return {
		results: results.slice((page.value - 1) * pageCount, page.value * pageCount),
		total: results.length
	}
})

onMounted(() => {
	if (route.query.q) {
		q.value = route.query.q as string
	}
})
</script>
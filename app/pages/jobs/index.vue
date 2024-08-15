<template>
	<GoToPrevious></GoToPrevious>
	<div v-if="!loading">
		<div
			class="flex flex-col desktop:hidden w-full sticky top-16 bg-violet-50 p-4 gap-4"
		>
			<h5>
				<JobTitle :title="title" />
			</h5>
			<UButton
				color="black"
				label="Opciones de búsqueda"
				@click="isOpen = true"
			/>
		</div>
		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="flex flex-col w-[100%] desktop:w-[75%] gap-4">
				<h3 class="hidden tablet:block">
					<JobTitle :title="title" />
				</h3>
				<UCard>
					<template #header>
						100 resultados<span v-if="searchModel.searchQuery"
							>: {{ searchModel.searchQuery }}</span
						>
						<span v-if="route.query.search">de {{ route.query.search }}</span>
					</template>

					<div class="flex flex-col gap-4 w-full">
						<div class="flex flex-wrap gap-2">
							<UBadge :label="modality" v-for="modality in modalitiess" />
						</div>
						<div class="flex flex-col gap-4">
							<JobListElement />
							<JobListElement />
							<JobListElement />
							<JobListElement />
							<Add class="h-32" />
							<JobListElement />
							<JobListElement />
							<JobListElement />
							<JobListElement />
							<Add class="h-32" />
							<JobListElement />
							<JobListElement />
							<JobListElement />
							<JobListElement />
						</div>
					</div>
				</UCard>
			</div>
			<div
				class="hidden desktop:flex flex-col grow gap-4 sticky top-16 h-[80svh] overflow-x-auto p-1"
			>
				<JobSearchOptions
					add
					:search-options="searchOptions"
					v-model="searchModel"
				/>
			</div>
		</div>
		<UModal v-model="isOpen">
			<div class="p-4 rounded-medium flex flex-col gap-4">
				<JobSearchOptions
					fullscreen
					!add
					:search-options="searchOptions"
					v-model="searchModel"
				/>
				<UButton
					size="lg"
					label="Aplicar y cerrar"
					@click="isOpen = false"
					color="black"
				/>
			</div>
		</UModal>
	</div>
	<div v-else>Cargando...</div>
</template>

<script setup lang="ts">
import type { Reactive } from "vue";
import SearchOptions from "~/data/search/search-options,data.js";
import modalities from "~/data/search/modalities.data.js";
import type {
	ModalitiesInterface,
	SearchModelInterface,
	TitleInterface,
} from "~/interfaces/search-model.interface";

const route = useRoute();
const router = useRouter();

const loading = ref(true);

const isOpen = ref(false);
const searchOptions = reactive(SearchOptions);

const searchModel: Reactive<SearchModelInterface> = reactive({
	searchQuery: undefined,
	modalities: [...modalities],
	category: undefined,
	department: undefined,
	province: undefined,
	isOpen: isOpen,
});

const activeModalities = computed(() => {
	return searchModel.modalities.reduce(
		(acc: number[], e: ModalitiesInterface) => {
			if (e.active) acc.push(e.id);
			return acc;
		},
		[]
	);
});

const title: ComputedRef<TitleInterface> = computed(() => ({
	category: searchModel.category?.name,
	department: searchModel.department?.name,
	province: searchModel.province?.name,
}));

const modalitiess: ComputedRef<string[]> = computed(() => {
	return searchModel.modalities.reduce(
		(acc: string[], e: ModalitiesInterface) => {
			if (e.active) acc.push(e.name);
			return acc;
		},
		[]
	);
});

watch(searchModel, () => modifyQueryParams());

const modifyQueryParams = () => {
	let queryParams: any = {};

	const modalities = searchModel.modalities.reduce(
		(acc: number[], e: ModalitiesInterface) => {
			if (e.active) acc.push(e.id);
			return acc;
		},
		[]
	);

	if (modalities.length > 0)
		queryParams.modalities = modalities.flat(1).toString();
	if (searchModel.category) queryParams.category = searchModel.category?.id;
	if (searchModel.department)
		queryParams.department = searchModel.department?.id;
	if (searchModel.province) queryParams.province = searchModel.province?.id;

	router.push({
		path: "/jobs",
		query: { ...queryParams },
	});
};

onMounted(() => {
	if (route.query.modalities) {
		const modalitiesFromQuery = route?.query.modalities.toString().split(",");
		searchModel.modalities.map((e: any) => {
			if (modalitiesFromQuery.includes(e.id.toString())) e.active = true;
		});
	}

	if (route.query.category)
		searchModel.category = searchOptions.categories.find(
			(e: any) => e.id == route.query.category
		);
	if (route.query.department)
		searchModel.department = searchOptions.departments.find(
			(e: any) => e.id == route.query.department
		);
	if (route.query.province)
		searchModel.province = searchOptions.provinces.find(
			(e: any) => e.id == route.query.province
		);
	loading.value = false;
});
</script>

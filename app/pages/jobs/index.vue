<template>
	<GoToPrevious></GoToPrevious>
	<div v-if="!loading">
		<!-- Only for mobile viewports -->
		<div
			class="flex flex-col desktop:hidden w-full sticky top-16 bg-violet-50 p-4 gap-2"
		>
			<h5>
				<JobTitle :title="title" />
			</h5>
			<span v-if="state.searchQuery"
				><UIcon name="ri:search-line" class="w-3 h-3" />
				{{ state.searchQuery }}</span
			>
			<div class="flex flex-wrap gap-2">
				<UBadge :label="modality" v-for="modality in modalitiess" />
			</div>
			<UButton
				color="black"
				label="Opciones de búsqueda"
				@click="isOpen = true"
			/>
		</div>
		<!-- END: Only for mobile viewports -->

		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="flex flex-col w-[100%] desktop:w-[75%] gap-4">
				<h4 class="hidden desktop:block">
					<JobTitle :title="title" />
				</h4>
				<UCard>
					<template #header>
						100 resultados<span v-if="state.searchQuery"
							>: {{ state.searchQuery }}</span
						>
						<span v-if="route.query.search">de {{ route.query.search }}</span>
					</template>

					<div class="flex flex-col gap-4 w-full">
						<div class="hidden desktop:flex flex-wrap gap-2">
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
				class="w-[25%] hidden desktop:flex flex-col gap-4 sticky top-16 h-[80svh] overflow-x-auto p-1"
			>
				<JobSearchOptions
					add
					:search-options="searchOptions"
					v-model:search-model="state"
					v-model:isOpen="isOpen"
				/>
			</div>
		</div>
		<UModal v-model="isOpen">
			<div class="p-4 rounded-medium flex flex-col gap-4">
				<JobSearchOptions
					fullscreen
					!add
					:search-options="searchOptions"
					v-model:search-model="state"
					v-model:isOpen="isOpen"
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
import type {
	ModalitiesInterface,
	TitleInterface,
} from "~/interfaces/search-model.interface";

const { searchOptions, state, sendSearchQuery } = useSearch();

const route = useRoute();
const loading = ref(true);
const isOpen = ref(false);

// const activeModalities = computed(() => {
// 	return state.modalities.reduce((acc: number[], e: ModalitiesInterface) => {
// 		if (e.active) acc.push(e.id);
// 		return acc;
// 	}, []);
// });

const title: ComputedRef<TitleInterface> = computed(() => ({
	category: state.category?.name,
	location: state.location?.name,
}));

const modalitiess: ComputedRef<string[]> = computed(() => {
	return state.modalities.reduce((acc: string[], e: ModalitiesInterface) => {
		if (e.active) acc.push(e.name);
		return acc;
	}, []);
});

watch(state, () => sendSearchQuery());

onMounted(() => {
	if (route.query.modalities) {
		const modalitiesFromQuery = route?.query.modalities.toString().split(",");
		state.modalities.map((e: any) => {
			if (modalitiesFromQuery.includes(e.id.toString())) e.active = true;
		});
	}

	if (route.query.search) state.searchQuery = route.query.search.toString();
	if (route.query.category)
		state.category = searchOptions.categories.find(
			(e: any) => e.id == route.query.category
		);
	if (route.query.location)
		state.location = searchOptions.locations.find(
			(e: any) => e.id == route.query.location
		);
	loading.value = false;
});
</script>

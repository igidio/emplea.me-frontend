<template>
	<GoToPrevious></GoToPrevious>
	<div v-if="!loading">
		<!-- Only for mobile viewports -->
		<div
				class="flex flex-col desktop:hidden w-full sticky top-16 bg-violet-50 p-4 gap-2"
		>
			<h5>
				<JobTitle :title="title"/>
			</h5>
			<span v-if="state.searchQuery"
			><UIcon name="ri:search-line" class="w-3 h-3"/>
				{{ state.searchQuery }}</span
			>
			<div class="flex flex-wrap gap-2">
				<UBadge :label="modality" v-for="modality in modalitiess"/>
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
					<JobTitle :title="title"/>
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
							<UBadge :label="modality" v-for="modality in modalitiess"/>
						</div>
						<div class="flex flex-col gap-4">
							<JobListElement
									:props="{
									id: e.id,
									title: e.name,
									description: e.description,
									employer: e.employer.name,
									image: e.employer.profile_image
								}"
									v-for="e in list"
							/>
							<!--							<Add class="h-32"/>-->
							<!--							<Add class="h-32"/>-->
							<div class="" v-if="locked">Locked</div>
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
import postFromRangeQuery from "~/queries/postFromRange.query";
import type {PostInterface} from "~/interfaces";

const {searchOptions, state, sendSearchQuery} = useSearch();

const route = useRoute();
const loading = ref(true);
const isOpen = ref(false);
const loading_more = ref(false);
const locked = ref(false)

const list: Ref<PostInterface[]> = ref([]);

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

const current_skip = ref(1)

const get_job_list = async () => {
	loading_more.value = true
	const {data, error} = await useAsyncQuery(postFromRangeQuery, {
		"paginationDto": {
			"skip": current_skip.value,
			"take": 4
		}
	});
	const new_data = (data.value as any).postsFromRange;
	console.log(new_data)
	if (new_data.length === 0) locked.value = true
	if (data.value && !error.value) list.value.push(...new_data);
	loading_more.value = false
}

if (import.meta.client) {
	window.onscroll = function (ev) {
		if (Math.round(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
			current_skip.value++
			if (!locked.value || loading_more.value) get_job_list()
		}
	};
}


get_job_list()
</script>
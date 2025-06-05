<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb
			:links="[
				{
					label: 'Inicio',
					icon: 'i-heroicons-home',
					to: '/',
				},
				{
					label: 'Buscar trabajo',
					to: '/',
				},
			]"
		/>

		<div v-if="!loading">
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
					<UButton
						:label="modality.name"
						v-for="modality in modalities"
						@click="() => {state.modalities[modality.id - 1 ]!.active = false}"
						size="sm"
					/>
				</div>
				<UButton
					color="black"
					label="Opciones de búsqueda"
					@click="isOpen = true"
				/>
			</div>

			<div class="flex flex-col desktop:flex-row gap-4">
				<div class="flex flex-col w-[100%] desktop:w-[75%] gap-4">
					<h4 class="hidden desktop:block">
						<JobTitle :title="title" />
					</h4>
					<UCard>
						<template #header>
							{{ list_total }}
							<span v-if="state.searchQuery"
								>para "{{ state.searchQuery }}"</span
							>
						</template>

						<div class="flex flex-col gap-4 w-full">
							<!--						{{ state.modalities }}-->
							<div class="hidden desktop:flex flex-wrap gap-2">
								<UButton
									:label="modality.name"
									v-for="modality in modalities"
									@click="() => {state.modalities[modality.id - 1 ]!.active = false}"
									size="sm"
								/>
							</div>
							<div class="flex flex-col gap-4">
								<template v-for="(e, index) in list" :key="e.id">
									<JobListElement
										:props="{
											id: e.id,
											title: e.name,
											description: e.description,
											employer: e.employer.name,
											image: e.employer.profile_image,
											location: e.employer.location,
											employer_id: e.employer.id,
											featured: !!e.featured,
										}"
									/>
									<Ad v-if="(index + 1) % 5 === 0" class="h-32" />
								</template>

								<UButton
									block
									color="black"
									v-if="!locked && !loading_more"
									@click="
										async () => {
											current_skip++;
											await get_job_list(true);
										}
									"
									>Cargar más
								</UButton>

								<div
									class="w-full center-text p-4 bg-violet-100 rounded-medium"
									v-if="loading_more"
								>
									<UIcon
										name="ri:loader-5-line"
										class="animate-spin bg-primary"
										size="32"
									/>
								</div>

								<div
									class="text-slate-500 bg-slate-100 p-4 rounded-medium text-center"
									v-if="locked"
								>
									Fin de los resultados
								</div>
							</div>
						</div>
					</UCard>
				</div>
				<div
					class="w-[25%] hidden desktop:flex flex-col gap-4 sticky top-16 h-[calc(100vh-70px)] overflow-x-auto p-1 menu-fade"
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
		<div class="flex flex-col" v-else>
			<UIcon
				name="ri:loader-4-fill"
				class="animate-spin bg-primary self-center my-16"
				size="48"
			/>
		</div>
		<!--		<div v-else>Cargando...</div>-->
	</div>
</template>

<script setup lang="ts">
import type {
	ModalitiesInterface,
	TitleInterface,
} from "~/interfaces/search-model.interface";
import postFromRangeQuery from "~/queries/postFromRange.query";
import type { PostInterface } from "~/interfaces";
import modalitiesData from "~/data/search/modalities.data";
import { definePageMeta } from "#imports";

const { searchOptions, state, sendSearchQuery } = useSearch();

const route = useRoute();
const loading = ref(true);
const isOpen = ref(false);
const loading_more = ref(false);
const locked = ref(false);
const total: Ref<undefined | number> = ref(undefined);

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

const modalities: ComputedRef<{ name: string; id: number }[]> = computed(() => {
	return state.modalities.reduce(
		(acc: { name: string; id: number }[], e: ModalitiesInterface) => {
			if (e.active) acc.push({ name: e.name, id: e.id });
			return acc;
		},
		[]
	);
});

onMounted(async () => {
	await get_job_list();

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

const current_skip = ref(1);

const list_total = computed(() =>
	total.value === 0
		? "Ningún resultado"
		: total.value === 1
		? "Un resultado"
		: `${total.value} resultados`
);

const search_additional_inputs = computed(() => ({
	paginationDto: {
		skip: current_skip.value,
		take: 4,
	},
	searchAdditionalInputsDto: {
		category: state.category?.id ? Number(state.category.id) : null,
		input: state.searchQuery ? state.searchQuery : null,
		location: state.location?.id ? Number(state.location.id) : null,
		modalities:
			state.modalities && state.modalities.length > 0
				? state.modalities
						.filter((e) => e.active)
						.map((e) => {
							if (e.active) return e.name;
						})
				: null,
	},
}));

const { result, error, load, refetch } = useLazyQuery(
	postFromRangeQuery,
	search_additional_inputs.value
);

const get_job_list = async (will_refetch = false) => {
	loading_more.value = true;
	locked.value = false;

	if (will_refetch) {
		await refetch(search_additional_inputs.value);
	} else {
		await load();
	}

	const new_data = (result.value as any).postsFromRange;
	if (new_data.found.length === 0) {
		locked.value = true;
		total.value = undefined;
	}
	if (result.value && !error.value) list.value.push(...new_data.found);
	total.value = new_data.total;
	loading_more.value = false;

	if (list.value.length === total.value) locked.value = true;
};

if (import.meta.client) {
	window.onscroll = async function (ev) {
		if (
			Math.round(window.innerHeight + window.scrollY) >=
			document.body.scrollHeight
		) {
			if (!(locked.value || loading_more.value)) {
				current_skip.value++;
				await get_job_list(true);
			}
		}
	};
}

watch(state, async () => {
	current_skip.value = 1;
	sendSearchQuery();
	list.value = [];
	await get_job_list(true);
});
</script>

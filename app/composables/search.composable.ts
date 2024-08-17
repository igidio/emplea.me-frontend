import type { Reactive } from "vue";
import type { LocationQueryRaw } from "vue-router";

import modalitiesData from "~/data/search/modalities.data.js";
import searchOptionsData from "~/data/search/search-options,data.js";
import type {
	ModalitiesInterface,
	SearchModelInterface,
} from "~/interfaces/search-model.interface";

const searchOptions = reactive({
	locations: searchOptionsData.locations,
	categories: searchOptionsData.categories,
});

export function useSearch() {
	const router = useRouter();
	const state: Reactive<SearchModelInterface> = reactive({
		searchQuery: undefined,
		modalities: [...modalitiesData],
		location: undefined,
		category: undefined,
	});

	const changeRoute = (query: LocationQueryRaw = {}) => {
		router.push({
			path: "/jobs",
			query: { ...query },
		});
	};

	const modifyQueryParams = () => {
		let queryParams: LocationQueryRaw | undefined = {};

		const modalities = state.modalities.reduce(
			(acc: number[], e: ModalitiesInterface) => {
				if (e.active) acc.push(e.id);
				return acc;
			},
			[]
		);

		if (modalities.length > 0)
			queryParams.modalities = modalities.flat(1).toString();
		if (state.searchQuery) queryParams.search = state.searchQuery;
		if (state.location) queryParams.location = state.location?.id;
		if (state.category) queryParams.category = state.category?.id;

		return queryParams;
	};

	const sendSearchQuery = () => {
		const query = modifyQueryParams();
		changeRoute(query);
	};

	return {
		state,
		searchOptions,
		// Methods
		sendSearchQuery,
	};
}

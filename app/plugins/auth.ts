import {categoryGet, getUserByToken, locationGet, plansGet} from "~/queries";
import {useUserStore} from "~/stores/user.pinia";
import {usePostStore} from "~/stores/post.pinia";
import type {PlanInterface} from "~/interfaces";

export default defineNuxtPlugin(async (nuxtApp) => {
	const userStore = useUserStore();
	const postStore = usePostStore();
	
	const { getToken } = useApollo();
	
	await getToken();
	const { data, error } = await useAsyncQuery(getUserByToken, { server: true });
	
	if (data && !error.value)
		userStore.set_user((data.value as any).getUserByToken);

// Categorías
	const get_categories = async() => {
		const {data} = await useAsyncQuery(categoryGet, {server: true});
		postStore.set_categories((data.value as any).allCategories);
	}
	const get_locations = async () => {
		const {data} = await useAsyncQuery<{ allPlans: PlanInterface[] }>(plansGet, {server: true});
		postStore.set_plans((data.value as any).allPlans);
	}
	
	await get_categories()
	await get_locations()
});
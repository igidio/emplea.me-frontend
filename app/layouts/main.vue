<template>
	<!-- {{ userStore.initial_loading }} -->
	<Loading v-if="status == 'pending'"/>

	<div
			class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
			:class="status && 'success'"
	>
		<div>
			<Header/>
			<div class="mt-6 flex justify-center">
				<div class="max-w-[1600px] w-full p-4">
					<slot/>
				</div>
			</div>
		</div>

		<!-- <Footer /> -->

		<NuxtLayout :name="footer">
			<NuxtPage/>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import {categoryGet, getUserByToken, locationGet} from "~/queries";

import {useUserStore} from "~/stores/user.pinia";
import {usePostStore} from "~/stores/post.pinia";


const userStore = useUserStore();
const postStore = usePostStore();

const {getToken} = useApollo();

getToken();
const {data, error, status} = await useAsyncQuery(getUserByToken, {
	server: true,
});

if (data && !error.value)
	userStore.set_user((data.value as any).getUserByToken);

// Categorías
const get_categories = async() => {
	const {data} = await useAsyncQuery(categoryGet, {server: true});
	postStore.set_categories((data.value as any).allCategories);
}
const get_locations = async () => {
	const {data} = await useAsyncQuery(locationGet, {server: true});
	postStore.set_locations((data.value as any).allLocations);
}

get_categories()
get_locations()

const footer = "footer-auth"; // "footer-default";
</script>

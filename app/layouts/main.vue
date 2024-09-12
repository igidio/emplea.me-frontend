<template>
	<!-- {{ userStore.initial_loading }} -->
	{{ status }}
	<Loading v-if="status == 'pending'" />

	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
		:class="status && 'success'"
	>
		<div>
			<ClientOnly>
				<Header />
			</ClientOnly>
			<div class="mt-6 flex justify-center">
				<div class="max-w-[1600px] w-full p-4">
					<slot />
				</div>
			</div>
		</div>

		<!-- <Footer /> -->

		<NuxtLayout :name="footer">
			<NuxtPage />
		</NuxtLayout>
	</div>

	<!-- <div v-else>cargando</div> -->
</template>

<script setup lang="ts">
import { getUserByToken } from "~/queries";
import { useUserStore } from "~/stores/user.pinia";
const userStore = useUserStore();

//const { getToken } = useApollo();

// if (import.meta.client) {
// 	userStore.get_token();
// 	await userStore.get_current_user();
// }

// function storeToken(token: string) {
// 	const newCookie = useCookie("token", {
// 		maxAge: 60 * 24 * 28,
// 		sameSite: true,
// 		secure: true,
// 	});
// 	newCookie.value = token;
// }

//getToken();

const { data, error, status } = await useAsyncQuery(getUserByToken, {
	server: true,
});
userStore.set_user((data.value as any).getUserByToken);

const footer = "footer-auth";
//const footer = "footer-default";
</script>

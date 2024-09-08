<template>
	<!-- {{ userStore.initial_loading }} -->
	<Loading v-if="isLoading" />

	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
		:class="isLoading && 'hidden'"
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

		<Footer />
	</div>

	<!-- <div v-else>cargando</div> -->
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user.pinia";
const userStore = useUserStore();

const isLoading = ref(true);

if (import.meta.client) {
	userStore.get_token();
	await userStore.get_current_user();
}

onMounted(() => {
	isLoading.value = userStore.initial_loading;
});
</script>

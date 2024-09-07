<template>
	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
	>
		<div>
			<Header />
			<div class="mt-6 flex justify-center">
				<div class="max-w-[1600px] w-full p-4">
					<slot />
				</div>
			</div>
		</div>

		<Footer />
	</div>

	<!-- <div v-else>cargando</div> -->
	{{ initial_loading }}
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user.pinia";
const userStore = useUserStore();
const { initial_loading } = storeToRefs(userStore);

onMounted(async () => {
	await userStore.get_current_user();
});
</script>

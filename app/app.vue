<template>
	<Loading v-if="initial_loading" />

	<NuxtLayout :name="layout" :class="initial_loading ? 'hidden' : 'block'">
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const layout = "unauthenticated";

import { useUserStore } from "~/stores/user.pinia";
const userStore = useUserStore();
const { initial_loading } = storeToRefs(userStore);

onMounted(async () => {
	await userStore.get_current_user();
});
</script>

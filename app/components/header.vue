<template>
	<header id="auth-buttons" class="header hidden tablet:flex">
		<NuxtLayout :name="change_layout">
			<NuxtPage />
		</NuxtLayout>
	</header>

	<header class="header flex tablet:hidden">
		<NuxtLink to="/" v-if="!['ADMIN', 'SUPERUSER'].includes(user.role)">
			<Logo />
		</NuxtLink>
		<div v-else/>

		<UButton variant="ghost" icon="ri:menu-fill" @click="isOpen = true" />
	</header>

	<USlideover v-model="isOpen">
		<Sidebar v-model="isOpen" />
	</USlideover>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user.pinia";
const { user } = storeToRefs(useUserStore());

const cases: any = {
	SUPERUSER: "header-admin",
	ADMIN: "header-admin",
	EMPLOYER: "header-employer",
	SEEKER: "header-seeker",
};

const change_layout = computed(() => {
	return cases[user.value.role] || "header-unauthenticated";
});

const isOpen = ref(false);
</script>

<style scoped>
.header {
	@apply flex-row justify-between items-center h-16 px-4 py-4 sticky top-0 bg-violet-50 z-50 border-b-2;
}
</style>

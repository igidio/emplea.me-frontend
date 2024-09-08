<template>
	<header id="auth-buttons" class="header hidden tablet:flex">
		<NuxtLayout :name="layout">
			<NuxtPage />
		</NuxtLayout>
	</header>

	<header class="header flex tablet:hidden">
		<NuxtLink to="/">
			<Logo />
		</NuxtLink>

		<UButton variant="ghost" icon="ri:menu-fill" @click="isOpen = true" />
	</header>

	<USlideover v-model="isOpen">
		<Sidebar v-model="isOpen" />
	</USlideover>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user.pinia";

const { user } = storeToRefs(useUserStore());

const userStore = useUserStore();

const cases: any = {
	SUPERUSER: "header-admin",
	ADMIN: "header-admin",
	EMPLOYER: "header-employer",
	SEEKER: "header-seeker",
};

const layout = cases[user.value.role] || "header-unauthenticated";

const isOpen = ref(false);

//const layout = "header-admin";
//const layout = "header-seeker";
//const layout = "header-unauthenticated";
//const layout = "header-employer";
</script>

<style scoped>
.header {
	@apply flex-row justify-between items-center h-16 p-4 my-4 sticky top-0 bg-violet-50 z-50;
}
</style>

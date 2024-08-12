<template>
	<NuxtLink
		to="/login"
		class="w-auto"
		v-if="!headerOptions.home.includes(route.name as string)"
	>
		<UButton variant="ghost" class="w-full">Iniciar sesión</UButton>
	</NuxtLink>
	<NuxtLink to="/" v-else class="w-auto">
		<UButton variant="ghost" class="w-full">Volver a página principal</UButton>
	</NuxtLink>

	<NuxtLink to="/signup" v-if="route.name !== 'signup'" class="w-auto">
		<UButton class="w-full">¡Regístrate!</UButton>
	</NuxtLink>
	<NuxtLink to="/login" v-else class="w-auto">
		<UButton class="w-full">Iniciar sesión</UButton>
	</NuxtLink>
</template>

<script setup lang="ts">
import headerOptions from "~/data/headerOptions.data.js";
const route = useRoute();
console.log(route.name);
</script>

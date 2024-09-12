<template>
	<footer class="h-auto text-center py-4 shrink-0">
		<span class="" v-if="route.name == 'signup'">
			Tienes una cuenta?,
			<NuxtLink class="hyper" to="/login">Inicia sesión.</NuxtLink>
		</span>
		<span v-else>
			¿Aún no tienes una cuenta?,
			<NuxtLink class="hyper" to="/signup">Regístrate, es gratis.</NuxtLink>
		</span>
	</footer>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route.name);
</script>

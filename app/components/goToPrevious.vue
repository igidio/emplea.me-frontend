<template>
	<RouterLink to="/" class="flex flex-row gap-2 items-center">
		<Icon name="ri:arrow-drop-left-line"></Icon>
		Volver a <span class="font-semibold">Route</span>
	</RouterLink>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route);
</script>

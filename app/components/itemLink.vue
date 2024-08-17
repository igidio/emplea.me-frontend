<template>
	<NuxtLink :to="link" target="_blank">
		<item :icon="icon" :label="label" />
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	icon: string;
	label: string;
	link?: string;
}

defineProps<Props>();
</script>

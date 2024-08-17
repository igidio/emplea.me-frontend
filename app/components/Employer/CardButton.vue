<template>
	<div
		class="bg-white flex flex-col gap-2 items-center p-8 rounded-medium w-64"
	>
		<img src="https://placehold.co/400" class="w-16 h-auto rounded-medium" />
		<span class="font-semibold">{{ name }}</span>
		<span>{{ role }}</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	role: string;
}
defineProps<Props>();
</script>

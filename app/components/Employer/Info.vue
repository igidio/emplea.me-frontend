<template>
	<div
		class="flex flex-row bg-white rounded-medium overflow-hidden items-center gap-2 w-full"
	>
		<img :src="profile_image" class="h-16 aspect-[1:1]" />
		<span class="font-semibold">{{ name }}</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id: number;
	name: string;
	profile_image: string;
}
defineProps<Props>();
</script>

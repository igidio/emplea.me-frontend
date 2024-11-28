<template>
<div class="bg-white rounded-medium p-4 flex flex-row">
	<img src="https://placehold.co/400" class="w-16 h-auto rounded-medium" />
	<span></span>
</div>
</template>
<script setup lang="ts">
interface Props {
	name: string;
	role: string;
}
defineProps<Props>();
</script>
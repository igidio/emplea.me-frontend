<template>
	<div
		class="bg-violet-600 w-8 h-8 flex items-center justify-center"
		:class="rounded"
	>
		<UIcon :name="name" class="bg-white" />
	</div>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	rounded?: string;
}

withDefaults(defineProps<Props>(), {
	rounded: "rounded-small",
});
</script>

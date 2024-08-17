<template>
	<div
		class="bg-violet-600 aspect-[1/1] h-full flex items-center justify-center p-[3px]"
		:class="rounded"
	>
		<UIcon
			:name="name"
			class="bg-white z-0"
			:class="small ? 'h-3 w-3' : 'h-6 w-6'"
		/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	rounded?: string;
	small?: boolean;
}

withDefaults(defineProps<Props>(), {
	rounded: "rounded-small",
	small: false,
});
</script>

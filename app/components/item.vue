<template>
	<div class="flex flex-row gap-2">
		<IconFill :name="icon" :small="!(labelBold !== undefined)" />
		<div class="flex flex-col">
			<span class="font-semibold" v-if="labelBold">{{ labelBold }}</span>
			<span>{{ label }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label?: string;
	labelBold?: string;
	icon: string;
}

defineProps<Props>();
</script>

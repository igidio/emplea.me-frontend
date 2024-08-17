<template>
	<div class="flex flex-row gap-2">
		<IconFill
			:name="icon"
			:small="!(labelBold !== undefined || (small && regular))"
		/>
		<div class="flex flex-col" v-if="label">
			<span class="font-semibold" v-if="labelBold">{{ labelBold }}</span>
			<span>{{ label }}</span>
		</div>
		<div class="flex flex-col" v-if="small && regular">
			<span class="text-sm">{{ small }}</span>
			<span>{{ regular }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label?: string;
	labelBold?: string;
	small?: string;
	regular?: string;
	icon: string;
}

defineProps<Props>();
</script>

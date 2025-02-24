<template>
	<NuxtLink :to="link" target="_blank">

		<div
			class="flex flex-row gap-2 cursor-pointer"
		>
			<div
				class="bg-slate-100 aspect-[1/1] w-4 h-4 flex items-center justify-center p-[3px] rounded-small"
			>
				<UIcon :name="icon"
				       class="bg-violet-500 z-0"/>
			</div>
			<div class="flex flex-col">
				<span class="text-sm">{{ label }}</span>
			</div>
		</div>

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

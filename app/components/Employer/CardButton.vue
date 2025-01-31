<template>
	<UButton color="white" class="flex flex-col gap-1 items-center rounded-medium w-64 center-text">
			<img
				:src="image ? image : '/images/empleame_employer_silhouette.png'"
				class="w-16 h-auto rounded-medium border border-slate-200"
				alt="Logo de empresa"
			/>
			<span class="font-semibold">{{ name }}</span>
			<span class="font-medium">{{ EmployerLevelEnum[role as keyof typeof EmployerLevelEnum] }}</span>
	</UButton>
	
</template>

<script setup lang="ts">
import {EmployerLevelEnum} from "~/enums";

interface Props {
	name: string;
	role: string;
	image?: string;
}

defineProps<Props>();
</script>

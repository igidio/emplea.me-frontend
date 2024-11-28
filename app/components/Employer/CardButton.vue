<template>
	<div
			class="bg-white flex flex-col gap-2 items-center rounded-medium w-64 center-text"
	>
		<img :src="image ? image : 'https://placehold.co/400'" class="w-16 h-auto rounded-medium"/>
		<span class="font-semibold">{{ name }}</span>
<!--		<span>{{ EmployerLevelEnum[role] }}</span>-->
		<span>{{ EmployerLevelEnum[role as keyof typeof EmployerLevelEnum] }}</span>
	</div>
</template>

<script setup lang="ts">
import {EmployerLevelEnum} from "~/enums";

interface Props {
	name: string;
	role: string;
	image: string;
}

defineProps<Props>();
</script>

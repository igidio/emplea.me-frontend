<template>
	<NuxtLink :to="`/employer/${id}`">
		<div
			class="flex flex-row bg-white rounded-large overflow-hidden items-center gap-2 w-full ring-1 ring-gray-200 hover:bg-slate-50 active:bg-slate-100"
		>
			<img :src="profile_image" class="h-16 aspect-[1:1] ring-1 ring-gray-200" alt="Foto de perfil" />
			<span class="font-semibold">{{ name }}</span>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	name: string;
	profile_image: string;
}
defineProps<Props>();
</script>

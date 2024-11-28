<template>
	<UCard>
		<template #header>Publicaciones</template>
		<div class="flex flex-col gap-4">
			<UButton icon="ri:add-circle-line" size="lg">Agregar</UButton>
			<JobListElement
				v-for="post in posts"
				:props="{
					id: post.id,
					image: employerInfo.image,
					title: post.name,
					employer: employerInfo.name,
					description: post.description
				}"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type {PostInterface} from "~/interfaces/server/post.interface";

interface Props {
	employerInfo: {
		image: string,
		name: string,
	}
	posts: PostInterface[]
}
defineProps<Props>()
</script>
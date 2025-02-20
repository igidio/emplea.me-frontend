<template>
	<UCard>
		<template #header>Publicaciones</template>
		<div class="flex flex-col gap-4">
			{{employerUser?.employer }}
			<NuxtLink :to="`/employer/${employerInfo.id}/create`" v-if="employerUser">
				<UButton
					icon="ri:add-circle-line"
					size="lg"
					label="Agregar"
					block
				/>
			</NuxtLink>
			<span class="italic text-center" v-if="employerUser && employerUser.employer?.post?.length == 0">{{
					employerUser ? 'No hay ninguna publicación todavía, puedes agregar con el botón de arriba.' : 'El empleador no hizo ninguna publicación todavía.'
				}}</span>
			<JobListElement
				v-for="post in posts"
				:props="{
					id: post.id,
					image: employerInfo.image,
					title: post.name,
					employer: employerInfo.name,
					description: post.description,
					location: post.location,
					employer_id: employerInfo.id
				}"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type {EmployerUserInterface, PostInterface} from "~/interfaces";

interface Props {
	employerInfo: {
		image: string,
		name: string,
		id: string | number
	}
	posts: PostInterface[],
	employerUser: EmployerUserInterface | null
}

defineProps<Props>()
</script>
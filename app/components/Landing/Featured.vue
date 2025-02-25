<template>
	<UCard class="w-full">
		<template #header> Destacado</template>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<JobListElement
					:props="{
						id: data.id,
						title: data.name,
						description: data.description,
						employer: data.employer.name,
						employer_id: data.employer.id,
						image: data.employer.profile_image,
						location: data.employer.location,
						featured: !!data.featured
					}"
					v-for="data in featured_data"
				/>
			</div>
			<NuxtLink to="/jobs">
				<UButton size="lg" class="w-full">Ver todos los trabajos</UButton>
			</NuxtLink>
		</div>

		<template #footer>
			<span class="font-semibold">
				¿Eres empleador?, ¿Quieres que tu trabajo se encuentre acá?,
				<NuxtLink to="/signup">puedes registrarlo fácilmente.</NuxtLink>
			</span>
		</template>
	</UCard>
</template>

<script setup lang="ts">
import postFindRandomActiveQuery from "~/queries/postFindRandomActive.query";
import type {PostInterface} from "~/interfaces";

const featured_data: Ref<PostInterface[]> = ref([])

const {data, error} = await useAsyncQuery(postFindRandomActiveQuery);
if (data.value && !error.value) featured_data.value = (data.value as any).findRandomActivePosts
</script>
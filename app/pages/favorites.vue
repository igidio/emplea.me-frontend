<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Mis favoritos',
      to: `/employer/favorites`
		}]"/>

		<div class="flex flex-col tablet:flex-row gap-4">
			<UCard class="w-full tablet:w-[80%]">
				<template #header>
					<div class="justify-between flex flex-between items-center">
						Mis favoritos
						<UCheckbox label="Mostrar todos" @change="show_all" />
					</div>
				</template>
				<div class="flex flex-col gap-4">

					<template v-for="(interaction, index) in interactions" :key="interaction.post.id">
						<JobListElement
							:props="{
          id: interaction.post.id,
          image: interaction.post.employer.profile_image,
          title: interaction.post.name,
          employer: interaction.post.employer.name,
          description: interaction.post.description,
          location: interaction.post.location,
          employer_id: interaction.post.employer.id,
          featured: !!interaction.post.featured
        }"
						>
							<div class="flex flex-col gap-2 items-end">
								<div class="flex flex-row items-center gap-4 justify-end">
									<span>{{ last_time(new Date(new Date(interaction?.created_at!).getTime() - 6 * 60 * 60 * 1000)) }}</span>
									<UButton color="gray" icon="ri:delete-bin-5-line" size="sm"/>
								</div>
								<UBadge v-if="interaction.confirm" color="green" variant="soft"><UIcon name="ri:thumb-up-line"/> Te interesa</UBadge>
							</div>
						</JobListElement>
						<Ad v-if="(index + 1) % 3 === 0" class="h-32"/>
					</template>

				</div>
			</UCard>
			<div class="flex flex-col w-full tablet:w-[20%]">
				<Ad class="h-64"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {gqlInteraction} from "~/queries";
import type {interactionInterface} from "~/interfaces";
import {last_time} from "~/helpers/last_time";

definePageMeta({
	middleware: 'role',
	roles: ['SEEKER'],
	keepalive: false,
})

const favorites_count = ref(100);

const {load, refetch, loading, error, result} = useLazyQuery<{
	interactionGet: interactionInterface[]
}>(gqlInteraction.get)
const interactions = ref<interactionInterface[]>([])

onMounted(async () => {
	await load()
	await refetch({
		"showAll": false
	})?.then((res) => {
		interactions.value = res.data.interactionGet
	}).catch((err) => {
		console.log(err)
	})
})

const show_all = async (e: Event) => {
	console.log(e)
	await refetch({
		"showAll": e ? undefined : true
	})?.then((res) => {
		interactions.value = res.data.interactionGet
	})
}
</script>

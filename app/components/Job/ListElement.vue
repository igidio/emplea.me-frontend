<template>
	<div
		class="flex flex-col p-4 rounded-large gap-4 text-ellipsis overflow-hidden dotted"
	>
		<div class="flex tablet:flex-row flex-col justify-between gap-4">
			<div class="flex flex-row gap-4">
				<img :src="(image) ? image : '/images/empleame_employer_silhouette.png'" class="h-16 aspect-[1/1] rounded-small border border-gray-300" alt="Imagen de la empresa" />
				<div class="flex flex-col">
					<NuxtLink :to="`/employer/${employer_id}`">
						<span class="font-semibold">{{ employer }}</span>
					</NuxtLink>

					<h4>{{ title }}</h4>
					<span class="text-sm">{{`${location.department}, ${location.province}, ${location.municipality}`}}</span>
				</div>
			</div>
			<div class="flex flex-col text-nowrap">
				<UButton size="md" :to="'/jobs/' + id">Más detalles</UButton>
			</div>
		</div>

		<div class="line-clamp-3 tablet:line-clamp-2">
			<p class="">
				{{ description }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {LocationInterface} from "~/interfaces";

interface Props {
	id: number,
  title: string,
  employer: string,
	employer_id: number|string,
  image?: string,
  description: string,
	location: LocationInterface
}
const props = defineProps< { props: Props }>()
const { id, title, employer, image, description, location, employer_id } = props.props
</script>
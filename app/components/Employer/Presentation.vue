<template>
	<UCard>
		<div class="flex flex-col gap-4">
			<div class="flex flex-row justify-between p-4">
				<div class="flex flex-row gap-4">
					<img
						:src="data.profile_image ? data.profile_image : '/images/empleame_employer_silhouette.png'"
						class="w-24 aspect-[1:1] rounded-medium border border-slate-200"
						alt="Logo de empresa"
					/>
					<div class="flex flex-col">
						<div class="flex flex-col gap-2">
							<h3>{{ data.name }}</h3>
							<item icon="ri:calendar-line" :label="'Fundado el ' + new Date(data.establishment_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })"/>
							<item icon="ri:calendar-line" :label="data.email"/>
						</div>
					</div>
				</div>
				<NuxtLink :to="`/employer/${data.id}/edit`">
					<UButton
						icon="ri:ball-pen-fill"
						class="h-fit"
						label="Editar"
						v-if="data.can_modify"
					/>
				</NuxtLink>
			</div>

			<hr/>
			<p class="text-justify">{{ data.description }}</p>
		</div>
	</UCard>
</template>

<script setup lang="ts">
// const {selected} = useMyEmployments();

interface Props {
	profile_image: string,
	name: string,
	establishment_date: Date | string,
	email: string,
	description: string,
	can_modify: boolean,
	id: string
}

defineProps<{ data: Props }>();
</script>

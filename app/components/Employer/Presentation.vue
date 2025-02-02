<template>
	<UCard>
		<div class="flex flex-col gap-4">
			<div class="flex flex-row justify-between p-4">
				<div class="flex flex-row gap-4">
					<img
						:src="result.profile_image ? result.profile_image : '/images/empleame_employer_silhouette.png'"
						class="w-24 aspect-[1:1] rounded-medium border border-slate-200"
						alt="Logo de empresa"
					/>
					<div class="flex flex-col">
						<div class="flex flex-col gap-2">
							<h3>{{ result.name }}</h3>
							<item icon="ri:calendar-line" :label="'Fundado el ' + new Date(result.establishment_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })"/>
							<item icon="ri:mail-line" :label="result.email"/>
						</div>
					</div>
				</div>
				<NuxtLink :to="`/employer/${result.id}/edit`">
					<UButton
						icon="ri:ball-pen-fill"
						class="h-fit"
						label="Editar"
						v-if="result.can_modify"
					/>
				</NuxtLink>
			</div>

			<hr v-if="result.description || result.description !== ''" />
			<p class="text-justify" v-if="result.description || result.description !== ''">{{ result.description }}</p>
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

defineProps<{ result: Props }>();
</script>

<template>
	<GoToPrevious/>
	<UCard>
		<template #header>Editar perfil de aplicante</template>
		<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">
			<div class="flex flex-col w-full gap-4">
				<h6>Redes sociales</h6>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-4 h-full justify-between">
						<ProfileItemSocial
							v-for="e in seeker.seeker_social"
							:props="{
							name: e.social!.name,
							identifier: e.identifier,
							social: {
								name: e.social!.name,
								icon: e.social!.icon
							}
						}"
						/>
					</div>

					<UButton color="black" icon="ri:add-fill" label="Agregar"/>
				</div>
			</div>

			<div class="flex flex-col w-full gap-4">
				<h6>Habilidades</h6>
				<div class="flex flex-col gap-4 h-full justify-between">
					<div class="flex flex-col gap-4">
						<ProfileItemSkill
							v-for="e in seeker.seeker_skill"
							:props="{
							name: e.skill!.name,
							level: e.level,
							icon: e.level
						}"
						/>
					</div>
					<UButton color="black" icon="ri:add-fill" label="Agregar"/>
				</div>
			</div>

			<div class="flex flex-col w-full gap-4">
				<h6>Educación</h6>
				<div class="flex flex-col gap-4 h-full justify-between">
					<div class="flex flex-col gap-4">
						<ProfileItemEducation
							v-for="e in seeker.education"
							:props="{
							institute: e.institute.name,
							degree: e.degree,
							starting_year: e.starting_year,
							completion_year: e.completion_year,
						}"
						/>
					</div>
					<UButton color="black" icon="ri:add-fill" label="Agregar"/>
				</div>
			</div>

			<div class="flex flex-col w-full gap-4">
				<h6>Experiencia laboral</h6>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-4 h-full justify-between">
					<ItemExperience
						v-for="e in seeker.experience"
						:props="{
							company: e.company,
							title: e.title,
							start_date: e.start_date,
							end_date: e.end_date,
							description: e.description
						}"
					/>
					</div>
					<UButton color="black" icon="ri:add-fill" label="Agregar"/>
				</div>
			</div>

		</div>
	</UCard>
</template>

<script setup lang="ts">
import type {seekerInterface} from "~/interfaces";
import {seekerGetOneByUser} from "~/queries";
import {SkillLevelEnum} from "~/enums";
import ItemExperience from "~/components/Profile/ItemExperience.vue";

const seeker: Ref<seekerInterface> = ref({} as seekerInterface)

const {data} = await useAsyncQuery<{ seekerFindByUser: seekerInterface }>(seekerGetOneByUser)
seeker.value = data.value?.seekerFindByUser!

console.log(seeker.value)
</script>
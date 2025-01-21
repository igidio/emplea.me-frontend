<template>
	<UCard>
		<template #header>
			<div class="flex flex-row place-content-between">
				Perfil de aplicante de trabajo
				<NuxtLink to="/profile/edit">
					<UButton
						icon="ri:file-edit-fill"
						v-if="can_edit"
					>Editar
					</UButton>
				</NuxtLink>
			</div>
		</template>

		<div class="flex flex-col tablet:flex-row w-full gap-4">
			<div class="flex flex-col w-full gap-4">
				<item
					icon="ri:map-pin-2-fill"
					:label="`${seeker.location?.province} - ${seeker.location?.municipality} - ${seeker.location?.department}`"
					label_bold="Lugar actual"
				/>

				<div
					v-if="seeker.experience && seeker.experience.length > 0"
					class="flex flex-col gap-3"
				>
					<h6>Educación</h6>
					<item
						v-for="e in seeker.education"
						icon="ri:school-fill"
						:label="e.title"
						:small="`
						${(e.starting_year) && e.starting_year}
						${(e.starting_year && e.completion_year) ? ' - ' : ''}
						${(e.completion_year) && e.completion_year}`"
						:label_bold="e.institute.name"
					/>
				</div>
				<div
					v-if="seeker.experience && seeker.experience.length > 0"
					class="flex flex-col gap-3"
				>

					<h6>Experiencia laboral</h6>
					<div class="flex flex-col gap-2" v-for="e in seeker.experience">
						<item
							icon="ri:briefcase-4-fill"
							:label="e.company"
							:label_bold="e.title"
							:small="`
							${e.start_date && new Date(e.start_date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
							${(e.start_date && e.end_date) && ' - '}
							${e.end_date && new Date(e.end_date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`"
							:description="e.description"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-col w-full gap-4">
				<div
					v-if="seeker.seeker_skill && seeker.seeker_skill.length > 0"
					class="flex flex-col gap-3"
				>
					<h6>Habilidades</h6>
					<item
						v-for="e in seeker.seeker_skill"
						:icon="(e.level) ? skill_level_icon[e.level as keyof typeof skill_level_icon] : 'ri:checkbox-blank-circle-line' "
						:label="e.level ? SkillLevelEnum[e.level as keyof typeof SkillLevelEnum] : ' '"
						:label_bold="e.skill?.name"
					/>
				</div>
				<div
					v-if="seeker.seeker_social && seeker.seeker_social.length > 0"
					class="flex flex-col gap-3"
				>
					<h6>Redes sociales</h6>
					<NuxtLink
						v-for="e in seeker.seeker_social"
						:to="e.social.prefix + e.identifier"
						target="_blank"
					>
						<item
							:icon="e.social.icon"
							:label="`${e.name} - ${e.social.name}`"
							one_line
						/>
					</NuxtLink>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import {seekerGetOneByUser} from "~/queries";
import type {seekerInterface} from "~/interfaces";
import {SkillLevelEnum} from "~/enums";

const seeker: Ref<seekerInterface> = ref({} as seekerInterface)

interface Props {
	can_edit: boolean;
}

withDefaults(defineProps<Props>(), {
	can_edit: false,
})

const {data} = await useAsyncQuery<{ seekerFindByUser: seekerInterface }>(seekerGetOneByUser)
seeker.value = data.value?.seekerFindByUser!

const skill_level_icon = {
	'BASIC': 'ri:progress-2-line',
	'INTERMEDIATE': 'ri:progress-5-line',
	'ADVANCED': 'ri:progress-8-line',
}
</script>

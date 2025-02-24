<template>
	<UModal v-model="is_open" fullscreen>
		<div class="flex flex-row w-full fixed top-0 justify-end p-2">
			<UButton variant="ghost" icon="ri:close-large-line" @click="is_open = false"/>
		</div>

		<div class="flex flex-col gap-4 p-4 overflow-y-auto">

			<div class="flex flex-col tablet:flex-row gap-4 items-center">
				<img
					:src="interaction.seeker.user.image || '/images/empleame_user_silhouette.png'"
					alt=""
					class="rounded-full w-32 h-fit border"
				/>

				<div class="flex flex-col gap-2">
					<span>{{
							get_gender(interaction.seeker.user.contact.gender) && `${get_gender(interaction.seeker.user.contact.gender)} |`
						}} {{ `${get_age(new Date(interaction.seeker.user.contact.date_of_birth))} años` }}
					</span>
					<span class="font-bold text-4xl">{{
							interaction.seeker.user.contact.first_name
						}} {{ interaction.seeker.user.contact.last_name }}</span>

					<div class="content-center flex flex-row gap-1" v-if="interaction.seeker.show_email">
						<Icon name="ri:mail-line" size="16" class="text-violet-500"/>
						<b class="inline-flex">Correo electrónico: </b>
						<span class="inline-flex">{{ interaction.seeker.user.email }}</span>
					</div>
					<div class="content-center flex flex-row gap-1">
						<Icon name="ri:cellphone-line" size="16" class="text-violet-500"/>
						<b class="inline-flex">Número telefónico: </b>
						<span class="inline-flex">{{ interaction.seeker.user.contact.phone }}</span>
					</div>
					<div class="content-center flex flex-row gap-1">
						<Icon name="ri:time-line" size="16" class="text-violet-500"/>
						<b class="inline-flex">Activo desde: </b>
						<span class="inline-flex">{{ get_date(new Date(interaction.seeker.user.contact.created_at)) }}</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<hr>
				<div class="grid grid-cols-1 tablet:grid-cols-2 w-full gap-4">
					<item
						v-if="interaction.seeker.location"
						icon="ri:map-pin-2-fill"
						:label="`${interaction.seeker.location?.province} - ${interaction.seeker.location?.municipality} - ${interaction.seeker.location?.department}`"
						label_bold="Lugar actual"
						class="tablet:col-span-2"
					/>

					<div
						v-if="interaction.seeker.education && interaction.seeker.education.length > 0"
						class="flex flex-col gap-3"
					>
						<h6>Educación</h6>
						<item
							v-for="e in interaction.seeker.education"
							icon="ri:school-fill"
							:label="e.title"
							:small="set_education_years(e)"
							:label_bold="e.institute.name"
						/>
					</div>

					<div
						v-if="interaction.seeker.experience && interaction.seeker.experience.length > 0"
						class="flex flex-col gap-3"
					>

						<h6>Experiencia laboral</h6>
						<div class="flex flex-col gap-2" v-for="e in interaction.seeker.experience">
							<item
								icon="ri:briefcase-4-fill"
								:label="e.company"
								:label_bold="e.title"
								:small="get_date_mmyy({start_date: e.start_date, end_date: e.end_date})"
								:description="e.description"
							/>
						</div>
					</div>

					<div
						v-if="interaction.seeker.seeker_skill && interaction.seeker.seeker_skill.length > 0"
						class="flex flex-col gap-3"
					>
						<h6>Habilidades</h6>
						<item
							v-for="e in interaction.seeker.seeker_skill"
							:icon="(e.level) ? skill_level_icon[e.level as keyof typeof skill_level_icon] : 'ri:checkbox-blank-circle-line' "
							:label="e.level ? SkillLevelEnum[e.level as keyof typeof SkillLevelEnum] : ' '"
							:label_bold="e.skill?.name"
						/>
					</div>
					<div
						v-if="interaction.seeker.seeker_social && interaction.seeker.seeker_social.length > 0"
						class="flex flex-col gap-3"
					>
						<h6>Redes sociales</h6>
						<NuxtLink
							v-for="e in interaction.seeker.seeker_social"
							:to="e.social?.prefix + e.identifier"
							target="_blank"
						>
							<item
								:icon="e.social?.icon!"
								:label="`${e.name} - ${e.social?.name}`"
								one_line
							/>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import type {interactionInterface} from "~/interfaces";
import {GenderEnum, SkillLevelEnum} from "~/enums";
import {get_age, get_date, get_date_mmyy, get_gender, set_education_years} from "../../helpers";

defineProps<{ interaction: interactionInterface }>()
const is_open = defineModel<boolean>("is_open", {
	type: Boolean,
	required: false,
	default: false,
});

const skill_level_icon = {
	'BASIC': 'ri:progress-2-line',
	'INTERMEDIATE': 'ri:progress-5-line',
	'ADVANCED': 'ri:progress-8-line',
}
</script>
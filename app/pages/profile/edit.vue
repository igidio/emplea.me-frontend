<template>
	<div class="flex flex-col gap-4">

		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Ver perfil',
      to: '/profile'
		},{
			label: 'Editar perfil de aplicante',
      to: '/profile/edit'
		}]"/>
		<UCard>
			<template #header>Editar perfil de aplicante</template>
			<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">

				<div class="flex flex-col w-full gap-4 col-span-2">
					<ProfileItemLocation
						:location="seeker.location"
						:reload="reload"
					/>
				</div>

				<div class="flex flex-col w-full gap-4">
					<h6>Redes sociales</h6>
					<div class="flex flex-col gap-4 h-full justify-between">
						<div class="flex flex-col gap-4" v-if="seeker.seeker_social && seeker.seeker_social.length > 0">
							<ProfileItemSocial
								v-for="e in seeker.seeker_social"
								:props="{
								id: e.id!,
								name: e.name,
								identifier: e.identifier,
								social: {
									name: e.social!.name,
									icon: e.social!.icon,
									prefix: e.social!.prefix,
									id: e.social!.id
								}
							}"
								:social="social"
								:reload="reload"
								:key="'social'+e.id"
							/>
						</div>
						<ProfileAddSocial
							:data_exists="!!(seeker.seeker_social && seeker.seeker_social.length > 0)"
							:social="social!"
							:reload="reload"
						/>
					</div>
				</div>

				<div class="flex flex-col w-full gap-4">
					<h6>Habilidades</h6>
					<div class="flex flex-col gap-4 h-full justify-between">
						<div class="flex flex-col gap-4" v-if="seeker.seeker_skill && seeker.seeker_skill.length > 0">
							<ProfileItemSkill
								v-for="e in seeker.seeker_skill"
								:props="{
								id: e.id!,
								skill: e.skill!,
								level: e.level,
								icon: e.level,
								reload: reload
							}"
								:key="'skill'+e.id"
							/>
						</div>
						<ProfileAddSkill
							:data_exists="!!(seeker.seeker_skill && seeker.seeker_skill.length > 0)"
							:reload="reload"
						/>

					</div>
				</div>

				<div class="flex flex-col w-full gap-4">
					<h6>Educación</h6>
					<div class="flex flex-col gap-4 h-full justify-between">
						<div class="flex flex-col gap-4" v-if="seeker.education && seeker.education.length > 0">
							<ProfileItemEducation
								v-for="e in seeker.education"
								:props="{
								id: e.id!,
								title: e.title,
								institute: e.institute,
								degree: e.degree,
								starting_year: e.starting_year,
								completion_year: e.completion_year,
								subtitle: e.subtitle
							}"
								:reload="reload"
								:key="'education'+e.id"
							/>
						</div>
						<ProfileAddEducation
							:data_exists="(seeker.education && seeker.education.length > 0)!"
							:reload="reload"
						/>
					</div>
				</div>

				<div class="flex flex-col w-full gap-4">
					<h6>Experiencia laboral</h6>
					<div class="flex flex-col gap-4 h-full justify-between">
						<div class="flex flex-col gap-4" v-if="seeker.experience && seeker.experience.length > 0">
							<ItemExperience
								v-for="e in seeker.experience"
								:props="{
								id: e.id!,
								company: e.company,
								title: e.title,
								start_date: e.start_date,
								end_date: e.end_date,
								description: e.description
						}"
								:reload="reload"
								:key="'experience'+e.id"
							/>
						</div>
						<ProfileAddExperience
							:data_exists="!!(seeker.experience && seeker.experience.length > 0)"
							:reload="reload"
						/>
					</div>
				</div>

			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import type {seekerInterface, socialInterface} from "~/interfaces";
import {seekerGetOneByUser, socialFindAll} from "~/queries";
import ItemExperience from "~/components/Profile/ItemExperience.vue";

definePageMeta({
	middleware: 'role',
	roles: ['SEEKER']
})

useHead({
	title: 'Editar perfil de aplicante'
})

const seeker: Ref<seekerInterface> = ref({} as seekerInterface)
const social: Ref<socialInterface[] | undefined> = ref([])

const {data} = await useAsyncQuery<{ seekerFindByUser: seekerInterface }>(seekerGetOneByUser)
seeker.value = data.value?.seekerFindByUser!

const {result, refetch} = useQuery<{ seekerFindByUser: seekerInterface }>(seekerGetOneByUser, {}, {prefetch: false})

const reload = async () => {
	await refetch()
	seeker.value = result.value?.seekerFindByUser!
}

const social_data = await useAsyncQuery<{ socialFindAll: socialInterface[] }>(socialFindAll)
social.value = social_data.data.value?.socialFindAll
</script>
<template>
	<GoToPrevious></GoToPrevious>

	<div class="flex flex-row gap-4">

		<UCard class="desktop:w-[75%]">
			<span class="inline-flex gap-2">

				<UBadge
					v-if="job.category?.icon"
					icon="i-heroicons-rocket-launch"
					variant="soft"
				><UIcon :name="job.category.icon" class="mr-1"/>{{ job.category?.name }}</UBadge>

			</span>
			<h3 class="mb-2">{{ job.title }}</h3>

			<div class="flex flex-col gap-2 desktop:flex-row">
				<div class="flex flex-col desktop:w-[30%] gap-2">

					<div class="flex flex-row gap-2" v-for="e in job.info">
						<div
							class="bg-violet-600 aspect-[1/1] w-8 h-8 flex items-center justify-center p-[3px] rounded-small"
						>
							<UIcon :name="e.icon" class="bg-white z-0" size="14"/>
						</div>
						<div class="flex flex-col">
							<span class="font-semibold text-sm">{{ e.label }}</span>
							<span class="text-sm">{{ e.value }}</span>
						</div>
					</div>

				</div>
				<hr class="desktop:hidden"/>
				<div class="flex flex-col desktop:w-[70%] gap-2">
					<item :label="job.modified_at?.toString()" icon="ri:calendar-line"/>
					<p class="text-justify">{{ job.description }}</p>
					<hr class="desktop:hidden"/>
					<h6>Habilidades necesarias</h6>
					<div class="grid tablet:grid-cols-2 gap-3">
						<item
							:icon="skillLevelIcon[skill.level]"
							v-for="skill in job.skills"
							:label="skill.level"
							:label-bold="skill.name"
						/>
					</div>
				</div>
			</div>
		</UCard>

		<div class="flex flex-col desktop:w-[25%] gap-4">
			<EmployerInfo
				:profile_image="employer.profile_image!"
				:name="employer.name!"
				:id="employer.id!"
			/>

			<UCard>
				<span class="font-bold">Información de la empresa</span>


				<div class="flex flex-col relative overflow-hidden gap-2">
					<UButton
						class="z-[2] absolute center-absolute"
						@click="show_info()"
						v-if="is_hidden"
					>
						Me interesa
					</UButton>

					<!-- <div
						class="absolute z-[2] rounded-medium p-2 bg-white text-center center-absolute shadow-md"
					>
						Para ver la información debes
						<NuxtLink to="login" class="hyper">Iniciar sesión</NuxtLink>
					</div> -->

					<div
						class="absolute z-[1] backdrop-blur-sm h-full w-full bg-white/30"
						v-if="is_hidden"
					/>

					<div class="flex flex-col desktop:flex-col tablet:flex-row gap-2">
						<div class="flex flex-col grow">
							<span class="font-semibold mb-2">Contacto telefónico</span>
							<div class="flex flex-col gap-2">

								<itemLink
									:icon="phone.icon"
									:label="phone.label.toString()"
									:link="phone.link"
									v-for="phone in phones"
								/>
							</div>
						</div>
						<div class="flex flex-col grow">
							<span class="font-semibold mb-2">Redes sociales</span>
							<div class="flex flex-col gap-2" v-if="employer.social_media.length > 0">
								<itemLink
									:icon="social.icon"
									:label="social.label"
									:link="social.link"
									v-for="social in social_media"
								/>
							</div>
						</div>
					</div>
				</div>
			</UCard>
		</div>
	</div>

</template>

<script setup lang="ts">
import socialMediaData from "~/data/social_media.data";
import {SkillLevelEnum} from "~/enums/skill_level.enum";
import {postFindOne} from "~/queries";
import type {PostInterface} from "~/interfaces";
import {ModalityEnum, SalaryEnum} from "~/enums";
const route = useRoute();
const is_hidden = ref(true);

const userStore = useUserStore()
const { user_role } = userStore
const { is_open_modal_login } = storeToRefs(userStore);

const {data} = await useAsyncQuery<{ post: PostInterface }>(postFindOne, {"postId": route.params.id});
const post = data.value?.post

console.log(user_role)

const job = reactive({
	title: post?.name,
	category: post?.category,
	location: `${post?.location.department}, ${post?.location.municipality}, ${post?.location.province}`,
	modality: ModalityEnum[post?.modality as keyof typeof ModalityEnum],
	modified_at: post?.modified_at,
	salary: post?.salary,
	salary_type: SalaryEnum[post?.salary_type as keyof typeof SalaryEnum],
	description: post?.description,
	info: [
		{
			label: "Lugar",
			icon: "ri:map-pin-2-line",
			value: `${post?.location.department}, ${post?.location.municipality}, ${post?.location.province}`,
		},
		{
			label: "Modalidad",
			icon: "ri:time-line",
			value: ModalityEnum[post?.modality as keyof typeof ModalityEnum],
		},
		{
			label: "Salario",
			icon: "ri:copper-coin-line",
			value: (post?.salary !== null ? `${post?.salary} Bs. -` : '') + `${SalaryEnum[post?.salary_type as keyof typeof SalaryEnum]}`,
		},
		{
			label: "Fecha de publicación",
			icon: "ri:calendar-line",
			value: post?.modified_at,
		}
	],
	skills: [
		{
			name: "Habilidad 1",
			level: SkillLevelEnum.ADVANCED,
		},
		{
			name: "Habilidad 2",
			level: SkillLevelEnum.INTERMEDIATE,
		},
		{
			name: "Habilidad 3",
			level: SkillLevelEnum.BASIC,
		},
	],
});

const employer = reactive({
	name: post?.employer.name,
	id: post?.employer.id,
	profile_image: post?.employer.profile_image,
	website: "employer-website",
	phones: [
		{number: 76543210, has_whatsapp: true},
		{
			number: 76543211,
			has_whatsapp: false,
		},
		{
			number: 76543212,
			has_whatsapp: true,
		},
		{number: 76543213, has_whatsapp: false},
	],
	social_media: [
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 1,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 2,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 3,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 4,
		},
	],
});

const social_media = computed(() =>
	employer.social_media.map((e: any) => ({
		label: socialMediaData[e.social_media]!.type,
		icon: socialMediaData[e.social_media]!.icon,
		link: `${socialMediaData[e.social_media]!.prefixUrl}${e.profile_name}`,
	}))
);

const phones = computed(() =>
	employer.phones.map((e: any) => {
		let object: any = {
			label: e.number,
			icon: e.has_whatsapp ? "ri:whatsapp-line" : "ri:phone-line",
		};

		if (e.has_whatsapp) object.link = `https://wa.me/591${e.number}`;
		return object;
	})
);

const skillLevelIcon = {
	[SkillLevelEnum.BASIC]: "ri:progress-3-line",
	[SkillLevelEnum.INTERMEDIATE]: "ri:progress-4-line",
	[SkillLevelEnum.ADVANCED]: "ri:progress-8-line",
};
//
// console.log(useRoute().params.id)
// console.log(typeof  useRoute().params.id)
// // GET DATA

const show_info = () => {
	if ( user_role === undefined ) is_open_modal_login.value = true;
};
</script>

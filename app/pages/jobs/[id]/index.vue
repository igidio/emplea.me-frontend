<template>
	<div class="flex flex-col gap-4">

		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: post?.employer.name!,
      to: `/employer/${post?.employer.id}`
		}, {
			label: job.title!,
      to: `/jobs/${job.id}`
		}]"/>

		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="w-full desktop:w-[75%] gap-4 flex flex-col">
				<UCard>
					<div class="flex flex-row justify-between">
						<div class="flex flex-col gap-2">
						<span class="inline-flex gap-2">

				<UBadge
					v-if="job.category?.icon"
					icon="i-heroicons-rocket-launch"
					variant="soft"
				><UIcon :name="job.category.icon" class="mr-1"/>{{ job.category?.name }}</UBadge>
				<UBadge
					:color="job.is_available ? 'green' : 'red'"
					variant="soft"
				>{{ job.is_available ? 'Disponible' : 'No disponible' }}</UBadge>

			</span>
							<h4 class="mb-2">{{ job.title }}</h4>
						</div>
						<div class="w-24 flex flex-col gap-1" v-if="info?.can_modify">
							<NuxtLink :to="`/jobs/${job.id}/edit`">
								<UButton label="Editar" size="sm" class="w-full"/>
							</NuxtLink>
							<UButton color="gold" label="⭐ Destacar" size="sm" v-if="is_premium"/>
							<UButton color="black" label="Deshabilitar" size="sm"/>
						</div>
					</div>

					<div class="flex flex-col gap-2 desktop:flex-row">
						<div class="flex flex-col desktop:w-[30%] gap-2">
							<div class="flex flex-row gap-2" v-for="e in additional_info">
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
							<item :label="'Última modificación: ' + es_date(job.modified_at!)" icon="ri:calendar-line"/>
							<p class="text-justify">{{ job.description }}</p>
							<hr class="desktop:hidden"/>
							<div class="flex flex-col gap-2">
								<div class="flex flex-row justify-between">
									<h6>Habilidades necesarias</h6>
									<UButton label="Editar" size="sm" v-if="info?.can_modify"/>
								</div>
								<div class="grid tablet:grid-cols-2 gap-3" v-if="job.skills && job.skills.length > 0">

									<div
										class="flex flex-row gap-2"
										v-for="skill in job.skills"
									>
										<div
											class="bg-violet-600 aspect-[1/1] w-8 h-8 flex items-center justify-center p-[3px] rounded-small"
										>
											<UIcon
												:name="skillLevelIcon[skill.level as unknown as keyof typeof SkillLevelEnum]"
												class="bg-white z-0" size="14"
											/>
										</div>
										<div class="flex flex-col">
											<span class="text-md">{{ skill.skill?.name }}</span>
											<span class="text-sm">
											{{ SkillLevelEnum[skill.level as unknown as keyof typeof SkillLevelEnum] }}
										</span>

										</div>
									</div>
								</div>
								<div class="w-full text-center py-2" v-else>No hay habilidades específicadas.</div>
							</div>
						</div>
					</div>
				</UCard>

				<!-- TODO: Crear tabla interacciones e introducir cada una de ellas-->
				<UCard v-if="is_premium">
					<template #header>⭐ Interacciones</template>
					<div class="grid grid-cols-3 gap-2">
						<div class="flex flex-rows gap-2" v-for="i in 7">
							<img :src="computed_image" alt="" class="rounded-full h-12"/>
							<div class="flex flex-col">
								<span class="font-semibold">Nombre completo</span>
								<span class="text-sm">@username</span>
							</div>
						</div>
					</div>
				</UCard>
				<Add class="w-full h-24" v-else></Add>
			</div>

			<div class="flex flex-col w-full desktop:w-[25%] gap-4">
				<UButton color="black" label="Administrar" v-if="['ADMIN', 'SUPERUSER'].includes(user_role)" @click="useRouter().push({ path: '/admin/posts', query: { q: job.title! } })"/>
				<div class="flex flex-col gap-2" v-if="info?.can_modify">
					<UButton color="black" label="Llenar vacante" v-if="job.is_available"/>
					<UButton color="black" label="Volver a marcar como disponible" v-else/>
					<div
						class="bg-yellow-400 rounded-medium p-2 flex flex-row gap-2 border border-slate-200"
						v-if="is_premium"
					>
						<IconFill name="ri:star-fill" class="h-6"></IconFill>
						<p>Ten en cuenta que puedes destacar # publicaciones.</p>
					</div>
				</div>

				<EmployerInfo
					:profile_image="post?.employer.profile_image!"
					:name="post?.employer.name!"
					:id="post?.id!.toString()!"
				/>

				<EmployerContactInfo
					:phone="data?.post.post.employer.phone"
					:social_media="data?.post.post.employer.employer_social"
					:info="data?.post.info"
					:is_hidden="is_hidden"
				/>

			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import {SkillLevelEnum} from "~/enums/skill_level.enum";
import {postFindOne} from "~/queries";
import type {PostInterface} from "~/interfaces";
import {ModalityEnum, SalaryEnum} from "~/enums";
import {es_date} from "~/helpers/es_date";
import router from "#app/plugins/router";
import {definePageMeta} from "#imports";

useHead({
	title: "Empleo",
})

definePageMeta({
	keepalive: {
		max: 0
	},
})

const route = useRoute();
const is_hidden = ref(true);

const userStore = useUserStore()
const {is_premium, user_role} = storeToRefs(userStore);

const {data, refresh, execute} = await useAsyncQuery<
	{
		post: {
			post: PostInterface,
			info: {
				type: "GUEST" | "SUPER" | "EMPLOYER" | "ATTENDANT" | "SEEKER";
				can_modify: boolean;
				show_employer: boolean;
			}
		}
	}
>(postFindOne(true), {
	"id": Number(route.params.id),
	watch: [route.query]
})

const post = data.value?.post.post
const info = data.value?.post.info

if (info?.show_employer) is_hidden.value = false;

const job = reactive({
	id: post?.id,
	title: post?.name,
	category: post?.category,
	location: `${post?.location.department}, ${post?.location.municipality}, ${post?.location.province}`,
	modality: ModalityEnum[post?.modality as keyof typeof ModalityEnum],
	modified_at: post?.modified_at,
	salary: post?.salary,
	salary_type: SalaryEnum[post?.salary_type as keyof typeof SalaryEnum],
	description: post?.description,
	is_available: post?.available,
	skills: post?.post_skill
});

const skillLevelIcon = {
	'BASIC': "ri:progress-3-line",
	'INTERMEDIATE': "ri:progress-4-line",
	'ADVANCED': "ri:progress-8-line",
};

const computed_image = computed(() =>
	"/images/empleame_user_silhouette.png"
);

const additional_info = computed(() => {
	return [
		{
			icon: "ri:map-pin-line",
			label: "Locación",
			value: job.location
		},
		{
			icon: "ri:money-dollar-circle-line",
			label: "Salario",
			value: `${job.salary} ${job.salary_type}`
		},
		{
			icon: "ri:timeline-view",
			label: "Modalidad",
			value: `${job.modality}`
		},

	];
})

</script>

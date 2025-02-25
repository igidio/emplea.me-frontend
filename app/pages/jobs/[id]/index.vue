<template>
	<ModalConfirmation
		:props="modal_data"
		v-model:is_open="is_open_modal_confirmation"
	/>

	<JobModalInteraction
		:interaction="selected_interaction"
		v-if="selected_interaction"
		v-model:is_open="is_open_modal_interaction"
	/>

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
							<div class="inline-flex gap-2 flex-wrap">
								<UBadge
									variant="soft"
									color="gray"
									v-if="job.featured"
								>
									⭐ Destacado
								</UBadge>
								<UBadge
									v-if="job.category?.icon"
									icon="i-heroicons-rocket-launch"
									variant="soft"
								>
									<UIcon :name="job.category.icon" class="mr-1"/>
									{{ job.category?.name }}
								</UBadge>
								<UBadge
									:color="computed_status.color as BadgeColor"
									variant="soft"
								>{{ computed_status.label }}
								</UBadge>
							</div>

							<h4 class="mb-2">{{ job.title }}</h4>
						</div>
						<div class="w-24 flex flex-col gap-1" v-if="info?.can_modify">
							<UButton
								color="gold"
								:label="!job.featured ? 'Destacar' : 'Dejar de destacar'"
								size="sm"
								v-if="is_premium"
								@click="set_featured_to_modal_data"
							/>
							<NuxtLink :to="`/jobs/${job.id}/edit`">
								<UButton label="Editar" size="sm" class="w-full"/>
							</NuxtLink>
							<UButton color="black" :label="!job.is_active ? 'Habilitar' : 'Deshabilitar'" size="sm"
							         @click="set_toggle_to_modal_data"/>
						</div>
					</div>

					<div class="flex flex-col gap-2 desktop:flex-row">
						<div class="flex flex-col desktop:w-[30%] gap-2">
							<div class="flex flex-row gap-2" v-for="e in additional_info">
								<div
									class="bg-slate-100 aspect-[1/1] w-8 h-8 flex items-center justify-center p-[3px] rounded-small"
								>
									<UIcon :name="e.icon" class="bg-violet-500 z-0" size="14"/>
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
											class="bg-slate-100 aspect-[1/1] w-8 h-8 flex items-center justify-center p-[3px] rounded-small"
										>
											<UIcon
												:name="skillLevelIcon[skill.level as unknown as keyof typeof SkillLevelEnum]"
												class="bg-violet-500 z-0" size="14"
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
								<div class="w-full text-center py-2 italic" v-else>No hay habilidades específicadas.</div>
							</div>
						</div>
					</div>
				</UCard>
				<UCard v-if="
				['SUPER', 'EMPLOYER', 'ATTENDANT'].includes(info?.type!) && !(!info?.show_employer && info?.type == 'EMPLOYER')">
					<template #header>
						<div class="flex flex-row justify-between">
							Interacciones
							<UButton
								icon="ri:history-fill"
								color="white"
								@click="reload_interactions"
								v-if="is_premium"
							/>
						</div>
					</template>
					<div class="flex flex-col items-center center-text" v-if="interactions === undefined">
						<UButton
							label="⭐ Cargar interacciones"
							@click="(is_premium || ['ADMIN', 'SUPERUSER'].includes((user_role))) ? load_interactions() : is_open_modal_premium = true"
							:loading="loading"
						/>
						<span class="error" v-if="error">{{ error.message }}</span>
					</div>
					<div v-if="interactions" class="flex flex-col">
						<UIcon
							name="ri:loader-4-line"
							size="24"
							class="animate-spin self-center"
							v-if="loading"
						/>
						<div v-if=" interactions.length === 0">
							<span class="italic">No se ha registrado ninguna interacción todavía.</span>
						</div>
						<div class="grid grid-cols-3 gap-2" v-else>
							<button
								class="flex flex-rows gap-2 hover:bg-violet-100 p-2 rounded-medium transition-colors items-center"
								v-for="interaction in interactions"
								@click="select_interaction(interaction)"
							>
								<img :src="interaction.seeker.user.image || '/images/empleame_user_silhouette.png'" alt=""
								     class="rounded-full h-12"/>
								<div class="flex flex-col text-left text-nowrap truncate overflow-hidden">
									<span class="font-semibold">{{
											interaction.seeker.user.contact.first_name
										}} {{ interaction.seeker.user.contact.last_name }}</span>
									<span class="text-sm" v-if="interaction.confirm">
										<Icon name="ri:thumb-up-line" size="8"/>
										Le interesa</span>
								</div>
							</button>
						</div>
					</div>
				</UCard>
				<Add class="w-full h-24" v-if="!is_premium"></Add>
			</div>

			<div class="flex flex-col w-full desktop:w-[25%] gap-4">
				<UButton color="black" label="Administrar" v-if="['ADMIN', 'SUPERUSER'].includes(user_role)"
				         @click="useRouter().push({ path: '/admin/posts', query: { q: job.title! } })"/>
				<div class="flex flex-col gap-2" v-if="info?.can_modify">
					<UButton
						color="black"
						:label="job.is_available ? 'Llenar vacante' : `Volver a marcar como disponible`"
						@click="set_disable_to_modal_data"
					/>
				</div>

				<EmployerInfo
					:profile_image="post?.employer.profile_image!"
					:name="post?.employer.name!"
					:id="post?.employer.id.toString()!"
				/>

				<EmployerContactInfo
					:phone="data?.post.post.employer.phone"
					:social_media="data?.post.post.employer.employer_social"
					:info="data?.post.info"
					:is_hidden="is_hidden"
					:is_available="!!job.is_available"
				/>

			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import {SkillLevelEnum} from "~/enums/skill_level.enum";
import {
	gqlFeatured,
	gqlPost,
	postActivateOrDeactivate,
	postFindOne,
	postToggleAvailability
} from "~/queries";
import type {FeaturedInterface, interactionInterface, PostInterface} from "~/interfaces";
import {ModalityEnum, SalaryEnum} from "~/enums";
import {es_date} from "~/helpers/es_date";
import {definePageMeta} from "#imports";
import type {BadgeColor} from "#ui/types";

definePageMeta({
	keepalive: false
})

const route = useRoute();
const router = useRouter();
const is_hidden = ref(true);

const userStore = useUserStore()
const {is_premium, user_role, is_open_modal_premium} = storeToRefs(userStore);

const {data} = await useAsyncQuery<
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

useHead({
	title: data.value?.post.post.name,
	meta: !!data.value?.post.post.featured ? [{ name: 'description', content: data.value?.post.post.description },
		{ name: 'robots', content: 'index, follow' },
		{ property: 'og:title', content: data.value?.post.post.name },
		{ property: 'og:description', content: data.value?.post.post.description },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: `https://www.emplea.me/jobs/${data.value.post.post.id}` },
		{ property: 'og:image', content: `https://www.emplea.me/${data.value.post.post.employer.profile_image}` }] : undefined
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
	skills: post?.post_skill,
	is_active: post?.is_active,
	has_disabled: post?.has_disabled,
	featured: post?.featured,
});

const skillLevelIcon = {
	'BASIC': "ri:progress-3-line",
	'INTERMEDIATE': "ri:progress-4-line",
	'ADVANCED': "ri:progress-8-line",
};

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

const is_open_modal_interaction = ref(false)
const selected_interaction = ref<interactionInterface | undefined>(undefined)
const interactions = ref<interactionInterface[] | undefined>(undefined)
const {refetch, result, load, loading, error} = useLazyQuery<{
	interactionLoadByPost: interactionInterface[]
}>(gqlPost.load_interactions, {
	idPost: +route.params.id!,
	prefetch: false
})

const load_interactions = async () => {
	await load()
	if (result.value?.interactionLoadByPost) interactions.value = result.value?.interactionLoadByPost
}

const reload_interactions = async () => {
	await refetch({idPost: +route.params.id!})
	if (result.value?.interactionLoadByPost) interactions.value = result.value?.interactionLoadByPost
}

const select_interaction = (interaction: interactionInterface) => {
	console.log(interaction)
	selected_interaction.value = interaction
	is_open_modal_interaction.value = true
}

onMounted(async () => {
	if (post?.has_disabled && !['ADMIN', 'SUPERUSER'].includes(userStore.user_role)) {
		if (import.meta.client) useToast().add({title: 'Este empleo ha sido deshabilitado por el administrador, si cree que fue un error contáctese con soporte.'})
		await router.push(`/employer/${post?.employer.id}`)
	}
})

const computed_status = computed(() => {
	return (job.is_available && job.is_active) ? {color: 'green', label: 'Disponible'} :
		(!job.is_available && job.is_active) ? {color: 'orange', label: 'Ocupado'} :
			(job.is_available && !job.is_active && job.has_disabled) ? {
					color: 'red',
					label: 'Deshabilitado por el administrador'
				} :
				{color: 'red', label: 'Deshabilitado'};
})

const modal_data = ref({
	loading: false,
	submit: async () => {
	},
	body: '',
	header: undefined as string | undefined
})
const is_open_modal_confirmation = ref(false)
const {
	mutate: mutate_toggle_availability,
	loading: loading_toggle_availability,
	error: error_toggle_availability
} = useMutation<{ postToggleAvailability: string }>(postToggleAvailability)
const set_disable_to_modal_data = () => {
	is_open_modal_confirmation.value = true
	console.log(is_open_modal_confirmation.value)
	modal_data.value = {
		header: `${job.is_available ? 'Llenar vacante' : 'Volver a marcar como disponible'}`,
		body: `¿Estás seguro de que deseas ${job.is_available ? 'llenar' : 'liberar'} esta vacante?`,
		loading: loading_toggle_availability.value,
		submit: async () => {
			await mutate_toggle_availability({
				"postToggleAvailabilityId": Number(route.params.id)
			}).then(async (e) => {
				useToast().add({title: e?.data?.postToggleAvailability})
				is_open_modal_confirmation.value = false
				job.is_available = !job.is_available
			}).catch((e) => {
				alert(e.message)
			});
		}
	}
	console.log(modal_data)
}


const {
	mutate: mutate_activate_or_deactivate,
	loading: loading_activate_or_deactivate,
	error: error_activate_or_deactivate
} = useMutation<{ "postActivateOrDeactivate": string }>(postActivateOrDeactivate)
const set_toggle_to_modal_data = () => {
	is_open_modal_confirmation.value = true
	modal_data.value = {
		header: `${!job.is_active ? 'Volver a activar' : 'Deshabilitar'} empleo`,
		body: `¿Estás seguro de que deseas ${!job.is_active ? 'volver a activar' : 'deshabilitar'} este empleo?`,
		loading: loading_toggle_availability.value,
		submit: async () => {
			await mutate_activate_or_deactivate({
				"postActivateOrDeactivateId": Number(route.params.id),
				"messageOptInput": {
					"message": null
				}
			}).then(async (e) => {
				useToast().add({title: e?.data?.postActivateOrDeactivate})
				is_open_modal_confirmation.value = false
				job.is_active = !job.is_active
			}).catch((e) => {
				alert(e.message)
			});
		}
	}
}

const {
	mutate: mutate_create_feature,
	loading: loading_create_feature,
} = useMutation<{ featuredCreate: FeaturedInterface }>(gqlFeatured.create)
const {
	mutate: mutate_delete_feature,
	loading: loading_delete_feature,
} = useMutation<{ featuredDelete: string }>(gqlFeatured.delete)
const set_featured_to_modal_data = () => {
	is_open_modal_confirmation.value = true
	modal_data.value = {
		header: `${job.featured ? 'Dejar de destacar' : 'Destacar'} publicación`,
		body: `¿Estás seguro de que deseas ${job.featured ? 'dejar de destacar' : 'destacar'} esta publicación?`,
		loading: loading_create_feature.value,
		submit: async () => {
			if (!job.featured) {
				await mutate_create_feature({
					"idPost": +route.params.id!
				}).then(async (e) => {
					useToast().add({title: `Publicación destacada'}`})
					is_open_modal_confirmation.value = false
					job.featured = e?.data?.featuredCreate
				}).catch((e) => {
					alert(e.message)
				});
			} else {
				await mutate_delete_feature({
					"idPost": +route.params.id!
				}).then(async (e) => {
					useToast().add({title: `Publicación dejada de destacar'`})
					is_open_modal_confirmation.value = false
					job.featured = undefined
				}).catch((e) => {
					alert(e.message)
				});
			}
		}
	}
}



</script>

<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
				<EmployerPresentation :data="{
					profile_image: data.employer.profile_image,
					name: data.employer.name,
					establishment_date: data.employer.establishment_date,
					email: data.employer.email,
					description: data.employer.description,
					can_modify: can_modify,
					id: data.employer.id
				}"/>
				<EmployerPosts
					:employer-info="{ image: data.employer.profile_image, name: data.employer.name, id: data.employer.id }"
					:posts="data.employer.post!"
					:employer-user="data.employerUser"
				/>
			</div>

			<div class="w-[20%] flex flex-col gap-4">


				<div v-if="can_modify" class="flex flex-col gap-4">
					<span class="font-semibold">Menú de administrador</span>
					<div class="flex flex-col gap-2">
						<UButton class="w-full">Administrar encargados</UButton>
						<UButton class="w-full">Editar información del negocio</UButton>
					</div>
					<EmployerRoleInfo :role="data.employerUser.level"/>
				</div>

				<UCard v-if="data.employerUser">
					<template #header>
						<div class="flex flex-row place-content-between">
							<h6>Contacto</h6>
							<UButton size="sm" label="Editar" v-if="data.employerUser.level === 'ADMIN'"/>
						</div>
					</template>
					<div
						class="flex flex-col grow mb-2"
						v-if="data.employer.employer_social && data.employer.employer_social?.length > 0">
					<span class="font-semibold mb-2">Contacto</span>
					<div class="flex flex-col gap-2">
						<itemLink
							v-for="phone in data.employer.phone"
							:icon="phone.has_whatsapp ? 'ri:whatsapp-line' : 'ri:phone-line'"
							:label="phone.phone.toString()"
							:link="phone.has_whatsapp ? 'https://wa.me/591' + phone.phone : undefined"
						/>
					</div>
					</div>

					<div class="flex flex-col grow"
					     v-if="data.employer.employer_social && data.employer.employer_social?.length > 0">
						<span class="font-semibold mb-2">Redes sociales</span>
						<div class="flex flex-col gap-2">
							<itemLink
								:icon="social.social.icon"
								:label="social.name"
								:link="social.social.prefix + social.identifier"
								v-for="social in data.employer.employer_social"
							/>
						</div>
					</div>

				</UCard>

				<EmployerAditional
					:total="data.employer.post!.length"
					:created_at="data.employer.created_at"
				/>
				<Add class="h-64" v-if="!is_premium"/>
			</div>
		</div>
	</div>

	{{data.employerUser}}
</template>

<script setup lang="ts">
import {roleEnum} from "~/enums/role.enum";
import type {EmployerInterface, EmployerSocialInterface, EmployerUserInterface} from "~/interfaces";
import type {PostInterface} from "~/interfaces/server/post.interface";
import socialMediaData from "~/data/social_media.data";

interface Props {
	data: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}

const {is_premium} = useUserStore()

const props = defineProps<Props>()
const {data} = toRefs(props)

const can_modify = ref(data.value.employerUser && data.value.employerUser.level == 'ADMIN')


// const phones = computed(() =>
// 	data.value.employer.phone.map((e: any) => {
// 		let object: any = {
// 			label: e.number,
// 			icon: e.has_whatsapp ? "ri:whatsapp-line" : "ri:phone-line",
// 		};
//
// 		if (e.has_whatsapp) object.link = `https://wa.me/591${e.number}`;
// 		return object;
// 	})
// );
</script>

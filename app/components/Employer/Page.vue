<template>
	<div class="flex flex-col">
		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="flex flex-col gap-4 w-full desktop:w-[80%]">
				<EmployerPresentation :result="{
					profile_image: data.employer.profile_image,
					name: data.employer.name,
					establishment_date: data.employer.establishment_date,
					email: data.employer.email,
					description: data.employer.description,
					can_modify: can_modify,
					id: data.employer.id
				}"/>
				<UAlert
					color="red"
					variant="solid"
					title="Atención"
					v-if="!data.employer.is_verified"
					:description="(user_role == 'EMPLOYER') ? 'Para comenzar a agregar publicaciones, debes tener el negocio verificado, un administrador se encargará de comprobar de que tu negocio sea real, si no es verificado en un plazo máximo de un día le sugerimos que escriba a soporte de EMPLEAMWE (info@empleame.com).' : 'Este negocio no ha sido verificado.'"
				/>
				<EmployerPosts
					:employer-info="{ image: data.employer.profile_image, name: data.employer.name, id: data.employer.id }"
					:posts="data.employer.post!"
					:employer-user="data.employerUser"
					v-if="data.employer.is_verified"
				/>
			</div>

			<div class="w-full desktop:w-[20%] flex flex-col gap-4" v-if="data.employer.is_verified">

				<div v-if="can_modify" class="flex flex-col gap-4">
					<span class="font-semibold">Menú de administrador</span>
					<div class="flex flex-col gap-2">
						<NuxtLink :to="`/employer/${data.employer.id}/attendants`">
							<UButton class="w-full">Administrar asistentes</UButton>
						</NuxtLink>
					</div>
					<EmployerRoleInfo :role="data.employerUser.level"/>
				</div>

				<UCard v-if="data.employerUser">
					<template #header>
						<div class="flex flex-col desktop:flex-row place-content-between items-center">
							<h6>Contacto</h6>

						</div>
					</template>
					<NuxtLink :to="`/employer/${data.employer.id}/contact`">
						<UButton block label="Editar" v-if="data.employerUser.level === 'ADMIN'" class="mb-2"/>
					</NuxtLink>
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

					<span
						class="italic"
						v-if="
						!(data.employer.employer_social && data
						.employer.employer_social?.length > 0 &&
						data.employer.employer_social &&
						data.employer.employer_social?.length > 0)
					">Puedes agregar información pulsando 'Editar'.</span>

				</UCard>

				<EmployerAditional
					:total="data.employer.post!.length"
					:created_at="data.employer.created_at"
				/>
				<Add class="h-64" v-if="!is_premium"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

interface Props {
	data: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}

const {is_premium, user_role} = useUserStore()

const props = defineProps<Props>()
const {data} = toRefs(props)

const can_modify = ref(data.value.employerUser && data.value.employerUser.level == 'ADMIN')
</script>

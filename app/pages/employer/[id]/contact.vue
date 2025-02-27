<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: result?.findOneEmployer.employer.name!,
      to: `/employer/${result?.findOneEmployer.employer.id}`
		}, {
			label: 'Editar contacto de empleador',
      to: `/employer/${result?.findOneEmployer.employer.id}/edit`
		}]"/>
		<UCard>
			<template #header>Editar contacto de empleador</template>
			<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">
				<div class="flex flex-col gap-4">

					<h6>Teléfono/s</h6>
					<EmployerItemPhone
						v-for="e in result?.findOneEmployer.employer.phone"
						:phone="e"
						:reload="reload"
					/>
					<EmployerAddPhone
						:data_exists="!!(result?.findOneEmployer.employer.phone && result?.findOneEmployer.employer.phone.length > 0)"
						:reload="reload"
					/>
				</div>

				<div class="flex flex-col gap-4">
					<h6>Redes sociales</h6>
					<EmployerItemSocial
						v-for="e in result?.findOneEmployer.employer.employer_social"
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
					<EmployerAddSocial
						:data_exists="!!(result?.findOneEmployer.employer.employer_social && result?.findOneEmployer.employer.employer_social.length > 0)"
						:social="social!"
						:reload="reload"
					/>
				</div>
			</div>
		</UCard>
	</div>
</template>
<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface, socialInterface} from "~/interfaces";
import {employerFindOne, socialFindAll} from "~/queries";

const route = useRoute()
const user = useUserStore()

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER', 'ADMIN', 'SUPEURSER'],
	keepalive: false,
})
useHead({
	title: 'Editar contacto de empleador'
})

const {result, refetch} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)})

const reload = async () => {
	await refetch()
}

onMounted(async () => {
	if (!result.value?.findOneEmployer.employerUser) {
		await useRouter().replace(`/employer/${result.value?.findOneEmployer.employer.id}`)
		if (import.meta.client) useToast().add({title: 'No puedes editar esto.'})
	}
})

const social: Ref<socialInterface[] | undefined> = ref([])
const social_data = await useAsyncQuery<{ socialFindAll: socialInterface[] }>(socialFindAll)
social.value = social_data.data.value?.socialFindAll
</script>


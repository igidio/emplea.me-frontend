<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: employer.employer.name!,
      to: `/employer/${employer.employer.id}`
		}, {
			label: 'Editar contacto de empleador',
      to: `/employer/${employer.employer.id}/edit`
		}]"/>
		<UCard>
			<template #header>Editar contacto de empleador</template>
			<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">
				<div class="flex flex-col gap-4">

					<h6>Teléfono/s</h6>
					<EmployerItemPhone
						v-for="e in employer.employer.phone"
						:phone="e"
						:reload="reload"
					/>
					<EmployerAddPhone
						:data_exists="!!(employer.employer.phone && employer.employer.phone.length > 0)"
						:reload="reload"
					/>
				</div>

				<div class="flex flex-col gap-4">
					<h6>Redes sociales</h6>
					<EmployerItemSocial
						v-for="e in employer.employer.employer_social"
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
						:data_exists="!!(employer.employer.employer_social && employer.employer.employer_social.length > 0)"
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
import type {ApolloQueryResult} from "@apollo/client";

const route = useRoute()

definePageMeta({
	middleware: ['role', 'employer'],
	//roles: ['EMPLOYER', 'ADMIN', 'SUPEURSER'],
	roles: ['EMPLOYER'],
	levels: ['ADMIN'],
	keepalive: false,
})
useHead({
	title: 'Editar contacto de empleador'
})

const employer = ref(route.meta.employer_data as { employer: EmployerInterface, employerUser: EmployerUserInterface })
const refetch_employer = route.meta.refetch as () => Promise<{ data: {
		findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
	}}>

const reload = async () => {
	await refetch_employer().then((e) => {
		employer.value = e.data.findOneEmployer
	});
}

const social: Ref<socialInterface[] | undefined> = ref([])
const social_data = await useAsyncQuery<{ socialFindAll: socialInterface[] }>(socialFindAll)
social.value = social_data.data.value?.socialFindAll
</script>


<template>
	<div class="flex flex-col gap-4">
	<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: employer.name,
      to: `/employer/${employer.id}`
		}, {
			label: 'Editar empleador',
      to: `/employer/${employer.id}/edit`
		}]"/>

	<EmployerUpdate
		v-model:state="state"
		:props="{
			id: Number(employer.id),
			loading,
			error,
			update: submit,
			cancel: `/employer/${employer.id}`
		}"
	/>
	</div>
</template>

<script setup lang="ts">
import {employerFindOne, employerUpdate} from "~/queries";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

const route = useRoute()
const postStore = usePostStore();

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})
useHead({
	title: 'Editar empleador'
})

const {data} = await useAsyncQuery<{
	findOneEmployer: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}>(employerFindOne(), {"findOneEmployerId": Number(route.params.id)})
const {employer, employerUser} = data.value?.findOneEmployer!

const {mutate, loading, error} = useMutation<{ employerUpdate: string }>(employerUpdate);

const submit = async () => {
	await mutate({
		"employerUpdate": {
			"description": state.description,
			"email": state.email,
			"establishment_date": state.establishment_date,
			"id": Number(employer.id),
			"id_location": Number(state.location?.id),
			"name": state.name,
		}
	}).then((d) => {
		useToast().add({title: d?.data?.employerUpdate})
		useRouter().push(`/employer/${employer.id}`)
	})
}

const state = reactive({
	name: employer.name,
	establishment_date: employer.establishment_date,
	email: employer.email,
	description: employer.description,
	profile_image: employer.profile_image as string | null,
	location: employer.location ? postStore.location_options.find((e) => {
		if (e.id === employer.location?.id) return e
	}) : undefined,
	phone: employer,
})

if (employerUser.level !== 'ADMIN') {
	useRouter().push('/')
	useToast().add({title: 'No puedes hacer esto'})
}
</script>
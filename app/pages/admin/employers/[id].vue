<template>
	<AdminModalMessage
		v-model:is_open="is_modal_open"
		:labels="{
				header: 'Actualizar empleador',
				confirm: 'Confirmar',
				description: 'Debes indicar una razón para realizar esta acción.',
				loading,
				error,
		}"
		:on_submit="submit"
		:on_close="close_modal"
		:schema="message_schema"
	/>

	<EmployerUpdate
		v-model:state="state"
		:props="{
			id: Number(employer.id),
			loading,
			error,
			update: confirm,
			cancel: `/admin/employers`
		}"
	/>

</template>

<script setup lang="ts">
import {message_schema} from "~/schemas";

definePageMeta({
	middleware: 'role',
	roles: ['ADMIN', 'SUPERUSER']
})

import {employerFindOne, employerUpdate} from "~/queries";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

const route = useRoute()
const postStore = usePostStore();
const is_modal_open = ref(false)

const {data} = await useAsyncQuery<{
	findOneEmployer: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}>(employerFindOne(), {"findOneEmployerId": Number(route.params.id)})
const {employer} = data.value?.findOneEmployer!

console.log(data)

const confirm = async () => {
	is_modal_open.value = true
}

const close_modal = () => {
	is_modal_open.value = false
}

const {mutate, loading, error} = useMutation<{ employerUpdate: string }>(employerUpdate(true));
const submit = async (message:string) => {
	is_modal_open.value = true
	await mutate({
		"employerUpdate": {
			"description": state.description,
			"email": state.email,
			"establishment_date": state.establishment_date,
			"id": Number(employer.id),
			"id_location": Number(state.location?.id),
			"name": state.name,
		},
		"messageInput": {
			"message": message
		}
	}).then((d) => {
		useToast().add({title: d?.data?.employerUpdate})
		useRouter().push(`/admin/employers`)
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

</script>
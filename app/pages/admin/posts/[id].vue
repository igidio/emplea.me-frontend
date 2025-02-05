<template>
	<AdminModalMessage
		v-model:is_open="is_modal_open"
		:labels="{
				header: 'Actualizar publicación',
				confirm: 'Confirmar',
				description: 'Debes indicar una razón para realizar esta acción.',
				loading,
				error,
		}"
		:on_submit="submit"
		:on_close="close_modal"
		:schema="message_schema"
	/>
	
	<JobUpdate
		v-model:state="state"
		:props="{
			id: Number(route.params.id),
			loading,
			error,
			update: confirm,
			cancel: `/admin/posts`
		}"
	/>
</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import type {PostInterface} from "~/interfaces";
import {postFindOne, postUpdate} from "~/queries";
import {message_schema} from "~/schemas";

definePageMeta({
	middleware: 'role',
	roles: ['SUPERUSER', 'ADMIN']
})

const route = useRoute()
const {location_options} = usePostStore()
const is_modal_open = ref(false)

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
>(postFindOne(), {"id": Number(route.params.id)});

const confirm = async () => {
	is_modal_open.value = true
}

const close_modal = () => {
	is_modal_open.value = false
}

const {mutate, loading, error} = useMutation<{ "postUpdate": string }>(postUpdate)
const submit = async (message:string) => {
	await mutate({
		"updatePostInput": {
			"id": Number(route.params.id),
			"name": state.name,
			"id_category": Number(state.category?.id),
			"description": state.description,
			"id_location": Number(state.location?.id),
			"salary": Number(state.salary),
			"salary_type": state.salary_type,
			"modality": state.modality,
			"id_employer": Number(data.value?.post.post.employer.id)
		},
		"messageInput": {
			"message": message
		}
	}).then((e) => {
		useToast().add({title: e?.data?.postUpdate})
		useRouter().push(`/admin/posts`)
	}).catch((e) => {
		console.log(e)
	});
}

const state = reactive({
	location: data.value?.post.post.location ? location_options.find((e) => {
		if (e.id === data.value?.post.post.location?.id) return e
	}) : undefined,
	description: data.value?.post.post.description,
	name: data.value?.post.post.name,
	salary: data.value?.post.post.salary,
	salary_type: data.value?.post.post.salary_type,
	modality: data.value?.post.post.modality,
	category: data.value?.post.post.category,
})

// const {data: employer_find_one} = await useAsyncQuery<{
// 	findOneEmployer: {
// 		employer: EmployerInterface,
// 		employerUser: EmployerUserInterface
// 	}
// }>(employerFindOne(), {"findOneEmployerId": })
// const {employer, employerUser} = employer_find_one.value?.findOneEmployer!
//
// console.log(employerUser)
</script>
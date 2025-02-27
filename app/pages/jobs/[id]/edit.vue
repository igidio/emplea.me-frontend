<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: data.post.employer.name!,
      to: `/employer/${data.post.employer.id}`
		}, {
			label: data.post.name!,
      to: `/jobs/${data.post.id}`
		}, {
			label: 'Actualizar publicación de trabajo',
      to: `/jobs/${data.post.id}/edit`
		}
		]"/>

		<JobUpdate
			v-model:state="state"
			:props="{
			id: Number(route.params.id),
			loading,
			error,
			update: submit,
			cancel: `/jobs/${route.params.id}`
		}"
		/>
	</div>
</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import {postUpdate} from "~/queries";
import type {postInfoInterface} from "~/interfaces/post_info.interface";

definePageMeta({
	middleware: ['role', 'post'],
	roles: ['EMPLOYER'],
	require_modify: true,
})
useHead({
	title: 'Actualizar publicación de trabajo'
})

const route = useRoute()
const {location_options} = usePostStore()

const data = route.meta.post_data as postInfoInterface;

const state = reactive({
	location: data?.post.location ? location_options.find((e) => {
		if (e.id === data.post.location?.id) return e
	}) : undefined,
	description: data.post.description,
	name: data.post.name,
	salary: data.post.salary,
	salary_type: data.post.salary_type,
	modality: data.post.modality,
	category: data.post.category,
})

const {mutate, loading, error} = useMutation<{ "postUpdate": string }>(postUpdate)
const submit = async () => {
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
			"id_employer": Number(data.post.employer.id),
		}
	}).then((e) => {
		useToast().add({title: e?.data?.postUpdate})
		useRouter().push(`/jobs/${route.params.id}?U`)
	}).catch((e) => {
		console.log(e)
	});
}

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
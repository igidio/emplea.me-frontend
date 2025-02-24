<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: data?.post.post.employer.name!,
      to: `/employer/${data?.post.post.employer.id}`
		}, {
			label: data?.post.post.name!,
      to: `/jobs/${data?.post.post.id}`
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
import type {PostInterface} from "~/interfaces";
import {postFindOne, postUpdate} from "~/queries";

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})

const route = useRoute()
const {location_options} = usePostStore()

// if (employerUser.level !== 'ADMIN') {
// 	useRouter().push('/')
// 	useToast().add({title: 'No puedes hacer esto'})
// }

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

if (data.value?.post.info.can_modify === false) {
	useRouter().push('/')
	useToast().add({title: 'No puedes hacer esto'})
}

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
			"id_employer": Number(data.value?.post.post.employer.id)
		}
	}).then((e) => {
		useToast().add({title: e?.data?.postUpdate})
		useRouter().push(`/jobs/${route.params.id}?U`)
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
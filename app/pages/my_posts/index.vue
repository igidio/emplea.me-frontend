<template>
	<JobPostTable
		:posts="posts"
		:reload="fetch"
		:loading="loading"
		:options="options"
	/>
</template>

<script setup lang="ts">
import {postActivateOrDeactivate, postMyPosts, postToggleAvailability} from "~/queries";
import type {PostInterface} from "~/interfaces";

const posts: Ref<PostInterface[]> = ref([])

const {result, refetch, loading} = useQuery<{
	"postMyPosts": PostInterface[]
}>(postMyPosts, {}, {prefetch: true})

onMounted(async () => {
	await fetch()
})

const fetch = async () => {
	await refetch()
	posts.value = result.value?.postMyPosts || []
}

const {
	mutate,
	error,
	loading: loading_mutation
} = useMutation(postActivateOrDeactivate)

const submit_disable = async (id: any) => {
	await mutate({
		"postActivateOrDeactivateId": Number(id),
		"messageOptInput": {
			"message": null
		}
	}).then(async (e) => {
		useToast().add({title: e?.data?.postActivateOrDeactivate})
		await fetch()
	}).catch((e) => {
		console.log(e)
	});
}

const {
	mutate: postToggleAvailability_mutate,
	error: postToggleAvailability_error,
	loading: postToggleAvailability_loading
} = useMutation<{ postToggleAvailability: string }>(postToggleAvailability)

const submit_toggle_availability = async (id: any) => {
	await postToggleAvailability_mutate({
		"postToggleAvailabilityId": Number(id)
	}).then(async (e) => {
		useToast().add({title: e?.data?.postToggleAvailability})
		await fetch()
	}).catch((e) => {
		console.log(e)
	});
}

const options = (row: any) => [
	[
		...((row.is_active) ? [{
			label: (row.available) ? 'Llenar vacante' : 'Liberar vacante',
			icon: (row.is_active) ? 'ri:inbox-archive-line' : 'ri:inbox-unarchive-line',
			click: async () => {
				await submit_toggle_availability(row.id)
			}
		}] : []),
		{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => {
				await submit_disable(row.id)
			}
		},
		{
			label: 'Editar',
			icon: 'ri:edit-line',
			click: () => useRouter().push(`/jobs/${row.id}/edit`)
		}
	],
	[
		{
			label: 'Ver detalles',
			icon: 'ri:align-left',
			click: () => useRouter().push(`/jobs/${row.id}`)
		},
	]
]

</script>
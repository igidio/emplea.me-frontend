<template>
	<AdminModalMessage
		v-model:is_open="modal_data.is_open"
		:labels="{
				header: modal_data.header,
				confirm: 'Confirmar',
				description: 'Debes indicar una razón para realizar esta acción.',
				loading,
				error,
		}"
		:on_submit="submit"
		:on_close="close_modal"
		:schema="message_schema"
	/>

	<div class="mb-4 flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Panel',
      to: '/admin'
		}, {
			label: 'Publicaciones',
      to: '/admin/posts'
		},
		]"/>
		<JobPostTable
			:posts="posts"
			:reload="fetch"
			:loading="loading"
			:options="options"
		/>
	</div>
</template>

<script setup lang="ts">
import type {PostInterface} from "~/interfaces";
import {postActivateOrDeactivate, postFindAll} from "~/queries";
import {message_schema} from "~/schemas";

definePageMeta({
	middleware: 'role',
	roles: ['ADMIN', 'SUPERUSER']
})

useHead({
	title: 'Publicaciones'
})

const {result, refetch, loading} = useQuery<{
	"postFindAll": PostInterface[]
}>(postFindAll(true), {}, {prefetch: true})

const posts = ref<PostInterface[]>([])

const fetch = async () => {
	await refetch()
	posts.value = result.value?.postFindAll || []
}

onMounted(async () => {
	await fetch();
})

const modal_data = ref({
	is_open: false,
	header: undefined as string | undefined,
	id: undefined as number | undefined
})

const close_modal = () => {
	modal_data.value.is_open = false
	modal_data.value.header = undefined
	modal_data.value.id = undefined
}

const options = (row: any) => [
	[
		...([{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: () => {
				modal_data.value.is_open = true
				modal_data.value.header = (row.is_active) ? 'Deshabilitar publicación' : 'Volver a habilitar publicación'
				modal_data.value.id = row.id
			}
		}]),
		{
			label: 'Editar',
			icon: 'ri:edit-line',
			click: () => useRouter().push(`/admin/posts/${row.id}`)
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

const {
	mutate,
	error,
	loading: loading_mutation
} = useMutation(postActivateOrDeactivate)

const submit = async (message: string) => {
	await mutate({
		"postActivateOrDeactivateId": Number(modal_data.value.id),
		"messageOptInput": {
			"message": message
		}
	}).then(async (e) => {
		close_modal()
		useToast().add({title: e?.data?.postActivateOrDeactivate})
		await fetch()
	}).catch((e) => {
		console.log(e)
	});
}
</script>

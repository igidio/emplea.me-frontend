<template>
	<AdminModalMessage
		:on_submit="submit_toggle_verify"
		:on_close="close_toggle_verify"
		:schema="message_schema"
		:labels="{
		header: modal_valid_options.header,
		confirm: 'Confirmar',
		description: modal_valid_options.description,
		loading: false,
		error: error_toggle_verify,
		}"
		:is_open="modal_valid_options.is_open"
	/>

	<AdminModalSubscription
		v-model:show="show"
		:reload="reload"
	/>
	<div class="mb-4 flex flex-col gap-4">
		<h6>Subscripciones</h6>
		<hr/>
		<UButton
			label="Agregar subscripción"
			block
			icon="ri:add-fill"
			@click="show = true"
		/>
	</div>


	<ClientOnly>
		<HistoryTable
			:subscriptions="subscriptions"
			:loading="loading"
			:options="options"
			show_users
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {SubscriptionInterface} from "~/interfaces";
import {subscriptionFindAll, subscriptionGql} from "~/queries";
import ModalMessage from "~/components/Admin/ModalMessage.vue";
import {message_schema} from "~/schemas";

const subscriptions = ref<SubscriptionInterface[]>([])
const show = ref(false)

const {result, refetch, loading} = useQuery<{ subscriptionFindAll: SubscriptionInterface[] }>(
	subscriptionFindAll, {}, {prefetch: true})

onMounted(async () => await reload())

const reload = async () => {
	await refetch()
	subscriptions.value = result.value?.subscriptionFindAll || []
}

interface modal_options_interface {
	id: number|undefined,
	is_open: boolean,
	header: string,
	description: string,
	message: string|undefined
}

const modal_valid_options:Ref<modal_options_interface> = ref({
	id: undefined as number|undefined,
	is_open: false,
	header: '',
	description: 'Debes indicar una razón para realizar esta acción.',
	message: undefined as string|undefined
})
const {
	mutate: mutate_toggle_verify,
	error: error_toggle_verify
} = useMutation<{}>(subscriptionGql.toggle_verify)
const submit_toggle_verify = async () => {
	await mutate_toggle_verify({
		"subscriptionToggleVerifyId": Number(modal_valid_options.value.id),
		"message": modal_valid_options.value.message
	})
		.then(async () => {
			await reload()
			useToast().add({title: 'Suscripción actualizada con éxito'})
			modal_valid_options.value.is_open = false
		})
		.catch((error) => console.log(error))
}
const close_toggle_verify = () => {
	modal_valid_options.value = {} as modal_options_interface
}



const options = (row: any) => [
	[
		{
			label: (row.is_valid) ? 'Invalidar' : 'Volver a validar',
			icon: (row.is_valid) ? 'ri:inbox-archive-line' : 'ri:inbox-unarchive-line',
			click: async () => {
				modal_valid_options.value.id = row.id
				modal_valid_options.value.is_open = true
				modal_valid_options.value.header = (row.is_valid) ? 'Invalidar suscripción' : 'Volver a validar suscripción'
			}
		},
		...((row.is_valid && row.method?.id == 1) ? [{
			label: (row.autorenew) ? 'Desactivar auto-renovación' : 'Activar auto-renovación',
			icon: (row.autorenew) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => {
				//await submit_disable(row.id)
			}
		}] : [])
	]
]


</script>1
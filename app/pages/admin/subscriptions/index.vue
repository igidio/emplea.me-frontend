<template>
	<AdminModalMessage
		:on_submit="submit_toggle_verify"
		:on_close="close_toggle_verify"
		:schema="message_schema"
		:labels="{
			header: toggle_verify_options.header,
			confirm: 'Confirmar',
			description: toggle_verify_options.description,
			loading: false,
			error: error_toggle_verify,
		}"
		:is_open="toggle_verify_options.is_open"
	/>

	<AdminModalMessage
		:on_submit="submit_toggle_renew"
		:on_close="close_toggle_renew"
		:schema="message_schema"
		:labels="{
			header: toggle_renew_options.header,
			confirm: 'Confirmar',
			description: toggle_renew_options.description,
			loading: false,
			error: error_toggle_renew,
		}"
		:is_open="toggle_renew_options.is_open"
	/>

	<AdminModalSubscription
		v-model:show="show"
		:reload="reload"
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
			label: 'Subscripciones',
      to: '/admin/subscriptions'
		},
		]"/>

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

definePageMeta({
	middleware: 'role',
	roles: ['ADMIN', 'SUPERUSER']
})

useHead({
	title: 'Subscripciones'
})

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
	id: number | undefined,
	is_open: boolean,
	header: string,
	description: string,
	message: string | undefined
}

const toggle_verify_options: Ref<modal_options_interface> = ref({
	id: undefined as number | undefined,
	is_open: false,
	header: '',
	description: 'Debes indicar una razón para realizar esta acción.',
	message: undefined as string | undefined
})
const {
	mutate: mutate_toggle_verify,
	error: error_toggle_verify
} = useMutation<{}>(subscriptionGql.toggle_verify)
const submit_toggle_verify = async (message: string) => {
	await mutate_toggle_verify({
		"subscriptionToggleVerifyId": Number(toggle_verify_options.value.id),
		"message": message
	})
		.then(async () => {
			await reload()
			useToast().add({title: 'Suscripción actualizada con éxito'})
			toggle_verify_options.value.is_open = false;
			toggle_verify_options.value.description = 'Debes indicar una razón para realizar esta acción.';

		})
		.catch((error) => console.log(error))
}
const close_toggle_verify = () => {
	toggle_verify_options.value = {} as modal_options_interface;
	toggle_verify_options.value.description = 'Debes indicar una razón para realizar esta acción.';
}

const toggle_renew_options: Ref<modal_options_interface> = ref({
	id: undefined as number | undefined,
	is_open: false,
	header: '',
	description: 'Debes indicar una razón para realizar esta acción.',
	message: undefined as string | undefined
})
const {
	mutate: mutate_toggle_renew,
	error: error_toggle_renew
} = useMutation<{}>(subscriptionGql.toggle_renew)
const submit_toggle_renew = async (message: string) => {
	await mutate_toggle_renew({
		"subscriptionToggleRenewId": Number(toggle_renew_options.value.id),
		"messageInput": {
			"message": message
		}
	})
		.then(async () => {
			await reload()
			useToast().add({title: 'Suscripción actualizada con éxito'})
			toggle_renew_options.value.is_open = false;
			toggle_renew_options.value.description = 'Debes indicar una razón para realizar esta acción.';

		})
		.catch((error) => console.log(error))
}
const close_toggle_renew = () => {
	toggle_renew_options.value = {} as modal_options_interface
	toggle_renew_options.value.description = 'Debes indicar una razón para realizar esta acción.';
}

const options = (row: any) => [
	[
		{
			label: (row.is_valid) ? 'Invalidar' : 'Volver a validar',
			icon: (row.is_valid) ? 'ri:inbox-archive-line' : 'ri:inbox-unarchive-line',
			click: async () => {
				toggle_verify_options.value.id = row.id
				toggle_verify_options.value.is_open = true
				toggle_verify_options.value.header = (row.is_valid) ? 'Invalidar suscripción' : 'Volver a validar suscripción'
			}
		},
		...((row.is_valid && row.method?.id == 1) ? [{
			label: (row.autorenew) ? 'Desactivar auto-renovación' : 'Activar auto-renovación',
			icon: (row.autorenew) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => {
				toggle_renew_options.value.id = row.id
				toggle_renew_options.value.is_open = true
				toggle_renew_options.value.header = (row.is_valid) ? 'Desactivar auto-renovación' : 'Activar auto-renovación'
			}
		}] : [])
	]
]


</script>1
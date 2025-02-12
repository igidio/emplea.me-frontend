<template>
	<div class="flex flex-col gap-4">
		<div class="w-80 self-end">
			<HistoryCurrentPlan/>
		</div>
		<HistoryTable
			:subscriptions="subscriptions"
			:loading="loading"
			:options="options"
		/>
	</div>

</template>
<script setup lang="ts">
import {subscriptionGql, subscriptionMyHistory} from "~/queries";
import type {SubscriptionInterface} from "~/interfaces";

const subscriptions = ref<SubscriptionInterface[]>([])

const {result, refetch, loading} = useQuery<{ "subscriptionMyHistory": SubscriptionInterface[] }>(subscriptionMyHistory)

onMounted(async () => {
	await fetch()
})

const options = (row: any) => [
	[
		...((row.is_valid && row.method?.id == 1) ? [{
			label: (row.autorenew) ? 'Desactivar auto-renovación' : 'Activar auto-renovación',
			icon: (row.autorenew) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => submit_toggle_renew(Number(row.id))
		}] : [])
	]
]

const fetch = async () => {
	await refetch()
	subscriptions.value = result.value?.subscriptionMyHistory!
}

const {
	mutate: mutate_toggle_renew,
} = useMutation<{}>(subscriptionGql.toggle_renew)
const submit_toggle_renew = async (id: number) => {
	await mutate_toggle_renew({
		"subscriptionToggleRenewId": id,
		"messageInput": {
			"message": null
		}
	})
		.then(async () => {
			await fetch()
			useToast().add({title: 'Suscripción actualizada con éxito.'})
		})
		.catch((error) =>
			useToast().add({title: error.message}))
}
</script>
<template>
	<div class="flex flex-col gap-4">
		<div class="w-80 self-end">
			<HistoryCurrentPlan/>
		</div>
		<HistoryTable
			:subscriptions="data?.subscriptionMyHistory!"
			:loading="false"
			:options="options"
		/>
	</div>

</template>
<script setup lang="ts">
import {subscriptionMyHistory} from "~/queries";
import type {SubscriptionInterface} from "~/interfaces";

const {data} = await useAsyncQuery<{ "subscriptionMyHistory": SubscriptionInterface[] }>(subscriptionMyHistory)

const options = (row: any) => [
	[
		...((row.is_valid && row.method?.id == 1) ? [{
			label: (row.autorenew) ? 'Desactivar auto-renovación' : 'Activar auto-renovación',
			icon: (row.autorenew) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => {
				//await submit_disable(row.id)
			}
		}] : [])
	]
]
</script>
<template>
	<AdminModalSubscription
		v-model:show="show"
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
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {SubscriptionInterface} from "~/interfaces";
import {subscriptionFindAll} from "~/queries";

const subscriptions = ref<SubscriptionInterface[]>([])
const show = ref(false)

const {result, refetch, loading} = useQuery<{ subscriptionFindAll: SubscriptionInterface[] }>(
	subscriptionFindAll, {}, {prefetch: true})

onMounted(async () => {
	await refetch()
	subscriptions.value = result.value?.subscriptionFindAll || []
})
</script>1
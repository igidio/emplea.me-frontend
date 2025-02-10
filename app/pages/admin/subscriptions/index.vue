<template>
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

const {result, refetch, loading} = useQuery<{ subscriptionFindAll: SubscriptionInterface[] }>(
	subscriptionFindAll, {}, {prefetch: true})

onMounted(async () => {
	await refetch()
	subscriptions.value = result.value?.subscriptionFindAll || []
})
</script>1
<template>
	<HistoryTable
		:subscriptions="subscriptions"
	/>
</template>

<script setup lang="ts">

import type {SubscriptionInterface} from "~/interfaces";
import {subscriptionFindAll} from "~/queries";

const subscriptions = ref<SubscriptionInterface[]>([])

const { result } = useQuery<{ subscriptionFindAll: SubscriptionInterface[]}>(subscriptionFindAll)
onMounted(() => {
	subscriptions.value = result.value?.subscriptionFindAll || []
})
</script>1
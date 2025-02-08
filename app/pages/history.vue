<template>
<!--	<HistoryCurrentPlan/>-->
	<HistoryTable
		:subscriptions="data?.subscriptionMyHistory!"
	/>

</template>
<script setup lang="ts">
import {subscriptionMyHistory} from "~/queries";
import type {SubscriptionInterface} from "~/interfaces";

const { data } = await useAsyncQuery<{ "subscriptionMyHistory": SubscriptionInterface[] }>(subscriptionMyHistory)
</script>
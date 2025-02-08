<template>
	<div class="flex flex-col gap-4">
		<div class="w-80 self-end">
			<HistoryCurrentPlan/>
		</div>
		<HistoryTable
			:subscriptions="data?.subscriptionMyHistory!"
		/>
	</div>

</template>
<script setup lang="ts">
import {subscriptionMyHistory} from "~/queries";
import type {SubscriptionInterface} from "~/interfaces";

const {data} = await useAsyncQuery<{ "subscriptionMyHistory": SubscriptionInterface[] }>(subscriptionMyHistory)
</script>
<template>
	{{subscriptions}}
</template>

<script setup lang="ts">
import type {SubscriptionInterface} from "~/interfaces";

defineProps<{subscriptions: SubscriptionInterface[]}>()
</script>
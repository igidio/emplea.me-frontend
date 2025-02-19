<template>
	<div class="z-[300] flex flex-col fixed top-0 right-0 h-full w-full bg-white items-center place-content-center">
		<span class="font-semibold">Redirigiendo...</span>
	</div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()

const where = {
	"confirm": "confirm",
	"forgot-password": "recovery",
}

if (!(route.query.token && route.query.identifier && route.query.next)) {
	if (import.meta.client) location.replace('/')
} else {
	if (import.meta.client) location.replace(`/${where[route.query.next as keyof typeof where]}?token=${route.query.token}&identifier=${route.query.identifier}`)
}
</script>
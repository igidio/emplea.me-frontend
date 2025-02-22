<template>
	<div class="flex flex-col gap-2 items-center">

		<Icon
			:name=" loading ? 'ri:loader-5-line' : !loading && is_filled ? 'ri:check-line' : 'ri:error-warning-line'"
			size="64"
			:class="loading && 'animate-spin'"
		/>
		<h6>Confirmación como asistente</h6>
		<p v-if="loading">Por favor espera mientras se completa la confirmación...</p>
		<p v-else-if="!loading && is_filled">Tu cuenta ha sido confirmada, redirigiendo en unos segundos.</p>
		<span v-if="error" class="error">{{ error.message }}</span>
	</div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {gqlConfirmation, gqlEmployerUser} from "~/queries";

definePageMeta({
	middleware: ['verify']
})
useHead({
	title: "Confirmación como asistente"
})

const route = useRoute()
const is_filled = ref(false)

interface queriesInterface {
	token: string;
	identifier: string;
}


const queries: Ref<queriesInterface> = ref({
	token: route.query.token!.toString(),
	identifier: route.query.identifier!.toString(),
})

const {mutate, loading, error} = useMutation(gqlEmployerUser.accept_invitation)

const confirm = async () => {
	await mutate({
		"verify": {
			"token": queries.value.token,
			"identifier": queries.value.identifier
		}
	}).then(() => {
		is_filled.value = true;
		setTimeout(() => window.location.replace('/'), 2000)
	})
		.catch((e) => console.log(e)).then((e) => {
			console.log(e)
		})
}

onMounted(async () => await confirm())
</script>
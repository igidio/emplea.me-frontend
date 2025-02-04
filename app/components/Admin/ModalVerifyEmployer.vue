<template>
	<UModal v-model="is_open.modal">
		<UCard>
			<template #header>Verificar empleador: {{ is_open.name }}</template>
			<div class="flex flex-col gap-2">
				<p>Recuerda que la empresa a verificar debe existir y operar activamente.</p>
				<span class="error text-end" v-if="error">{{error.message}}</span>
			</div>
			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton color="black" @click="close_modal" :loading="loading">Cerrar</UButton>
					<UButton @click="verify" :loading="loading">Verificar</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import {employerVerify} from "~/queries";
const props = defineProps<{ reload: () => Promise<void> }>()

const is_open: ModelRef<{ modal: boolean, id?: number, name?: string }> = defineModel({required: true});

const {mutate, loading, error} = useMutation<{ "employerVerify": string }>(employerVerify)

const verify = async () => {
	await mutate({
		"idEmployer": is_open.value.id
	}).then(async (e) => {
		useToast().add({title: "La empresa ha sido verificada."})
		await props.reload()
		close_modal()
	})
}

const close_modal = () => {
	is_open.value.modal = false
	is_open.value.id = undefined
	is_open.value.name = undefined
}
</script>
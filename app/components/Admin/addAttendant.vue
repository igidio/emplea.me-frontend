<template>
	<ModalWithTemplate
		v-model:is_open="confirmation_modal.is_open"
		:close="close_modal"
	>
		<div>
			Invitación enviada exitósamente a <span class="font-semibold">{{ confirmation_modal.name }}</span>.
		</div>
	</ModalWithTemplate>
	<div class="border-dotted border-2 border-violet-500 p-4 flex flex-col gap-2 rounded-medium transition-all">
		<span class="font-semibold">Agregar asistente</span>
		<p class="text-justify">Puedes agregar un encargado por su número telefónico, correo electrónico o nombre de
			usuario, el encargado
			recibirá una solicitud para unirse al negocio desde su correo electrónico.</p>
		<p class="text-justify">El correo no expirará en ningún momento y podrá ser reenviado en caso de que se lo requiera,
			también si se es
			requerido se puede cancelar la solicitud mientras el usuario no la haya aceptado.</p>
		<UForm
			class="flex flex-row gap-2 w-full"
			@submit="submit"
		>
			<UInput
				color="gray"
				class="w-full"
				placeholder="Número telefónico / correo electrónico / nombre de usuario"
				v-model="state.input"
			/>
			<UButton
				color="black"
				label="Agregar"
				type="submit"
				:disabled="loading"
			/>
		</UForm>
		<span class="error self-end" v-if="error">{{ error.message }}</span>
	</div>
</template>

<script setup lang="ts">
import {employerUserSendInvitation} from "~/queries";
import type {UserInterface} from "~/interfaces";

const {reload} = defineProps<{
	reload: () => Promise<void>
}>()

const {mutate, loading, error} = useMutation<{
	"employerUserSendInvitation": UserInterface
}>(employerUserSendInvitation)

const state = reactive({
	input: ''
})

const confirmation_modal = reactive({
	is_open: false,
	name: undefined as string | undefined
})

const submit = async (e: any) => {
	state.input = state.input.trim()
	await mutate({
		"input": state.input,
		"idEmployer": Number(useRoute().params.id)
	}).then( async (e) => {
		confirmation_modal.is_open = true;
		confirmation_modal.name = e?.data?.employerUserSendInvitation.contact.first_name + ' ' + e?.data?.employerUserSendInvitation.contact.last_name
		await reload()
	})
}

const close_modal = () => {
	confirmation_modal.is_open = false;
	confirmation_modal.name = undefined
}
</script>
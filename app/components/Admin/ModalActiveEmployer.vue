<template>
	<UModal v-model="is_open.modal">
		<UForm
			:state="state"
			:schema="schema"
			@submit="submit"
		>
			<UCard>
				<template #header>{{ is_open.is_active ? 'Volver a habilitar ' : 'Deshabilitar' }} empleador: {{
						is_open.name
					}}
				</template>
				<div class="flex flex-col gap-2">
					<UFormGroup
						name="message"
						label="Debes indicar una razón para realizar esta acción."
						help="La razón se mostrará a los usuarios en cuestión involucrados con la empresa."
					>
						<UTextarea
							color="gray"
							placeholder="Razón de la acción"
							v-model="state.message"
						/>
					</UFormGroup>
					<span class="error text-end" v-if="error">{{ error.message }}</span>
				</div>
				<template #footer>
					<div class="flex flex-row gap-2 w-full justify-end">
						<UButton color="black" @click="close_modal" :loading="loading">Cerrar</UButton>
						<UButton type="submit" :loading="loading">Verificar</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import {employerActivateOrDeactivate} from "~/queries";
import {message_schema} from "~/schemas";

const props = defineProps<{ reload: () => Promise<void> }>()

const is_open: ModelRef<{
	modal: boolean,
	id?: number,
	name?: string,
	is_active: boolean
}> = defineModel({required: true});

const {mutate, loading, error} = useMutation<{ "employerActivateOrDeactivate": string }>(employerActivateOrDeactivate)

const state = reactive({
	message: ""
})
const schema = message_schema

const submit = async () => {
	await mutate({
		"employerActivateOrDeactivateId": is_open.value.id,
		"messageInput": {
			"message": state.message
		},
	}).then(async (e) => {
		useToast().add({title: e?.data?.employerActivateOrDeactivate})
		await props.reload()
		close_modal()
	})
}

const close_modal = () => {
	is_open.value.modal = false
	is_open.value.id = undefined
	is_open.value.name = undefined
	state.message = ""
}
</script>
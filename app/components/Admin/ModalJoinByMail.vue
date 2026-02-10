<template>
	<UModal v-model="is_open">
		<UForm
			:schema="schema"
			@submit="confirm"
			:state="state"
		>
			<UCard>
				<template #header>Invitar por correo para administrador</template>
				<div class="flex flex-col gap-4">
					<p>Introduce el correo electrónico de una persona que aún no está registrada, dicho correo tendrá 24 horas de
						validez para confirmar, si no acepta la invitación durante el lapso de tiempo establecido puedes enviarle
						otra invitación en otro momento.</p>
					<UFormGroup
						name="email"
						:required="true"
					>
						<UInput
							color="gray"
							placeholder="Correo electrónico"
							v-model="state.email"
						/>
					</UFormGroup>
				<span class="error text-end" v-if="error">{{error.message}}</span>
				</div>
				<template #footer>
					<div class="flex flex-rowb gap-2 w-full justify-end">
						<UButton
							color="black"
							@click="() => {is_open = false; state.email = ''}"
						>
							Cancelar
						</UButton>
						<UButton
							type="submit"
							:disabled="loading"
						>
							Enviar
						</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import * as yup from "yup";
import {gqlConfirmation} from "~/queries";

const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});

const schema = yup.object({
	email: yup
		.string()
		.email("Debe ser un correo electrónico válido")
		.test(
			"no-spaces",
			"El campo no debe contener espacios",
			(value) => !/\s/.test(value!)
		)
		.required("El correo es obligatorio"),
})

const state = reactive({
	email: ""
})

const {mutate, loading, error} = useMutation(gqlConfirmation.join)

const confirm = async () => {
	await mutate({
		"email": state.email
	}).then(() => {
		is_open.value = false;
		useToast().add({
			title: 'Invitación enviada',
			description: `Se ha enviado una invitación al correo electrónico indicado ${ state.email }`,
		})
		state.email = '';
	})
	.catch((e) => console.log(e))
}
</script>
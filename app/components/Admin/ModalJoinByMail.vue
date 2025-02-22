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
						/>
					</UFormGroup>
				</div>
				<template #footer>
					<div class="flex flex-rowb gap-2 w-full justify-end">
						<UButton
							color="black"
							@click="is_open = false"
						>
							Cancelar
						</UButton>
						<UButton
							@click="is_open = false"
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

const confirm = async () => {

}
</script>
<template>
	<div class="flex flex-col gap-4 items-center tablet:justify-center m-4">
		<h3>Olvidé mi contraseña</h3>
		<UForm :state="state" @submit="create_confirmation()" :schema="schema">
			<div class="w-full max-w-[652px] flex flex-col gap-4">
				<p>
					A continuación introduzca el correo electrónico asociado a su cuenta,
					se le enviará un enlace para restablecer su contraseña, dicho enlace
					tendrá una duración de 24 horas:
				</p>
				<UFormGroup name="email">
					<UInput placeholder="correo@mail.com" v-model="state.email" />
				</UFormGroup>
				<span class="error" v-if="error">{{ error.message }}</span>
				<div class="flex flex-row justify-end gap-4">
					<NuxtLink to="login">
						<UButton
							variant="ghost"
							size="lg"
							label="Cancelar"
							:disabled="loading"
						/>
					</NuxtLink>

					<UButton
						size="lg"
						label="Confirmar"
						type="submit"
						:disabled="loading"
					/>
				</div>
			</div>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { confirmationCreateForgotPassword } from "~/queries";
import { user_schema } from "~/schemas";
import * as yup from "yup";

const state = reactive({
	email: "",
});
const schema = yup.object({
	email: user_schema.email,
});

const { mutate, loading, error, onDone } = useMutation(
	confirmationCreateForgotPassword
);

const create_confirmation = () => {
	mutate({
		email: state.email!.trim(),
	});
};

onDone(() => {
	useToast().add({
		title: "Se ha enviado un correo para reestablecer tu contraseña",
	});
	useRouter().push("/login");
});
</script>

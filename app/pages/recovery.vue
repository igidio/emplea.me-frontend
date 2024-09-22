<template>
	<div class="flex flex-row justify-center w-full">
		<UForm
			:state="state"
			:schema="schema"
			@submit="onSubmit()"
			class="flex flex-col w-full desktop:max-w-[60%] gap-4"
		>
			<h3 class="text-center">Olvidé mi contraseña</h3>
			<span class="text-center"
				>Introduzca su nueva contraseña, con la que podrá ingresar a su
				cuenta:</span
			>
			<UFormGroup label="Contraseña:" name="password">
				<UInput
					v-model="state.password"
					size="lg"
					color="gray"
					type="password"
				/>
			</UFormGroup>
			<UFormGroup label="Repetir contraseña:" name="password_repeat">
				<UInput
					v-model="state.password_repeat"
					size="lg"
					color="gray"
					type="password"
				/>
			</UFormGroup>

			<span class="error" v-if="error">{{ error.message }}</span>

			<div class="flex flex-col-reverse tablet:flex-row gap-4 justify-center">
				<UButton variant="ghost" label="Cancelar" to="/login" />
				<UButton
					type="submit"
					color="primary"
					size="lg"
					label="Cambiar"
					:loading="loading"
				/>
			</div>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { user_schema } from "~/schemas";
import * as yup from "yup";
import { confirmationRecoveryAccount } from "~/queries";

definePageMeta({
	middleware: ["recovery"],
});

onNuxtReady(() => {
	console.log("recovery page");
});

const schema = yup.object({
	password: user_schema.password,
	password_repeat: user_schema.password_repeat,
});

const state = reactive({
	password: "",
	password_repeat: "",
});

const { mutate, error, loading, onDone } = useMutation(
	confirmationRecoveryAccount
);

const onSubmit = () => {
	mutate({
		token: useRoute().query.t,
		password: state.password,
	});
};

onDone(() => {
	useToast().add({
		title: "Contraseña cambiada con éxito, ingrese con su nueva contraseña",
	});
	useRouter().push("/login");
});
</script>

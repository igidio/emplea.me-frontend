<template>
	<div class="flex flex-col gap-4 items-center justify-center m-4">
		<h3 class="text-center">Bienvenido de vuelta</h3>
		<div class="w-full max-w-[652px]">
			<UCard>
				<UForm
					:state="state"
					:schema="schema"
					@submit="onSubmit"
					class="flex flex-col gap-4"
				>
					<UFormGroup
						label="Nombre de usuario o correo electrónico"
						name="usernameOrEmail"
					>
						<UInput
							v-model="state.usernameOrEmail"
							variant="big"
							placeholder="nombreusuario / correoeletronico@mail.com"
						/>
					</UFormGroup>

					<UFormGroup label="Contraseña" name="password">
						<UInput
							class="mt-4"
							v-model="state.password"
							variant="big"
							placeholder=""
							type="password"
						/>
					</UFormGroup>

					<UButton type="submit" block color="primary" variant="big"
						>Iniciar sesión</UButton
					>
					<div class="flex flex-row justify-between">
						<a href="">¿Olvidaste tu contraseña?</a>
						<UCheckbox
							v-model="state.rememberMe"
							name="remember-me"
							label="Recuérdame"
						/>
					</div>
				</UForm>
			</UCard>

			<div class="flex flex-col gap-4 mt-4">
				También puedes probar:
				<div class="flex flex-col tablet:flex-row gap-3 w-full">
					<UButton color="primary" class="grow">Ingresar con Google</UButton>
					<UButton color="primary" class="grow">Ingresar con LinkedIn</UButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Reactive } from "vue";
import * as yup from "yup";

const schema = yup.object({
	usernameOrEmail: yup.string().required("Este campo es requerido"),
	password: yup.string().required("Este campo es requerido"),
});

const onSubmit = () => {
	console.log("submitted");
};

const state: Reactive<{
	usernameOrEmail: string | undefined;
	password: string | undefined;
	rememberMe: boolean;
}> = reactive({
	usernameOrEmail: undefined,
	password: undefined,
	rememberMe: false,
});
</script>

<template>
	<div
		class="flex flex-col gap-4 items-center self-center tablet:justify-center m-4"
	>
		<h3 class="text-center">Bienvenido de vuelta</h3>
		<div class="w-full max-w-[652px]">
			<UCard>
				<UForm
					:state="state"
					:schema="schema"
					@submit="onSubmit()"
					class="flex flex-col gap-4"
				>
					<UFormGroup
						label="Nombre de usuario o correo electrónico"
						name="usernameOrEmail"
					>
						<UInput
							v-model="state.usernameOrEmail"
							size="lg"
							color="gray"
							placeholder="nombreusuario / correoeletronico@mail.com"
						/>
					</UFormGroup>

					<UFormGroup label="Contraseña" name="password">
						<UInput
							class="mt-4"
							v-model="state.password"
							size="lg"
							color="gray"
							type="password"
						/>
					</UFormGroup>

					<span class="error py-2 inline-block w-full text-center" v-if="error">
						{{ error.message }}</span
					>
					<UButton
						type="submit"
						block
						color="primary"
						size="lg"
						:loading="loading"
					>
						Iniciar sesión
					</UButton>

					<div
						class="flex flex-col-reverse gap-4 tablet:gap-0 tablet:flex-row justify-between"
					>
						<UCheckbox
							v-model="state.remember_me"
							name="remember-me"
							label="Recuérdame"
						/>
						<NuxtLink to="forgot-password">¿Olvidaste tu contraseña?</NuxtLink>
					</div>
				</UForm>
			</UCard>

			<div class="flex flex-col gap-4 mt-4">
				También puedes probar:
				<div class="flex flex-col tablet:flex-row gap-3 w-full">
					<AuthExternal />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Reactive } from "vue";
import * as yup from "yup";
import { loginQuery } from "~/queries";

const toast = useToast();

const userStore = useUserStore();

const schema = yup.object({
	usernameOrEmail: yup.string().required("Este campo es requerido"),
	password: yup.string().required("Este campo es requerido"),
});

const state: Reactive<{
	usernameOrEmail: string | undefined;
	password: string | undefined;
	remember_me: boolean;
}> = reactive({
	usernameOrEmail: undefined,
	password: undefined,
	remember_me: false,
});

const { mutate: login, onDone, loading, error } = useMutation(loginQuery);

onDone((result) => {
	userStore.set_token(result.data.login.token);
	userStore.set_user(result.data.login.user);
	useRouter().push("/");
	toast.add({ title: "Inicio de sesión exitoso." });
});

const onSubmit = async () => {
	await login({ loginInput: state });
	//useRouter().go(0);
	useToast().add({ title: "Inicio de sesión exitoso." });
};
</script>

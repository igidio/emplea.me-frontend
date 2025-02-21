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
							placeholder="@nombreusuario / correoeletronico@mail.com"
							autocomplete="username"
						/>
					</UFormGroup>

					<UFormGroup label="Contraseña" name="password">
						<UInput
							class="mt-4"
							v-model="state.password"
							size="lg"
							color="gray"
							type="password"
							autocomplete="current-password"
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
						<NuxtLink to="forgot-password" class="hyper"
						>¿Olvidaste tu contraseña?
						</NuxtLink
						>
					</div>
				</UForm>
			</UCard>

			<div class="flex flex-col gap-4 mt-4">
				También puedes probar:
				<div class="flex flex-col tablet:flex-row gap-3 w-full">
					<AuthExternal/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {Reactive} from "vue";
import * as yup from "yup";
import {loginQuery, subscriptionUserDetails} from "~/queries";
import type {employer_info_interface} from "~/interfaces";

const toast = useToast();

const {set_token, set_user, set_employer_info} = useUserStore();

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

const {mutate: login, onDone, loading, error} = useMutation(loginQuery);
const {result: result_subscription, refetch} = useQuery<{
	subscriptionUserDetails: employer_info_interface
}>(subscriptionUserDetails, {}, {prefetch: false})

onDone(async (result) => {
	set_token(result.data.login.token);
	set_user(result.data.login.user);
	if (result.data.login.user.role === "EMPLOYER") {
		await refetch()
		set_employer_info(result_subscription.value?.subscriptionUserDetails!);
	}
	//if (import.meta.client) {
		window.location.replace('/')
	//}
});


const onSubmit = async () => {
	await login({loginInput: state}).then(
		(e) => {
			console.log(e)
			//toast.success("Inicio de sesión exitoso");
		},
	);
};
</script>

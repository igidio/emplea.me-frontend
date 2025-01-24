<template>
	<UModal v-model="isOpen">
		<UForm :state="state" :schema="schema" @submit="on_submit()">
			<UCard>
				<template #header>Información del usuario</template>

				<div class="flex flex-col gap-4">
					<UFormGroup
						class="w-full"
						label="Nombre de usuario"
						help="Con el nombre de usuario podrás ingresar a tu cuenta"
						name="username"
					>
						<UInput
							placeholder="Tu nombre de usuario"
							size="lg"
							v-model="state.username"
							color="gray"
						/>
					</UFormGroup>

					<UFormGroup label="Correo electrónico" name="email">
						<UInput
							placeholder="correo_electronico@mail.com"
							size="lg"
							v-model="state.email"
							color="gray"
						/>
					</UFormGroup>
					<span v-if="error" class="error">{{ error.message }}</span>
				</div>

				<template #footer>
					<div class="flex flex-row gap-2 w-full justify-end">
						<UButton color="black" @click="isOpen = false">Cancelar</UButton>
						<UButton :loading="loading" type="submit">Guardar</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { userUpdate } from "~/queries";
import { user_schema } from "~/schemas";

const isOpen = defineModel({ required: true, default: false });

const { user } = storeToRefs(useUserStore());

const schema = yup.object().shape({
	email: user_schema.email,
	username: user_schema.username,
});

interface stateInterface {
	email: string | undefined;
	username: string | undefined;
}

const { mutate, error, loading, onDone } = useMutation(userUpdate);

const state: stateInterface = reactive({
	id: parseInt(user.value.id),
	email: user.value.email,
	username: user.value.username,
} as stateInterface);

const on_submit = async () => {
	await mutate({ updateUserInput: state });
};

onDone(() => {
	isOpen.value = false;
	user.value.email = state.email!;
	user.value.username = state.username!;
	useToast().add({ description: "Usuario actualizado" });
});
</script>

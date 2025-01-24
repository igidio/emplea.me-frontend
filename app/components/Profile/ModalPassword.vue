<template>
	<UModal v-model="isOpen">
		<UForm
			:state="state"
			:schema="schema"
			@submit="submit"
		>
			<UCard>
				<template #header>Cambiar contraseña</template>
				<div
					class="flex flex-col tablet:flex-row gap-3 w-full justify-center"
				>
					<div class="flex flex-col tablet:w-1/2 gap-2">
						<UFormGroup
							label="Contraseña actual"
							name="current_password"
						>
							<template #hint>
								<UButton
									size="sm"
									color="gray"
									variant="ghost"
									:icon="!is_visible.current_password ? 'ri:eye-line' : 'ri:eye-close-line'"
									@click="is_visible.current_password = !is_visible.current_password"
								/>
							</template>
							<UInput
								:type="is_visible.current_password ? 'text' : 'password'"
								placeholder="********"
								autocomplete="off"
								color="gray"
								v-model="state.current_password"
							/>
						</UFormGroup>

					</div>
					<div class="flex flex-col tablet:w-1/2 gap-2">
						<UFormGroup
							label="Introduce la nueva contraseña"
							name="new_password"
						>
							<template #hint>
								<UButton
									size="sm"
									color="gray"
									variant="ghost"
									:icon="!is_visible.new_password ? 'ri:eye-line' : 'ri:eye-close-line'"
									@click="is_visible.new_password = !is_visible.new_password"
								/>
							</template>
							<UInput
								:type="is_visible.new_password ? 'text' : 'password'"
								autocomplete="off"
								placeholder="********"
								color="gray"
								v-model="state.new_password"
							/>
						</UFormGroup>
						<UFormGroup
							label="Confirma la nueva contraseña"
							name="confirm_password"
						>
							<template #hint>
								<UButton
									size="sm"
									color="gray"
									variant="ghost"
									:icon="!is_visible.confirm_password ? 'ri:eye-line' : 'ri:eye-close-line'"
									@click="is_visible.confirm_password = !is_visible.confirm_password"
								/>
							</template>
							<UInput
								:type="is_visible.confirm_password ? 'text' : 'password'"
								autocomplete="off"
								placeholder="********"
								color="gray"
								v-model="state.confirm_password"
							>
							</UInput>
						</UFormGroup>
					</div>
				</div>
				<div class="w-full text-end mt-2" v-if="error">
					<span class="error">{{ error.message }}</span>
				</div>
				<template #footer>
					<div class="flex flex-row gap-2 w-full justify-end">
						<UButton color="black" @click="cancel">Cerrar</UButton>
						<UButton type="submit" :disabled="loading">Confirmar</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import {password_schema} from "~/schemas";
import Buttons from "~/components/Auth/Buttons.vue";
import {userChangePassword} from "~/queries";

const isOpen = defineModel({required: true, default: false});

const state = reactive({
	current_password: "",
	new_password: "",
	confirm_password: "",
});

const is_visible = reactive({
	current_password: false,
	new_password: false,
	confirm_password: false,
})
const schema = password_schema

const {mutate, error, loading} = useMutation<{ userChangePassword: string }>(userChangePassword);

const submit = async () => {
	await mutate({
		"updatePasswordInput": {
			"current_password": state.current_password,
			"new_password": state.new_password,
			"confirm_password": state.confirm_password,
		}
	}).then((e) => {
		isOpen.value = false;
		useToast().add({title: e?.data?.userChangePassword});
		reset();
	})
}

const reset = () => {
	state.current_password = "";
	state.new_password = "";
	state.confirm_password = "";
}

const cancel = () => {
	reset();
	isOpen.value = false;
}
</script>

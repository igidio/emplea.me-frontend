<template>
	<UModal v-model="is_open">
		<UForm
			:state="state"
			:schema="schema"
			@submit="confirm"
		>
			<UCard>
				<template #header>{{ labels.header }}</template>
				<div class="flex flex-col gap-2">
					<UFormGroup
						name="message"
						:label="labels.description"
						help="La razón se mostrará a los usuarios en cuestión involucrados con la empresa."
					>
						<UTextarea
							color="gray"
							placeholder="Razón de la acción"
							v-model="state.message"
						/>
					</UFormGroup>
					<span class="error text-end" v-if="labels.error">{{ labels.error.message }}</span>
				</div>
				<template #footer>
					<div class="flex flex-row gap-2 w-full justify-end">
						<UButton
							color="black"
							@click="close_modal"
							:disabled="labels.loading"
						>
							Cancelar
						</UButton>
						<UButton
							type="submit"
							:disabled="labels.loading"
						>
							{{ labels.confirm }}
						</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import type {ApolloError} from "@apollo/client/core/index.js";
import type {ObjectSchema} from "yup";

const props = defineProps<{
	on_submit: (message: string) => Promise<void>,
	on_close: () => void,
	schema: ObjectSchema<any>,
	labels: {
		header: string|undefined,
		confirm: string,
		description?: string,
		loading: boolean,
		error?: ApolloError | null | undefined
	}
}>()

const state = reactive({
	message: ""
})

const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});

const confirm = async () => {
	await props.on_submit(state.message).then(() => state.message = "")
}

const close_modal = () => {
	is_open.value = false
	state.message = ""
	props.on_close()
}
</script>
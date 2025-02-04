<template>
	
	<ProfileModalImage
		v-model="modal_image"
		:delete="delete_image"
		:update="update_image"
		:loading="loading_delete"
		:computed_image="computed_image"
	/>
	
	<UForm
		class="flex flex-col gap-4"
		:state="state"
		:schema="schema"
		@submit="props.update"
	>
		<GoToPrevious/>
		<UCard>
			<template #header> Editar empleador</template>
			
			<div class="flex flex-col gap-2">
				
				<div class="flex flex-col tablet:flex-row gap-2">
					
					<div
						class="w-40 h-full relative image-container self-center tablet:self-auto"
					>
						<img
							:src="computed_image.value"
							class="h-full tablet:h-32 aspect-[1/1] rounded-medium border border-slate-200"
							alt="Logo de empresa"
						/>
						<UButton
							icon="ri:pencil-fill"
							color="white"
							class="absolute bottom-1 left-1 button-from-container"
							label="Editar"
							@click="modal_image = true"
						/>
					</div>
					
					<div class="w-full gap-2 flex flex-col">
						<UFormGroup
							label="Nombre"
							name="name"
							class="w-full"
							required
						>
							<UInput
								v-model="state.name"
								color="gray"
							/>
						</UFormGroup>
						<UFormGroup
							label="Correo electrónico"
							name="email"
							class="w-full"
							required
						>
							<UInput
								v-model="state.email"
								color="gray"
							/>
						</UFormGroup>
					</div>
				
				</div>
				
				<div class="w-full flex flex-row gap-2">
					<UFormGroup
						label="Fecha de establecimiento"
						class="w-full"
						name="establishment_date"
						required
					>
						<VueDatePicker
							v-model="state.establishment_date"
							locale="es"
							:enable-time-picker="false"
							:timezone="{ emitTimezone: 'America/Santiago' }"
							:max-date="new Date()"
							auto-apply
							format="dd/MM/yyyy"
						
						>
							<template
								#dp-input="{value}"
								#trigger
							>
								<UInput
									:model-value="value"
									color="gray"
									:readonly="true"
								/>
							</template>
						</VueDatePicker>
					</UFormGroup>
					<UFormGroup
						label="Locación"
						name="location"
						class="w-full"
						required
					>
						<USelectMenu
							clear-search-on-close
							placeholder="Seleccione"
							searchable
							searchable-placeholder="Buscar"
							v-model="state.location"
							:options="postStore.location_options"
							option-attribute="name"
							size="md"
							color="gray"
						>
						</USelectMenu>
					</UFormGroup>
				</div>
				
				<div class="w-full">
					
					<UFormGroup
						label="Descripción"
						name="description"
						class="w-full"
					>
						<UTextarea
							v-model="state.description"
							color="gray"
						/>
					</UFormGroup>
				</div>
				<span class="error text-end" v-if="props.error">{{ props.error.message }}</span>
			</div>
			
			<template #footer>
				<div class="flex flex-row gap-2 justify-end w-full">
					<NuxtLink
						:to="props.cancel"
					>
						<UButton
							color="black"
							label="Cancelar"
							:loading="props.loading"
						/>
					</NuxtLink>
					
					<UButton
						label="Guardar"
						:disabled="props.loading"
						type="submit"
					/>
				</div>
			</template>
		
		</UCard>
	</UForm>
</template>

<script setup lang="ts">
import {deleteEmployerImage} from "~/queries";
import VueDatePicker from "@vuepic/vue-datepicker";
import {employer_schema} from "~/schemas/employer.schema";
import type {ApolloError} from "@apollo/client/core/index.js";
import type {ModelRef} from "vue";

const modal_image = ref(false);


const schema = employer_schema

const {props} = defineProps<{
	props: {
		loading: boolean,
		error?: ApolloError | null | undefined,
		update: () => Promise<void>,
		id: number,
		cancel: string
	}
}>()

interface modelInterface {
	name: any;
	establishment_date: any;
	email: any;
	description: any;
	profile_image: string | null;
	location: any;
	phone: any;
}

const state: ModelRef<modelInterface> = defineModel('state', {required: true})

const postStore = usePostStore();

const update_image = {
	on_change: async (new_image: string) => {
		state.value.profile_image = new_image
	},
	query: `mutation UploadEmployerImage($body: UploadDto!) { uploadEmployerImage(body: $body, id_employer: ${props.id})}`,
	field: 'uploadEmployerImage'
}

const {mutate: delete_image_mutation, loading: loading_delete} = useMutation(deleteEmployerImage);

const delete_image = async () => {
	await delete_image_mutation({"idEmployer": Number(props.id)});
	state.value.profile_image = null;
}

const computed_image = computed(() => ({
	value: state.value.profile_image ? state.value.profile_image : '/images/empleame_employer_silhouette.png',
	exists: !!state.value.profile_image
}))
</script>

<style>
.button-from-container {
	@apply opacity-0 transition-all;
}

.image-container:hover .button-from-container {
	@apply opacity-100;
}
</style>

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
		@submit="update"
	>
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
				<span class="error text-end" v-if="error">{{error.message}}</span>
			</div>

			<template #footer>
				<div class="flex flex-row gap-2 justify-end w-full">
					<NuxtLink
						:to="`/employer/${employer.id}`">
						<UButton
							color="black"
							label="Cancelar"
							:loading="loading"
						/>
					</NuxtLink>

					<UButton
						label="Guardar"
						:disabled="loading"
						type="submit"
					/>
				</div>
			</template>

		</UCard>
	</UForm>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {deleteEmployerImage, employerFindOne, employerUpdate} from "~/queries";
import VueDatePicker from "@vuepic/vue-datepicker";
import {employer_schema} from "~/schemas/employer.schema";

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})

const modal_image = ref(false);

const route = useRoute()
const schema = employer_schema

const {data} = await useAsyncQuery<{
	findOneEmployer: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}>(employerFindOne(), {"findOneEmployerId": Number(route.params.id)})

const postStore = usePostStore();

const {employer, employerUser} = data.value?.findOneEmployer!

const state = reactive({
	name: employer.name,
	establishment_date: employer.establishment_date,
	email: employer.email,
	description: employer.description,
	profile_image: employer.profile_image as string|null,
	location: employer.location ? postStore.location_options.find((e) => {
		if (e.id === employer.location?.id) return e
	}) : undefined,
	phone: employer,
})

//let { profile_image } = toRefs(state)

if (employerUser.level !== 'ADMIN') {
	useRouter().push('/')
	useToast().add({title: 'No puedes hacer esto'})
}

const update_image = {
	on_change: async (new_image: string) => {
		state.profile_image = new_image
	},
	query: `mutation UploadEmployerImage($body: UploadDto!) { uploadEmployerImage(body: $body, id_employer: ${employer.id})}`,
	field: 'uploadEmployerImage'
}

const { mutate: delete_image_mutation, loading: loading_delete } = useMutation(deleteEmployerImage);

const delete_image = async () => {
	await delete_image_mutation({ "idEmployer": Number(employer.id) });
	state.profile_image = null;
}

const {mutate, loading, error} = useMutation<{ employerUpdate: string }>(employerUpdate);

const update = async () => {
	await mutate({
		"employerUpdate": {
			"description": state.description,
			"email": state.email,
			"establishment_date": state.establishment_date,
			"id": Number(employer.id),
			"id_location": Number(state.location?.id),
			"name": state.name,
		}
	}).then((d) => {
		useToast().add({title: d?.data?.employerUpdate})
		useRouter().push(`/employer/${employer.id}`)
	})
}

const computed_image = computed(() => ({
	value: state.profile_image ? state.profile_image : '/images/empleame_employer_silhouette.png',
	exists: !!state.profile_image
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

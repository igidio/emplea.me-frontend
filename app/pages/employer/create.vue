<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Mis empleos',
      to: `/employer`
		}, {
			label: 'Crear perfil de empleador',
      to: `/employer/create`
		}]"/>

		<UForm
			class="flex flex-col gap-4"
			:state="state"
			:schema="schema"
			@submit="create"
		>
			<UCard>
				<template #header>Crear perfil de empleador</template>

				<div class="flex flex-col gap-2">

					<div class="flex flex-col tablet:flex-row gap-2">

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
					<UAlert title="Nota" color="violet">
						<template #description>
							<ul class="list-disc list-inside">
								<li>Una vez creado el perfil de empleador un administrador debe verificar que la empresa sea real.</li>
								<li>La información que ingreses aquí será visible para todos los usuarios de Empleame.</li>
								<li>Los administradores son libres de editar u eliminar cualquier contenido no apropiado en relación a
									la información o publicaciones del empleador.
								</li>
							</ul>
						</template>
					</UAlert>
					<span class="error text-end" v-if="error">{{ error.message }}</span>
				</div>


				<template #footer>
					<div class="flex flex-row gap-2 justify-end w-full">
						<NuxtLink
							to="/employer">
							<UButton
								color="black"
								label="Cancelar"
								:loading="loading"
							/>
						</NuxtLink>

						<UButton
							label="Continuar"
							:disabled="loading"
							type="submit"
						/>
					</div>
				</template>

			</UCard>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import {employer_schema} from "~/schemas/employer.schema";
import {employerCreate} from "~/queries";
import type {EmployerInterface, LocationInterface} from "~/interfaces";

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})
useHead({
	title: 'Crear perfil de empleador'
})

const postStore = usePostStore();

const router = useRouter()
const schema = employer_schema

const state = reactive({
	name: undefined as string | undefined,
	establishment_date: undefined,
	email: undefined as string | undefined,
	description: undefined as string | undefined,
	location: undefined as LocationInterface | undefined,
	phone: undefined,
})

const {mutate, loading, error} = useMutation<{ "employerCreate": EmployerInterface }>(employerCreate)

const create = () => {
	mutate({
		"createEmployerInput": {
			"description": state.description,
			"email": state.email,
			"establishment_date": state.establishment_date,
			"id_location": Number(state.location?.id),
			"name": state.name
		}
	}).then((e) => {
		router.push(`/employer/${e?.data?.employerCreate.id}`)
		useToast().add({title: 'Perfil de empleador creado', color: 'violet'})
	})
}
</script>
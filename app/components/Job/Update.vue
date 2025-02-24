<template>
	<div class="flex flex-col gap-4">

		<UForm class="flex flex-row w-full gap-4"
		       :schema="schema"
		       :state="state"
		       @submit="props.update"
		>

			<UCard class="grow">
				<template #header>Actualizar publicación de trabajo</template>
				<div class="grow flex flex-col gap-4">
					<UFormGroup
						label="Título"
						name="name"
						required
					>
						<UInput
							color="gray"
							size="sm"
							placeholder="Nombre del nuevo trabajo"
							v-model="state.name"
						/>
					</UFormGroup>

					<UFormGroup
						label="Categoría:"
						required
						name="category"
					>
						<USelectMenu
							size="md"
							color="gray"
							searchable
							searchable-placeholder="Seleccione"
							v-model="state.category"
							:options="categories"
							option-attribute="name"
						/>
					</UFormGroup>

					<div class="flex flex-col tablet:flex-row gap-4">
						<UFormGroup
							label="Salario"
							class="w-full tablet:w-1/2"
							name="salary"
							help="El monto del salario se mostrará si llenas este campo"
						>
							<UInput
								color="gray"
								size="md"
								placeholder="Salario en Bolivianos"
								type="number"
								v-model="state.salary"
							/>
						</UFormGroup>

						<UFormGroup
							label="Tipo de salario"
							class="grow"
							name="salary_type"
						>
							<USelect
								color="gray"
								size="md"
								:options="enum_to_array(SalaryEnum)"
								v-model="state.salary_type"
							>

							</USelect>
						</UFormGroup>


					</div>

					<UFormGroup
						label="Descripción"
						name="description"
						required
					>
						<UTextarea
							color="gray"
							size="md"
							v-model="state.description"
						>

						</UTextarea>
					</UFormGroup>

					<UFormGroup
						label="Lugar"
						required
						name="location"
					>
						<USelectMenu
							clear-search-on-close
							placeholder="Seleccione"
							searchable
							searchable-placeholder="Buscar"
							v-model="state.location"
							:options="location_options"
							option-attribute="name"
							size="md"
							color="gray"
						/>
					</UFormGroup>

					<UFormGroup
						label="Modalidad"
						required
						name="modality"

					>
						<USelect
							color="gray"
							size="md"
							:options="enum_to_array(ModalityEnum)"
							v-model="state.modality"
						>

						</USelect>
					</UFormGroup>
					<UAlert title="A considerar:" color="violet">
						<template #description>
							<ul class="list-disc list-inside">
								<li>Los administradores son libres de editar u eliminar cualquier contenido no apropiado en relación a
									la información o publicaciones del empleador.
								</li>
							</ul>
						</template>
					</UAlert>
				</div>
				<span
					class="error mt-2 inline-block w-full text-end"
					v-if="props.error"
				>{{ props.error.message }}</span>
				<template #footer>
					<div class="flex flex-row gap-4 justify-end h-fit">
						<NuxtLink :to="props.cancel">
							<UButton color="black" size="md"
							         :disabled="props.loading"
							>Cancelar
							</UButton>
						</NuxtLink>
						<UButton size="md" type="submit" :disabled="props.loading">Guardar</UButton>
					</div>
				</template>
			</UCard>

		</UForm>
	</div>

</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import {enum_to_array} from "~/helpers";
import {ModalityEnum, SalaryEnum} from "~/enums";
import {post_schema} from "~/schemas";
import type {ModelRef} from "vue";

const {categories, location_options} = usePostStore()

interface modelInterface {
	name: string,
	category: any,
	salary: number,
	salary_type: string,
	description: string,
	location: any,
	modality: string
}

const state: ModelRef<modelInterface> = defineModel('state', {required: true})

const {props} = defineProps<{
	props: {
		id: number,
		loading: boolean,
		error: any,
		update: () => Promise<void>,
		cancel: string
	}
}>()

const schema = post_schema
</script>
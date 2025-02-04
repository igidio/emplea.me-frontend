<template>
	<div class="flex flex-col gap-4">
		<h4>Actualizar publicación de trabajo</h4>

		<UForm class="flex flex-row w-full gap-4"
		       :schema="schema"
		       :state="state"
		       @submit="submit"
		>

			<UCard class="grow">
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
					v-if="error"
				>{{ error.message }}</span>
				<template #footer>
					<div class="flex flex-row gap-4 justify-end h-fit">
						<NuxtLink :to="`/jobs/${useRoute().params.id}`">
						<UButton color="black" size="md"
						         :disabled="loading"
						>Cancelar
						</UButton>
						</NuxtLink>
						<UButton size="md" type="submit" :disabled="loading">Guardar</UButton>
					</div>
				</template>
			</UCard>

		</UForm>
	</div>

</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import type {PostInterface} from "~/interfaces";
import {enum_to_array} from "~/helpers";
import {ModalityEnum, SalaryEnum} from "~/enums";
import {post_schema} from "~/schemas";
import {postFindOne, postUpdate} from "~/queries";

const route = useRoute()

const {categories, location_options} = usePostStore()

const {data} = await useAsyncQuery<
	{
		post: {
			post: PostInterface,
			info: {
				type: "GUEST" | "SUPER" | "EMPLOYER" | "ATTENDANT" | "SEEKER";
				can_modify: boolean;
				show_employer: boolean;
			}
		}
	}
>(postFindOne(), {"id": Number(route.params.id)});

const schema = post_schema
const state = reactive({
	location: data.value?.post.post.location ? location_options.find((e) => {
		if (e.id === data.value?.post.post.location?.id) return e
	}) : undefined,
	description: data.value?.post.post.description,
	name: data.value?.post.post.name,
	salary: data.value?.post.post.salary,
	salary_type: data.value?.post.post.salary_type,
	modality: data.value?.post.post.modality,
	category: data.value?.post.post.category,
})

const {mutate, loading, error} = useMutation<{ "postUpdate": string }>(postUpdate)

const submit = async () => {
	await mutate({
		"updatePostInput": {
			"id": Number(route.params.id),
			"name": state.name,
			"id_category": Number(state.category?.id),
			"description": state.description,
			"id_location": Number(state.location?.id),
			"salary": Number(state.salary),
			"salary_type": state.salary_type,
			"modality": state.modality,
			"id_employer": Number(route.params.id)
		}
	}).then((e) => {
		useToast().add({title: e?.data?.postUpdate})
		useRouter().push(`/jobs/${route.params.id}?U`)
	}).catch((e) => {
		console.log(e)
	});
}
</script>
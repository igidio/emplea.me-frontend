<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: result?.findOneEmployer.employer.name!,
      to: `/employer/${result?.findOneEmployer.employer.id}`
		}, {
			label: 'Editar contacto de empleador',
      to: `/employer/${route.params.id}/edit`
		}]"/>

		<UForm class="flex flex-row w-full gap-4"
		       :schema="schema"
		       :state="state"
		       @submit="submit"
		>

			<UCard class="grow">
				<template #header>Crear publicación de trabajo</template>
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
						<UButton color="black" size="md"
						         @click="useRouter().push(`/employer/${useRoute().params.id}`)"
						         :disabled="loading"
						>Cancelar
						</UButton>
						<UButton size="md" type="submit" :disabled="loading">Guardar</UButton>
					</div>
				</template>
			</UCard>

		</UForm>
	</div>

</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";
import type {
	CategoryInterface,
	EmployerInterface,
	EmployerUserInterface,
	LocationInterface,
	PostInterface
} from "~/interfaces";
import {enum_to_array} from "~/helpers";
import {ModalityEnum, SalaryEnum} from "~/enums";
import {post_schema} from "~/schemas";
import {employerFindOne, postCreate} from "~/queries";

const user = useUserStore()
const route = useRoute()
definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER'],
	keepalive: false,
})
useHead({
	title: 'Crear publicación de trabajo'
})

const {result, refetch} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)})

const {categories, location_options} = usePostStore()

const schema = post_schema
const state = reactive({
	location: undefined as LocationInterface | undefined,
	description: '',
	name: '',
	salary: undefined as number | undefined,
	salary_type: enum_to_array(SalaryEnum)[0]?.value,
	modality: enum_to_array(ModalityEnum)[0]?.value,
	category: undefined as CategoryInterface | undefined,
})

const {mutate, loading, error} = useMutation<{ "postCreate": PostInterface }>(postCreate)

if (!result.value?.findOneEmployer.employer.is_verified) {
	await useRouter().replace(`/employer/${result.value?.findOneEmployer.employer.id}`)
	if (import.meta.client) useToast().add({title: 'No puedes editar un empleador no verificado.'})
}

const submit = async () => {
	await mutate({
		"createPostInput": {
			"name": state.name,
			"id_category": Number(state.category?.id),
			"description": state.description,
			"id_location": Number(state.location?.id),
			"salary": Number(state.salary),
			"salary_type": state.salary_type,
			"modality": state.modality,
			"id_employer": Number(route.params.id)
		}
	}).then(async (e) => {
		console.log(e)
		useToast().add({title: 'Publicación creada.'})
		await useRouter().push(`/jobs/${e?.data?.postCreate.id}`)
	}).catch((e) => {
		console.log(e)
	});
}
</script>
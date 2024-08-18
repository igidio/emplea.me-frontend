<template>
	<div class="flex flex-col gap-4">
		<h4>Crear publicación de trabajo</h4>

		<div class="flex flex-row gap-4">
			<UCard class="w-[80%]">
				<UForm :state="state" @submit="onSubmit()" class="flex flex-col gap-4">
					<UFormGroup label="Título" name="title">
						<UInput v-model="state.title" color="gray" />
					</UFormGroup>
					<UFormGroup label="Categoría" name="category">
						<UInput v-model="state.category" color="gray" />
					</UFormGroup>
					<div class="flex flex-row gap-4">
						<UFormGroup label="Salario" name="salary" class="grow">
							<UInput v-model="state.salary" color="gray" />
						</UFormGroup>
						<UFormGroup label="Tipo de salario" name="salary_type" class="grow">
							<UInput v-model="state.salary_type" color="gray" />
						</UFormGroup>
					</div>
					<UFormGroup label="Descripción" name="description">
						<UTextarea
							v-model="state.description"
							color="gray"
							placeholder="Tu descripción..."
						/>
					</UFormGroup>
					<UFormGroup label="Locación" name="location" class="grow">
						<UInput v-model="state.salary_type" color="gray" />
					</UFormGroup>
					<UFormGroup label="Modalidad" name="modality" class="grow">
						<UInput v-model="state.modality" color="gray" />
					</UFormGroup>
					<div class="flex flex-row gap-4 justify-end">
						<UButton to="/jobs" color="black">Cancelar</UButton>
						<UButton type="submit">Guardar</UButton>
					</div>
				</UForm>
			</UCard>
			<UCard class="w-[20%] h-fit">
				<div class="flex flex-col gap-4">
					<h6>Habilidades necesarias</h6>
					<UButton
						color="black"
						icon="ri:ball-pen-fill"
						class="w-full"
						@click="isOpen = true"
						>Editar</UButton
					>
					{{ isOpen }}
					<div class="flex flex-col gap-4">
						<item
							:icon="skillLevelIcon[skill.level]"
							v-for="skill in skills"
							:label="skill.level"
							:label-bold="skill.name"
						/>
					</div>
				</div>
			</UCard>
		</div>
	</div>

	<JobSkillsModal v-model="isOpen" />
</template>

<script setup lang="ts">
import { skillLevelEnum } from "~/enums/skill_level.enum";

const isOpen = ref(false);

const state = reactive({
	title: undefined,
	category: undefined,
	salary: undefined,
	salary_type: undefined,
	description: undefined,
	location: undefined,
	modality: undefined,
});

const onSubmit = () => {
	alert("asdasdasds");
	// TODO: enviar datos del formulario a servidor
};

const skills = ref([
	{
		name: "skill-1",
		level: skillLevelEnum.ADVANCED,
	},
	{
		name: "skill-2",
		level: skillLevelEnum.INTERMEDIATE,
	},
	{
		name: "skill-3",
		level: skillLevelEnum.BASIC,
	},
]);

const skillLevelIcon = {
	[skillLevelEnum.BASIC]: "ri:progress-3-line",
	[skillLevelEnum.INTERMEDIATE]: "ri:progress-4-line",
	[skillLevelEnum.ADVANCED]: "ri:progress-8-line",
};
</script>

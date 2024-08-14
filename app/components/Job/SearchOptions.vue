<template>
	<h5>Opciones</h5>
	<UFormGroup label="Buscar">
		<UInput size="lg" placeholder="Un trabajo" />
	</UFormGroup>
	<UButton size="lg">Buscar</UButton>

	<h6>Modalidad</h6>
	<div class="flex flex-col gap-2">
		<UCheckbox
			v-for="modality in searchModel.modalities"
			:label="modality.name"
			v-model="modality.active"
		/>
	</div>

	<div class="flex flex-col gap-2">
		<h6>Categoría</h6>
		<USelectMenu
			placeholder="Seleccione"
			searchable
			searchable-placeholder="Buscar"
			v-model="searchModel.category"
			:options="searchOptions.categories"
			option-attribute="name"
			size="lg"
		/>
	</div>

	<div class="flex flex-col gap-2">
		<h6>Departamento</h6>
		<USelectMenu
			placeholder="Seleccione"
			searchable
			searchable-placeholder="Buscar"
			v-model="searchModel.department"
			:options="searchOptions.departments"
			option-attribute="name"
			size="lg"
		/>
	</div>

	<div class="flex flex-col gap-2">
		<h6>Provincia</h6>
		<USelectMenu
			placeholder="Seleccione"
			searchable
			searchable-placeholder="Buscar"
			v-model="searchModel.province"
			:options="searchOptions.provinces"
			option-attribute="name"
			size="lg"
		/>
	</div>
	<Add class="h-64" v-if="add"></Add>
</template>

<script setup lang="ts">
import { _checked } from "#tailwind-config/theme/aria";
import type { ModelRef } from "vue";

interface Props {
	add?: boolean;
	searchOptions?: any;
}
const searchModel: ModelRef<any> = defineModel();

defineProps<Props>();

const checked = ref(false);
</script>

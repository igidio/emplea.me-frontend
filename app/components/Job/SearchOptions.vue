<template>
	<h5>Opciones</h5>
	<UFormGroup label="Buscar">
		<UInput size="lg" placeholder="Un trabajo" v-model="searchInput" />
	</UFormGroup>
	<UButton size="lg" @click="sendSearchQuery()">Buscar</UButton>

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
			clear-search-on-close
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
		<h6>Localización</h6>
		<USelectMenu
			clear-search-on-close
			placeholder="Seleccione"
			searchable
			searchable-placeholder="Buscar"
			v-model="searchModel.location"
			:options="searchOptions.locations"
			option-attribute="name"
			size="lg"
		/>
	</div>

	<UButton size="lg" color="white" @click="clear()">Limpiar</UButton>
	<Add class="h-64" v-if="add"></Add>
</template>

<script setup lang="ts">
import type {
	ModalitiesInterface,
	SearchModelInterface,
} from "~/interfaces/search-model.interface";

interface Props {
	add?: boolean;
	searchOptions?: any;
}
defineProps<Props>();

const searchModel = defineModel<SearchModelInterface>("searchModel", {
	type: Object,
	required: true,
});

const isOpen = defineModel<boolean>("isOpen", {
	type: Boolean,
	required: false,
});

const searchInput = ref("");

const sendSearchQuery = () => {
	searchModel.value.searchQuery = searchInput.value;
	isOpen.value = false;
};

const clear = () => {
	searchModel.value.modalities = searchModel.value.modalities.map(
			(e: ModalitiesInterface) => ({
				...e,
				active: false,
			})
	);
	searchModel.value.location = undefined;
	searchModel.value.searchQuery = undefined;
	searchModel.value.category = undefined;
	searchInput.value = "";

	isOpen.value = false;
};
</script>

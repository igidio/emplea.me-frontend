<template>
	<div class="flex flex-col gap-4 bg-violet-200 rounded-medium p-4">
		<div class="flex flex-col gap-1">
			<span>Eres:</span>

			<span class="font-semibold">{{ descriptions[level].title }}</span>
		</div>
		<div class="flex flex-col gap-1">
			<span>Puedes:</span>
			<ul>
				<li v-for="l in descriptions[level].list">{{ l }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import {EmployerLevelEnum} from "~/enums";

interface Props {
	role: string;
}
const { role } = defineProps<Props>();

const level = EmployerLevelEnum[role as keyof typeof EmployerLevelEnum]

const descriptions = {
	Administrador: {
		title: "Administrador",
		list: [
			"Crear publicaciones",
			"Destacar publicaciones. ⭐",
			"Agregar empleados para administrar.",
			"Eliminar empleados.",
			"Cambiar la información del negocio.",
		],
	},
	Encargado: {
		title: "Encargado",
		list: ["Crear y eliminar tus propias publicaciones"],
	},
};
</script>

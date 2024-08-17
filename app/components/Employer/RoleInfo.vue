<template>
	<div class="flex flex-col gap-4 bg-violet-200 rounded-medium p-4">
		<div class="flex flex-col gap-1">
			<span>Eres:</span>
			<span class="font-semibold">{{ descriptions[role].title }}</span>
		</div>
		<div class="flex flex-col gap-1">
			<span>Puedes:</span>
			<ul>
				<li v-for="l in descriptions[role].list">{{ l }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { roleEnum } from "~/enums/role.enum";

interface Props {
	role: roleEnum; // TODO: Crear enum de role
}
defineProps<Props>();

const descriptions = {
	administrador: {
		title: "Administrador",
		list: [
			"Crear publicaciones",
			"Destacar publicaciones. ⭐",
			"Agregar empleados para administrar.",
			"Eliminar empleados.",
			"Cambiar la información del negocio.",
		],
	},
	encargado: {
		title: "Encargado",
		list: ["Crear y eliminar tus propias publicaciones"],
	},
};
</script>

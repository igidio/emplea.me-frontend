<template>
	Trabajos
	<span v-if="title.category">: {{ title.category }} </span>
	<span v-if="title.department || title.province">
		en {{ title.province }} -
		{{ title.department }}
	</span>
</template>

<script setup lang="ts">
import type { LocationQuery } from "vue-router";
import type { TitleInterface } from "~/interfaces/search-model.interface";

interface Props {
	title: TitleInterface;
}
defineProps<Props>();
</script>

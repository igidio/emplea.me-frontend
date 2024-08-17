<template>
	Trabajos
	<span v-if="title.category">: {{ title.category }} </span>
	<span v-if="title.location"> en {{ title.location }} </span>
</template>

<script setup lang="ts">
import type { TitleInterface } from "~/interfaces/search-model.interface";

interface Props {
	title: TitleInterface;
}
defineProps<Props>();
</script>

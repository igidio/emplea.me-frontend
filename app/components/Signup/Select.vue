<template>
	<h3 class="mb-4">¿Qué vas a hacer hoy?</h3>
	<div class="flex flex-col w-full max-w-[652px] gap-4">
		<UButton
			color="primary"
			variant="outline"
			size="lg"
			class="w-full"
			v-for="(data, index) in signupData"
			@click="
				() => {
					selection = index;
				}
			"
			>{{ data.message }}</UButton
		>
		{{ selection }}
	</div>
</template>

<script setup lang="ts">
import signupData from "~/data/signup.data.js";
const selection = defineModel();
</script>

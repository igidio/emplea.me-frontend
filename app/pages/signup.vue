<template>
	<div class="flex flex-col items-center mx-4">
		<h3 class="mb-4">¿Qué vas a hacer hoy?</h3>
		<div class="flex flex-col w-full max-w-[652px] gap-4">
			<UButton
				color="primary"
				variant="outline"
				size="lg"
				class="w-full"
				v-for="data in signupData"
				>{{ data.message }}</UButton
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
import signupData from "~/data/signup.data.js";
</script>

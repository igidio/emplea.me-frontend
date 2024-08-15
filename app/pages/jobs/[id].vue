<template>
	<div class="flex flex-col">
		<div class="flex flex-row">Volver</div>
		<div class="flex flex-row">
			<div class="flex flex-col bg-white w-[70%] gap-2">
				<h2>{{ job.title }}</h2>
				<span class="font-semibold">Descripción de trabajo</span>
				<div class="flex flex-row">
					<div class="flex flex-row w-[30%]"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const job = reactive({
	title: "job-title",
});
</script>

<template>
	<div class="flex flex-col gap-4 center">
		<div class="flex flex-row gap-4">
			<EmployerCardButton
				:name="employment.name"
				:role="employment.role"
				v-for="employment in employments"
			/>
			<EmployerCardButtonAdd />
		</div>

		<EmployerPage />
	</div>
</template>

<script setup lang="ts">
const employments = [
	{
		name: "name",
		role: "admin",
	},
	{
		name: "name",
		role: "employer",
	},
];
</script>

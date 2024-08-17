<template>
	<div class="flex flex-col gap-4">
		<h2>Mis favoritos</h2>
		<div class="flex flex-col tablet:flex-row gap-4">
			<UCard class="w-full tablet:w-[80%]">
				<template #header>{{ favorites_count }} favoritos</template>
				<div class="flex flex-col gap-4">
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<Add class="h-32" />
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<Add class="h-32" />
					<JobListElement />
					<JobListElement />
					<JobListElement />
				</div>
			</UCard>
			<div class="flex flex-col w-full tablet:w-[20%]">
				<Add class="h-64" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const favorites_count = ref(100);
</script>

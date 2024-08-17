<template>
	<UCard>
		<template #header>Publicaciones</template>
		<div class="flex flex-col gap-4">
			<UButton icon="ri:add-circle-line" size="lg">Agregar</UButton>
			<JobListElement />
			<JobListElement />
			<JobListElement />
			<JobListElement />
			<Add class="h-32" />
			<JobListElement />
			<JobListElement />
			<JobListElement />
		</div>
	</UCard>
</template>

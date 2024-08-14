<template>
	<UCard class="w-full">
		<template #header> Destacado</template>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<JobListElement />
				<JobListElement />
				<JobListElement />
			</div>

			<NuxtLink to="jobs">
				<UButton size="lg" class="w-full">Ver todos los trabajos</UButton>
			</NuxtLink>
		</div>

		<template #footer>
			<span class="font-semibold">
				¿Eres empleador?, ¿Quieres que tu trabajo se encuentre acá?,
				<NuxtLink to="signup">puedes registrarlo fácilmente.</NuxtLink>
			</span>
		</template>
	</UCard>
</template>

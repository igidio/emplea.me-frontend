<template>
	<UCard class="w-full">
		<template #header> Destacado</template>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<EmployerListElement />
				<EmployerListElement />
				<EmployerListElement />
			</div>

			<UButton size="lg" class="w-full">Ver todos los trabajos</UButton>
		</div>

		<template #footer>
			<span class="font-semibold"
				>¿Eres empleador?, ¿Quieres que tu trabajo se encuentre acá?, puedes
				registrarlo fácilmente.</span
			>
		</template>
	</UCard>
</template>

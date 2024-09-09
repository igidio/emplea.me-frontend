<template>
	<footer
		class="h-auto text-center shrink-0 flex flex-col tablet:flex-row justify-between bg-white rounded-t-xlarge mx-4 py-8 px-12 gap-4"
	>
		<div class="flex flex-col gap-2 justify-start left">
			<h5>igid.io</h5>
			<span>Proyecto realizado por Salvador Igidio Cáceres C.</span>
			<span>salvadorcaceresc@gmail.com</span>
			<span><UIcon name="ri:github-fill" /> igidio</span>
			<span><UIcon name="ri:linkedin-fill" /> in/igidio</span>
		</div>

		<div class="flex flex-col gap-2 tablet:right left">
			<h6>Adicional</h6>
			<span>Acerca de</span>
			<span>Contáctanos</span>
			<span>Política de privacidad</span>
		</div>
	</footer>
</template>

<style scoped>
.left > * {
	@apply text-start;
}
.right > * {
	@apply text-end;
}
</style>

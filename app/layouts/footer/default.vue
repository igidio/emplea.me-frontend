<template>
	<footer
		class="h-auto text-center shrink-0 flex flex-col tablet:flex-row justify-between bg-white rounded-t-xlarge mx-4 py-8 px-12 gap-4"
	>
		<div class="flex flex-col gap-2 justify-start left">
			<NuxtLink to="https://igid.io">
			<h5>igid.io</h5>
			</NuxtLink>
			<span>Proyecto realizado por Salvador Igidio Cáceres C.</span>
			<a href="mailto:salvadorcaceresc@gmail.com">salvadorcaceresc@gmail.com</a>
			<a href="https://github.com/igidio" target="_blank"><UIcon name="ri:github-fill" /> igidio</a>
			<a href="https://www.linkedin.com/in/igidio/" target="_blank"><UIcon name="ri:linkedin-fill" /> in/igidio</a>
		</div>

		<div class="flex flex-col gap-2 tablet:right left">
			<h6>Adicional</h6>
			<NuxtLink to="/faq">Preguntas frecuentes</NuxtLink>
			<NuxtLink to="/additional?o=0">Acerca de</NuxtLink>
			<NuxtLink to="/additional?o=1">Contáctanos</NuxtLink>
			<NuxtLink to="/additional?o=2">Política de privacidad</NuxtLink>
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
<script setup lang="ts">
</script>
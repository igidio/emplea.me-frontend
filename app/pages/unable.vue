<template>
	<div class="flex flex-col self-center items-center gap-4 m-4">
	<h3>Tu cuenta está deshabilitada</h3>
	<p>Si cree que fue un error hable con el equipo de soporte de EMPLEAME (soporte@empleame.com).</p>
		<UButton
			label="Cerrar sesión"
			size="lg"
			class="px-12"
			@click="useUserStore().logout_user()"
		/>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Tu cuenta está deshabilitada'
})
</script>
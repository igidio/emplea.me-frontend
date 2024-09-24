<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Cambiar contraseña</template>
			<div
				class="flex tablet:flex-row flex-col tablet:grid-cols-2 gap-16 w-full justify-center"
			>
				Restaurar contraseña
			</div>
			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton color="black" @click="isOpen = false">Cerrar</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel({ required: true, default: false });
</script>

<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Foto de perfil</template>

			<div
				class="flex flex-row tablet:grid-cols-2 gap-16 w-full justify-center"
			>
				<img
					src="/images/empleame_user_silhouette.png"
					alt=""
					class="rounded-full h-fit w-64"
				/>
				<div class="flex flex-col gap-2 self-center">
					<UButton color="black">Subir foto de perfil</UButton>
					<span class="mb-4">Formatos permitidos: jpg, jpeg, png</span>
					<UButton color="black">Eliminar</UButton>
				</div>
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

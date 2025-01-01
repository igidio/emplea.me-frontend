<template>
	<UModal v-model="is_open">
		<UCard class="text-center">
			<div class="flex flex-col gap-4 text-center">
				<p>Debes iniciar sesión para ver este contenido.</p>
				<NuxtLink to="/login" @click="is_open = false">
					<UButton class="w-[60%] self-center">Iniciar sesión</UButton>
				</NuxtLink>
			</div>
			<template #footer>
				<span class="font-semibold">¿No tienes cuenta?, puedes <NuxtLink @click="is_open = false" class="hyper"
				                                                                 to="/signup">registrarte</NuxtLink>.</span>
			</template>
		</UCard>
	</UModal>


</template>

<script setup lang="ts">
const is_open = defineModel<boolean>("is_open", {
	type: Boolean,
	required: false,
	default: false,
});
</script>
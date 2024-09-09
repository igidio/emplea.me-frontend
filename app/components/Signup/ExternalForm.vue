<template>
	<div class="flex flex-col gap-2 items-center mb-4">
		<h5>
			{{ signupData[selection]?.message }}
		</h5>
		<UButton color="white" @click="change_selection" class="w-fit"
			>Cambiar</UButton
		>
		<div><b>Falta poco para completar tu registro</b></div>
	</div>
	<div
		class="grid grid-cols-2 bg-violet-100 w-[80%] gap-4 px-4 py-6 rounded-large"
	>
		<UFormGroup
			label="Nombre de usuario"
			help="Con el nombre de usuario podrás ingresar a tu cuenta"
		>
			<UInput placeholder="Tu nombre de usuario" size="lg" />
		</UFormGroup>

		<UFormGroup
			label="Número telefónico"
			help="Tu número no se va a mostrar públicamente"
		>
			<UInput placeholder="--------" size="lg">
				<template #leading>
					<span class="font-bold dark:text-gray-400 text-xs">+591</span>
				</template>
			</UInput>
		</UFormGroup>

		<UFormGroup label="Nombres">
			<UInput placeholder="Tus nombres" size="md" />
		</UFormGroup>

		<UFormGroup label="Apellidos">
			<UInput placeholder="Tus apellidos" size="md" />
		</UFormGroup>

		<UFormGroup label="Género">
			<UInput placeholder="Tus apellidos" size="md" />
		</UFormGroup>

		<UFormGroup label="Fecha de nacimiento">
			<UInput placeholder="DD/MM/AAAA" size="md" />
		</UFormGroup>
	</div>

	<div class="flex flex-row w-full justify-center mt-4 gap-4">
		<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
		<UButton size="lg" class="w-40">Registrarme</UButton>
	</div>

	<span class="font-semibold mt-4">
		Al registrarte estás aceptandos los
		<NuxtLink class="hyper" to="/terms-of-service"
			>términos y condiciones.</NuxtLink
		>
	</span>
</template>

<script setup lang="ts">
interface props {
	change_selection: () => void;
	selection: number;
}

import signupData from "~/data/signup.data.js";

defineProps<props>();
</script>

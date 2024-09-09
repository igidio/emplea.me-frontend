<template>
	<div class="flex flex-col gap-2 items-center">
		<h3>Ingresa tus datos</h3>
		<h5>
			{{ signupData[selection]?.message }}
		</h5>
		<UButton color="white" @click="change_selection">Cambiar</UButton>
		<div class="flex flex-row gap-4 my-4">
			<AuthExternal />
		</div>
	</div>

	<div class="flex flex-row w-[80%] gap-4">
		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Información de Usuario</h5>
			<div class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large">
				<UFormGroup label="Correo electónico">
					<UInput placeholder="correo_electronico@mail.com" size="lg" />
				</UFormGroup>

				<div class="flex flex-row gap-4">
					<UFormGroup
						class="w-full"
						label="Nombre de usuario"
						help="Con el nombre de usuario podrás ingresar a tu cuenta"
					>
						<UInput placeholder="Tu nombre de usuario" size="lg" />
					</UFormGroup>

					<UFormGroup
						class="w-full"
						label="Número telefónico"
						help="Tu número no se va a mostrar públicamente"
					>
						<UInput placeholder="--------" size="lg">
							<template #leading>
								<span class="font-bold dark:text-gray-400 text-xs">+591</span>
							</template>
						</UInput>
					</UFormGroup>
				</div>
				<UFormGroup label="Contraseña">
					<UInput size="lg" />
				</UFormGroup>

				<UFormGroup label="Repetir contraseña">
					<UInput size="lg" />
				</UFormGroup>
			</div>
		</div>

		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Datos de contacto</h5>
			<div
				class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large h-fit"
			>
				<div class="flex flex-row gap-4">
					<UFormGroup label="Nombres" class="w-full">
						<UInput placeholder="Tus nombres" size="md" />
					</UFormGroup>

					<UFormGroup label="Apellidos" class="w-full">
						<UInput placeholder="Tus apellidos" size="md" />
					</UFormGroup>
				</div>

				<div class="flex flex-row gap-4">
					<UFormGroup label="Género" class="w-full">
						<UInput placeholder="Tus apellidos" size="md" />
					</UFormGroup>

					<UFormGroup label="Fecha de nacimiento" class="w-full">
						<UInput placeholder="DD/MM/AAAA" size="md" />
					</UFormGroup>
				</div>
			</div>
			<div class="flex flex-row w-full justify-center gap-4">
				<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
				<UButton size="lg" class="w-40">Registrarme</UButton>
			</div>

			<span class="font-semibold text-center">
				Al registrarte estás aceptandos los
				<NuxtLink class="hyper" to="/terms-of-service"
					>términos y condiciones.</NuxtLink
				>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
interface props {
	change_selection: () => void;
	selection: number;
}

import signupData from "~/data/signup.data.js";

defineProps<props>();
</script>

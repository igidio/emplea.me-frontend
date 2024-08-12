<template>
	<div class="flex flex-col gap-4 mx-4">
		<div class="flex flex-col items-center gap-4">
			<h3>Ingresa tus datos</h3>
			<span class="text-2xl font-semibold">
				Voy a buscar trabajo.
				<NuxtLink class="font-semibold text-2xl">Cambiar</NuxtLink>
			</span>
			<div
				class="flex flex-col tablet:flex-row gap-2 w-full tablet:max-w-[500px]"
			>
				<AuthExternal text-prefix="Registrarse con " />
			</div>
		</div>

		<div class="flex flex-col tablet:flex-row gap-4">
			<div class="flex flex-col grow gap-4">
				<h6>Información de usuario</h6>
				<UCard>
					<div class="flex flex-col gap-2">
						<UFormGroup
							label="Correo electrónico"
							required
							size="lg"
							help="Con el correo electrónico podrás ingresar a tu cuenta"
						>
							<UInput placeholder="you@example.com" />
						</UFormGroup>

						<div class="flex flex-col desktop:flex-row gap-4">
							<UFormGroup
								label="Nombre de usuario"
								required
								help="Con el nombre de usuario podrás ingresar a tu cuenta"
								class="grow"
							>
								<UInput size="lg" color="white" placeholder="you@example.com" />
							</UFormGroup>
							<UFormGroup
								label="Número telefónico"
								required
								help="Con el nombre de usuario podrás ingresar a tu cuenta"
								class="grow"
							>
								<UInput size="lg" placeholder="--------">
									<template #leading>
										<span class="text-black font-semibold text-xs">+591</span>
									</template>
								</UInput>
							</UFormGroup>
						</div>

						<UFormGroup label="Contraseña" size="lg">
							<UInput />
						</UFormGroup>

						<UFormGroup label="Repetir contraseña" size="lg">
							<UInput />
						</UFormGroup>
					</div>
				</UCard>
			</div>

			<div class="flex flex-col grow gap-4">
				<h6>Datos de contacto</h6>
				<UCard>
					<div class="flex flex-col gap-4">
						<div class="flex flex-col desktop:flex-row gap-2">
							<UFormGroup label="Nombres" size="md" class="grow">
								<UInput placeholder="Nombre1 Nombre2" />
							</UFormGroup>
							<UFormGroup label="Apellidos" size="md" class="grow">
								<UInput placeholder="Apellido1 Apellido2" />
							</UFormGroup>
						</div>

						<div class="flex flex-col desktop:flex-row gap-4 grow">
							<UFormGroup label="Género" size="md" class="w-full">
								<USelect
									placeholder="Seleccione"
									:options="genres"
									option-attribute="show"
								/>
							</UFormGroup>
							<UFormGroup label="Fecha de Nacimiento" size="md" class="w-full">
								<UInput placeholder="DD/MM/AAAA" />
							</UFormGroup>
						</div>
					</div>
				</UCard>

				<div class="flex flex-col items-center gap-4 mt-4">
					<div class="flex flex-row gap-4 h-auto">
						<UButton size="lg" color="primary" variant="ghost"
							>Cancelar</UButton
						>
						<UButton size="lg" color="primary">Registrarme</UButton>
					</div>
					<div>
						<span class="font-semibold"
							>Al registrarte estás aceptando los
							<a href="#">términos y condiciones</a>.</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface genres {
	name: string;
	show: string;
}
const genres: genres[] = [
	{ name: "female", show: "Femenino" },
	{ name: "male", show: "Masculino" },
	{ name: "other", show: "Otro" },
];
</script>

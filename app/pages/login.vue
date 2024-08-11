<template>
	<div class="flex flex-col gap-4 w-screen">
		<h3>Bienvenido de vuelta</h3>

		<UCard>
			<div class="flex flex-col gap-4">
				<UInput
					v-model="usernameOrEmail"
					variant="big"
					placeholder="Nombre de usuario o correo electrónico"
				/>
				<UInput v-model="password" variant="big" placeholder="Contraseña" />
				<UButton block color="primary" variant="big">Iniciar sesión</UButton>
				<a href="">¿Olvidaste tu contraseña?</a>
				<UCheckbox v-model="rememberMe" name="remember-me" label="Recuérdame" />
			</div>
		</UCard>

		<div class="flex flex-col gap-4">
			También puedes probar:
			<div class="flex flex-row gap-3 w-full">
				<UButton color="primary" class="grow">Ingresar con Google</UButton>
				<UButton color="primary" class="grow">Ingresar con LinkedIn</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const usernameOrEmail: Ref<string> = ref("");
const password: Ref<string> = ref("");
const rememberMe: Ref<boolean> = ref(true);
</script>

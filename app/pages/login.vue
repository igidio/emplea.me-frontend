<template>
	<div>
		<h3>Bienvenido de vuelta</h3>

		<UCard>
			<UInput
				v-model="usernameOrEmail"
				placeholder="Nombre de usuario o correo electrónico"
			/>
			<UInput v-model="password" placeholder="Contraseña" />
			<UButton block>Iniciar sesión</UButton>
			<a href="">¿Olvidaste tu contraseña?</a>
			<UCheckbox v-model="rememberMe" name="remember-me" label="Recuérdame" />
		</UCard>
	</div>

	<div>
		También puedes probar:
		<UButton>Ingresar con Google</UButton>
		<UButton>Ingresar con LinkedIn</UButton>
	</div>
</template>

<script setup lang="ts">
const usernameOrEmail: Ref<string> = ref("");
const password: Ref<string> = ref("");
const rememberMe: Ref<boolean> = ref(true);
</script>

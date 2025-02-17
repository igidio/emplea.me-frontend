<template>
	<div class="flex flex-col items-center gap-4 m-4">
		<h6>Confirmación de correo electrónico</h6>
		<div class="w-1/2 text-center">
			<p>Es necesario confirmar su correo electrónico antes de usar nuestros servicios, esto lo puede hacer a través de la
				opción que nos permite enviarle un correo.</p>
		</div>
		<UButton :disabled="isButtonDisabled" icon="ri:mail-send-line" size="lg" :label="buttonLabel" @click="submit"/>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {gqlConfirmation} from '~/queries';
import {definePageMeta} from "#imports";

definePageMeta({
	middleware: defineNuxtRouteMiddleware((to, from) => {
		const {user} = storeToRefs(useUserStore())
		if (user.value?.has_activated) {
			useToast().add({
				title: 'Correo confirmado',
				description: 'Su correo ya ha sido confirmado, será redirigido al inicio.'
			});
			return navigateTo('/')
		}
	})
})

const isButtonDisabled = ref(false);
const buttonLabel = ref('Enviar correo electrónico');
const countdown = ref(300); // 5 minutes in seconds

const startCountdown = () => {
	const interval = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value--;
			buttonLabel.value = `Reintentar en ${Math.floor(countdown.value / 60)}:${String(countdown.value % 60).padStart(2, '0')}`;
		} else {
			clearInterval(interval);
			isButtonDisabled.value = false;
			buttonLabel.value = 'Enviar correo electrónico';
		}
	}, 1000);
};

const {mutate} = useMutation(gqlConfirmation.mail);

const submit = async () => {
	isButtonDisabled.value = true;
	await mutate().then(() => {
		useToast().add({
			title: 'Correo enviado',
			description: 'Se ha enviado un correo a su bandeja de entrada, por favor siga las instrucciones para confirmar su correo.'
		});
		isButtonDisabled.value = true;
		startCountdown();
	}).catch((e) => console.log(e));
};
</script>
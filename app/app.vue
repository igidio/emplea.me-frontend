<template>
	<ModalLogin v-model:is_open="is_open_modal_login"/>
	<ModalPremium v-model:is_open="is_open_modal_premium"/>

	<LoadingIndicator/>
	<LoadingFallback/>
	<div>
		<UNotifications/>
		<NuxtLayout :name="(['ADMIN', 'SUPERUSER'].includes(userStore.user_role)) ? 'admin' : 'main'">
			<NuxtPage/>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/user.pinia";
import LoadingFallback from "~/components/LoadingFallback.vue";
import ModalPremium from "~/components/modalPremium.vue";

useHead({
	title: 'Bienvenidos a Empleame',
	meta: [
		{name: 'google-adsense-account', content: 'ca-pub-6257864254238276'}
	],
	bodyAttrs: {
		class: 'test'
	},
	script: [{innerHTML: 'console.log(\'Hello world\')'}]
})

const {
	is_open_modal_login,
	is_open_modal_premium
} = storeToRefs(useUserStore())
const userStore = useUserStore();
</script>

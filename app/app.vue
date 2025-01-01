<template>
	<ModalLogin v-model:is_open="is_open_modal_login"/>
	<div>
		<UNotifications />
		<NuxtLayout name="main">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
useHead({
  title: 'Bienvenidos a Empleame',
  meta: [
    { name: 'google-adsense-account', content: 'ca-pub-6257864254238276' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})

const { is_open_modal_login } = storeToRefs(useUserStore())
</script>

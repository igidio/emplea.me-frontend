<template>
	<div class="h-auto w-auto relative">
		<div class="w-12">
			<div :class="is_admin ? 'logo_admin' : 'logo'" />
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	is_admin?: boolean
}
withDefaults(defineProps<Props>(), {
	is_admin: false
})
</script>

<style scoped>
.logo {
	@apply bg-violet-600 h-12;
	-webkit-mask-size: cover;
	mask-size: cover;
	mask: url(/svg/logo.svg) no-repeat 25% 25%;
}

.logo_admin {
	@apply bg-black h-8;
	-webkit-mask-size: cover;
	mask-size: cover;
	mask: url(/svg/logo.svg) no-repeat 25% 25%;
}
</style>

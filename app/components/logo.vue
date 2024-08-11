<template>
	<div class="h-auto w-auto relative">
		<div class="w-16">
			<div class="logo" />
		</div>
	</div>
</template>

<style .scoped>
.logo {
	@apply bg-violet-600 h-12;
	-webkit-mask-size: cover;
	mask-size: cover;
	mask: url(/svg/logo.svg) no-repeat 25% 25%;
}
</style>

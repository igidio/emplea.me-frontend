<template>
	<div class="flex flex-col place-content-between h-full content-between">
		<Header />
		<div class="w-full">
			<slot />
		</div>
		<Footer class="self-center my-4" />
	</div>
</template>

<template>
	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-full content-between"
	>
		<Header />
		<div class="w-full mt-16 tablet:mt-0">
			<slot />
		</div>
		<Footer />
	</div>
</template>

<template>
	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
	>
		<div>
			<Header />
			<div class="mt-6 flex justify-center">
				<div class="max-w-[1600px] w-full p-4">
					<slot />
				</div>
			</div>
		</div>

		<Footer />
	</div>
</template>

<script setup lang="ts"></script>

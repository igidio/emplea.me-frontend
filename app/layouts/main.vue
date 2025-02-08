<template>
	<div
			class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
			:class="'success'"
	>
		<div>
			<Header/>
			<div class="mt-6 flex justify-center">
				<div class="max-w-[1600px] w-full p-4">
					<slot/>
				</div>
			</div>
		</div>

		<!-- <Footer /> -->
		<NuxtLayout :name="footer">
			<NuxtPage/>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
const footer = "footer-default";
</script>

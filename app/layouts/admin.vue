<template>
	<div
		class="flex flex-col tablet:mb-0 tablet:place-content-between h-screen content-between"
	>
		<div class="flex flex-row w-full">
			<div class="hidden desktop:block">
				<AdminSidebar/>
			</div>
			<div class="block desktop:hidden">
				<AdminSlideover/>
			</div>


			<div class="w-full">
				<Header/>
				<div class="mt-6 flex justify-center mb-4">
					<div class="max-w-[1600px] w-full p-4">
						<slot/>
					</div>
				</div>

				<NuxtLayout :name="footer">
					<NuxtPage/>
				</NuxtLayout>
			</div>


		</div>


		<!-- <Footer /> -->


	</div>
</template>

<script setup lang="ts">
import AdminSidebar from "~/components/Admin/adminSidebar.vue";

const footer = "footer-default";
</script>
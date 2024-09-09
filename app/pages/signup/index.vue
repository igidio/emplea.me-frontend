<template>
	<div class="flex flex-col items-center mx-4">
		<div
			class="bg-white rounded-medium p-4 flex flex-row gap-2 items-center w-full max-w-[652px] mb-6"
		>
			<UIcon name="devicon:google" class="w-6 h-6" />
			<div class="flex flex-col">
				<span>Te vas a registrar como:</span>
				<span class="font-semibold"
					>{{ data.first_name }} {{ data.last_name }}</span
				>
			</div>
		</div>

		<h3 class="mb-4">¿Qué vas a hacer hoy?</h3>
		<div class="flex flex-col w-full max-w-[652px] gap-4">
			<UButton
				color="primary"
				variant="outline"
				size="lg"
				class="w-full"
				v-for="data in signupData"
				>{{ data.message }}</UButton
			>
		</div>

		<div>sadsadssadsad</div>
	</div>
</template>

<script lang="ts" setup>
import signupData from "~/data/signup.data.js";
import { js_decrypt } from "~/libraries/crypto.plugin";
const route = useRoute();

interface dataInterface {
	google_id: string;
	email: string;
	first_name: string;
	last_name?: string;
}

const data: Ref<dataInterface> = ref({} as dataInterface);

onMounted(() => {
	if (route.query.key) {
		data.value = JSON.parse(js_decrypt(route.query.key.toString()));
	}
});
</script>

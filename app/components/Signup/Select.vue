<template>
	<h3 class="mb-4">¿Qué vas a hacer hoy?</h3>
	<div class="flex flex-col w-full max-w-[652px] gap-4">
		<div class="flex flex-col tablet:flex-row gap-3 w-full">
			<AuthExternal
				text-prefix="Registrarse con "
				v-if="Object.keys(data_oauth).length == 0"
			/>
		</div>
		<UButton
			color="primary"
			variant="outline"
			size="lg"
			class="w-full"
			v-for="(result, index) in signupData"
			@click="change(index)"
			>{{ result.message }}</UButton
		>
		{{ selection }}
	</div>
</template>

<script setup lang="ts">
import signupData from "~/data/signup.data.js";

const { modify_query_params } = useSignupStore();
const { selection, data_oauth } = storeToRefs(useSignupStore());

const change = async (i:number) => {
	selection.value = i;
	await modify_query_params({ selection: i });
}
//const selection = defineModel();
</script>

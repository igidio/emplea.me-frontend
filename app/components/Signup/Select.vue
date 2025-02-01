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
			@click="
				() => {
					selection = index;
					modify_query_params({ selection: index });
				}
			"
			>{{ result.message }}</UButton
		>
		{{ selection }}
	</div>
</template>

<script setup lang="ts">
import signupData from "~/data/signup.data.js";

const { selection, modify_query_params, data_oauth } = useSignup();

//const selection = defineModel();
</script>

<template>
	{{ data_oauth }}
	<div class="flex flex-col items-center mx-4">
		<SignupGoogle
			v-if="Object.keys(data_oauth).length > 0"
			:first_name="data_oauth.first_name"
			:last_name="data_oauth.last_name"
			:email="data_oauth.email"
			:from="data_oauth.from"
		/>

		<SignupSelect v-if="selection === undefined"/>
		<SignupInternalForm
			v-if="selection !== undefined && Object.keys(data_oauth).length == 0"
		/>

		<SignupExternalForm
			v-if="selection !== undefined && Object.keys(data_oauth).length > 0"
		/>
	</div>
</template>

<script setup lang="ts">
import {definePageMeta} from "#imports";
import {useSignupStore} from "~/stores/signup.pinia";

const {set_selection} = useSignupStore();
const {selection, data_oauth} = storeToRefs(useSignupStore());

definePageMeta({
	middleware: ['external']
})

selection.value;
set_selection();

onUnmounted(() => {
	selection.value = undefined;
});

</script>

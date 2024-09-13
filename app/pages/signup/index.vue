<template>
	<div class="flex flex-col items-center mx-4">
		<SignupGoogle
			v-if="Object.keys(data_oauth).length > 0"
			:first_name="data_oauth.first_name"
			:last_name="data_oauth.last_name"
			:email="data_oauth.email"
		/>

		<SignupSelect v-if="selection === undefined" />

		<SignupInternalForm
			v-if="selection !== undefined && Object.keys(data_oauth).length == 0"
		/>
		<SignupExternalForm
			v-if="selection !== undefined && Object.keys(data_oauth).length > 0"
		/>
	</div>
</template>

<script setup lang="ts">
const { selection, data_oauth, set_selection, load_data } = useSignup();

selection.value;

set_selection();
if (useRoute().query.key) load_data();

onUnmounted(() => {
	selection.value = undefined;
});
</script>

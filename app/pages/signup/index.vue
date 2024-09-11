<template>
	<div class="flex flex-col items-center mx-4">
		<SignupGoogle
			v-if="Object.keys(data).length > 0"
			:first_name="data.first_name"
			:last_name="data.last_name"
			:email="data.email"
			:onSubmit="onSubmit"
		/>

		<SignupSelect
			v-model="selection"
			:modify="modify_query_params"
			v-if="selection === undefined"
		/>
		<SignupInternalForm
			v-if="selection !== undefined && Object.keys(data).length == 0"
			:change_selection="change_selection"
			:selection="selection"
			:schema="schema"
			:on_submit="onSubmit"
		/>
		<SignupExternalForm
			v-if="selection !== undefined && Object.keys(data).length > 0"
			:change_selection="change_selection"
			:selection="selection"
		/>
	</div>
</template>

<script setup lang="ts">
const {
	selection,
	change_selection,
	data,
	onSubmit,
	schema,
	set_selection,
	modify_query_params,
} = useSignup();

set_selection();
</script>

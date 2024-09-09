<template>
	<div class="flex flex-col items-center mx-4">
		<SignupGoogle
			v-if="Object.keys(data).length > 0"
			:first_name="data.first_name"
			:last_name="data.last_name"
			:email="data.email"
		/>

		<SignupSelect v-model="selection" v-if="selection === undefined" />
		<SignupInternalForm
			v-if="selection !== undefined && Object.keys(data).length == 0"
			:change_selection="change_selection"
			:selection="selection"
		/>
		<SignupExternalForm
			v-if="selection !== undefined && Object.keys(data).length > 0"
			:change_selection="change_selection"
			:selection="selection"
		/>
	</div>
</template>

<script lang="ts" setup>
import { js_decrypt } from "~/libraries/crypto.plugin";
const route = useRoute();

const selection: Ref<number | undefined> = ref();

interface dataInterface {
	google_id: string;
	email: string;
	first_name: string;
	last_name?: string;
}

const data: Ref<dataInterface> = ref({} as dataInterface);

const change_selection = () => {
	if (selection.value == 1) selection.value = 0;
	else if (selection.value == 0) selection.value = 1;
};

const load_data = () => {
	if (!route.query.key) {
		data.value = {} as dataInterface;
		return;
	}
	data.value = JSON.parse(js_decrypt(route.query.key!.toString()));
};

onMounted(() => {
	if (route.query.key) load_data();
});

watch(
	() => useRoute().query,
	() => load_data()
);
</script>

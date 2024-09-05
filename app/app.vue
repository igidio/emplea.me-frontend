<template>
	<NuxtLayout :name="layout">
		{{ auth }}

		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const layout = "unauthenticated";

const auth = ref();

if (import.meta.client) {
	auth.value = localStorage.getItem("token");
}

watch(
	() => localStorage.getItem("token"),
	() => alert("asdasd")
);
//const user_token = ;
</script>

<template>
	<div
		class="bg-white rounded-medium p-4 flex flex-row w-full max-w-[652px] mb-6 justify-between"
	>
		<div class="flex flex-row gap-2 items-center">
			<UIcon name="devicon:google" class="w-10 h-10" />
			<div class="flex flex-col">
				<span>Te vas a registrar como:</span>
				<span class="font-semibold">{{ first_name }} {{ last_name }}</span>
				<span>{{ email }}</span>
			</div>
		</div>
		<UButton color="black" class="h-fit self-center" @click="change_route()"
			>Cancelar</UButton
		>
	</div>
</template>

<script setup lang="ts">
interface props {
	first_name: string;
	last_name?: string;
	email: string;
}
defineProps<props>();

const change_route = () => {
	useRouter().push({
		path: "/signup",
		query: {},
	});
};
</script>

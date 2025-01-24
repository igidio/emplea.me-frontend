<template>
	<UButton
		color="white"
		class="flex flex-row tablet:flex-col gap-4 justify-start font-normal py-6 px-4 active overflow-x-clip whitespace-nowrap max-h-32"
		:to="`/jobs?category=${category.id}`"
	>
		<IconFill :name="category.icon"></IconFill>
		<span class="text-wrap text-center">{{ category.name }}</span>
	</UButton>
</template>

<script setup lang="ts">
import type { CategoryInterface } from "~/interfaces/category.interface";
const router = useRouter();

interface Props {
	category: CategoryInterface;
}

const redirect = (id: number) => {
	router.push({
		path: "/jobs",
		query: {
			category: id,
		},
	});
};

defineProps<Props>();
</script>

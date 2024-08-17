<template>
	<UButton color="primary" class="grow">
		<IconFill name="ri:google-fill" class="mr-2" />
		{{ textPrefix }} Google
	</UButton>
	<UButton color="primary" class="grow">
		<IconFill name="ri:linkedin-fill" class="mr-2" />
		{{ textPrefix }} LinkedIn
	</UButton>
</template>

<script setup lang="ts">
interface Props {
	textPrefix: string;
}

withDefaults(defineProps<Props>(), {
	textPrefix: "Ingresar con ",
});
</script>

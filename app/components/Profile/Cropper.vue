<template>
	<div
		class="overflow-hidden flex flex-row self-center justify-center w-[75%] gap-4"
	>
		<div class="h-64 rounded-large overflow-hidden">
			<Cropper
				class="cropper"
				:src="image"
				:stencil-props="{
					handlers: {},
					movable: false,
					resizable: true,
					aspectRatio: 1 / 1,
				}"
				:resize-image="{
					adjustStencil: false,
				}"
				:stencil-component="CircleStencil"
				@change="onCropChange"
				image-restriction="stencil"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<UButton color="black" @click="delete_image()">Cancelar</UButton>
			<UButton @click="send_image()">Subir</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

interface props {
	image: string;
	delete_image: () => void;
}
defineProps<props>();

const image_properties = ref({
	width: null,
	height: null,
	left: null,
	top: null,
});

const onCropChange = ({ coordinates, canvas }: any) => {
	console.log("Coordinates:", coordinates);
	console.log("Canvas:", canvas.height);
	console.log("Canvas:", canvas.width);

	image_properties.value = { ...coordinates };

	console.log(image_properties.value);
};

const send_image = () => {
	// TODO: Send Image to server, img to blob or base64

	console.log({
		image_properties: image_properties.value,
	});
};
</script>

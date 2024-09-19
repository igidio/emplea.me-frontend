<template>
	<div class="flex flex-col gap-4 h-full">
		<span>Recorta la imagen para ajustarla como foto de perfil:</span>
		<div
			class="overflow-hidden flex flex-col desktop:flex-row self-center justify-center gap-4"
		>
			<Cropper
				class="cropper rounded-large overflow-hidden aspect-[4/3] w-64 tablet:w-96"
				:src="image_url"
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

			<div class="flex flex-col gap-2 w-32 self-end">
				<UButton color="black" @click="delete_image()" :loading="loading"
					>Cancelar</UButton
				>
				<UButton @click="send_image()" :loading="loading">Subir</UButton>
			</div>
		</div>
		<span class="error" v-if="error">{{ "error" }}</span>
	</div>
</template>

<script setup lang="ts">
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const isOpen = defineModel({ required: true, default: false });
const { user } = storeToRefs(useUserStore());

interface props {
	image_url: string;
	image: File;
	delete_image: () => void;
}
const props = defineProps<props>();
const { image } = toRefs(props);
const error = ref();
const loading = ref(false);

const image_properties = ref({
	width: null,
	height: null,
	left: null,
	top: null,
});

const onCropChange = ({ coordinates }: any) => {
	image_properties.value = { ...coordinates };
};

const send_image = async () => {
	loading.value = true;
	const { user } = storeToRefs(useUserStore());

	const formData = new FormData();
	formData.append(
		"operations",
		JSON.stringify({
			query:
				"mutation UploadImage($body: UploadDto!) {uploadImage(body: $body)}",
			variables: {
				body: {
					image: null,
					image_properties: image_properties.value,
				},
			},
		})
	);
	formData.append(
		"map",
		JSON.stringify({
			"0": ["variables.body.image"],
		})
	);
	formData.append("0", image.value);

	try {
		const response = await fetch("http://localhost:3000/graphql", {
			method: "POST",
			body: formData,
			headers: {
				"x-apollo-operation-name": "multipart/form-data",
				Authorization: "Bearer " + useCookie("token").value,
			},
		});

		let data = await response.json();
		console.log(data);
		console.log(data.data.uploadImage);

		user.value.image = data.data.uploadImage;
		isOpen.value = false;
		props.delete_image();
		useToast().add({ title: "Imagen subida exitosamente" });
	} catch (err) {
		error.value = err;
	}

	loading.value = false;
};
</script>

<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Foto de perfil</template>

			<div
				class="flex tablet:flex-row flex-col tablet:grid-cols-2 gap-16 w-full justify-center"
				v-if="image_url === ''"
			>
				<img
					:src="computed_image"
					alt=""
					class="rounded-full h-fit w-64 self-center"
				/>
				<div class="flex flex-col gap-2 self-center w-full tablet:w-auto">
					<span class="font-semibold"
						>Seleccione una imagen desde su ordenador:</span
					>
					<UInput
						type="file"
						ref="fileInput"
						icon="i-heroicons-folder"
						accept="image/png, image/jpeg, image/jpg"
						color="gray"
						@change="onFileChange"
					/>

					<span class="mb-4">Formatos permitidos: jpg, jpeg, png</span>
					<UButton
						color="black"
						v-if="user.image"
						:loading="loading"
						@click="delete_image()"
						>Eliminar</UButton
					>
				</div>
			</div>
			<div
				class="flex tablet:flex-row flex-col tablet:grid-cols-2 gap-16 w-full justify-center"
				v-else
			>
				<ProfileCropper
					:image="image"
					:image_url="image_url"
					:delete_preview="delete_preview"
					v-model="isOpen"
				/>
			</div>

			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton color="black" @click="isOpen = false">Cerrar</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import { deleteImage } from "~/queries";

const isOpen = defineModel({ required: true, default: false });

const { user, computed_image } = storeToRefs(useUserStore());

const fileInput = ref<HTMLInputElement | null>(null);
const image_url = ref("");
const image = ref();

const onFileChange = () => {
	image.value = (fileInput.value as any).input.files[0];
	const blob = URL.createObjectURL(image.value);

	const reader = new FileReader();

	reader.onload = () => {
		image_url.value = blob;
	};

	reader.readAsArrayBuffer(image.value);
};

const { mutate, loading } = useMutation(deleteImage);

const delete_preview = () => {
	image.value = null;
	image_url.value = "";
};

const delete_image = () => {
	mutate();
	useToast().add({ title: "Tu imagen ha sido eliminada" });
	user.value.image = "";
};
</script>

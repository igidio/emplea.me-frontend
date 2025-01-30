<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Foto de perfil</template>

			<div
				class="flex tablet:flex-row flex-col tablet:grid-cols-2 gap-16 w-full justify-center"
				v-if="image_url === ''"
			>
				<img
					:src="computed_image.value"
					alt=""
					class="rounded-full h-fit w-64 self-center border"
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
						v-if="computed_image.exists"
						:loading="loading"
						@click="delete_image()"
					>Eliminar
					</UButton
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
					:update="update"
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
const isOpen = defineModel({required: true, default: false});
const props = defineProps<{
	computed_image: { value: string, exists: boolean },
	delete: () => Promise<void>,
	update: {
		query: string,
		on_change: (new_image: any) => void
	},
	loading: boolean
}>()

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

const delete_preview = () => {
	image.value = null;
	image_url.value = "";
};

const delete_image = async () => {
	useToast().add({title: "La imagen ha sido eliminada"});
	await props.delete()
};
</script>

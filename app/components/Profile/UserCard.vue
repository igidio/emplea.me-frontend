<template>
	<ProfileUserModal v-model="modal_user" />
	<ProfileModalContact v-model="modal_contact" />
	<ProfileModalImage v-model="modal_image" />
	<ProfileModalPassword v-model="modal_password" />
	<UCard>
		<div class="flex flex-col tablet:flex-row gap-4">
			<div
				class="w-48 h-full relative image-container self-center tablet:self-auto"
			>
				<img :src="computed_image" alt="" class="rounded-full h-fit" />
				<UButton
					icon="ri:pencil-fill"
					color="white"
					class="absolute bottom-0 right-0 button-from-container"
					label="Editar"
					@click="modal_image = true"
				/>
			</div>

			<div class="flex flex-col gap-4 tablet:ml-4 w-full">
				<div
					class="flex flex-col tablet:flex-row justify-between items-center gap-2"
				>
					<div class="flex flex-col gap-2 items-center tablet:items-start">
						<h3>{{ user.contact.first_name }} {{ user.contact.last_name }}</h3>
						<span>{{ get_gender_computed }} | {{ get_age_computed }}</span>
					</div>
					<UDropdown
						:items="items"
						:popper="{ placement: 'bottom-start' }"
						:ui="{
							width: 'w-50',
							background: 'bg-violet-100',
							item: {
								active: 'bg-violet-200',
							},
						}"
					>
						<UButton
							color="primary"
							label="Opciones"
							trailing-icon="i-heroicons-chevron-down-20-solid"
						/>
					</UDropdown>
				</div>
				<hr />
				<item
					icon="ri:user-3-fill"
					:label="`@${user.username}`"
					label_bold="Nombre de usuario:"
					one_line
				/>

				<item
					icon="ri:cellphone-fill"
					:label="user.contact.phone.toString()"
					label_bold="Número telefónico:"
					one_line
				/>
				<item
					icon="ri:mail-fill"
					:label="user.email"
					label_bold="Correo electrónico:"
					one_line
				/>
				<item
					icon="ri:time-fill"
					:label="get_date_computed"
					label_bold="Activo desde:"
					one_line
				/>

				<div class="flex flex-col desktop:flex-row gap-2">
					<UButton
						icon="ri:google-fill"
						label="Conectar con Google"
						v-if="!user.google_id"
					/>
					<UButton
						icon="ri:google-fill"
						label="Conectar con LinkedIn"
						v-if="!user.linkedin_id"
					/>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import { get_age, get_date, get_gender } from "~/helpers";

const modal_user = ref(false);
const modal_contact = ref(false);
const modal_image = ref(false);
const modal_password = ref(false);

const userStore = useUserStore();
const { user, computed_image } = storeToRefs(userStore);

const get_age_computed = computed(() => {
	return `${get_age(new Date(user.value.contact.date_of_birth))} años`;
});

const get_gender_computed = computed(() => {
	return get_gender(user.value.contact.gender);
});
const get_date_computed = computed(() => {
	return get_date(new Date(user.value.created_at));
});

const items = [
	[
		{
			label: "Modificar información del usuario",
			click: () => (modal_user.value = true),
		},
		{
			label: "Modificar información del contacto",
			click: () => (modal_contact.value = true),
		},
		{
			label: "Actualizar contraseña",
			click: () => (modal_password.value = true),
		},
	],
];
</script>

<style>
.button-from-container {
	@apply opacity-0 transition-all;
}
.image-container:hover .button-from-container {
	@apply opacity-100;
}
</style>

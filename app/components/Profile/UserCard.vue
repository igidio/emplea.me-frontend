<template>
	<ProfileUserModal v-model="modal_user"/>
	<ProfileModalContact
		v-model="modal_contact"
		:props="{
			last_name: user.contact.last_name,
			first_name: user.contact.first_name,
			phone: user.contact.phone,
			gender: user.contact.gender,
			date_of_birth: user.contact.date_of_birth,
		}"
	/>
	<ProfileModalImage
		v-model="modal_image"
		:delete="delete_image"
		:update="update_image"
		:loading="loading"
		:computed_image="computed_image"
	/>
	<ProfileModalPassword v-model="modal_password"/>
	<UCard>
		<div class="flex flex-col tablet:flex-row gap-4">
			<div
				class="w-48 h-full relative image-container self-center tablet:self-auto"
			>
				<img :src="computed_image.value" alt="" class="rounded-full h-fit border"/>
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
						<span>{{ (get_gender_computed && get_gender_computed !== GenderEnum.OTHER) && `${get_gender_computed} |` }} {{
								get_age_computed
							}}</span>
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
				<hr/>
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

				<div
					class="flex flex-row gap-1"
					v-if="user.google_id"
				>
					<Icon name="ri:google-fill" class="bg-violet-600" size="18"/>
					<span class="font-semibold inline-block">Vinculado con Google</span>
					<span class="hyper" @click="unlink_google">Desvincular</span>
				</div>

				<div
					class="flex flex-row gap-1"
					v-if="user.facebook_id"
				>
					<Icon name="ri:facebook-fill" class="bg-violet-600" size="18"/>
					<span class="font-semibold inline-block">Vinculado con Facebook</span>
					<span class="hyper" @click="unlink_facebook">Desvincular</span>
				</div>

				<div class="flex flex-col desktop:flex-row gap-2">
					<UButton
						icon="ri:google-fill"
						label="Conectar con Google"
						v-if="!user.google_id"
						@click="signInWithGoogle"
						:disabled="loading_link_google"
					/>
					<UButton
						icon="ri:facebook-fill"
						label="Conectar con Facebook"
						v-if="!user.facebook_id"
						@click="signInWithFacebook"
						:disabled="loading_link_facebook"
					/>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import {get_age, get_date, get_gender} from "~/helpers";
import {GenderEnum} from "~/enums";
import {deleteImage, gqlUser} from "~/queries";

const modal_user = ref(false);
const modal_contact = ref(false);
const modal_image = ref(false);
const modal_password = ref(false);

const userStore = useUserStore();
const store = storeToRefs(userStore);
const {computed_image} = store;
const {user} = storeToRefs(userStore);

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

const {mutate: delete_image_mutation, loading} = useMutation(deleteImage);

const delete_image = async () => {
	await delete_image_mutation()
	user.value.image = null
};

const update_image = {
	query: "mutation UploadImage($body: UploadDto!) {uploadImage(body: $body)}",
	on_change: (new_image: string) => {
		user.value.image = new_image
	},
	field: "uploadImage",
}

const {mutate: mutate_unlink_google} = useMutation<{ userUnlinkGoogle: string }>(gqlUser.unlinkGoogle)
const unlink_google = () => {
	let confirmation = confirm("¿Estás seguro de que deseas desvincular tu cuenta de Google?");
	if (confirmation) {
		mutate_unlink_google()
			.then(() => {
				user.value.google_id = null
				useToast().add({title: "Tu cuenta de Google ha sido desvinculada."})
			})
			.catch(() => alert("Ha ocurrido un error al desvincular tu cuenta de Google."));
	}
}

const {mutate: mutate_unlink_facebook} = useMutation<{ userUnlinkFacebook: string }>(gqlUser.unlinkFacebook)
const unlink_facebook = () => {
	let confirmation = confirm("¿Estás seguro de que deseas desvincular tu cuenta de Facebook?");
	if (confirmation) {
		mutate_unlink_facebook()
			.then(() => {
				user.value.facebook_id = null
				useToast().add({title: "Tu cuenta de Facebook ha sido desvinculada."})
			})
			.catch(() => alert("Ha ocurrido un error al desvincular tu cuenta de Facebook."));
	}
}

const config = useRuntimeConfig();

const signInWithGoogle = () => {
	const googleAuthUrl = `${config.public.server_host}/auth/google`;
	const width = 500;
	const height = 600;
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	window.open(
		googleAuthUrl,
		"GoogleAuth",
		`width=${width},height=${height},top=${top},left=${left}`
	);
	window.addEventListener("message", (event) => handleMessage(event, "google"), {once: true});
};

const signInWithFacebook = () => {
	const googleAuthUrl = `${config.public.server_host}/auth/facebook`;
	const width = 500;
	const height = 600;
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	window.open(
		googleAuthUrl,
		"FacebookAuth",
		`width=${width},height=${height},top=${top},left=${left}`
	);

	window.addEventListener("message", (event) => handleMessage(event, "facebook"), {once: true});
};

const {mutate: mutate_link_google, loading: loading_link_google} = useMutation<{ userLinkGoogle: string }>(gqlUser.linkGoogle);
const {mutate: mutate_link_facebook, loading: loading_link_facebook} = useMutation<{ userLinkFacebook: string }>(gqlUser.linkFacebook);

let handleMessage = async (event: MessageEvent, method: string) => {
	let queries = {
		method: event.data.method,
		id: event.data.id,
	};

	method === 'google' && await mutate_link_google({"googleId": queries.id})
		.then((e) => {
			useToast().add({title: e?.data?.userLinkGoogle})
			user.value.google_id = queries.id
		})
		.catch((e) => alert(e.message));

	method === 'facebook' && await mutate_link_facebook({"facebookId": queries.id})
		.then((e) => {
			useToast().add({title: e?.data?.userLinkFacebook})
			user.value.facebook_id = queries.id
		})
		.catch((e) => alert(e.message));
}

</script>

<style>
.button-from-container {
	@apply opacity-0 transition-all;
}

.image-container:hover .button-from-container {
	@apply opacity-100;
}
</style>

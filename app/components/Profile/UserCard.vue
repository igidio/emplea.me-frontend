<template>
	<UCard>
		<div class="flex flex-col tablet:flex-row gap-4">
			<div
				class="w-48 h-full relative image-container self-center tablet:self-auto"
			>
				<img
					src="/images/empleame_user_silhouette.png"
					alt=""
					class="rounded-full h-fit"
				/>
				<UButton
					icon="ri:pencil-fill"
					color="white"
					class="absolute bottom-0 right-0 button-from-container"
					label="Editar"
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
					<UButton icon="ri:pencil-fill" label="Editar" class="h-fit" />
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
					:label="user.contact.phone"
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
					<UButton icon="ri:google-fill" label="Conectar con Google" />
					<UButton icon="ri:google-fill" label="Conectar con LinkedIn" />
				</div>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import { get_age, get_date, get_gender } from "~/helpers";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const get_age_computed = computed(() => {
	return `${get_age(new Date(user.value.contact.date_of_birth))} años`;
});

const get_gender_computed = computed(() => {
	return get_gender(user.value.contact.gender);
});
const get_date_computed = computed(() => {
	return get_date(new Date(user.value.created_at));
});
</script>

<style>
.button-from-container {
	@apply opacity-0 transition-all;
}
.image-container:hover .button-from-container {
	@apply opacity-100;
}
</style>

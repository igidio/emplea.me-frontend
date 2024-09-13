<template>
	<UCard>
		<div class="flex flex-row gap-4">
			<img
				src="/images/empleame_user_silhouette.png"
				alt=""
				class="w-48 h-48 rounded-full"
			/>

			<div class="flex flex-col gap-4 ml-4 w-full">
				<h3>{{ user.contact.first_name }} {{ user.contact.last_name }}</h3>
				<span>{{ get_gender_computed }} | {{ get_age_computed }}</span>
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
					:label="user.contact.date_of_birth"
					label_bold="Activo desde:"
					one_line
				/>
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
	return get_date(user.value.contact.created_at);
});
</script>

<template>
	<div class="flex flex-col gap-4 center">
		<div class="flex flex-row gap-4 h-36">

			<EmployerCardButton
					v-for="employment in employments"
					:name="employment.name"
					:role="employment.role"
					:image="employment.image"
			/>
			<EmployerCardButtonAdd />
		</div>

		<EmployerPage />
	</div>
</template>

<script setup lang="ts">
import {employerGetByUser} from "~/queries";

export interface EmployerlistByUser {
	id:         string;
	created_at: Date;
	employer:   Employer;
	user:       User;
	level:      string;
}

export interface Employer {
	id:                 string;
	name:               string;
	profile_image:      string;
	modified_at:        Date;
	location:           Location;
	is_active:          boolean;
	is_verified:        boolean;
	email:              string;
	establishment_date: Date;
	description:        string;
	created_at:         Date;
}

export interface Location {
	department:   string;
	id:           string;
	municipality: string;
	province:     string;
}

export interface User {
	role: string;
}

const { user } = useUserStore()

const employments:Ref<EmployerlistByUser[]> = ref([])

const { data, error } = await useAsyncQuery(employerGetByUser, { "id": Number(user.id) });
if (data.value && !error.value) employments.value = (data.value as any).EmployerlistByUser.map((e:EmployerlistByUser) => ({
	image: e.employer.profile_image,
	name: e.employer.name,
	role: e.level,
	id: e.id,
	employer: e.employer
}))
</script>

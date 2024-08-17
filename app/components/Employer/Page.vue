<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
				<EmployerPresentation
					:name="employer.name"
					:establishment_date="employer.establishment_date.toString()"
					:email="employer.email"
					:description="employer.description"
				/>

				<EmployerPosts />
			</div>

			<div class="w-[20%] flex flex-col gap-4">
				<span class="font-semibold">Menú de administrador</span>
				<div class="flex flex-col gap-2">
					<UButton class="w-full">Administrar encargados</UButton>
					<UButton class="w-full">Editar información del negocio</UButton>
				</div>

				<EmployerRoleInfo :role="role" />

				<EmployerAditional
					:posts_total="posts_total.toString()"
					:created_at="employer.created_at.toString()"
				/>
				<Add class="h-64" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { roleEnum } from "~/enums/role.enum";

const role = ref(roleEnum.ADMINISTRADOR);

const employer = reactive({
	name: "employer-name",
	establishment_date: new Date("2014-04-04"),
	created_at: new Date("2024-04-04"),
	id: 1,
	profile_image: "https://placehold.co/400",
	email: "email@mail.com",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel turpis ac velit fermentum placerat. Donec vulputate, tortor id ultricies fermentum, enim est ullamcorper velit, vel pulvinar felis arcu non sapien. Sed vel turpis ac velit fermentum placerat. Donec vulputate, tortor id ultricies fermentum, enim est ullamcorper velit, vel pulvinar felis arcu non sapien.",
});

const posts_total = ref(10);
</script>

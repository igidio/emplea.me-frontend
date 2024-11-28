<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
				<EmployerPresentation/>

				<EmployerPosts
						:employer-info="{ image: emp.profile_image, name: emp.name }"
						:posts="posts"
				/>
			</div>

			<div class="w-[20%] flex flex-col gap-4">
				<span class="font-semibold">Menú de administrador</span>
				<div class="flex flex-col gap-2">
					<UButton class="w-full">Administrar encargados</UButton>
					<UButton class="w-full">Editar información del negocio</UButton>
				</div>

				<EmployerRoleInfo :role="role" />

				<EmployerAditional
					:posts_total="posts.length.toString()"
					:created_at="emp.created_at.toString()"
				/>
				<Add class="h-64" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { roleEnum } from "~/enums/role.enum";
import type {EmployerInterface} from "~/interfaces";
import type {PostInterface} from "~/interfaces/server/post.interface";

interface Props {
	employer: EmployerInterface,
	role: string,
	posts: PostInterface[]|[]
}
const props = defineProps<Props>()
const { employer, role, posts } = toRefs( props )

const emp = computed(() => ({

		name: employer.value.name,
		establishment_date: employer.value.establishment_date,
		created_at: employer.value.created_at,
		id: employer.value.id,
		profile_image: employer.value.profile_image,
		email: employer.value.email,
		description: employer.value.description,
}))

// const emp = ref({
// 	name: employer.value.name,
// 	establishment_date: employer.value.establishment_date,
// 	created_at: employer.value.created_at,
// 	id: employer.value.id,
// 	profile_image: employer.value.profile_image,
// 	email: employer.value.email,
// 	description: employer.value.description,
// });
</script>

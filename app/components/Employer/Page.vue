<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
				<EmployerPresentation :data="{
					profile_image: data.employer.profile_image,
					name: data.employer.name,
					establishment_date: data.employer.establishment_date,
					email: data.employer.email,
					description: data.employer.description,
					can_modify: can_modify,
					id: data.employer.id
				}"/>
				<EmployerPosts
					:employer-info="{ image: data.employer.profile_image, name: data.employer.name, id: data.employer.id }"
					:posts="data.employer.post!"
					:employer-user="data.employerUser"
				/>
			</div>

			<div class="w-[20%] flex flex-col gap-4">



				<div v-if="can_modify" class="flex flex-col gap-4">
					<span class="font-semibold">Menú de administrador</span>
					<div class="flex flex-col gap-2">
						<UButton class="w-full">Administrar encargados</UButton>
						<UButton class="w-full">Editar información del negocio</UButton>
					</div>
					<EmployerRoleInfo :role="data.employerUser.level"/>
				</div>


				<EmployerAditional
					:total="data.employer.post!.length"
					:created_at="data.employer.created_at"
				/>
				<Add class="h-64" v-if="!is_premium"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {roleEnum} from "~/enums/role.enum";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import type {PostInterface} from "~/interfaces/server/post.interface";

interface Props {
	data: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}

const {is_premium} = useUserStore()

const props = defineProps<Props>()
const {data} = toRefs(props)

const can_modify = ref(data.value.employerUser && data.value.employerUser.level == 'ADMIN')
</script>

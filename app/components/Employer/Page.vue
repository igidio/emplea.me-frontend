<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
				<EmployerPresentation :data="{
					profile_image: data.profile_image,
					name: data.name,
					establishment_date: data.establishment_date,
					email: data.email,
					description: data.description
				}"/>
				<EmployerPosts
					:employer-info="{ image: data.profile_image, name: data.name, id: data.id }"
					:posts="data.post!"
				/>
			</div>

			<div class="w-[20%] flex flex-col gap-4">
				<span class="font-semibold">Menú de administrador</span>
				<div class="flex flex-col gap-2">
					<UButton class="w-full">Administrar encargados</UButton>
					<UButton class="w-full">Editar información del negocio</UButton>
				</div>

<!--				<EmployerRoleInfo :role="role"/>-->

				<EmployerAditional
					:total="data.post!.length"
					:created_at="data.created_at"
				/>
			<Add class="h-64"/>
						</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {roleEnum} from "~/enums/role.enum";
import type {EmployerInterface} from "~/interfaces";
import type {PostInterface} from "~/interfaces/server/post.interface";

interface Props {
	data: EmployerInterface
}
const props = defineProps<Props>()
const {data} = toRefs(props)

</script>

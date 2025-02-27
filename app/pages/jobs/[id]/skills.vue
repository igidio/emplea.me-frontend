<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: employer?.post?.employer.name!,
      to: `/employer/${employer?.post?.employer.id}`
		}, {
			label: employer?.post.name!,
      to: `/jobs/${employer?.post.id}`
		}, {
			label: 'Editar habilidades',
			to: `/jobs/${employer?.post.id}/skills`
		}]"/>
		<UCard>
			<template #header>Editar habilidades</template>
			<div class="flex flex-col gap-4">
			<JobAddSkill
				:data_exists="!!(employer?.post.post_skill && employer?.post.post_skill.length > 0)"
				:reload="reload"
			/>

				<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">
			<JobItemSkill
				v-for="e in employer?.post.post_skill"
				:props="{
								id: e.id!,
								skill: e.skill!,
								level: e.level,
								icon: e.level,
								reload: reload
							}"
				:key="'skill'+e.id"
			/>
				</div>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import type {postInfoInterface} from "~/interfaces/post_info.interface";

definePageMeta({
	middleware: ['role', 'post'],
	roles: ['EMPLOYER'],
	require_modify: true,
})
useHead({
	title: 'Editar habilidades'
})

const route = useRoute()
const employer = ref<postInfoInterface>(route.meta.post_data as postInfoInterface);
const refetch = route.meta.refetch as () => Promise<{ data: { post: postInfoInterface } }>

const reload = async () => {
	await refetch().then((result) => {
		employer.value = result.data.post;
	})
}
</script>
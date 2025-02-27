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
			<div class="flex flex-col gap-4">
			<JobAddSkill
				:data_exists="!!(employer?.post.post_skill && employer?.post.post_skill.length > 0)"
				:reload="reload"
			/>

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
		</UCard>
	</div>
</template>

<script setup lang="ts">
import type {PostInterface, seekerInterface} from "~/interfaces";
import {postFindOne, seekerGetOneByUser} from "~/queries";
import ItemSkill from "~/components/Job/ItemSkill.vue";

const route = useRoute()

interface data_interface {
	post: PostInterface,
	info: {
		type: "GUEST" | "SUPER" | "EMPLOYER" | "ATTENDANT" | "SEEKER";
		can_modify: boolean;
		show_employer: boolean;
	}
}

const employer = ref<data_interface>()

const {data} = await useAsyncQuery<{ post: data_interface }>(postFindOne(true), {
	"id": Number(route.params.id),
})
employer.value = data.value?.post

const {result, refetch} = useQuery<{ post: data_interface }>(postFindOne(true), {
	"id": Number(route.params.id),
}, {prefetch: false})

const reload = async () => {
	await refetch()
	employer.value = result.value?.post
}
</script>
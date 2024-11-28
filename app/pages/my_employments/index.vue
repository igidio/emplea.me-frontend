<template>
	<div class="flex flex-col gap-4 center ">
		<div class="flex flex-row gap-4 h-36 overflow-y-hidden">
			<EmployerCardButton
				v-for="(employment, i) in employments"
				@click="index = i"
				:name="employment.name"
				:role="employment.role"
				:image="employment.image"
			/>
			<EmployerCardButtonAdd/>
		</div>
		
		<EmployerPage
			v-if="typeof selected !== 'undefined'"
			:employer="selected.employer"
			:posts="selected.posts"
			:role="selected.role"
		/>
	</div>
</template>

<script setup lang="ts">
import {employerGetByUser} from "~/queries";
import {useMyEmployments} from "~/composables/my_employments.composable";

const { fill_employments, user_id, employments, selected, index } = useMyEmployments();

const {data, error} = await useAsyncQuery(employerGetByUser, {"id": Number(user_id)});
await fill_employments({data, error})
</script>

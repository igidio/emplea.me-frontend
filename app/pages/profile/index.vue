<template>
	<div class="flex flex-col gap-4">
		<ProfileUserCard/>

		<div class="flex flex-col desktop:flex-row w-full gap-4">
			<ProfileSeekerCard
				class="w-full"
				v-if="['SEEKER'].includes(user_role)"
				:can_edit="true"
			/>
			<Add
				:class="['SEEKER'].includes(user_role)
				? 'w-full h-32 desktop:h-96 desktop:w-40'
				: 'w-full h-32'"
			/>
		</div>
	</div>

</template>

<script setup lang="ts">
definePageMeta({
	middleware: 'role',
})

const user = useUserStore()
const {user_role} = user
</script>
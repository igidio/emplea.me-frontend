<template>
	<div class="flex flex-col gap-4">
		<ProfileUserCard/>

		<div class="flex flex-row w-full gap-4">
			<ProfileSeekerCard
				class="w-full"
				v-if="['SEEKER'].includes(user_role)"
				:can_edit="true"
			/>
			<Add :class="['SEEKER'].includes(user_role) ? 'w-[20%]' : 'w-full h-32'"/>
		</div>
	</div>
	{{ user_role }}
</template>

<script setup lang="ts">
import {ClientRolesEnum} from "~/enums/server/roles.enum";

const user = useUserStore()
const {user_role} = user
</script>
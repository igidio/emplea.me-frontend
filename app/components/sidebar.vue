<template>
	<div class="p-6 flex flex-col h-full">
		<UButton
			color="black"
			variant="ghost"
			icon="ri:close-fill"
			class="flex justify-end"
			square
			padded
			@click="isOpen = !isOpen"
		/>
		<div class="h-full flex flex-col gap-4">
			<slot />
			<div
				class="w-full self-center flex flex-col gap-4"
				v-if="!user_role_computed"
			>
				{{ user_role_computed }}
				<AuthButtons />
			</div>

			<div v-else class="flex flex-col">
				<div
					class="flex flex-row gap-1 overflow-hidden w-full h-fit justify-between"
				>
					<img
						class="h-10 rounded-full"
						src="https://avatars.githubusercontent.com/u/739984?v=4"
					/>
					<span
						class="text-base font-semibold self-center ml-3 inline-block w-full truncate"
						>{{ userStore.user.contact.first_name }}
						{{ userStore.user.contact.last_name }}</span
					>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<UButton
					variant="ghost"
					v-for="option in dropdown_options[0]"
					class="h-fit w-full"
				>
					{{ option.label }}
				</UButton>
			</div>

			<h6>Navegación</h6>
			<div>
				<UButton
					variant="ghost"
					v-for="options in computed_navigation_options"
					class="h-fit w-full"
				>
					{{ option.label }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const { dropdown_options, computed_navigation_options } = useUserStore();

import type {
	AdminRolesEnum,
	ClientRolesEnum,
} from "~/enums/server/roles.enum";

const isOpen = defineModel();

const {
	user_role_computed,
}: { user_role_computed: Ref<AdminRolesEnum | ClientRolesEnum> } =
	storeToRefs(userStore);
</script>

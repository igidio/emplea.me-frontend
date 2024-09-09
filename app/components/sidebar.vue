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
			<div class="h-full flex" v-if="!user_role_computed">
				<div class="self-center w-full flex flex-col gap-4">
					<AuthButtons v-model="isOpen" />
				</div>
			</div>

			<div v-else class="flex flex-col gap-4">
				<div class="flex flex-col">
					<div
						class="flex flex-row gap-1 overflow-hidden w-full h-fit justify-between mt-4"
					>
						<span
							class="text-base font-semibold self-center ml-3 inline-block w-full text-right truncate mr-2"
							>{{ userStore.user.contact.first_name }}
							{{ userStore.user.contact.last_name }}</span
						>
						<img
							class="h-10 rounded-full"
							src="https://avatars.githubusercontent.com/u/739984?v=4"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<UButton
						variant="ghost"
						v-for="option in dropdown_options[0]"
						:ui="{
							size: { md: 'menu-button' },
						}"
						class="h-fit w-full"
						@click="
							() => {
								option.click();
								isOpen = false;
							}
						"
					>
						{{ option.label }}
					</UButton>
				</div>

				<h6 class="inline-block w-full text-right">Navegación</h6>
				<div class="flex flex-col gap-4">
					<UButton
						variant="ghost"
						v-for="option in computed_navigation_options"
						@click="
							() => {
								option.click();
								isOpen = false;
							}
						"
						class="h-fit w-full"
						:ui="{
							size: { md: 'menu-button' },
						}"
					>
						{{ option.label }}
					</UButton>
				</div>
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

<style scoped>
.menu-button {
	@apply text-base justify-end rounded-medium px-2;
}
</style>

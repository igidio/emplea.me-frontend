<template>
	<div class="p-6 flex flex-col h-full">
		<div class="flex flex-row justify-between">
			<ULink to="/profile" v-if="user.id"
			       class="flex flex-row overflow-hidden h-fit hover:bg-violet-100 p-2 rounded-large w-grow transition-colors w-full"
			       @click="isOpen = !isOpen"
			>
				<img
					class="h-10 rounded-full border"
					:src="userStore.user.image || '/images/empleame_user_silhouette.png'"
					alt="Foto de perfil"
				/>
				<span
					class="text-base font-semibold self-center ml-3 inline-block w-full truncate mr-2"
				>{{ userStore.user.contact.first_name }} {{ userStore.user.contact.last_name }}</span
				>
			</ULink>
			<div v-else/>

			<UButton
				variant="ghost"
				icon="ri:close-fill"
				class="flex justify-end px-6"
				@click="isOpen = !isOpen"
				color="gray"
			/>
		</div>

		<div class="h-full flex flex-col gap-4 overflow-y-scroll">
			<slot/>
			<div class="h-full flex" v-if="!user_role">
				<div class="self-center w-full flex flex-col gap-4">
					<AuthButtons v-model="isOpen"/>
				</div>
			</div>

			<div v-else class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<UButton
						v-if="user_role as any === 'EMPLOYER'"
						variant="ghost"
						:ui="{size: { md: 'menu-button' },}"
						class="h-fit w-full"
						@click="async () => {await router.push('/history'); isOpen = false;}"
					>
						Tus compras
					</UButton>
				</div>

				<div v-if="computed_navigation_options && computed_navigation_options.length > 0" class="text-right">
					<div class="flex flex-col gap-4">
						<UButton
							variant="ghost"
							v-for="option in computed_navigation_options"
							@click="async () => { await router.push(`/${option.name}`); isOpen = false; }"
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
		<div>
			<UButton v-if="user.id" label="Cerrar sesión" block @click="async () => await logout_user()"/>
		</div>
	</div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const {computed_navigation_options, logout_user} = useUserStore();
const {user_role, user} = storeToRefs(userStore);
const isOpen = defineModel();
const router = useRouter();

</script>

<style scoped>
.menu-button {
	@apply text-base justify-end rounded-medium px-2;
}
</style>

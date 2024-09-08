<template>
	<div class="w-fit">
		<UDropdown :items="options" :popper="{ placement: 'bottom-start' }">
			<button
				class="white text-base rounded-large flex flex-row gap-1 overflow-hidden w-32 justify-between shadow-sm"
			>
				<span
					class="text-base font-semibold self-center ml-3 inline-block w-full truncate"
					>{{ first_of_fist_name }}</span
				>

				<img
					class="h-8 rounded-full"
					src="https://avatars.githubusercontent.com/u/739984?v=4"
				/>
			</button>
		</UDropdown>
	</div>
</template>

<script setup lang="ts">
import { RolesEnum } from "~/enums/server/roles.enum";
import type { UserInterface } from "~/interfaces";

const userStore = useUserStore();
const { user }: { user: Ref<UserInterface> } = storeToRefs(userStore);

const profile = {
	label: "Ver perfil",
	shortcuts: ["E"],
	click: () => {
		console.log("Ver perfil");
	},
};

const payment = {
	label: "Pagos",
	shortcuts: ["D"],
};

const logout = {
	label: "Cerrar sesión",
	click: () => {
		userStore.logout();
		useRouter().push({
			path: "/",
		});
	},
};

const options: ComputedRef<any[][]> = computed(() => {
	console.log(user.value.role == RolesEnum.EMPLOYER);

	if (user.value.role === RolesEnum.EMPLOYER) {
		return [[profile, payment, logout]];
	} else {
		return [[profile, logout]];
	}
});

const first_of_fist_name = computed(
	() => user.value.contact.first_name.split(" ")[0]
);
</script>

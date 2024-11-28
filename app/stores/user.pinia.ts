import { defineStore } from "pinia";
import type { UserInterface } from "~/interfaces";
import {
	RolesEnum,
	type AdminRolesEnum,
	type ClientRolesEnum,
} from "~/enums/server/roles.enum";
import type { navigationOptionsInterface } from "~/interfaces/client.interface";

import {
	favorites_option,
	jobs_option,
	my_employments_option,
	my_posts_option,
	my_services_option,
	premium_option,
} from "~/data/navigation-options.data";

export const useUserStore = defineStore("user", () => {
	const user: Ref<UserInterface> = ref({} as UserInterface);
	const token: Ref<string> = ref("");
	const initial_loading = ref(true);

	const get_token = () => {
		let token_from_storage = useCookie("token");
		if (token_from_storage.value) token.value = token_from_storage.value;
	};

	const set_token = (
		new_token: string,
		set_to_storage: boolean = true,
		max_age: number = 60 * 60 * 4
	) => {
		if (set_to_storage) {
			const newCookie = useCookie("token", {
				maxAge: max_age,
				sameSite: true,
				secure: true,
			});
			newCookie.value = new_token;
		}
		token.value = new_token;
	};

	const delete_token = () => {
		const cookie = useCookie("token");
		cookie.value = undefined;
	};

	const set_user = (new_user: UserInterface) => (user.value = new_user);

	const update_user = async () => {};

	const user_role_computed: ComputedRef<AdminRolesEnum | ClientRolesEnum> =
		computed(() => {
			return user.value.role;
		});

	const is_premium = computed(() => false);

	const logout_user = async () => {
		delete_token();
		user.value = {} as UserInterface;

		await useRouter().push({
			path: "/",
		});
		//useRouter().go(0);
		useToast().add({ title: "Sesión finalizada" });
	};

	const dropdown_options: ComputedRef<any[][]> = computed(() => {
		let profile = {
			label: "Ver perfil",
			shortcuts: ["V"],
			click: () => {
				useRouter().push("/profile");
			},
		};

		let payment = {
			label: "Pagos",
			shortcuts: ["P"],
			click: () => {},
		};

		let logout = {
			label: "Cerrar sesión",
			shortcuts: ["P"],
			click: () => {
				logout_user();
			},
		};

		if (user.value.role === RolesEnum.EMPLOYER.toUpperCase()) {
			return [[profile, payment, logout]];
		} else {
			return [[profile, logout]];
		}
	});

	const computed_navigation_options: ComputedRef<navigationOptionsInterface[]> =
		computed(() => {
			let cases: any = {
				EMPLOYER: [my_employments_option, my_posts_option],
				SEEKER: [jobs_option, favorites_option],
			};
			is_premium.value
				? cases.EMPLOYER.push(my_services_option)
				: cases.EMPLOYER.push(premium_option);

			return cases[user.value.role];
		});

	const first_of_fist_name = computed(
		() => user.value.contact.first_name.split(" ")[0]
	);

	const computed_image = computed(() =>
		user.value.image ? user.value.image : "/images/empleame_user_silhouette.png"
	);

	return {
		user,
		token,
		get_token,
		set_token,
		set_user,
		initial_loading,
		update_user,
		logout_user,
		// computed
		user_role_computed,
		dropdown_options,
		first_of_fist_name,
		computed_navigation_options,
		computed_image,
	};
});

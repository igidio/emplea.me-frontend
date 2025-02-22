import {defineStore} from "pinia";
import type {employer_info_interface, PlanInterface, UserInterface} from "~/interfaces";
import {
	RolesEnum,
	type AdminRolesEnum,
	type ClientRolesEnum,
} from "~/enums/server/roles.enum";
import type {navigationOptionsInterface} from "~/interfaces/client.interface";

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
	const is_open_modal_login = ref(false);
	const router = useRouter();
	const employer_info: Ref<employer_info_interface> = ref({} as employer_info_interface)
	const is_premium = computed(() => (employer_info.value.plan && employer_info.value.plan.id != 1 && employer_info.value.is_valid) || false);

	const set_employer_info = (info: employer_info_interface) => {
		employer_info.value = info
	}
	
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
	
	const user_role: ComputedRef<AdminRolesEnum | ClientRolesEnum> =
		computed(() => {
			return user.value.role;
		});
	
	const logout_user = async () => {
		delete_token();
		await router.replace('/redirect')
		if (import.meta.client) window.location.replace('/')
		user.value = {} as UserInterface;
		employer_info.value = {} as employer_info_interface
	};
	
	const dropdown_options: ComputedRef<any[][]> = computed(() => {
		let profile = {
			label: "Ver perfil",
			shortcuts: ["V"],
			click: async () => {
				await router.push("/profile");
			},
		}
		
		let payment = {
			label: "Tus compras",
			shortcuts: ["P"],
			click: async () => await router.push("/history"),
		};
		
		let logout = {
			label: "Cerrar sesión",
			shortcuts: ["C"],
			click: async () => {
				await logout_user();
			},
		};
		
		if (user.value.role as any === 'EMPLOYER') {
			return [[profile, payment, logout]];
		} else {
			return [[profile, logout]];
		}
	});
	
	const computed_navigation_options: ComputedRef<navigationOptionsInterface[]> = computed(() => {
		let cases: any = {
			EMPLOYER: [my_employments_option, my_posts_option],
			SEEKER: [jobs_option, favorites_option],
		};
		!is_premium.value && cases.EMPLOYER.push(premium_option);
		
		return cases[user.value.role];
	});
	
	const first_of_fist_name = computed(
		() => user.value.contact.first_name.split(" ")[0]
	);
	
	const computed_image = computed(() => ({
			value: user.value.image ? user.value.image : "/images/empleame_user_silhouette.png",
			exists: !!user.value.image,
		})
	);
	
	return {
		user,
		token,
		is_open_modal_login,
		get_token,
		set_token,
		set_user,
		initial_loading,
		logout_user,
		// computed
		user_role,
		dropdown_options,
		first_of_fist_name,
		computed_navigation_options,
		computed_image,
		is_premium,
		employer_info,
		set_employer_info,
	};
});

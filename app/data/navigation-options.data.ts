import type {navigationOptionsInterface} from "~/interfaces/client.interface";


export const jobs_option: navigationOptionsInterface = {
	label: "Trabajos",
	name: 'jobs',
};
export const favorites_option: navigationOptionsInterface = {
	label: "Mis Favoritos",
	name: 'favorites'
};
export const my_employments_option: navigationOptionsInterface = {
	label: "Mis Negocios",
	name: 'employer'
};
export const my_posts_option: navigationOptionsInterface = {
	label: "Mis Publicaciones",
	name: 'my_posts'
};
export const my_services_option: navigationOptionsInterface = {
	label: "⭐ Mis Servicios",
	name: 'payment'
};
export const premium_option: navigationOptionsInterface = {
	label: "Sé un premium",
	is_gold: true,
	name: 'payment'
};

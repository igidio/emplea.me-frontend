import type {
	AdminRolesEnum,
	ClientRolesEnum,
} from "~/enums/server/roles.enum";
import type { ContactInterface } from "./contact.interface";

export interface UserInterface {
	id: number;
	username: string;
	contact: ContactInterface;
	email: string;
	is_active: boolean;
	role: AdminRolesEnum | ClientRolesEnum;
	image: string | null;
	google_id: string|null;
	has_activated: boolean;
	facebook_id: string|null;
	created_at: Date;
	modified_at: Date;
}

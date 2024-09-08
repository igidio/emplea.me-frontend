import type {
	AdminRolesEnum,
	ClientRolesEnum,
} from "~/enums/server/roles.enum";
import type { ContactInterface } from "./contact.interface";

export interface UserInterface {
	id: string;
	username: string;
	contact: ContactInterface;
	email: string;
	is_active: boolean;
	role: AdminRolesEnum | ClientRolesEnum;
	image: string;
	google_id: string;
	created_at: Date;
	modified_at: Date;
}

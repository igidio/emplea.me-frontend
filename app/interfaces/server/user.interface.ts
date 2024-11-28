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
	google_id: string;
	linkedin_id: string;
	created_at: Date;
	modified_at: Date;
}

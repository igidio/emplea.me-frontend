import type { GenderEnum } from "~/enums";

export interface ContactInterface {
	id: string;
	first_name: string;
	last_name: string;
	phone: string;
	gender: GenderEnum;
	date_of_birth: string;
	created_at: Date;
	modified_at: Date;
}

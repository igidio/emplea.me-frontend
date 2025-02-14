import type {GenderEnum} from "~/enums";

export interface userDtoInterface {
	email: string | undefined;
	username: string | undefined;
	password: string | undefined;
	password_repeat: string | undefined;
	google_id: string | undefined;
	facebook_id: string | undefined;
	first_name: string | undefined;
	last_name: string | undefined;
	phone: string | undefined;
	gender: GenderEnum | undefined;
	date_of_birth: Date | undefined;
	external_includes_email: boolean | undefined;
}

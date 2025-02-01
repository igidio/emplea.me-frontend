import type {EmployerInterface, socialInterface} from "~/interfaces";

export interface EmployerSocialInterface {
	id?: number;
	name: string;
	identifier: string;
	employer: EmployerInterface;
	social: socialInterface;
	created_at?: Date;
	modified_at?: Date;
}
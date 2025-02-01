import type {LocationInterface} from "~/interfaces/location.interface";
import type {PostInterface} from "~/interfaces/server/post.interface";
import type {PhoneInterface} from "~/interfaces/server/phone.interface";
import type {EmployerSocialInterface} from "~/interfaces/server/employer_social.interface";

export interface EmployerInterface {
	id:                 string;
	name:               string;
	profile_image:      string;
	modified_at:        Date;
	location:           LocationInterface;
	post?:						 PostInterface[];
	is_active:          boolean;
	is_verified:        boolean;
	email:              string;
	establishment_date: Date;
	description:        string;
	created_at:         Date | string;
	phone?:							PhoneInterface[]
	employer_social?:		EmployerSocialInterface[];
}

import type {LocationInterface} from "~/interfaces/location.interface";

export interface EmployerInterface {
	id:                 string;
	name:               string;
	profile_image:      string;
	modified_at:        Date;
	location:           LocationInterface;
	is_active:          boolean;
	is_verified:        boolean;
	email:              string;
	establishment_date: Date;
	description:        string;
	created_at:         Date;
}

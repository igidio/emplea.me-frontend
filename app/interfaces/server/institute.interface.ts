import type {educationInterface} from "~/interfaces";

export interface instituteInterface {
	id?: number;
	name: string;
	education?: educationInterface[];
	created_at?: Date;
	modified_at?: Date;
}
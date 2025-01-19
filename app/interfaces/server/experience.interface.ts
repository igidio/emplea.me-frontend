import type {seekerInterface} from "~/interfaces";

export interface experienceInterface {
	id?: number;
	start_date?: Date;
	end_date?: Date;
	title: string;
	company: string;
	description: string;
	seeker: seekerInterface;
	created_at?: Date;
	modified_at?: Date;
}
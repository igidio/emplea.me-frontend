import type {seekerInterface} from "~/interfaces";

export interface experienceInterface {
	id?: number;
	job_title: string;
	company_name: string;
	start_date: Date;
	end_date?: Date;
	seeker: seekerInterface;
}
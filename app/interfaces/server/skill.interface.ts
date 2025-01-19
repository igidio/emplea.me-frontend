import type {postSkillInterface} from "~/interfaces";

export interface skillInterface {
	id?: number;
	name: string;
	post_skill?: postSkillInterface[];
	created_at?: Date;
	modified_at?: Date;
}
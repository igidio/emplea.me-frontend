import type {seekerInterface, skillInterface} from "~/interfaces";
import {SkillLevelEnum} from "~/enums";

export interface seekerSkillInterface {
	id?: number;
	seeker?: seekerInterface;
	skill?: skillInterface;
	level: string;
	created_at?: Date;
	modified_at?: Date;
}
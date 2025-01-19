import {SkillLevelEnum} from "~/enums";
import type {skillInterface} from "~/interfaces/server/skill.interface";
import type {PostInterface} from "~/interfaces";

export interface postSkillInterface {
	id?: number;
	post?: PostInterface;
	skill?: skillInterface;
	level: SkillLevelEnum;
	created_at?: Date;
	modified_at?: Date;
}
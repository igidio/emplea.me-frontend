import type {seekerInterface, skillInterface} from "~/interfaces";
import {SkillLevelEnum} from "~/enums";

export interface seekerSkillInterface {
	id?: number;
	seeker: seekerInterface;
	skill: skillInterface;
	level: SkillLevelEnum;
	created_at?: Date;
	modified_at?: Date;
}
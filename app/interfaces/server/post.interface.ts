import {ModalityEnum, SalaryEnum} from "~/enums";
import type {
	CategoryInterface,
	EmployerInterface,
	EmployerUserInterface, FeaturedInterface, interactionInterface,
	LocationInterface,
	postSkillInterface
} from "~/interfaces";

export interface PostInterface {
	id: number;
	name: string;
	description: string;
	available: boolean;
	modality: ModalityEnum | string;
	salary?: number;
	salary_type?: SalaryEnum | string;
	is_active: boolean;
	location: LocationInterface;
	category: CategoryInterface;
	employer: EmployerInterface;
	employer_user: EmployerUserInterface;
	interaction: interactionInterface;
	post_skill: postSkillInterface[],
	created_at?: Date;
	modified_at?: Date;
	has_disabled: boolean;
	featured: FeaturedInterface;
}
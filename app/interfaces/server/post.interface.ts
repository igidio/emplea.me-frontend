import {ModalityEnum, SalaryEnum} from "~/enums";
import type {CategoryInterface, EmployerInterface, EmployerUserInterface, LocationInterface} from "~/interfaces";

export interface PostInterface {
	id: number;
	name: string;
	description: string;
	available: boolean;
	modality: ModalityEnum;
	is_featured: boolean;
	salary?: number;
	salary_type?: SalaryEnum;
	is_active: boolean;
	location: LocationInterface;
	category: CategoryInterface;
	employer: EmployerInterface;
	employer_user: EmployerUserInterface;
	//post_skill?: PostSkillEntity[];
	created_at?: Date;
	modified_at?: Date;
}
import type {
	educationInterface,
	experienceInterface, interactionInterface,
	LocationInterface, seekerSkillInterface,
	seekerSocialInterface,
	UserInterface
} from "~/interfaces";

export interface seekerInterface {
	id?: number;
	show_phone: boolean;
	show_email: boolean;
	location: LocationInterface;
	user: UserInterface;
	education?: educationInterface[];
	experience?: experienceInterface[];
	seeker_social?: seekerSocialInterface[];
	seeker_skill?: seekerSkillInterface[];
	interaction?: interactionInterface[];
	created_at?: Date;
	modified_at?: Date;
}
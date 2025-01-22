import type {instituteInterface, seekerInterface} from "~/interfaces";

export interface educationInterface {
	id?: number;
	title: string;
	subtitle: string;
	degree: string;
	institute: instituteInterface;
	starting_year?: number;
	completion_year?: number;
	seeker: seekerInterface;
}
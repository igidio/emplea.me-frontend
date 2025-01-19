import type {seekerInterface} from "~/interfaces";

export interface educationInterface {
	id?: number;
	degree: string;
	institution: string;
	completion_year: number;
	seeker: seekerInterface;
}
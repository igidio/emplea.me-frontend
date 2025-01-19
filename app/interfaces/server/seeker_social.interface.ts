import type {seekerInterface, socialInterface} from "~/interfaces";

export interface seekerSocialInterface {
	id?: number;
	identifier: string;
	name: string;
	seeker?: seekerInterface;
	social?: socialInterface;
}
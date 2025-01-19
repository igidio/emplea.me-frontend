import type {PostInterface, seekerInterface} from "~/interfaces";

export interface interactionInterface {
	id?: number;
	confirm: boolean;
	post: PostInterface;
	seeker: seekerInterface;
	created_at?: Date;
	modified_at?: Date;
}
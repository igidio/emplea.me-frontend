import type {PostInterface} from "~/interfaces/server/post.interface";

export interface postInfoInterface {
		post: PostInterface,
		info: {
			type: "GUEST" | "SUPER" | "EMPLOYER" | "ATTENDANT" | "SEEKER";
			can_modify: boolean;
			show_employer: boolean;
		}
}
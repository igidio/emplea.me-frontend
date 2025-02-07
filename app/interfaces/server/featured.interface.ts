import type { GenderEnum } from "~/enums";
import type {PostInterface, UserInterface} from "~/interfaces";

export interface FeaturedInterface {
	id: string;
	user: UserInterface;
	post: PostInterface
}

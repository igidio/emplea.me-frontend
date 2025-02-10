import type {EmployerInterface} from "~/interfaces/employer.interface";
import type {UserInterface} from "~/interfaces/server/user.interface";
import type {PostInterface} from "~/interfaces/server/post.interface";


export interface EmployerUserInterface {
	id:          number;
	employer:    EmployerInterface;
	user:        UserInterface;
	level:       string;
	post?:			 PostInterface[];
	is_first_user?: boolean;
	has_confirm: boolean;
	is_active?: boolean;
	created_at:  Date;
	modified_at: Date;
}
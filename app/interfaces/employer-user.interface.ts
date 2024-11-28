import type {EmployerInterface} from "~/interfaces/employer.interface";
import type {UserInterface} from "~/interfaces/server/user.interface";
import type {PostInterface} from "~/interfaces/server/post.interface";


export interface EmployerUserInterface {
	id:          string;
	created_at:  Date;
	employer:    EmployerInterface;
	user:        UserInterface;
	level:       string;
	modified_at: Date;
	post?:			 PostInterface[];
}
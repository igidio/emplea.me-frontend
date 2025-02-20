import type {UserInterface} from "~/interfaces";

export interface notification_interface {
	id?: number;
	user: UserInterface;
	goto?: string;
	title: string;
	message: string;
	was_read: boolean;
	was_cleared: boolean;
	created_at?: Date;
	modified_at?: Date;
}
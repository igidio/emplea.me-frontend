import type {PlanInterface, TransactionInterface, UserInterface} from "~/interfaces";

export interface SubscriptionInterface {
	id?: number;
	starts_at: Date;
	ends_at: Date;
	autorenew: boolean;
	is_valid: boolean;
	user: UserInterface;
	plan: PlanInterface;
	transaction: TransactionInterface;
	created_at?: Date;
	modified_at?: Date;
}
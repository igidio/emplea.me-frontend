export interface SubscriptionInterface {
	id?: number;
	starts_at: Date;
	ends_at: Date;
	autorenew: boolean;
	user_id: number;
	plan_id: number;
	transaction_id: number;
	created_at?: Date;
	modified_at?: Date;
}
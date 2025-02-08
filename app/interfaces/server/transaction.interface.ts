import type {MethodInterface, SubscriptionInterface } from "~/interfaces";
import {TransactionStatusEnum} from "~/enums";

export interface TransactionInterface {
	id?: number;
	method: MethodInterface;
	amount: number;
	status: TransactionStatusEnum;
	last_four?: string;
	brand?: string;
	subscription?: SubscriptionInterface;
	created_at?: Date;
	modified_at?: Date;
}
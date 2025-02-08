import type {SubscriptionEntity} from "~/interfaces";
import {TransactionStatusEnum} from "~/enums";

export interface TransactionInterface {
	id?: number;
	id_method: number; // Referencia al ID del método de pago
	amount: number;
	status: TransactionStatusEnum;
	last_four?: string;
	brand?: string;
	subscription?: SubscriptionEntity;
	created_at?: Date;
	modified_at?: Date;
}
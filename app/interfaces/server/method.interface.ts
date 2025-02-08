import {TransactionTypeEnum} from "~/enums";

export interface MethodInterface {
	id?: number;
	type: TransactionTypeEnum;
	created_at?: Date;
	modified_at?: Date;
}
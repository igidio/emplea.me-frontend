import type {EmployerInterface} from "~/interfaces";

export interface PhoneInterface {
	id?: number;
	employer: EmployerInterface;
	phone: string;
	has_whatsapp: boolean;
}
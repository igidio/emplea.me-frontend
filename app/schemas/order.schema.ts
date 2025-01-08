import * as yup from "yup";
import {only_letters_regex} from "~/regex";

const validateExpirationDate = (value: string | undefined): boolean => {
	if (!value) return false;
	const [month, year] = value.split('/').map(Number);
	const currentYear = new Date().getFullYear() % 100;
	const currentMonth = new Date().getMonth() + 1;
	
	if (!month || !year || month < 1 || month > 12) {
		return false;
	}
	
	return !(year < currentYear || (year === currentYear && month < currentMonth));
};

export const order_schema = yup.object({
	card_number: yup
		.string()
		.matches(/^[0-9\s]{18,19}$/, 'El número de tarjeta debe tener de 15 a 16 dígitos')
		.required('El número de tarjeta es requerido'),
	card_holder: yup
		.string()
		.matches(only_letters_regex, "El nombre debe contener solo letras")
		.required('El nombre del titular es requerido'),
	expiry: yup
		.string()
		//.matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'La fecha de expiración debe ser en formato MM/YY')
		.matches(/^([0-9]{2})\/?([0-9]{2})$/, 'La fecha de expiración debe ser en formato MM/YY')
		.test('is-valid-expiration-date', 'Fecha de expiración no válida, verifique el mes y/o el año', validateExpirationDate)
		.required('La fecha de expiración es requerida'),
	cvv: yup
		.string()
		.matches(/^[0-9]{3,4}$/, 'El CVC debe tener 3 o 4 dígitos')
		.required('El CVC es requerido'),
	auto_renew: yup.boolean(),
})
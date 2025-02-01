import * as yup from "yup";

export const phone_schema = yup.object({
	phone: yup
		.string()
		.matches(/^[0-9]{6,8}$/, 'Este campo debe tener solo números de 6 a 8 dígitos')
		.required('El número de teléfono es requerido'),
})
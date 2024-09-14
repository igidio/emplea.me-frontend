import * as yup from "yup";
import { only_letters_regex, only_numbers_regex } from "~/regex";

export const contact_schema = {
	first_name: yup
		.string()
		.matches(only_letters_regex, "El nombre debe contener solo letras")
		.required("El nombre es obligatorio"),
	last_name: yup
		.string()
		.matches(only_letters_regex, "El apellido debe contener solo letras")
		.required("El apellido es obligatorio"),
	phone: yup
		.string()
		.matches(only_numbers_regex, "El teléfono debe contener solo números")
		.min(8, "El teléfono debe tener al menos 8 dígitos")
		.required("El teléfono es obligatorio"),
	gender: yup
		.string()
		.oneOf(["MALE", "FEMALE", "OTHER"], "Debe seleccionar un género válido")
		.required("El género es obligatorio"),
	date_of_birth: yup.string().required("La fecha de nacimiento es obligatoria"),
};

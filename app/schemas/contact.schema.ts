import * as yup from "yup";
import { only_letters_regex, only_numbers_regex } from "~/regex";

export const contact_schema = {
	first_name: yup
		.string()
		.matches(only_letters_regex, "El nombre debe contener solo letras")
		.max(30, "El nombre debe tener como máximo 50 caracteres")
		.required("El nombre es obligatorio"),
	last_name: yup
		.string()
		.matches(only_letters_regex, "El apellido debe contener solo letras")
		.max(30, "El nombre debe tener como máximo 30 caracteres")
		.required("El apellido es obligatorio"),
	phone: yup
		.string()
		.matches(only_numbers_regex, "El teléfono debe contener solo números")
		.min(8, "El teléfono debe tener al menos 7 dígitos")
		.max(10, "El teléfono debe tener como máximo 10 dígitos")
		.required("El teléfono es obligatorio"),
	gender: yup
		.string()
		.oneOf(["MALE", "FEMALE", "OTHER"], "Debe seleccionar un género válido")
		.required("El género es obligatorio"),
	date_of_birth: yup.string().nonNullable('La fecha no puede estar vacía').required("La fecha de nacimiento es obligatoria"),
};

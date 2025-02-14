import * as yup from "yup";
import {GenderEnum} from "~/enums";

const regex = {
	username: {
		pattern: /^[a-zA-Z0-9_]+$/,
		validationOptions: {
			message: "El nombre de usuario solo puede contener letras, números y guiones bajos",
		},
	},
	password: {
		pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
		validationOptions: {
			message: "La contraseña debe tener al menos 6 caracteres, incluyendo letras y números",
		},
	},
	name: {
		pattern: /^[A-Za-zÀ-ÿ\s]*$/,
		validationOptions: {
			message: "Nombre y apellido: Solo letras y espacios están permitidos.",
		},
	},
};

export const external_form_schema = yup.object({
	email: yup
		.string()
		.email("El correo electrónico no es válido")
		.required("El correo electrónico es obligatorio"),
	username: yup
		.string()
		.max(20, "El nombre no puede tener más de 20 caracteres")
		.matches(regex.username.pattern, regex.username.validationOptions.message)
		.required("El nombre de usuario es requerido"),
	// password: yup
	// 	.string()
	// 	.min(6, "La contraseña debe tener al menos 6 caracteres")
	// 	.matches(regex.password.pattern, regex.password.validationOptions.message)
	// 	.required("La contraseña es requerida"),
	first_name: yup
		.string()
		.matches(regex.name.pattern, regex.name.validationOptions.message)
		.max(30, "El nombre no puede tener más de 30 caracteres")
		.required("El nombre es obligatorio"),
	last_name: yup
		.string()
		.matches(regex.name.pattern, regex.name.validationOptions.message)
		.max(30, "El apellido no puede tener más de 30 caracteres")
		.required("El apellido es obligatorio"),
	phone: yup
		.number()
		.min(1000000, "Debe tener mínimo 7 dígitos.")
		.max(9999999999, "Debe tener máximo 10 dígitos")
		.required("El número de teléfono es obligatorio"),
	gender: yup
		.mixed()
		.oneOf(Object.values(GenderEnum), "El género no es válido")
		.required("El género es obligatorio"),
	date_of_birth: yup
		.date()
		.required("La fecha de nacimiento es obligatoria"),
})
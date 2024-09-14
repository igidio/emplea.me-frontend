import * as yup from "yup";
import { contact_schema } from "./contact.schema";

export const user_schema = {
	email: yup
		.string()
		.email("Debe ser un correo electrónico válido")
		.test(
			"no-spaces",
			"El campo no debe contener espacios",
			(value) => !/\s/.test(value!)
		)
		.required("El correo es obligatorio"),
	username: yup
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.test(
			"no-spaces",
			"El campo no debe contener espacios",
			(value) => !/\s/.test(value!)
		)
		.required("El nombre de usuario es obligatorio"),
	password: yup
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.required("La contraseña es obligatoria"),
	password_repeat: yup
		.string()
		.required("Debe confirmar la contraseña")
		.test(
			"passwords-match",
			"Las contraseñas deben coincidir",
			function (value) {
				return value === this.parent.password;
			}
		),
	contact: yup.object().shape(contact_schema),
};

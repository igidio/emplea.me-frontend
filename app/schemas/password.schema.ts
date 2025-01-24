import * as yup from "yup";

export const password_schema = yup.object({
	current_password: yup
		.string()
		.min(8, "Tu contraseña actual debe tener al menos 8 caracteres")
		.max(20, "Tu contraseña actual debe tener como mucho 20 caracteres")
		.required("La contraseña es obligatoria"),
	new_password: yup
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(20, "La contraseña debe tener como mucho 20 caracteres")
		.required("La contraseña es obligatoria"),
	confirm_password: yup
		.string()
		.required("Debe confirmar la contraseña")
		.test(
			"passwords-match",
			"Las contraseñas deben coincidir",
			function (value) {
				return value === this.parent.new_password;
			}
		),
});
import * as yup from "yup";

export const seeker_social_schema = {
	name: yup.string().max(60, 'El número máximo de carácteres es de 60').required('El nombre de perfil es requerido'),
	identifier: yup.string().matches(/^[a-zA-Z0-9_]*$/, "Solo letras y números").max(60, 'El número máximo de carácteres es de 60').required('El identificador es requerido'),
	// social: yup.object().shape({
	// 	id: yup.number().required("La red social es requerido"),
	// }).required("La red social es requerido")
	social: yup.object().required("La red social es requerido"),
	//}).required("La red social es requerido")
}
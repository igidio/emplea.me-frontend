import * as yup from "yup";

export const message_schema = yup.object({
	message: yup.string().max(255, 'La razón no puede exceder los 255 caracteres.').required('Debes indicar una razón para realizar esta acción.')
})

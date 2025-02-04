export const es_date = (date: string|Date): string => {
	return new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

}
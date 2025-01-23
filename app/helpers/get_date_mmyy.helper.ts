export const get_date_mmyy = ({start_date, end_date}: { start_date?: Date, end_date?: Date }) => {
	if (!start_date && !end_date) return ''
	
	if (start_date && end_date)
		return `${new Date(start_date).toLocaleDateString('es-ES', {
			month: 'long',
			year: 'numeric'
		})} - ${new Date(end_date).toLocaleDateString('es-ES', {month: 'long', year: 'numeric'})}`
	else if (start_date && !end_date)
		return `Desde ${new Date(start_date).toLocaleDateString('es-ES', {month: 'long', year: 'numeric'})}`
	else if (!start_date && end_date)
		return `Hasta ${new Date(end_date).toLocaleDateString('es-ES', {month: 'long', year: 'numeric'})}`
}
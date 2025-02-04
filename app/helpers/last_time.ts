export const last_time = (date: Date): string => {
	const now = new Date();
	const differenceInMilliseconds = now.getTime() - date.getTime();
	
	const seconds = Math.floor(differenceInMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);
	
	if (years > 0) {
		return `hace ${years} año${years > 1 ? 's' : ''}`;
	} else if (months > 0) {
		return `hace ${months} mes${months > 1 ? 'es' : ''}`;
	} else if (days > 0) {
		return `hace ${days} día${days > 1 ? 's' : ''}`;
	} else if (hours > 0) {
		return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
	} else if (minutes > 0) {
		return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
	} else {
		return 'hace unos segundos';
	}
}
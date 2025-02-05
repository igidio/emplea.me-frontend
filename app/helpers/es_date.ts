export const es_date = (date: string | Date, show_time: boolean = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (show_time) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.hour12 = true;
    options.hourCycle = 'h12';
  }

  return new Date(date).toLocaleDateString('es-ES', options);
}
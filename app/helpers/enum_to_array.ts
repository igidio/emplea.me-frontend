export const enum_to_array = (enum_object: any ): { label: string, value: string }[] => {
	return Object.keys(enum_object).map(key => ({
		label: enum_object[key],
		value: key
	}));
}
export function format_name(str: string) {
	const lowerCaseStr = str.toLowerCase();
	const words: string[] = lowerCaseStr.split(" ");

	const capitalizedWords = words.map((word: string) => {
		if (word.length > 0) {
			return word[0]!.toUpperCase() + word.slice(1);
		}
		return word;
	});

	return capitalizedWords.join(" ");
}

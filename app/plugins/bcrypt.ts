import * as bcrypt from "bcrypt";

export const encrypt = (data: string, rounds: number | string = 10): string => {
	return bcrypt.hashSync(data, rounds);
};

export const decrypt = (data: string, rounds: string) => {
	bcrypt.compare(data, rounds, (err, result) => {
		if (err) {
			console.error("Error al comparar:", err);
		} else if (result) {
			console.log("La clave es válida");
			console.log(result);
		} else {
			console.log("La clave no es válida");
		}
	});
};

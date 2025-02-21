export enum ClientRolesEnum {
	SEEKER = "Aplicante",
	EMPLOYER = "Empleador",
}

export enum AdminRolesEnum {
	ADMIN = "Administrador",
	SUPERUSER = "Superusuario",
}

export const RolesEnum = {
	...AdminRolesEnum,
	...ClientRolesEnum,
};

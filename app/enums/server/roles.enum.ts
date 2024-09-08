export enum ClientRolesEnum {
	SEEKER = "seeker",
	EMPLOYER = "employer",
}

export enum AdminRolesEnum {
	ADMIN = "admin",
	SUPERUSER = "superuser",
}

export const RolesEnum = {
	...AdminRolesEnum,
	...ClientRolesEnum,
};

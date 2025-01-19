export enum ClientRolesEnum {
	SEEKER = "SEEKER",
	EMPLOYER = "EMPLOYER",
}

export enum AdminRolesEnum {
	ADMIN = "ADMIN",
	SUPERUSER = "SUPERSUSER",
}

export const RolesEnum = {
	...AdminRolesEnum,
	...ClientRolesEnum,
};

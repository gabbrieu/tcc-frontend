export enum GenderEnum {
	MASCULINO = 'MASCULINO',
	FEMININO = 'FEMININO',
	NÃO_INFORMADO = 'NÃO INFORMADO',
}

export interface ICustomer {
	id: string;
	name: string;
	cellphone: string;
	gender: GenderEnum;
	document: string;
	city: string;
	street: string;
	district: string;
	houseNumber: number;
	description: string;
	status: boolean;
	birthDate: string;
	column: number;
	email?: string;
	order: number;
	createdAt: string;
	updatedAt: string;
}

export interface IGetAllCustomersResponse {
	data: ICustomer[];
	count: number;
}

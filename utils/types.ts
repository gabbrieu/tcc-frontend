export enum GenderEnum {
	MASCULINO = 'MASCULINO',
	FEMININO = 'FEMININO',
	NÃO_INFORMADO = 'NÃO INFORMADO',
}

export enum PriorityEnum {
	VERY_LOW = 'VERY_LOW',
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	URGENT = 'URGENT',
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
	priority: PriorityEnum;
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

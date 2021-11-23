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

export interface IComments {
	id: string;
	comment: string;
	createdAt: string;
	updatedAt: string;
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
	comments: IComments[];
}

export interface IGetAllCustomersResponse {
	data: ICustomer[];
	count: number;
}

export interface IComments {
	id: string;
	comment: string;
	customer: ICustomer;
	createdAt: string;
	updatedAt: string;
}

export interface ICommentsGetAll {
	id: string;
	comment: string;
	customerId: string;
	customerName: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICommentsGetAllResponse {
	data: ICommentsGetAll[];
	count: number;
}

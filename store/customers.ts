import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { store } from '~/store/index';
import { $axios } from '~/utils/api';
import { ICustomer, IGetAllCustomersResponse } from './types';

@Module({
	name: 'customers',
	stateFactory: true,
	namespaced: true,
	dynamic: true,
	store,
})
export class Customers extends VuexModule {
	customers: ICustomer[] = [];
	count: number = 0;

	@Mutation
	setUsers(customers: ICustomer[]) {
		this.customers = customers;
	}

	@Mutation
	setCount(count: number) {
		this.count = count;
	}

	get getCustomers() {
		return this.customers;
	}

	@Action
	async getUsers() {
		const usersResponse: IGetAllCustomersResponse = await $axios.$get(
			'http://127.0.0.1:3002/customers'
		);
		this.setUsers(usersResponse.data);
		this.setCount(usersResponse.count);
	}
}

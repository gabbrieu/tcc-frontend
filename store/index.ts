import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { ICustomer, IGetAllCustomersResponse } from './types';

export const state = () => ({
	customers: [] as ICustomer[],
});

export enum MutationsEnum {
	SET_CUSTOMERS_FROM_DATABASE = 'SET_CUSTOMERS_FROM_DATABASE',
}

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
	customerInfo: (state) => state.customers,
	customersByColumnAndOrdered: function (state) {
		return function (column: number) {
			return state.customers
				.filter((c) => c.column === column)
				.sort(function (a, b) {
					if (a.order > b.order) {
						return 1;
					}
					if (a.order < b.order) {
						return -1;
					}
					return 0;
				});
		};
	},
};

export const mutations: MutationTree<RootState> = {
	[MutationsEnum.SET_CUSTOMERS_FROM_DATABASE]: (
		state,
		customers: ICustomer[]
	) => (state.customers = customers),
};

export const actions: ActionTree<RootState, RootState> = {
	async nuxtServerInit({ commit }): Promise<void> {
		try {
			const response = await this.$axios.$get<IGetAllCustomersResponse>(
				'http://127.0.0.1:3002/customers'
			);

			commit(MutationsEnum.SET_CUSTOMERS_FROM_DATABASE, response.data);
		} catch (error) {
			console.log(error);
		}
	},
};

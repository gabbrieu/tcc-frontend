import Vuex from 'vuex';
import { Customers } from '~/store/customers';

interface StoreType {
	mm: Customers;
}

export const store = new Vuex.Store<StoreType>({});

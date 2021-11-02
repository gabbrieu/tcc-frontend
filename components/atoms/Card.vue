<template>
	<draggable v-model="customers" group="tasks" animation="250" @end="teste">
		<div
			class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
			v-for="customer in customers"
			:key="customer.id"
		>
			{{ customer.name }}
		</div>
	</draggable>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import { mapGetters, mapState } from 'vuex';
import { MutationsEnum } from '../../store';

export default Vue.extend({
	components: {
		draggable,
	},

	computed: {
		//...mapGetters(['customersByColumnAndOrdered']),
		customers: {
			...mapState(['customers']),
			get() {
				//this.customersByColumnAndOrdered[this.column];
				//return this.$store.getters.customersByColumnAndOrdered(this.column);
				return this.$store.state.customers;
			},
			set(value) {
				this.$store.commit(MutationsEnum.SET_CUSTOMERS_FROM_DATABASE, value);
			},
		},
	},

	methods: {
		teste(t: any) {
			console.log(this.$store.state.customers);
		},
	},

	props: {
		column: Number,
	},
});
</script>

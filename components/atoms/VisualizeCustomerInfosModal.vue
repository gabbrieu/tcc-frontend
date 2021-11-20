<template>
	<div
		class="modal-overlay cursor-auto"
		@click="$emit('close-customer-info-modal')"
	>
		<div class="modal" @click.stop>
			<header class="flex justify-between mb-8">
				<div>
					<h2 class="font-bold text-3xl">{{ customer.name }}</h2>
					<p class="text-gray text-sm -mt-2.5">
						{{ customer.city }} -
						{{ customer.cellphone | VMask('(##) #####-####') }}
					</p>
				</div>
				<div
					class="cursor-pointer mr-3"
					@click="$emit('close-customer-info-modal')"
				>
					<img class="w-3 mt-2" src="~/assets/close-icon.svg" alt="" />
				</div>
			</header>

			<div>
				<h3 class="font-semibold text-base">Descrição</h3>
				<p>{{ customer.description }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICustomer } from '../../utils/types';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default Vue.extend({
	data() {
		return {
			customer: {} as ICustomer,
		};
	},

	props: {
		customerId: String,
	},

	async created() {
		this.customer = await this.$axios.$get(
			`${this.$config.baseURL}/customers/${this.customerId}`
		);
	},
});
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	background-color: #000000da;
	align-items: center;
}

.modal {
	background-color: white;
	width: 1200px;
	border-radius: 5px;
	padding: 1.5rem 1.325rem;
}

h2 {
	padding-bottom: 0.625rem;
}
</style>
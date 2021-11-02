<template>
	<div>
		<Navbar />
		<main>
			<button
				class="
					mt-4
					mb-4
					ml-9
					pt-2
					pb-2
					rounded-lg
					border-blue border
					text-blue
					font-semibold
					pr-4
					pl-4
				"
			>
				+ Novo cliente
			</button>

			<KanbanBoard
				:first-column="firstColumn"
				:second-column="secondColumn"
				:third-column="thirdColumn"
				:fourth-column="fourthColumn"
				:fifth-column="fifthColumn"
			/>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICustomer } from '@/utils/types';
import { IGetAllCustomersResponse } from '../store/types';

export default Vue.extend({
	data() {
		return {
			firstColumn: [] as ICustomer[],
			secondColumn: [] as ICustomer[],
			thirdColumn: [] as ICustomer[],
			fourthColumn: [] as ICustomer[],
			fifthColumn: [] as ICustomer[],
		};
	},

	async created() {
		const customers = await this.$axios.$get<IGetAllCustomersResponse>(
			'http://localhost:3002/customers'
		);

		customers.data.forEach((c) => {
			switch (c.column) {
				case 1:
					this.firstColumn.push(c);
					break;

				case 2:
					this.secondColumn.push(c);
					break;

				case 3:
					this.thirdColumn.push(c);
					break;

				case 4:
					this.fourthColumn.push(c);
					break;

				case 5:
					this.fifthColumn.push(c);
					break;

				default:
					console.log(c);
					break;
			}
		});
	},
});
</script>

<style scoped>
.border {
	border-width: 1px;
}
</style>

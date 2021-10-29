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
			<div class="flex flex-row">
				<div class="flex flex-col flex-1">
					<KanbanColumn title="Cliente em potencial" :column="customers(1)" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Contato realizado" :column="customers(1)" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Visita agendada" :column="customers(3)" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Negócio em andamento" :column="customers(4)" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Finalizados" :column="customers(5)" />
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import { Customers } from '../store/customers';

export default Vue.extend({
	data() {
		return {
			myModule: new Customers(Customers)
		}
	},
	methods: {
		customers(column: number) {
			return this.myModule.getCustomers.filter((value) => value.column === column);
		},
	},

	created() {
		this.myModule = getModule(Customers);
		this.myModule.getUsers();
	},
});
</script>

<style scoped>
.border {
	border-width: 1px;
}
</style>

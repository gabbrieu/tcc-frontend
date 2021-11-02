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
					<KanbanColumn title="Cliente em potencial" :column="1" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Contato realizado" :column="2" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Visita agendada" :column="3" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Negócio em andamento" :column="4" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Finalizados" :column="5" />
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICustomer } from '../store/types';

export default Vue.extend({
	computed: {
		customers: {
			get(): ICustomer[] {
				return this.$store.getters.customerInfo;
			},
		},
	},
});
</script>

<style scoped>
.border {
	border-width: 1px;
}
</style>

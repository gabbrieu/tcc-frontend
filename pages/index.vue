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
					<KanbanColumn
						title="Cliente em potencial"
						:column="potentialClient"
					/>
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Contato realizado" :column="contactMade" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Visita agendada" :column="scheduledVisit" />
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn
						title="Negócio em andamento"
						:column="businessInProgress"
					/>
				</div>

				<div class="flex flex-col flex-1">
					<KanbanColumn title="Finalizados" :column="done" />
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			newTasks: '',
			potentialClient: [
				{ name: 'Cliente em potencial 1' },
				{ name: 'Cliente em potencial 2' },
				{ name: 'Cliente em potencial 3' },
				{ name: 'Cliente em potencial 4' },
			],
			contactMade: [
				{ name: 'Contato realizado 1' },
				{ name: 'Contato realizado 2' },
				{ name: 'Contato realizado 3' },
				{ name: 'Contato realizado 4' },
				{ name: 'Contato realizado 5' },
			],
			scheduledVisit: [{ name: 'Visita agendada 1' }],
			businessInProgress: [
				{ name: 'Negócio em andamento 1' },
				{ name: 'Negócio em andamento 2' },
			],
			done: [
				{ name: 'Finalizados 1' },
				{ name: 'Finalizados 2' },
				{ name: 'Finalizados 3' },
			],
		}
	},
})
</script>

<style scoped>
.border {
	border-width: 1px;
}
</style>

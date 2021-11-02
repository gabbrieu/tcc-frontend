<template>
	<!-- FIRST COLUMN -->
	<div class="flex flex-row">
		<div class="flex flex-col flex-1">
			<div
				class="
					flex
					w-full
					pb-5
					pt-5
					text-kanban-column-title
					column-kanban-weight
					border-t-2 border-b-2 border-r-2 border-border-color
					justify-center
				"
			>
				<h3 class="pr-2">Cliente em potencial</h3>
				<span class="bg-border-color rounded-full pr-2 pl-2">{{
					firstColumnNew.length
				}}</span>
			</div>
			<draggable
				class="kanban-column"
				v-model="firstColumnNew"
				group="tasks"
				animation="250"
				@add="onAdd($event, 'firstColumn')"
				@change="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3"
					v-for="customer in firstColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					{{ customer.name }}
				</div>
			</draggable>
		</div>

		<!-- SECOND COLUMN -->
		<div class="flex flex-col flex-1">
			<div
				class="
					flex
					w-full
					pb-5
					pt-5
					text-kanban-column-title
					column-kanban-weight
					border-t-2 border-b-2 border-r-2 border-border-color
					justify-center
				"
			>
				<h3 class="pr-2">Contato realizado</h3>
				<span class="bg-border-color rounded-full pr-2 pl-2">{{
					secondColumnNew.length
				}}</span>
			</div>
			<draggable
				class="kanban-column"
				v-model="secondColumnNew"
				group="tasks"
				animation="250"
				@add="onAdd($event, 'secondColumn')"
				@change="update"
			>
				<div
					class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
					v-for="customer in secondColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					{{ customer.name }}
				</div>
			</draggable>
		</div>

		<!-- THIRD COLUMN -->
		<div class="flex flex-col flex-1">
			<div
				class="
					flex
					w-full
					pb-5
					pt-5
					text-kanban-column-title
					column-kanban-weight
					border-t-2 border-b-2 border-r-2 border-border-color
					justify-center
				"
			>
				<h3 class="pr-2">Visita agendada</h3>
				<span class="bg-border-color rounded-full pr-2 pl-2">{{
					thirdColumnNew.length
				}}</span>
			</div>
			<draggable
				class="kanban-column"
				v-model="thirdColumnNew"
				group="tasks"
				animation="250"
				@add="onAdd($event, 'thirdColumn')"
				@change="update"
			>
				<div
					class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
					v-for="customer in thirdColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					{{ customer.name }}
				</div>
			</draggable>
		</div>

		<!-- FOURTH COLUMN -->
		<div class="flex flex-col flex-1">
			<div
				class="
					flex
					w-full
					pb-5
					pt-5
					text-kanban-column-title
					column-kanban-weight
					border-t-2 border-b-2 border-r-2 border-border-color
					justify-center
				"
			>
				<h3 class="pr-2">Negócio em andamento</h3>
				<span class="bg-border-color rounded-full pr-2 pl-2">{{
					fourthColumnNew.length
				}}</span>
			</div>
			<draggable
				class="kanban-column"
				v-model="fourthColumnNew"
				group="tasks"
				animation="250"
				@add="onAdd($event, 'fourthColumn')"
				@change="update"
			>
				<div
					class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
					v-for="customer in fourthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					{{ customer.name }}
				</div>
			</draggable>
		</div>

		<!-- FIFTH COLUMN -->
		<div class="flex flex-col flex-1">
			<div
				class="
					flex
					w-full
					pb-5
					pt-5
					text-kanban-column-title
					column-kanban-weight
					border-t-2 border-b-2 border-r-2 border-border-color
					justify-center
				"
			>
				<h3 class="pr-2">Finalizados</h3>
				<span class="bg-border-color rounded-full pr-2 pl-2">{{
					fifthColumnNew.length
				}}</span>
			</div>
			<draggable
				class="kanban-column"
				v-model="fifthColumnNew"
				group="tasks"
				animation="250"
				@add="onAdd($event, 'fifthColumn')"
				@change="update"
			>
				<div
					class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
					v-for="customer in fifthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					{{ customer.name }}
				</div>
			</draggable>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';

export default Vue.extend({
	data() {
		return {
			firstColumnNew: this.firstColumn,
			secondColumnNew: this.secondColumn,
			thirdColumnNew: this.thirdColumn,
			fourthColumnNew: this.fourthColumn,
			fifthColumnNew: this.fifthColumn,
		};
	},

	components: {
		draggable,
	},

	props: {
		firstColumn: Array,
		secondColumn: Array,
		thirdColumn: Array,
		fourthColumn: Array,
		fifthColumn: Array,
	},

	methods: {
		async onAdd(event: any, column: string) {
			const id: string = event.item.getAttribute('data-id');
			try {
				await this.$axios.$patch(`http:localhost:3002/customers/${id}`, {
					column,
				});
			} catch (error) {
				console.log(error);
			}
		},

		update(c: any) {
			console.log(c);
		},
	},
});
</script>

<style scoped>
.column-kanban-weight {
	font-weight: 650;
}

.kanban-column {
	min-height: 500px;
}
</style>
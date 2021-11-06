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
				:list="firstColumnNew"
				group="tasks"
				animation="250"
				@end="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3 h-48 rounded-xl"
					v-for="customer in firstColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<h4>{{ customer.name }}</h4>
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
				:list="secondColumnNew"
				group="tasks"
				animation="250"
				@end="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3 h-48 rounded-xl"
					v-for="customer in secondColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<h4>{{ customer.name }}</h4>
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
				:list="thirdColumnNew"
				group="tasks"
				animation="250"
				@end="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3 h-48 rounded-xl"
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
				:list="fourthColumnNew"
				group="tasks"
				animation="250"
				@end="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3 h-48 rounded-xl"
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
				:list="fifthColumnNew"
				group="tasks"
				animation="250"
				@end="update"
			>
				<div
					class="bg-white pl-2 mt-2 ml-3 mr-3 h-48 rounded-xl"
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
import { ICustomer } from '../../utils/types';

export default Vue.extend({
	data() {
		return {
			firstColumnNew: this.firstColumn as ICustomer[],
			secondColumnNew: this.secondColumn as ICustomer[],
			thirdColumnNew: this.thirdColumn as ICustomer[],
			fourthColumnNew: this.fourthColumn as ICustomer[],
			fifthColumnNew: this.fifthColumn as ICustomer[],
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
		async update() {
			this.firstColumnNew.map((v, i) => {
				v.order = i + 1;
				v.column = 1;
			});
			this.secondColumnNew.map((v, i) => {
				v.order = i + 1;
				v.column = 2;
			});
			this.thirdColumnNew.map((v, i) => {
				v.order = i + 1;
				v.column = 3;
			});
			this.fourthColumnNew.map((v, i) => {
				v.order = i + 1;
				v.column = 4;
			});
			this.fifthColumnNew.map((v, i) => {
				v.order = i + 1;
				v.column = 5;
			});
			const customers = this.firstColumnNew.concat(
				this.secondColumnNew,
				this.thirdColumnNew,
				this.fourthColumnNew,
				this.fifthColumnNew
			);
			try {
				await this.$axios.$put(`http://localhost:3002/customers/update-all`, {
					customers,
				});
			} catch (error) {
				console.log(error);
			}
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
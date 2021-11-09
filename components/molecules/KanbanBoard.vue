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
					class="
						bg-white
						pl-2
						mt-2
						ml-3
						mr-3
						h-48
						rounded-xl
						border-2 border-border-color
					"
					v-for="customer in firstColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4 class="pt-3 font-extrabold text-lg">{{ customer.name }}</h4>
							<img
								class="w-4 mr-2"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
							/>
						</div>
						<p class="text-xs text-gray -mt-0.5">{{ customer.city }}</p>
						<p
							class="
								mt-12
								h-10
								text-sm
								overflow-ellipsis overflow-hidden
								descricao
							"
						>
							{{ customer.description }}
						</p>

						<div
							v-if="customer.priority === 'VERY_LOW'"
							class="mt-4 w-4 h-4 bg-priority-very-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'LOW'"
							class="mt-4 w-4 h-4 bg-priority-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'MEDIUM'"
							class="mt-4 w-4 h-4 bg-priority-medium"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'HIGH'"
							class="mt-4 w-4 h-4 bg-priority-high"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'URGENT'"
							class="mt-4 w-4 h-4 bg-priority-urgent"
							id="circulo"
						></div>
					</div>
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
					class="
						bg-white
						pl-2
						mt-2
						ml-3
						mr-3
						h-48
						rounded-xl
						border-2 border-border-color
					"
					v-for="customer in secondColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4 class="pt-3 font-extrabold text-lg">{{ customer.name }}</h4>
							<img
								class="w-4 mr-2"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
							/>
						</div>
						<p class="text-xs text-gray -mt-0.5">{{ customer.city }}</p>
						<p
							class="
								mt-12
								h-10
								text-sm
								overflow-ellipsis overflow-hidden
								descricao
							"
						>
							{{ customer.description }}
						</p>

						<div
							v-if="customer.priority === 'VERY_LOW'"
							class="mt-4 w-4 h-4 bg-priority-very-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'LOW'"
							class="mt-4 w-4 h-4 bg-priority-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'MEDIUM'"
							class="mt-4 w-4 h-4 bg-priority-medium"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'HIGH'"
							class="mt-4 w-4 h-4 bg-priority-high"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'URGENT'"
							class="mt-4 w-4 h-4 bg-priority-urgent"
							id="circulo"
						></div>
					</div>
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
					class="
						bg-white
						pl-2
						mt-2
						ml-3
						mr-3
						h-48
						rounded-xl
						border-2 border-border-color
					"
					v-for="customer in thirdColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4 class="pt-3 font-extrabold text-lg">{{ customer.name }}</h4>
							<img
								class="w-4 mr-2"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
							/>
						</div>
						<p class="text-xs text-gray -mt-0.5">{{ customer.city }}</p>
						<p
							class="
								mt-12
								h-10
								text-sm
								overflow-ellipsis overflow-hidden
								descricao
							"
						>
							{{ customer.description }}
						</p>

						<div
							v-if="customer.priority === 'VERY_LOW'"
							class="mt-4 w-4 h-4 bg-priority-very-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'LOW'"
							class="mt-4 w-4 h-4 bg-priority-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'MEDIUM'"
							class="mt-4 w-4 h-4 bg-priority-medium"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'HIGH'"
							class="mt-4 w-4 h-4 bg-priority-high"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'URGENT'"
							class="mt-4 w-4 h-4 bg-priority-urgent"
							id="circulo"
						></div>
					</div>
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
					class="
						bg-white
						pl-2
						mt-2
						ml-3
						mr-3
						h-48
						rounded-xl
						border-2 border-border-color
					"
					v-for="customer in fourthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4 class="pt-3 font-extrabold text-lg">{{ customer.name }}</h4>
							<img
								class="w-4 mr-2"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
							/>
						</div>
						<p class="text-xs text-gray -mt-0.5">{{ customer.city }}</p>
						<p
							class="
								mt-12
								h-10
								text-sm
								overflow-ellipsis overflow-hidden
								descricao
							"
						>
							{{ customer.description }}
						</p>

						<div
							v-if="customer.priority === 'VERY_LOW'"
							class="mt-4 w-4 h-4 bg-priority-very-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'LOW'"
							class="mt-4 w-4 h-4 bg-priority-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'MEDIUM'"
							class="mt-4 w-4 h-4 bg-priority-medium"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'HIGH'"
							class="mt-4 w-4 h-4 bg-priority-high"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'URGENT'"
							class="mt-4 w-4 h-4 bg-priority-urgent"
							id="circulo"
						></div>
					</div>
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
					class="
						bg-white
						pl-2
						mt-2
						ml-3
						mr-3
						h-48
						rounded-xl
						border-2 border-border-color
					"
					v-for="customer in fifthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4 class="pt-3 font-extrabold text-lg">{{ customer.name }}</h4>
							<img
								class="w-4 mr-2"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
							/>
						</div>
						<p class="text-xs text-gray -mt-0.5">{{ customer.city }}</p>
						<p
							class="
								mt-12
								h-10
								text-sm
								overflow-ellipsis overflow-hidden
								descricao
							"
						>
							{{ customer.description }}
						</p>

						<div
							v-if="customer.priority === 'VERY_LOW'"
							class="mt-4 w-4 h-4 bg-priority-very-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'LOW'"
							class="mt-4 w-4 h-4 bg-priority-low"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'MEDIUM'"
							class="mt-4 w-4 h-4 bg-priority-medium"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'HIGH'"
							class="mt-4 w-4 h-4 bg-priority-high"
							id="circulo"
						></div>

						<div
							v-else-if="customer.priority === 'URGENT'"
							class="mt-4 w-4 h-4 bg-priority-urgent"
							id="circulo"
						></div>
					</div>
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
#circulo {
	border-radius: 50%;
}

.column-kanban-weight {
	font-weight: 650;
}

.kanban-column {
	min-height: 500px;
}

.descricao {
	display: -webkit-box;
	-webkit-line-clamp: 2; /* number of lines to show */
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
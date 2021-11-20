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
			<Draggable
				class="kanban-column"
				:list="firstColumnNew"
				group="tasks"
				animation="250"
				@end="update"
				filter=".not-drag"
				:preventOnFilter="false"
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
						grabbable
					"
					v-for="customer in firstColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4
								class="
									pt-3
									font-extrabold
									text-lg
									overflow-ellipsis overflow-hidden
									descricao-1-line
								"
							>
								{{ customer.name }}
							</h4>
							<img
								class="w-4 mr-2 cursor-pointer"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
								v-popover.bottom="{ name: customer.id }"
							/>
							<Popover
								class="cursor-default not-drag"
								:name="customer.id"
								:width="182"
							>
								<div
									class="
										cursor-pointer
										inline-flex
										pt-2
										pl-2
										pb-2
										pr-9.5
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/pencil.svg"
										alt="Botão para editar um cliente"
									/>
									<p class="font-medium" @click="showEditCardModal = true">
										Editar cliente
									</p>
									<UpdateClientModal
										class="not-drag"
										:birthDate="customer.birthDate"
										:cellphone="customer.cellphone"
										:city="customer.city"
										:column="customer.column"
										:description="customer.description"
										:district="customer.district"
										:document="customer.document"
										:email="customer.email"
										:gender="customer.gender"
										:houseNumber="customer.houseNumber"
										:name="customer.name"
										:priority="customer.priority"
										:street="customer.street"
										:customerId="customer.id"
										v-show="showEditCardModal"
										@close-edit-modal="updateCustomerInfos"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-8
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/exclude.svg"
										alt="Botão para excluir um cliente"
									/>
									<p class="font-medium" @click="showExcludeCardModal = true">
										Excluir cliente
									</p>
									<ExcludeClientModal
										:customerId="customer.id"
										v-show="showExcludeCardModal"
										@close-exclude-modal="showExcludeCardModal = false"
										v-on="$listeners"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-2.5
										hover:bg-background
									"
									@click="showCustomerInfoModal = true"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/eye.svg"
										alt="Ícone para visualizar um cliente"
									/>
									<p class="font-medium">Visualizar cliente</p>
								</div>
								<VisualizeCustomerInfosModal
									v-show="showCustomerInfoModal"
									:customerId="customer.id"
									@close-customer-info-modal="showCustomerInfoModal = false"
								/>
							</Popover>
						</div>
						<p
							class="
								text-xs text-gray
								-mt-0.5
								overflow-ellipsis overflow-hidden
								descricao-1-line
							"
						>
							{{ customer.city }}
						</p>
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
			</Draggable>
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
			<Draggable
				class="kanban-column"
				:list="secondColumnNew"
				group="tasks"
				animation="250"
				@end="update"
				filter=".not-drag"
				:preventOnFilter="false"
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
						grabbable
					"
					v-for="customer in secondColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4
								class="
									pt-3
									font-extrabold
									text-lg
									overflow-ellipsis overflow-hidden
									descricao-1-line
								"
							>
								{{ customer.name }}
							</h4>
							<img
								class="w-4 mr-2 cursor-pointer"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
								v-popover.bottom="{ name: customer.id }"
							/>
							<Popover
								class="cursor-default not-drag"
								:name="customer.id"
								:width="182"
							>
								<div
									class="
										cursor-pointer
										inline-flex
										pt-2
										pl-2
										pb-2
										pr-9.5
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/pencil.svg"
										alt="Botão para editar um cliente"
									/>
									<p class="font-medium" @click="showEditCardModal = true">
										Editar cliente
									</p>
									<UpdateClientModal
										class="not-drag"
										:birthDate="customer.birthDate"
										:cellphone="customer.cellphone"
										:city="customer.city"
										:column="customer.column"
										:description="customer.description"
										:district="customer.district"
										:document="customer.document"
										:email="customer.email"
										:gender="customer.gender"
										:houseNumber="customer.houseNumber"
										:name="customer.name"
										:priority="customer.priority"
										:street="customer.street"
										:customerId="customer.id"
										v-show="showEditCardModal"
										@close-edit-modal="updateCustomerInfos"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-8
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/exclude.svg"
										alt="Botão para excluir um cliente"
									/>
									<p class="font-medium" @click="showExcludeCardModal = true">
										Excluir cliente
									</p>
									<ExcludeClientModal
										:customerId="customer.id"
										v-show="showExcludeCardModal"
										@close-exclude-modal="showExcludeCardModal = false"
										v-on="$listeners"
									/>
								</div>
								<NuxtLink :to="`/clientes/${customer.id}`">
									<div
										class="
											cursor-pointer
											inline-flex
											mt-1
											pt-2
											pb-2
											pl-2
											pr-2.5
											hover:bg-background
										"
									>
										<img
											class="w-5 h-5 mr-2"
											src="~/assets/eye.svg"
											alt="Ícone para visualizar um cliente"
										/>
										<p class="font-medium">Visualizar cliente</p>
									</div>
								</NuxtLink>
							</Popover>
						</div>
						<p
							class="
								text-xs text-gray
								-mt-0.5
								overflow-ellipsis overflow-hidden
								descricao-1-line
							"
						>
							{{ customer.city }}
						</p>
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
			</Draggable>
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
			<Draggable
				class="kanban-column"
				:list="thirdColumnNew"
				group="tasks"
				animation="250"
				@end="update"
				filter=".not-drag"
				:preventOnFilter="false"
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
						grabbable
					"
					v-for="customer in thirdColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4
								class="
									pt-3
									font-extrabold
									text-lg
									overflow-ellipsis overflow-hidden
									descricao-1-line
								"
							>
								{{ customer.name }}
							</h4>
							<img
								class="w-4 mr-2 cursor-pointer"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
								v-popover.bottom="{ name: customer.id }"
							/>
							<Popover
								class="cursor-default not-drag"
								:name="customer.id"
								:width="182"
							>
								<div
									class="
										cursor-pointer
										inline-flex
										pt-2
										pl-2
										pb-2
										pr-9.5
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/pencil.svg"
										alt="Botão para editar um cliente"
									/>
									<p class="font-medium" @click="showEditCardModal = true">
										Editar cliente
									</p>
									<UpdateClientModal
										class="not-drag"
										:birthDate="customer.birthDate"
										:cellphone="customer.cellphone"
										:city="customer.city"
										:column="customer.column"
										:description="customer.description"
										:district="customer.district"
										:document="customer.document"
										:email="customer.email"
										:gender="customer.gender"
										:houseNumber="customer.houseNumber"
										:name="customer.name"
										:priority="customer.priority"
										:street="customer.street"
										:customerId="customer.id"
										v-show="showEditCardModal"
										@close-edit-modal="updateCustomerInfos"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-8
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/exclude.svg"
										alt="Botão para excluir um cliente"
									/>
									<p class="font-medium" @click="showExcludeCardModal = true">
										Excluir cliente
									</p>
									<ExcludeClientModal
										:customerId="customer.id"
										v-show="showExcludeCardModal"
										@close-exclude-modal="showExcludeCardModal = false"
										v-on="$listeners"
									/>
								</div>
								<NuxtLink :to="`/clientes/${customer.id}`">
									<div
										class="
											cursor-pointer
											inline-flex
											mt-1
											pt-2
											pb-2
											pl-2
											pr-2.5
											hover:bg-background
										"
									>
										<img
											class="w-5 h-5 mr-2"
											src="~/assets/eye.svg"
											alt="Ícone para visualizar um cliente"
										/>
										<p class="font-medium">Visualizar cliente</p>
									</div>
								</NuxtLink>
							</Popover>
						</div>
						<p
							class="
								text-xs text-gray
								-mt-0.5
								overflow-ellipsis overflow-hidden
								descricao-1-line
							"
						>
							{{ customer.city }}
						</p>
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
			</Draggable>
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
			<Draggable
				class="kanban-column"
				:list="fourthColumnNew"
				group="tasks"
				animation="250"
				@end="update"
				filter=".not-drag"
				:preventOnFilter="false"
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
						grabbable
					"
					v-for="customer in fourthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4
								class="
									pt-3
									font-extrabold
									text-lg
									overflow-ellipsis overflow-hidden
									descricao-1-line
								"
							>
								{{ customer.name }}
							</h4>
							<img
								class="w-4 mr-2 cursor-pointer"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
								v-popover.bottom="{ name: customer.id }"
							/>
							<Popover
								class="cursor-default not-drag"
								:name="customer.id"
								:width="182"
							>
								<div
									class="
										cursor-pointer
										inline-flex
										pt-2
										pl-2
										pb-2
										pr-9.5
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/pencil.svg"
										alt="Botão para editar um cliente"
									/>
									<p class="font-medium" @click="showEditCardModal = true">
										Editar cliente
									</p>
									<UpdateClientModal
										class="not-drag"
										:birthDate="customer.birthDate"
										:cellphone="customer.cellphone"
										:city="customer.city"
										:column="customer.column"
										:description="customer.description"
										:district="customer.district"
										:document="customer.document"
										:email="customer.email"
										:gender="customer.gender"
										:houseNumber="customer.houseNumber"
										:name="customer.name"
										:priority="customer.priority"
										:street="customer.street"
										:customerId="customer.id"
										v-show="showEditCardModal"
										@close-edit-modal="updateCustomerInfos"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-8
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/exclude.svg"
										alt="Botão para excluir um cliente"
									/>
									<p class="font-medium" @click="showExcludeCardModal = true">
										Excluir cliente
									</p>
									<ExcludeClientModal
										:customerId="customer.id"
										v-show="showExcludeCardModal"
										@close-exclude-modal="showExcludeCardModal = false"
										v-on="$listeners"
									/>
								</div>
								<NuxtLink :to="`/clientes/${customer.id}`">
									<div
										class="
											cursor-pointer
											inline-flex
											mt-1
											pt-2
											pb-2
											pl-2
											pr-2.5
											hover:bg-background
										"
									>
										<img
											class="w-5 h-5 mr-2"
											src="~/assets/eye.svg"
											alt="Ícone para visualizar um cliente"
										/>
										<p class="font-medium">Visualizar cliente</p>
									</div>
								</NuxtLink>
							</Popover>
						</div>
						<p
							class="
								text-xs text-gray
								-mt-0.5
								overflow-ellipsis overflow-hidden
								descricao-1-line
							"
						>
							{{ customer.city }}
						</p>
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
			</Draggable>
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
			<Draggable
				class="kanban-column"
				:list="fifthColumnNew"
				group="tasks"
				animation="250"
				@end="update"
				filter=".not-drag"
				:preventOnFilter="false"
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
						grabbable
					"
					v-for="customer in fifthColumnNew"
					:key="customer.id"
					:data-id="customer.id"
				>
					<div class="pl-2 pr-2 pb-2">
						<div class="flex justify-between">
							<h4
								class="
									pt-3
									font-extrabold
									text-lg
									overflow-ellipsis overflow-hidden
									descricao-1-line
								"
							>
								{{ customer.name }}
							</h4>
							<img
								class="w-4 mr-2 cursor-pointer"
								src="~/assets/three-dots.svg"
								alt="Botão para opção"
								v-popover.left="{ name: customer.id }"
							/>
							<Popover
								class="cursor-default not-drag"
								:name="customer.id"
								:width="182"
							>
								<div
									class="
										cursor-pointer
										inline-flex
										pt-2
										pl-2
										pb-2
										pr-9.5
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/pencil.svg"
										alt="Botão para editar um cliente"
									/>
									<p class="font-medium" @click="showEditCardModal = true">
										Editar cliente
									</p>
									<UpdateClientModal
										class="not-drag"
										:birthDate="customer.birthDate"
										:cellphone="customer.cellphone"
										:city="customer.city"
										:column="customer.column"
										:description="customer.description"
										:district="customer.district"
										:document="customer.document"
										:email="customer.email"
										:gender="customer.gender"
										:houseNumber="customer.houseNumber"
										:name="customer.name"
										:priority="customer.priority"
										:street="customer.street"
										:customerId="customer.id"
										v-show="showEditCardModal"
										@close-edit-modal="updateCustomerInfos"
									/>
								</div>
								<div
									class="
										cursor-pointer
										inline-flex
										mt-1
										pt-2
										pb-2
										pl-2
										pr-8
										hover:bg-background
									"
								>
									<img
										class="w-5 h-5 mr-2"
										src="~/assets/exclude.svg"
										alt="Botão para excluir um cliente"
									/>
									<p class="font-medium" @click="showExcludeCardModal = true">
										Excluir cliente
									</p>
									<ExcludeClientModal
										:customerId="customer.id"
										v-show="showExcludeCardModal"
										@close-exclude-modal="showExcludeCardModal = false"
										v-on="$listeners"
									/>
								</div>
								<NuxtLink :to="`/clientes/${customer.id}`">
									<div
										class="
											cursor-pointer
											inline-flex
											mt-1
											pt-2
											pb-2
											pl-2
											pr-2.5
											hover:bg-background
										"
									>
										<img
											class="w-5 h-5 mr-2"
											src="~/assets/eye.svg"
											alt="Ícone para visualizar um cliente"
										/>
										<p class="font-medium">Visualizar cliente</p>
									</div>
								</NuxtLink>
							</Popover>
						</div>
						<p
							class="
								text-xs text-gray
								-mt-0.5
								overflow-ellipsis overflow-hidden
								descricao-1-line
							"
						>
							{{ customer.city }}
						</p>
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
			</Draggable>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Draggable from 'vuedraggable';
import { ICustomer } from '../../utils/types';
import ExcludeClientModal from '../atoms/ExcludeClientModal.vue';
import UpdateClientModal from '../atoms/UpdateClientModal.vue';

export default Vue.extend({
	data() {
		return {
			firstColumnNew: this.firstColumn as ICustomer[],
			secondColumnNew: this.secondColumn as ICustomer[],
			thirdColumnNew: this.thirdColumn as ICustomer[],
			fourthColumnNew: this.fourthColumn as ICustomer[],
			fifthColumnNew: this.fifthColumn as ICustomer[],
			showEditCardModal: false,
			showExcludeCardModal: false,
			showCustomerInfoModal: false,
		};
	},

	components: {
		Draggable,
		UpdateClientModal,
		ExcludeClientModal,
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
				await this.$axios.$put(`${this.$config.baseURL}/customers/update-all`, {
					customers,
				});
			} catch (error) {
				console.log(error);
			}
		},

		updateCustomerInfos(customerUpdated: ICustomer | undefined) {
			this.showEditCardModal = false;
			if (customerUpdated) {
				switch (customerUpdated.column) {
					case 1:
						const index = this.firstColumnNew.findIndex(
							(c) => c.id === customerUpdated.id
						);
						this.firstColumnNew[index] = customerUpdated;
						break;

					case 2:
						const index2 = this.secondColumnNew.findIndex(
							(c) => c.id === customerUpdated.id
						);
						this.secondColumnNew[index2] = customerUpdated;
						break;

					case 3:
						const index3 = this.thirdColumnNew.findIndex(
							(c) => c.id === customerUpdated.id
						);
						this.thirdColumnNew[index3] = customerUpdated;
						break;

					case 4:
						const index4 = this.fourthColumnNew.findIndex(
							(c) => c.id === customerUpdated.id
						);
						this.fourthColumnNew[index4] = customerUpdated;
						break;

					case 5:
						const index5 = this.fifthColumnNew.findIndex(
							(c) => c.id === customerUpdated.id
						);
						this.fifthColumnNew[index5] = customerUpdated;
						break;

					default:
						console.log(`Coluna ${customerUpdated.column} não existe`);
						break;
				}
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

.descricao-1-line {
	display: -webkit-box;
	-webkit-line-clamp: 1; /* number of lines to show */
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.grabbable {
	cursor: move; /* fallback if grab cursor is unsupported */
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbable:active {
	cursor: grabbing;
	cursor: -moz-grabbing;
	cursor: -webkit-grabbing;
}
</style>
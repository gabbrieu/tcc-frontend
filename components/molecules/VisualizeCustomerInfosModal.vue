<template>
	<div
		class="modal-overlay cursor-auto"
		@click="$emit('close-customer-info-modal')"
	>
		<div class="modal overflow-auto" @click.stop>
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
					<img class="w-5 mt-2" src="~/assets/close-icon.svg" alt="" />
				</div>
			</header>

			<h3 class="font-semibold text-base">Descrição</h3>
			<div class="h-64 overflow-auto mb-6">
				<p class="whitespace-pre-wrap">{{ customer.description }}</p>
			</div>

			<div class="inline-flex">
				<input
					type="button"
					value="Comentários"
					class="cursor-pointer p-1.5 rounded-sm font-semibold"
					@click="window = 'COMMENTS'"
					:style="window === 'COMMENTS' ? focusWindow : notFocusWindow"
				/>
				<input
					type="button"
					value="Informações"
					class="cursor-pointer p-1.5 rounded-sm font-semibold ml-3"
					@click="window = 'INFOS'"
					:style="window === 'INFOS' ? focusWindow : notFocusWindow"
				/>
			</div>

			<section class="flex mt-3" v-if="window === 'INFOS'">
				<ul class="flex-col flex-1">
					<li class="text-kanban-column-title">
						<span class="font-semibold">Nome: </span>{{ customer.name }}
					</li>

					<li class="text-kanban-column-title" v-if="customer.email">
						<a :href="`mailto:${customer.email}`"
							><span class="font-semibold">Email: </span>{{ customer.email }}</a
						>
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Celular: </span>{{ customer.cellphone }}
					</li>

					<li
						class="text-kanban-column-title"
						v-if="customer.document.length > 11"
					>
						<span class="font-semibold">CNPJ: </span
						>{{ customer.document | VMask('##.##.###/####-##') }}
					</li>

					<li class="text-kanban-column-title" v-else>
						<span class="font-semibold">CPF: </span
						>{{ customer.document | VMask('###.###.###-##') }}
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Data de nascimento: </span
						>{{ moment(customer.birthDate).format('DD/MM/YYYY') }}
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Gênero: </span
						>{{
							customer.gender.charAt(0) + customer.gender.slice(1).toLowerCase()
						}}
					</li>
				</ul>

				<ul class="flex-col flex-1">
					<li class="text-kanban-column-title">
						<span class="font-semibold">Cidade: </span> {{ customer.city }}
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Bairro: </span> {{ customer.district }}
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Rua: </span> {{ customer.street }}
					</li>

					<li class="text-kanban-column-title">
						<span class="font-semibold">Número: </span>
						{{ customer.houseNumber }}
					</li>
				</ul>

				<ul class="flex-col flex-1">
					<li class="text-kanban-column-title inline-flex">
						<span class="font-semibold">Prioridade:&nbsp;</span>
						<div
							class="inline-flex items-center"
							v-if="customer.priority === 'VERY_LOW'"
						>
							Muito baixa&nbsp;
							<div class="w-4 h-4 bg-priority-very-low" id="circulo"></div>
						</div>

						<div
							class="inline-flex items-center"
							v-else-if="customer.priority === 'LOW'"
						>
							Baixa&nbsp;
							<div class="w-4 h-4 bg-priority-low" id="circulo"></div>
						</div>

						<div
							class="inline-flex items-center"
							v-else-if="customer.priority === 'MEDIUM'"
						>
							Média&nbsp;
							<div class="w-4 h-4 bg-priority-medium" id="circulo"></div>
						</div>

						<div
							class="inline-flex items-center"
							v-else-if="customer.priority === 'HIGH'"
						>
							Alta&nbsp;
							<div class="w-4 h-4 bg-priority-high" id="circulo"></div>
						</div>

						<div class="inline-flex items-center" v-else>
							Urgente&nbsp;
							<div class="w-4 h-4 bg-priority-urgent" id="circulo"></div>
						</div>
					</li>

					<li class="text-kanban-column-title">
						<p v-if="customer.column === 1">
							<span class="font-semibold">Etapa da jornada:&nbsp;</span>Cliente
							em potencial
						</p>
						<p v-else-if="customer.column === 2">
							<span class="font-semibold">Etapa da jornada:&nbsp;</span>Contato
							realizado
						</p>
						<p v-else-if="customer.column === 3">
							<span class="font-semibold">Etapa da jornada:&nbsp;</span>Visita
							agendada
						</p>
						<p v-else-if="customer.column === 4">
							<span class="font-semibold">Etapa da jornada:&nbsp;</span>Negócio
							em andamento
						</p>
						<p v-else>
							<span class="font-semibold">Etapa da jornada:&nbsp;</span
							>Finalizados
						</p>
					</li>
				</ul>
			</section>

			<div class="flex flex-col mt-3" v-if="window === 'COMMENTS'">
				<form v-on:submit.prevent="sendComment">
					<textarea
						class="
							resize-none
							border border-border-color
							pt-1.5
							pl-1.5
							w-full
							h-28
						"
						type="text"
						name="comments"
						id="comments"
						v-model.trim="commentInTextArea"
						placeholder="Adicione um comentário"
						required
					/>
					<button
						type="submit"
						class="
							mt-1
							p-2
							border-2 border-blue
							rounded-md
							text-blue
							font-bold
							w-auto
							float-right
							hover:bg-blue hover:text-white
						"
					>
						Adicionar
					</button>
				</form>
				<br />

				<div v-for="(comment, index) in commentsResponse" :key="comment.id">
					<div class="inline-flex">
						<span class="text-kanban-column-title font-bold">Erlaine</span>
						<span class="text-kanban-column-title ml-2 text-sm">
							{{ moment(comment.updatedAt).format('LLL') }}
							<span
								v-if="comment.updatedAt !== comment.createdAt"
								class="text-sm"
								>(Editado)</span
							>
						</span>
					</div>

					<form
						v-if="showEditIndex.includes(index)"
						@submit.prevent="handleSaveEditComment(index, comment.id)"
					>
						<textarea
							class="
								resize-none
								border border-border-color
								pt-1.5
								pl-1.5
								w-full
								h-28
							"
							type="text"
							name="editComments"
							v-model.trim="cloneComments[index].comment"
							required
						/>

						<div class="inline-flex mb-6 mt-1">
							<button
								type="button"
								class="
									p-1
									border
									rounded-md
									text-red
									border-red
									hover:bg-red hover:text-white
									font-semibold
									text-sm
								"
								@click="handleCancelEditComment(comment.comment, index)"
							>
								Cancelar
							</button>
							<button
								type="submit"
								class="
									p-1
									ml-1.5
									border
									rounded-md
									text-blue
									border-blue
									hover:bg-blue hover:text-white
									font-semibold
									text-sm
								"
							>
								Salvar
							</button>
						</div>
					</form>

					<p v-if="!showEditIndex.includes(index)" class="py-1">
						<span class="text-sm whitespace-pre-wrap">{{
							comment.comment
						}}</span>
					</p>

					<div
						v-if="
							index === commentsResponse.length - 1 &&
							!showEditIndex.includes(index)
						"
						class="inline-flex text-sm"
					>
						<button
							class="text-kanban-column-title font-semibold"
							@click="handleEditClick(index)"
						>
							Editar
						</button>

						<button
							class="text-kanban-column-title font-semibold ml-1.5"
							@click="handleExcludeCommentOpen(comment.id)"
						>
							Excluir
						</button>

						<ExcludeCommentModal
							v-show="showExcludeCommentModal"
							:commentId="commentToExclude"
							@close-exclude-comment-modal="handleExcludeCommentModal"
						/>
					</div>

					<div
						v-else-if="!showEditIndex.includes(index)"
						class="inline-flex mb-7 text-sm"
					>
						<button
							class="text-kanban-column-title font-semibold"
							@click="handleEditClick(index)"
						>
							Editar
						</button>

						<button
							class="text-kanban-column-title font-semibold ml-1.5"
							@click="handleExcludeCommentOpen(comment.id)"
						>
							Excluir
						</button>

						<ExcludeCommentModal
							v-show="showExcludeCommentModal"
							:commentId="commentToExclude"
							@close-exclude-comment-modal="handleExcludeCommentModal"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
enum WindowEnum {
	COMMENTS = 'COMMENTS',
	INFOS = 'INFOS',
}
import * as moment from 'moment';
import 'moment/locale/pt-br';
import Vue from 'vue';
import {
	IComments,
	ICommentsGetAllResponse,
	ICommentsResponse,
	ICustomer,
} from '../../utils/types';
import VueMask from 'v-mask';

moment.locale('pt-br');
Vue.use(VueMask);
Vue.prototype.moment = moment;

export default Vue.extend({
	data() {
		return {
			customer: {} as ICustomer,
			window: WindowEnum.COMMENTS,
			commentsResponse: [] as ICommentsResponse[],
			commentInTextArea: '',
			focusWindow: {
				background: '#505F79',
				color: '#FFFFFF',
			},
			notFocusWindow: {
				background: '#E7E9FF',
				color: '#47484F',
			},
			showExcludeCommentModal: false,
			showEditCommentModal: false,
			showEditIndex: [] as number[],
			cloneComments: [] as ICommentsResponse[],
			commentToExclude: '',
		};
	},

	props: {
		customerId: String,
	},

	async created(): Promise<void> {
		await this.getCommentsInDatabase();
	},

	methods: {
		async getCommentsInDatabase(): Promise<void> {
			try {
				this.customer = await this.$axios.$get(
					`${this.$config.baseURL}/customers/${this.customerId}`
				);

				const response = await this.$axios.$get<ICommentsGetAllResponse>(
					`${this.$config.baseURL}/comments`,
					{ params: { customerId: this.customerId } }
				);

				this.commentsResponse = response.data;
				this.cloneComments = JSON.parse(JSON.stringify(response.data));
			} catch (error) {
				console.log(error);
			}
		},

		async sendComment(): Promise<void> {
			try {
				const response = await this.$axios.post<ICommentsResponse>(
					`${this.$config.baseURL}/comments`,
					{
						comment: this.commentInTextArea,
						customerId: this.customerId,
					}
				);

				if (response.status === 201) {
					this.commentInTextArea = '';
					this.commentsResponse.push(response.data);
					this.cloneComments = JSON.parse(
						JSON.stringify(this.commentsResponse)
					);
				}
			} catch (error) {
				console.log(error);
			}
		},

		handleEditClick(index: number): void {
			if (!this.showEditIndex.includes(index)) {
				this.showEditIndex.push(index);
			}
		},

		async handleExcludeCommentModal(): Promise<void> {
			this.showExcludeCommentModal = false;
			this.commentToExclude = '';
			await this.getCommentsInDatabase();
		},

		handleCancelEditComment(commentInDatabase: string, index: number) {
			this.cloneComments.splice(index, 1, {
				...this.cloneComments[index],
				comment: commentInDatabase,
			});
			this.closeEditCommentTextarea(index);
		},

		async handleSaveEditComment(index: number, commentId: string) {
			try {
				const response = await this.$axios.patch<IComments>(
					`${this.$config.baseURL}/comments/${commentId}`,
					{
						comment: this.cloneComments[index].comment,
					}
				);

				if (response.status === 200) {
					const indexOfFoundComment = this.commentsResponse.findIndex(
						(c) => c.id === response.data.id
					);

					this.commentsResponse.splice(indexOfFoundComment, 1, {
						...this.commentsResponse[indexOfFoundComment],
						comment: response.data.comment,
						updatedAt: response.data.updatedAt,
					});

					this.closeEditCommentTextarea(index);
				}
			} catch (error) {
				console.log(error);
			}
		},

		closeEditCommentTextarea(index: number) {
			let i = this.showEditIndex.indexOf(index);
			if (i !== -1) {
				this.showEditIndex.splice(i, 1);
			}
		},

		handleExcludeCommentOpen(commentId: string) {
			this.showExcludeCommentModal = true;
			this.commentToExclude = commentId;
		},
	},
});
</script>

<style scoped>
#circulo {
	border-radius: 50%;
}

li {
	padding-top: 0.125rem /* 2px */;
	padding-bottom: 0.125rem /* 2px */;
}

li:first-child {
	padding-top: 0;
}

li:last-child {
	padding-bottom: 0;
}

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
	max-height: 50rem;
}

@media screen and (max-width: 1390px) {
	.modal {
		width: 1000px;
		max-height: 35rem;
	}
}

h2 {
	padding-bottom: 0.625rem;
}
</style>
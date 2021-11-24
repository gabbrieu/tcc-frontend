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
					<img class="w-3 mt-2" src="~/assets/close-icon.svg" alt="" />
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

					<textarea
						v-if="showEditTextArea && showEditIndex.includes(index)"
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
					/>

					<p v-else class="py-1 text-sm">
						{{ comment.comment }}
					</p>

					<div
						class="inline-flex"
						v-if="showEditTextArea && showEditIndex.includes(index)"
					>
						<button @click="handleCancelEditComment(comment.comment, index)">
							Cancelar
						</button>
						<button class="ml-1.5" @click="handleSaveEditComment">
							Salvar
						</button>
					</div>

					<div
						v-else-if="index === commentsResponse.length - 1"
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
							@click="showExcludeCommentModal = true"
						>
							Excluir
						</button>

						<ExcludeCommentModal
							v-show="showExcludeCommentModal"
							:commentId="comment.id"
							@close-exclude-comment-modal="handleExcludeCommentModal"
						/>
					</div>

					<div v-else class="inline-flex mb-7 text-sm">
						<button
							class="text-kanban-column-title font-semibold"
							@click="handleEditClick(index)"
						>
							Editar
						</button>

						<button
							class="text-kanban-column-title font-semibold ml-1.5"
							@click="showExcludeCommentModal = true"
						>
							Excluir
						</button>

						<ExcludeCommentModal
							v-show="showExcludeCommentModal"
							:commentId="comment.id"
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
			showEditTextArea: false,
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
				this.cloneComments = { ...this.commentsResponse };
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
					this.commentsResponse.push(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		},

		handleEditClick(index: number): void {
			this.showEditTextArea = true;
			if (!this.showEditIndex.includes(index)) {
				this.showEditIndex.push(index);
			}
		},

		async handleExcludeCommentModal(): Promise<void> {
			this.showExcludeCommentModal = false;
			await this.getCommentsInDatabase();
		},

		handleCancelEditComment(commentInDatabase: string, index: number) {
			console.log(commentInDatabase);
			this.cloneComments[index].comment = commentInDatabase;
			this.showEditTextArea = false;
			let i = this.showEditIndex.indexOf(index);
			if (i !== -1) {
				this.showEditIndex.splice(i, 1);
			}
		},

		handleSaveEditComment() {},
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
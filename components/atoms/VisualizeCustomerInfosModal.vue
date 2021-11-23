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
					class="
						cursor-pointer
						bg-gray-dark
						p-1.5
						rounded-sm
						font-semibold
						text-white
					"
					@click="window = 'COMMENTS'"
				/>
				<input
					type="button"
					value="Informações"
					class="
						cursor-pointer
						bg-border-color
						p-1.5
						rounded-sm
						font-semibold
						text-kanban-column-title
						ml-3
					"
					@click="window = 'INFOS'"
				/>
			</div>

			<div class="flex flex-col mt-3" v-if="window === 'COMMENTS'">
				<form v-on:submit.prevent="sendComment">
					<textarea
						class="resize-none border border-border-color pt-1.5 pl-1.5 w-full"
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

				<div
					v-for="(comment, index) in commentsResponse"
					:key="comment.id"
					class="father"
				>
					<div class="inline-flex">
						<span class="text-kanban-column-title font-bold">Erlaine</span>
						<span class="text-kanban-column-title ml-2">
							{{ moment(comment.updatedAt).format('LLL') }}
							<span v-if="comment.updatedAt !== comment.createdAt"
								>(Editado)</span
							>
						</span>
					</div>
					<p v-if="index === commentsResponse.length - 1" class="py-1">
						{{ comment.comment }}
					</p>
					<p v-else class="py-1 mb-7">
						{{ comment.comment }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

enum WindowEnum {
	COMMENTS = 'COMMENTS',
	INFOS = 'INFOS',
}

import Vue from 'vue';
import {
	ICommentsGetAll,
	ICommentsGetAllResponse,
	ICustomer,
} from '../../utils/types';
import VueMask from 'v-mask';
Vue.use(VueMask);
Vue.prototype.moment = moment;

export default Vue.extend({
	data() {
		return {
			customer: {} as ICustomer,
			window: WindowEnum.COMMENTS,
			commentsResponse: [] as ICommentsGetAll[],
			commentInTextArea: '',
		};
	},

	props: {
		customerId: String,
	},

	async created(): Promise<void> {
		this.customer = await this.$axios.$get(
			`${this.$config.baseURL}/customers/${this.customerId}`
		);

		const response = await this.$axios.$get<ICommentsGetAllResponse>(
			`${this.$config.baseURL}/comments`,
			{ params: { customerId: this.customerId } }
		);

		this.commentsResponse = response.data;
	},

	methods: {
		async sendComment() {},
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

h2 {
	padding-bottom: 0.625rem;
}
</style>
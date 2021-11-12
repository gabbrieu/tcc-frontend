<template>
	<div class="modal-overlay" @click="$emit('close-edit-modal')">
		<div class="modal" @click.stop>
			<header class="flex justify-between border-b border-light-gray mb-4">
				<h2 class="font-bold pl-3 text-lg">Edição de dados de um cliente</h2>
				<div class="cursor-pointer mr-3" @click="$emit('close-edit-modal')">
					<img
						class="w-3 mt-2"
						src="~/assets/close-icon.svg"
						alt=""
						@click="showEditCardModal = false"
					/>
				</div>
			</header>
			<form v-on:submit.prevent="sendClient" class="flex flex-row">
				<div class="flex flex-col flex-1 ml-3 mr-3">
					<label for="nameNew">Nome Completo</label>
					<input
						type="text"
						name="nameNew"
						id="nameNew"
						v-model.trim="nameNew"
						placeholder="Digite o nome completo do cliente"
					/>

					<label for="cellphoneNew">Celular</label>
					<input
						type="text"
						name="cellphoneNew"
						id="cellphoneNew"
						v-model.trim="cellphoneNew"
						placeholder="Digite o celular do cliente"
						v-mask="'(##) #####-####'"
					/>

					<label for="emailNew">Email</label>
					<input
						type="email"
						name="emailNew"
						id="emaiNewl"
						v-model.trim="emailNew"
						placeholder="Digite o email do cliente"
					/>

					<label for="documentNew">CPF</label>
					<input
						class="cursor-not-allowed bg-priority-very-low"
						type="text"
						name="documentNew"
						id="documentNew"
						v-model.trim="documentNew"
						v-mask="'###.###.###-##'"
						placeholder="Digite o CPF do cliente"
						disabled
					/>

					<label for="birthDateNew">Data de Nascimento</label>
					<input
						class="cursor-not-allowed bg-priority-very-low"
						type="date"
						name="birthDateNew"
						id="birthDateNew"
						v-model="birthDateNew"
						disabled
					/>

					<p>Gênero</p>
					<select class="cursor-pointer" name="genderNew" v-model="genderNew">
						<option disabled value="">Escolha um item</option>
						<option value="MASCULINO">Masculino</option>
						<option value="FEMININO">Feminino</option>
						<option value="NÃO INFORMADO">Não informado</option>
					</select>

					<p>Etapa da Jornada</p>
					<select class="cursor-pointer" name="columnNew" v-model="columnNew">
						<option disabled value="">Escolha um item</option>
						<option :value="1">Cliente em potencial</option>
						<option :value="2">Contato realizado</option>
						<option :value="3">Visita agendada</option>
						<option :value="4">Negócio em andamento</option>
						<option :value="5">Finalizados</option>
					</select>

					<label for="descriptionNew">Descrição</label>
					<textarea
						class="resize-none"
						type="text"
						name="descriptionNew"
						id="descriptionNew"
						v-model.trim="descriptionNew"
						placeholder="Informações a mais sobre o cliente"
					/>
				</div>

				<div class="flex flex-col flex-1 pl-3 pr-3 border-l border-light-gray">
					<label for="cityNew">Cidade</label>
					<input
						type="text"
						name="cityNew"
						id="cityNew"
						v-model.trim="cityNew"
						placeholder="Digite a cidade do cliente"
					/>

					<label for="streetNew">Rua</label>
					<input
						type="text"
						name="streetNew"
						id="streetNew"
						v-model.trim="streetNew"
						placeholder="Digite a rua do cliente"
					/>

					<label for="districtNew">Bairro</label>
					<input
						type="text"
						name="districtNew"
						id="districtNew"
						v-model.trim="districtNew"
						placeholder="Digite o bairro do cliente"
					/>

					<label for="houseNumberNew">Número</label>
					<input
						type="text"
						name="houseNumberNew"
						id="houseNumberNew"
						v-model.trim="houseNumberNew"
						placeholder="Digite o número da casa do cliente"
					/>

					<p>Prioridade</p>
					<select
						class="cursor-pointer"
						name="priorityNew"
						v-model="priorityNew"
					>
						<option disabled value="">Escolha um item</option>
						<option value="VERY_LOW">Muito Baixa</option>
						<option value="LOW">Baixa</option>
						<option value="MEDIUM">Média</option>
						<option value="HIGH">Alta</option>
						<option value="URGENT">Urgente</option>
					</select>

					<button
						type="submit"
						class="
							mt-auto
							p-2
							border-2 border-blue
							rounded-md
							text-blue
							font-bold
							w-4/12
							ml-auto
						"
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { GenderEnum, PriorityEnum } from '../../utils/types';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default Vue.extend({
	data() {
		return {
			nameNew: this.name,
			cellphoneNew: this.cellphone,
			emailNew: this.email,
			documentNew: this.document,
			birthDateNew: this.birthDate,
			genderNew: this.gender,
			columnNew: this.column,
			cityNew: this.city,
			streetNew: this.street,
			districtNew: this.district,
			houseNumberNew: this.houseNumber,
			descriptionNew: this.description,
			priorityNew: this.priority,
		};
	},

	props: {
		name: String,
		cellphone: String,
		email: String,
		document: String,
		birthDate: String,
		gender: {
			type: String as PropType<GenderEnum>,
		},
		column: Number,
		city: String,
		street: String,
		district: String,
		houseNumber: String,
		description: String,
		priority: {
			type: String as PropType<PriorityEnum>,
		},
	},

	// methods: {
	// 	async sendClient() {
	// 		const documentWithoutPunctuation = this.document.replace(/[^0-9]/g, '');
	// 		const cellPhoneWithoutPunctuation = this.cellphone.replace(/[^0-9]/g, '');

	// 		try {
	// 			const response = await this.$axios.post(
	// 				`${this.$config.baseURL}/customers`,
	// 				{
	// 					name: this.name,
	// 					email: this.email,
	// 					document: documentWithoutPunctuation,
	// 					district: this.district,
	// 					description: this.description,
	// 					gender: this.gender,
	// 					houseNumber: this.houseNumber,
	// 					status: true,
	// 					street: this.street,
	// 					birthDate: this.birthDate,
	// 					cellphone: cellPhoneWithoutPunctuation,
	// 					city: this.city,
	// 					column: this.column,
	// 					priority: this.priority,
	// 				}
	// 			);

	// 			if (response.status === 201) {
	// 				this.name = '';
	// 				this.cellphone = '';
	// 				this.email = '';
	// 				this.document = '';
	// 				this.birthDate = '';
	// 				this.gender = GenderEnum.NÃO_INFORMADO;
	// 				this.column = 1;
	// 				this.city = '';
	// 				this.street = '';
	// 				this.district = '';
	// 				this.houseNumber = '';
	// 				this.description = '';
	// 				this.priority = PriorityEnum.MEDIUM;
	// 				this.$emit('close-edit-modal');
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	},
	// },
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
	font-family: 'Roboto', sans-serif;
}

.modal {
	background-color: white;
	width: 700px;
	border-radius: 5px;
	padding: 0.625rem 0;
}

label,
p,
option,
select {
	font-size: 0.875rem;
}

label,
p {
	color: #757373;
}

input,
textarea {
	padding-left: 0.313rem;
}

input,
select {
	margin-bottom: 0.625rem;
}

input,
textarea,
select {
	border: #cbd5e0 1px solid;
	border-radius: 3px;
}

input,
select {
	height: 2.188rem;
}

h2 {
	padding-bottom: 0.625rem;
}
</style>
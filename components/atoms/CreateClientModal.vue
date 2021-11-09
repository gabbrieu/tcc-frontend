<template>
	<div class="modal-overlay" @click="$emit('close-modal')">
		<div class="modal" @click.stop>
			<header class="flex justify-between border-b border-light-gray mb-4">
				<h2 class="font-bold pl-3 text-lg">Cadastro de cliente</h2>
				<div class="cursor-pointer mr-3" @click="$emit('close-modal')">
					<img
						class="w-6"
						src="~/assets/svg.svg"
						alt=""
						@click="showCreateClientModal = false"
					/>
				</div>
			</header>
			<form v-on:submit.prevent="sendClient" class="flex flex-row">
				<div class="flex flex-col flex-1 ml-3 mr-3">
					<label for="name">Nome Completo*</label>
					<input
						type="text"
						name="name"
						id="name"
						v-model.trim="name"
						placeholder="Digite o nome completo do cliente"
						required
					/>

					<label for="cellphone">Celular*</label>
					<input
						type="text"
						name="cellphone"
						id="cellphone"
						v-model.trim="cellphone"
						placeholder="Digite o celular do cliente"
						v-mask="'(##) #####-####'"
						required
					/>

					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						v-model.trim="email"
						placeholder="Digite o email do cliente"
					/>

					<label for="document">CPF*</label>
					<input
						type="text"
						name="document"
						id="document"
						v-model.trim="document"
						v-mask="'###.###.###-##'"
						placeholder="Digite o CPF do cliente"
						required
					/>

					<label for="birthDate">Data de Nascimento*</label>
					<input
						class="cursor-pointer"
						type="date"
						name="birthDate"
						id="birthDate"
						v-model="birthDate"
						required
					/>

					<p>Gênero*</p>
					<select class="cursor-pointer" name="gender" v-model="gender">
						<option disabled value="">Escolha um item</option>
						<option value="MASCULINO">Masculino</option>
						<option value="FEMININO">Feminino</option>
						<option value="NÃO INFORMADO">Não informado</option>
					</select>

					<p>Etapa da Jornada*</p>
					<select class="cursor-pointer" name="column" v-model="column">
						<option disabled value="">Escolha um item</option>
						<option :value="1">Cliente em potencial</option>
						<option :value="2">Contato realizado</option>
						<option :value="3">Visita agendada</option>
						<option :value="4">Negócio em andamento</option>
						<option :value="5">Finalizados</option>
					</select>

					<label for="description">Descrição*</label>
					<textarea
						class="resize-none"
						type="text"
						name="description"
						id="description"
						v-model.trim="description"
						placeholder="Informações a mais sobre o cliente"
						required
					/>
				</div>

				<div class="flex flex-col flex-1 pl-3 pr-3 border-l border-light-gray">
					<label for="city">Cidade*</label>
					<input
						type="text"
						name="city"
						id="city"
						v-model.trim="city"
						placeholder="Digite a cidade do cliente"
						required
					/>

					<label for="street">Rua*</label>
					<input
						type="text"
						name="street"
						id="street"
						v-model.trim="street"
						placeholder="Digite a rua do cliente"
						required
					/>

					<label for="district">Bairro*</label>
					<input
						type="text"
						name="district"
						id="district"
						v-model.trim="district"
						placeholder="Digite o bairro do cliente"
						required
					/>

					<label for="houseNumber">Número*</label>
					<input
						type="text"
						name="houseNumber"
						id="houseNumber"
						v-model.trim="houseNumber"
						placeholder="Digite o número da casa do cliente"
						required
					/>

					<p>Prioridade*</p>
					<select class="cursor-pointer" name="priority" v-model="priority">
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
import Vue from 'vue';
import { GenderEnum, PriorityEnum } from '../../utils/types';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default Vue.extend({
	data() {
		return {
			name: '',
			cellphone: '',
			email: '',
			document: '',
			birthDate: '',
			gender: GenderEnum.NÃO_INFORMADO,
			column: 1,
			city: '',
			street: '',
			district: '',
			houseNumber: '',
			description: '',
			priority: PriorityEnum.MEDIUM,
		};
	},

	methods: {
		async sendClient() {
			const documentWithoutPunctuation = this.document.replace(/[^0-9]/g, '');
			const cellPhoneWithoutPunctuation = this.cellphone.replace(/[^0-9]/g, '');

			try {
				const response = await this.$axios.post(
					`http://localhost:3002/customers`,
					{
						name: this.name,
						email: this.email,
						document: documentWithoutPunctuation,
						district: this.district,
						description: this.description,
						gender: this.gender,
						houseNumber: this.houseNumber,
						status: true,
						street: this.street,
						birthDate: this.birthDate,
						cellphone: cellPhoneWithoutPunctuation,
						city: this.city,
						column: this.column,
						priority: this.priority,
					}
				);

				if (response.status === 201) {
					this.name = '';
					this.cellphone = '';
					this.email = '';
					this.document = '';
					this.birthDate = '';
					this.gender = GenderEnum.NÃO_INFORMADO;
					this.column = 1;
					this.city = '';
					this.street = '';
					this.district = '';
					this.houseNumber = '';
					this.description = '';
					this.priority = PriorityEnum.MEDIUM;
					this.$emit('close-modal');
				}
			} catch (error) {
				console.log(error);
			}
		},
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
<template>
	<div class="modal-overlay" @click="$emit('close-modal')">
		<div class="modal" @click.stop>
			<form v-on:submit.prevent="sendClient">
				<label for="name">Nome Completo*</label>
				<input type="text" name="name" id="name" v-model="name" required />

				<label for="cellPhone">Telefone*</label>
				<input
					type="text"
					name="cellPhone"
					id="cellPhone"
					v-model="cellPhone"
					required
				/>

				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="email" />

				<label for="document">CPF*</label>
				<input
					type="text"
					name="document"
					id="document"
					v-model="document"
					required
				/>

				<label for="birthDate">Data de Nascimento*</label>
				<input
					type="date"
					name="birthDate"
					id="birthDate"
					v-model="birthDate"
					required
				/>

				<p>Gênero*</p>
				<select name="gender" v-model="gender">
					<option disabled value="">Escolha um item</option>
					<option value="MASCULINO">MASCULINO</option>
					<option value="FEMININO">FEMININO</option>
					<option value="NÃO INFORMADO">NÃO INFORMADO</option>
				</select>

				<label for="column">Etapa da Jornada*</label>
				<input
					type="text"
					name="column"
					id="column"
					v-model="column"
					required
				/>

				<label for="city">Cidade*</label>
				<input type="text" name="city" id="city" v-model="city" required />

				<label for="street">Rua*</label>
				<input
					type="text"
					name="street"
					id="street"
					v-model="street"
					required
				/>

				<label for="district">Bairro*</label>
				<input
					type="text"
					name="district"
					id="district"
					v-model="district"
					required
				/>

				<label for="houseNumber">Número*</label>
				<input
					type="text"
					name="houseNumber"
					id="houseNumber"
					v-model="houseNumber"
					required
				/>

				<label for="description">Descrição*</label>
				<input
					type="text"
					name="description"
					id="description"
					v-model="description"
					required
				/>

				<button type="submit">Enviar</button>
				<div class="close" @click="$emit('close-modal')">
					<img
						class="w-6"
						src="~/assets/close-icon.svg"
						alt=""
						@click="showCreateClientModal = false"
					/>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GenderEnum } from '../../utils/types';
export default Vue.extend({
	data() {
		return {
			name: '',
			cellPhone: '',
			email: '',
			document: '',
			birthDate: '',
			gender: GenderEnum.NÃO_INFORMADO,
			column: 1,
			city: '',
			street: '',
			district: '',
			houseNumber: 0,
			description: '',
		};
	},

	methods: {
		sendClient() {
			try {
				this.$axios.$post(`http://localhost:3002/customer`, {
					name: this.name,
					email: this.email,
					document: this.document,
					district: this.district,
					description: this.description,
					gender: this.gender,
					houseNumber: this.houseNumber,
					status: true,
					street: this.street,
					birthDate: this.birthDate,
					cellPhone: this.cellPhone,
					city: this.city,
					column: this.column,
				});
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
}

.modal {
	text-align: center;
	background-color: white;
	height: 500px;
	width: 500px;
	margin-top: 10%;
	padding: 60px 0;
	border-radius: 20px;
}

.close {
	margin: 10% 0 0 16px;
	cursor: pointer;
}
</style>
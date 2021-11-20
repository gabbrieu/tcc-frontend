<template>
	<div class="modal-overlay cursor-auto" @click="$emit('close-exclude-modal')">
		<div class="modal" @click.stop>
			<header class="flex justify-between border-b border-light-gray mb-4">
				<h2 class="font-bold pl-3 text-lg">Exclusão de um cliente</h2>
				<div class="cursor-pointer mr-3" @click="$emit('close-exclude-modal')">
					<img class="w-3 mt-2" src="~/assets/close-icon.svg" alt="" />
				</div>
			</header>
			<form v-on:submit.prevent="excludeClient" class="flex flex-col">
				<p class="ml-3 flex flex-row">
					Deseja realmente
					<span class="text-red font-semibold pr-1 pl-1"> excluir </span> esse
					cliente?
				</p>
				<div class="flex flex-row justify-end">
					<button
						@click="$emit('close-exclude-modal')"
						class="
							flex flex-col
							p-2
							border-2 border-green
							rounded-md
							text-green
							font-bold
							w-auto
							hover:bg-green hover:text-white
						"
					>
						Cancelar
					</button>
					<button
						type="submit"
						class="
							flex flex-col
							ml-3
							mr-3
							p-2
							border-2 border-red
							rounded-md
							text-red
							font-bold
							w-auto
							hover:bg-red hover:text-white
						"
					>
						Apagar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default Vue.extend({
	props: {
		customerId: String,
	},

	methods: {
		async excludeClient() {
			try {
				const response = await this.$axios.delete(
					`${this.$config.baseURL}/customers/${this.customerId}`
				);

				if (response.status === 204) {
					this.$emit('close-exclude-modal');
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
}

.modal {
	background-color: white;
	width: 700px;
	border-radius: 5px;
	padding: 0.625rem 0;
}

h2 {
	padding-bottom: 0.625rem;
}
</style>
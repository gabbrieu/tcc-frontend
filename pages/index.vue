<template>
	<div>
		<Navbar />
		<main class="bg-background h-screen">
			<button
				class="
					mt-4
					mb-4
					ml-9
					pt-2
					pb-2
					rounded-lg
					border-blue border
					text-blue
					font-medium
					pr-4
					pl-4
				"
			>
				+ Novo cliente
			</button>
			<div class="flex flex-row">
				<div class="flex flex-col">
					<p>OPA</p>
					<p>OPA</p>
					<p>OPA</p>
					<p>OPA</p>
					<p>OPA</p>
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'

export default Vue.extend({})
</script>

<style scoped>
.border {
	border-width: 1px;
}
</style>

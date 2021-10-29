<template>
	<draggable class="list" :list="array" group="tasks" animation="250" @end="reOrder">
		<div
			class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
			v-for="customer in array"
			:key="customer.id"
		>
			{{ customer.name }}
		</div>
	</draggable>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';

export default Vue.extend({
	components: {
		draggable,
	},
	props: {
		array: Array,
	},
	methods: {
		reOrder(c: any) {
			console.log(c)
		}
	}
});
</script>

<template>
	<div>
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
			<h3 class="pr-2">
				{{ title }}
			</h3>
			<span class="bg-border-color rounded-full pr-2 pl-2">{{
				column.length
			}}</span>
		</div>
		<Card :array="column" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		title: String,
		column: Array,
	},
});
</script>

<style scoped>
.column-kanban-weight {
	font-weight: 650;
}
</style>
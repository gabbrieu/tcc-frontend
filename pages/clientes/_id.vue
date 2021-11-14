<template>
	<div>
		<Navbar />
		{{ $route.params.id }}
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	created() {
		console.log(this.$route);
	},
});
</script>
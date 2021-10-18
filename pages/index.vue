<template>
  <div>
    <Navbar />
    <main class="bg-background h-screen">
      <button
        class="
          mt-4
          mb-4
          ml-9
          p-2
          rounded-lg
          border-blue border
          text-blue
          font-semibold
        "
      >
        + Novo cliente
      </button>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
.border {
  border-width: 1px;
}
</style>

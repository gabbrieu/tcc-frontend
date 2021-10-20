<template>
  <draggable class="list-group" :list="array" group="tasks">
    <div
      class="list-group-item bg-white pl-2 mt-2 ml-3 mr-3"
      v-for="element in array"
      :key="element.name"
    >
      {{ element.name }}
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  components: {
    draggable,
  },

  props: {
    array: Array,
  },
})
</script>

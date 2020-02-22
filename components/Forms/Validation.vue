<template>
  <div class="mb-2 text-left font-medium text-red-500 text-xs" v-if="hasError(index, name)">{{ error(index, name) }}</div>
</template>

<script>
  export default {
    props: ['errors', 'index', 'name'],

    methods: {
      error(index, param) {
        if (! this.hasError(index, param)) return null;
        return this.errors[this.name][0];
      },

      hasError(index, param) {
        return this.errors.hasOwnProperty(this.name);
      }
    }
  }
</script>

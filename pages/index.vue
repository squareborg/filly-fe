<template>
  <section class="container">
    <div>

    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  created(){
    this.$router.push('/affiliates')
  }
}
</script>

<style>
</style>

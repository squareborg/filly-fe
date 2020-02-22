<template>
  <div class="container">
    <NavBar v-if="$store.state.auth.loggedIn" />
    <div>
    <nuxt />

    </div>
  </div>
</template>
<script>

import NavBar from '@/components/Navigation/NavBar';

export default {
  components:{
    NavBar
  }
}
</script>

<style>

</style>

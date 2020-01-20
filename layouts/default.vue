<template>
  <div>
    <NavBar v-if="$store.state.auth.loggedIn" />
    <div class="">
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

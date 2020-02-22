<template>
  <div>
   <ul class="nav nav-pills mt-4 mb-10">
      <li class="nav-item">
          <nuxt-link v-bind:class="{ 'bg-brand-primary': $route.name==='merchants' }" class="nav-link" to="/merchants">Merchant Dashboard</nuxt-link>
      </li>
      <li class="nav-item">
          <nuxt-link v-bind:class="{ 'bg-brand-primary': $route.name==='merchants-profile' }" class="nav-link" to="/merchants/profile">Merchant Profile</nuxt-link>
      </li>
      <li class="nav-item">
          <nuxt-link v-bind:class="{ 'bg-brand-primary': $route.name==='merchants-programs' }" class="nav-link" to="/merchants/programs">Merchant Programs</nuxt-link>
      </li>
    </ul>
    <nuxt-child></nuxt-child>

  </div>
</template>

<script>
export default {
  computed:{
    activeRoute(){
      return this.$route.name;
    }
  }
}
</script>


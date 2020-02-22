<template>
  <div class="">
    <nav class="tabs mb-4 px-4">
      <div class="tabs__tab" v-bind:class="{ 'tabs__tab--active': $route.name==='affiliates' }">
          <nuxt-link  to="/affiliates">My Promos</nuxt-link>
      </div>
      <div class="tabs__tab" v-bind:class="{ 'tabs__tab--active': $route.name==='affiliates-merchants' }">
          <nuxt-link  to="/affiliates/merchants">Find Promotions</nuxt-link>
      </div>
    </nav>
    <nuxt-child></nuxt-child>

  </div>
</template>

<script>
    import AffiliateStats from '@/components/Affiliate/AffiliateStats';
    import { mapActions } from 'vuex';
export default {
    middleware: 'auth',
    components: {
        AffiliateStats
    },
    props:[
        'totalClicks',
        'totalSales',
        'programs',
        'programCategories',
        'merchants'
    ],


}
</script>

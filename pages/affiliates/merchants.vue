<template>
  <div>
    <div class="">
        <browse-merchants></browse-merchants>
    </div>
  </div>
</template>

<script>
import BrowseMerchants from '@/components/Affiliate/BrowseMerchants';

export default {
  components:{
    BrowseMerchants
  },
      async fetch({store}){
      console.log('fetch');

      console.log(await store.dispatch('merchants/index'));
      console.log(await store.dispatch('merchants/getCategories'));

    },
}
</script>


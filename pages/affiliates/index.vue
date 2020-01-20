<template>
  <div>
     <div class="hidden">
        <stat-card title="Clicks" :value="$auth.user.affiliate_stats.clicks" />
        <stat-card title="Sales" :value="$auth.user.affiliate_stats.sales" />
      </div>
      <div v-if="!subscriptions.length" class="rounded bg-white shadow hidden">
        <div  class="row mt-3 border rounded shadow xfil-card">
        <div class="col border-right">
        <img src="images/empty_state.png">
        </div>
        <div class="col d-flex flex-column flex-wrap justify-content-center align-content-center">You're not subscribed to any programs yet, try browsing our collection.<br>
        <nuxt-link :to="{name: 'affiliates-programs'}" @click="setTab('browsePrograms')" class="btn btn-primary mt-2"><i class="fa fa-list"></i> Browse Programs</nuxt-link>
        </div>
        </div>
      </div>
        <my-subscriptions class="mt-3" v-if="subscriptions.length" :subscriptions="subscriptions"></my-subscriptions>
    </div>
</template>
<script>

import { mapActions } from 'vuex';
import StatCard from '@/components/Shared/StatCard';
import MySubscriptions from '@/components/Affiliate/MySubscriptions';

export default {

  components: {
    MySubscriptions,
    StatCard
  },
  computed: {
      subscriptions(){
        return this.$store.state.mySubscriptions;
      }
    },

    methods: {
      ...mapActions(['getMySubscriptions']),
      setTab(tab){
          this.currentTab = tab;
      }
    },
    created(){
      this.getMySubscriptions()
    }
}
</script>

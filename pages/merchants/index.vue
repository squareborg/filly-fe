<template>
    <div>
        <div class="row" v-if="merchantPrograms">
            <stat-card title="Clicks" :value="merchantStats.clicks" />
            <stat-card title="Sales" :value="totalSales || '-'" />
        </div>
        <div v-if="$store.state.myPrograms && !$store.state.myPrograms.length" class="row xfil-card mt-4">
            <div class="col border-right">
                <img src="~/assets/images/empty_state.png">
            </div>
            <div v-if="!merchantPrograms.length" class="col d-flex flex-column flex-wrap justify-content-center align-content-center">You have not created any programs.<br>
              <nuxt-link to="/merchants/programs" class="btn btn-primary my-3"><i class="fa fa-plus "></i> Manage Programs</nuxt-link>

            </div>
        </div>
        <div class="card mt-2 lg:w-1/2 md:w-2/3">
          <div class="card-body">
            <affiliate-approval-queue :merchant="merchant" :affiliates="affiliates"></affiliate-approval-queue>
          </div>
        </div>
        <div v-if="currentTab === 'dashboard'">
        <div v-if="merchantPrograms.length">
        <nuxt-link to="/merchant/programs" class="btn btn-primary my-3"><i class="fa fa-plus "></i> Manage Programs</nuxt-link>
        <programs-list  :programs="merchantPrograms"></programs-list>

        </div>
        </div>

            </div>
</template>

<script>
    import AffiliateApprovalQueue from '@/components/Merchant/AffiliateApprovalQueue';
    import StatCard from '@/components/Shared/StatCard';
    import {mapActions, mapGetters} from 'vuex';
    export default {
    components:{
        AffiliateApprovalQueue,
        StatCard
    },
    props: ['totalClicks', 'totalSales', 'merchant'],
    data(){
        return {
            currentTab: "dashboard",
            merchantPrograms: []
        }
    },
    computed:{
      ...mapGetters(['merchantStats'])
    },
    methods:{
        ...mapActions([
          'getMyPrograms'
        ]),
        setTab(tab){
            this.currentTab = tab;
        }
    },
    created(){
      this.getMyPrograms();
    }
}
</script>

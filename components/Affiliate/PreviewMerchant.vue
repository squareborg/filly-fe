<template>
    <div>
        <div v-if="merchant" class="p-8">
          <header class="flex flex-row justify-between pt-2">
            <button class="block h-16 w-16 rounded-full overflow-hidden border-2">
              <img class="object-cover" :src="merchant.logo_image_url">
            </button>
            <div class="flex flex-col">
              <div class="flex-row">
                <div class="ml-auto py-2 mr-2 flex flex-row">
                  <div class="flex flex-col items-center mr-2">
                  <div class="font-bold text-lg">10%</div>
                  <div class="text-gray-600 text-sm">Commission</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="font-bold text-lg">10</div>
                  <div class="text-gray-600 text-sm">Promos</div>
                </div>
              </div>
            </div>
            <div @click="subscribe" class="button btn border rounded font-bold text-sm select-none cursor-pointer">
              <span v-if="!busy">{{ applyText }}</span>
              <span class="loader" v-else></span>
            </div>
            </div>
          </header>
          <div>
          </div>
            <div class="flex flex-row mt-3">
              <div class="flex flex-col">
                <h2 class="text-sm">{{merchant.name}}</h2>
                <div class="text-gray-600 text-sm">
                  {{merchant.category}}
                </div>
                <div class="text-sm">
                  <div v-if="merchant.description">
                    {{merchant.description}}
                  </div>
                  <div v-else>
                    The merchant has not set a description just yet.
                  </div>
                </div>
              </div>
            </div>

            <!-- <div v-show="currentTab === 'programs'" class="description mt-2">
                <table v-if="merchant.programs.data.length" class="table table-sm">
                    <thead>
                        <tr><td>Name</td><td>Reward Percentage</td></tr>
                    </thead>
                    <tr v-for="program in merchant.programs.data">
                        <td>{{program.name}}</td>
                        <td>{{program.program_reward || merchant.merchant_reward}}%</td>
                    </tr>
                </table>
                <div v-else>
                    Sorry this merchant does not have any live programs right now.
                </div>
            </div> -->
            <!-- <div v-show="currentTab === 'application'">
                Please provide information on where you plan to publish the merchants programs. List any websites, blogs, and social accounts.
                <textarea :disabled="inFlight" class="border mt-4" v-model="applicationText" id="" cols="30" rows="10"></textarea>
            </div>
            <a @click="subscribe" href="#" class="btn btn-primary mt-4">{{applyText}}</a>
            <div class="mt-4" v-if="merchant.subscribed">
                <a @click="unsubscribe" href="#" class="btn btn-danger">Unsubscribe</a>
                <span class="">View in <a class="text-danger font-weight-bold" :href="'/affiliate/merchant/'+merchant.subscribed_uuid">my merchants</a></span>
            </div> -->

        </div>

    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    props: ['merchant'],
    data(){
      return {
        subscribed: false,
        currentTab: 'description',
        applicationText: "",
        busy: false,
      }
    },
    computed:{
      applyText(){
        switch(this.merchant.subscription_status){
            case 'requested':
            return 'Applied'
            case 'approved':
            return 'Subscribed'
            case 'rejected':
            return 'Applied'
            default:
            return this.merchant.auto_approve_affiliates ? 'Subscribe' : 'Apply';
        }
      },
    },
    methods:{
      ...mapActions({
        subscribeToMerchant: 'merchants/subscribe',
      }),
        setTab(tab) {
            this.currentTab = tab;
        },

        refresh() {
          console.log(this.$store.state);
          this.$api.merchants.show(this.merchant.id)
            .then(response => {
                this.merchant = response.data
            });
        },

        subscribe() {
          if(this.merchant.subscription_status === 'none'){
              // if(! this.merchant.auto_approve_affiliates && ! this.showApplicationTab){
              //     this.showApplicationTab = true;
              //     this.currentTab = 'application';
              //     return false;
              // }
              this.busy = true;
              this.subscribeToMerchant({ merchantUuid: this.merchant.uuid,  application: this.applicationText })
              .then(response => {
                  console.log('Subscribed');

              })
              .finally( () => {
                this.busy = false;
              });
          }

        },
        unsubscribe(){
            axios.delete(`${process.env.MIX_APP_URL}/api/subscriptions/${this.merchant.subscribed_uuid}`)
                .then(response => {
                    this.refresh();
                });
        }
    },
    created(){
        //this.refresh();
    }
}
</script>

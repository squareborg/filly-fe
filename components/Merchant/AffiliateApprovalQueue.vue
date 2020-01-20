<template>
<div>
    <div class="flex flex-row">
        <div class="mr-2">
            Auto Approve new affiliates
        </div>
        <div class="ml-auto">
            <label class="switch"><input @change="updateAutoApprove"  type="checkbox" name=""  v-model="auto_approve_affiliates"> <span class="slider round"></span></label>

        </div>
    </div>

<div v-if="queue.length">
        <modal height="auto" :adaptive="true" name="affiliate-modal">
            <approve-affiliate  @responded="responded" @closeModel="closeModel" :init-affiliate="previewAffiliate"></approve-affiliate>
        </modal>
        <p class="mb-2" v-if="queue.length">You have {{queue.length}} affiliates awaiting your approval</p>
        <ul class="list-group">
            <transition name="slide-fade">
            <li class="list-group-item" v-for="affiliate in queue">
              <div class="flex flex-row">
                <div>
                  {{affiliate.affiliate.full_name}}
                </div>
                <div class="ml-auto">
                  <a @click="show(affiliate)" href="#">view</a>
                </div>
              </div>
            </li>
            </transition>
        </ul>
    </div>
    <div v-if="queue && !queue.length">
        No affiliates to approve right now.
    </div>
</div>

</template>
<script>

import axios from 'axios';
import ApproveAffiliate from './ApproveAffiliate';
import route from '@/plugins/route.js';

export default {
    props:['merchant', 'autoApproveAffiliates'],

    data(){
        return {
            polling: null,
            queue: [],
            previewAffiliate: null,
            auto_approve_affiliates: false
        }
    },
    components: {
        ApproveAffiliate
    },
    created(){
      this.pollData();
    },
    mounted(){
      this.auto_approve_affiliates = this.$store.state.auth.user.merchant.auto_approve_affiliates
        this.$axios.get(route('api.merchants.affiliates.approvalqueue'))
        .then (response => {
            this.queue = response.data.data
        })
    },
    beforeDestroy () {
	    clearInterval(this.polling)
    },
    methods: {
        refresh(){
          this.$axios.get(route('api.merchants.affiliates.approvalqueue'))
          .then (response => {
              this.queue = response.data.data
          })
        },
        pollData(){
          this.polling = setInterval(() => {
            this.refresh()
          }, 30000)
        },
        responded(affiliate){
            let index = this.queue.findIndex(item =>{
                return item.uuid === affiliate.uuid;
            })
            this.queue.splice(index, 1);
        },
        show (affiliate) {
            this.previewAffiliate = affiliate;
            this.$modal.show('affiliate-modal');
        },
        closeModel(){
            this.$modal.hide('affiliate-modal');
        },
        updateAutoApprove(event){
            this.$axios.put(route('api.merchants.update', this.$store.state.auth.user.merchant.uuid ), {
                auto_approve_affiliates: this.auto_approve_affiliates
            })
            .then(response => {
              this.$store.commit('UPDATE_MERCHANT_PROFILE', response.data)
            })
            console.log(event.target.value);
            console.log(this.autoApprove);
        }
    }
}
</script>
<style>
* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>


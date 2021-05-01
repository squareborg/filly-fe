<template>
    <div>
        <div v-if="subscription" class="p-5">
            <h2 class="mb-3">An Affiliate would like to subscribe to your program channel</h2>
            <p>Approving them will allow them start publishing your programs and generating sales.</p>
            <table class="table mt-2">
                <tr><td>Name</td><td>{{subscription.affiliate.full_name}}</td></tr>
                <tr><td>Joined</td><td>{{subscription.affiliate.joined_at}}</td></tr>
            </table>
            <div v-show="subscription.application"  class="description mt-2">
                <b>The affiliate added the following to their application.</b>
                <div class="p-2 border rounded my-2" v-text="subscription.application"></div>
            </div>
            <approval-control
            @updated="approvalUpdated"
            @reasonChanged="reasonChanged"
            :init-approved="subscription.approved"
            :init-rejected="subscription.rejected"
            :init-rejected-reason="subscription.rejected_reason"
            class="mt-2">
            </approval-control>
            <img :src="subscription.logoImageUrl" />

            <div>
                <a class="btn btn-primary" href="#" @click="save">{{saveButtonText}}</a>
                <a class="btn btn-secondary" href="#" @click="closeModel">Cancel</a>
            </div>
        </div>
    </div>
</template>

<script>

import ApprovalControl from '../../components/Admin/ApprovalControl';
import route from '@/plugins/route.js';

export default {
    props: [
        'initAffiliate'
    ],
    components:{
        ApprovalControl
    },
    data(){
        return {
            subscribed: false,
            subscription: null,
            inFlight: false,
        }
    },
    computed:{
        saveButtonText(){
            if (this.inFlight){
                return 'Please wait..'
            }
            return 'Save'
        }
    },
    methods:{
        approvalUpdated: function (event) {
            switch(event){
                case 'unapproved':
                    this.affilaite.approved = false;
                    this.subscription.rejected = false;
                    break
                case 'approved':
                    this.subscription.approved = true;
                    this.subscription.rejected = false;
                    break
                case 'rejected':
                    this.subscription.approved = false;
                    this.subscription.rejected = true;
                    break
            }
        },
        save(){
            this.inFlight = true;
            this.$axios.put(route('api.merchant.subscriptions.update', this.subscription.uuid),this.subscription)
            .then(response => {
                this.$emit('responded', this.subscription);
                this.$emit('closeModel');
            })
            .catch(error => {
                console.error(error);
            })
            .finally(()=>{
                this.inFlight = false;
            })
        },
        unsubscribe(){
            axios.delete(`${process.env.MIX_APP_URL}/api/subscriptions/${this.affiliate.subscribed_uuid}`)
                .then(response => {
                    this.refresh();
                });
        },
        reasonChanged(reason){
            this.subscription.rejected_reason = reason;
        },

        closeModel(){
            this.$emit('closeModel');
        },

    },
    created(){
        this.subscription = this.initAffiliate;
    }
}
</script>

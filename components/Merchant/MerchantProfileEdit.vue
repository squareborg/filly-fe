<template>
    <div>
    <form class="lg:w-2/3" @submit.prevent="" v-if="merchant">
        <div class="flex flex-row">
            <div class="mr-2">
                Enable merchant account
            </div>
            <div>
                <label class="switch"><input  type="checkbox" name=""  v-model="merchant.user_has_enabled"> <span class="slider round"></span></label>

            </div>
            <div class="ml-auto">
                <div v-if="!admin">
                    <span class="badge badge-warning p-2" v-if="!merchant.approved">
                        Awaiting approval
                    </span>
                    <span class="badge badge-success p-2" v-if="merchant.approved">
                        Approved
                    </span>
                </div>
                <approval-control :item="merchant" v-if="admin"></approval-control>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="name">Merchant Name</label>
                    <input v-model="merchant.name" required id="name" type="text" class="form-control" placeholder="Merchant Name">
                </div>
            </div>
            <div class="w-full px-6">
                <logo-image-upload :merchant-uuid="merchant.uuid" :init-logo="merchant.logoImageUrl" class="" init-avatar="" fallback-avatar="  "></logo-image-upload>
            </div>

        </div>

        <div class="mt-4" v-if="merchant.merchant_category">
            <b>Category:</b> {{merchant.merchant_category.data.name}} <a href="#" @click.prevent="merchant.merchant_category_id = null" class="small"><em>Change</em></a>
        </div>
        <div class="form-group">
            <label>Merchant description</label>
            <textarea v-model="merchant.description" class="form-control" rows="3"></textarea>
            </div>

        <label class="mt-2"><b>Affiliate Reward</b></label>
        <p>Award an affiliate a percentage of the total sales for this merchant account </p>
        <div class="input-group mb-3 mt-2">
        <input pattern="[0-9][0-9]?[0-9]?" size="3" maxlength="3" v-model="merchant.merchant_reward" type="text"  class="border p3 text-center" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00 %</span>
        </div>
        </div>
        <button @click="save" type="submit" class="btn btn-primary mt-8">Save</button>
    </form>
    </div>

</template>
<script>

import LogoImageUpload from '../../components/Merchant/LogoImageUpload'
import {Ziggy} from '@/plugins/ziggy.js';
import route from '@/plugins/route.js';
export default {
    props:[
        'initMerchant',
        'name',
        'admin'
    ],
    components:{
        LogoImageUpload
    },
    computed:{

    },
    data(){
        return {
            selectedCategory: "",
            currentTab: 'edit',
            'merchant': {}
        }
    },
    methods:{
        setTab(tab){
            this.currentTab = tab;
        },
        updateSelectedMerchantCategory(category){
            this.merchant.merchant_category_id = category.id;
            this.merchant.merchant_category.data = category;
            this.selectedCategory = category;
        },
        deleteMedia(mediaUuid){
            axios.delete(route('api.merchants.media.delete',{ merchant: this.merchantUuid, merchantMedia: mediaUuid}))
            .then(()=>{
                this.refresh();
            })
            .catch((error)=>{
            })
        },
        refresh(){
            axios.get(`${process.env.MIX_APP_URL}/api/merchants/${this.$props.merchantUuid}`)
                .then(response => {
                    this.merchant = response.data.data
            });
        },
        save(){
            this.$axios.put(route('api.merchants.update', this.merchant.uuid), this.merchant)
            .then(respone=>{
                this.merchant = respone.data;
                this.$toast.success('Updated');
            })
        }
    },
    created(){
        console.log(Ziggy);
        this.$axios.get(route('api.merchants.list'));
        console.log(route('api.merchants.list'));

        this.merchant = {...this.$store.state.auth.user.merchant};
        //this.refresh();
    }
}
</script>


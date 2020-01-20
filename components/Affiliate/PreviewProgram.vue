<template>
    <div>
        <div v-if="program" class="p-5">
            <div class="flex flex-row">
                <div class="flex flex-col">
                <h2>{{program.name}}</h2>
                </div>
                <div class="w-1/3 ml-auto">
                    <img class="w" :src="program.merchant.logo_image_url" />
                </div>

            </div>
            <table class="table mt-6 w-1/2">
                <tr><td>Category</td> <td><td>{{program.program_category.name}}</td></td> </tr>
                <tr><td>Merchant</td> <td><td>{{program.merchant.name}}</td></td> </tr>
                <tr><td>Reward</td> <td><td>{{program.program_reward || program.merchant.merchant_reward}}%</td></td> </tr>
            </table>
            <div class="description mt-2">
                <h3 class="mb-2">Description</h3>
                {{program.description}}
            </div>
            <a v-if="!program.subscribed" @click="subscribe" href="#" class="btn btn-primary mt-4">Subscribe</a>
            <div class="mt-4" v-if="program.subscribed">
                <a @click="unsubscribe" href="#" class="btn btn-danger">Unsubscribe</a>
                <span class="">View in <nuxt-link class="text-danger font-weight-bold" :to="{name: 'affiliates-program-uuid', params: {uuid: program.subscribed_uuid}}">my programs</nuxt-link></span>
            </div>

        </div>

    </div>
</template>

<script>

import route from '@/plugins/route.js';

export default {
    props: [
        'programId'
    ],
    data(){
        return {
            subscribed: false,
            program: null
        }
    },
    methods:{
        refresh(){
            this.$axios.get(route('api.programs.show', this.programId))
                .then(response => {
                    this.program = response.data;
                });
        },
        subscribe(){
            this.$axios.post(route('subscribe', this.programId))
                .then(response => {
                    this.refresh();
                });
        },
        unsubscribe(){
            this.$axios.delete(route('api.subscriptions.destroy', this.program.subscribed_uuid))
                .then(response => {
                    this.refresh();
                });
        }
    },
    created(){
        this.refresh();
    }
}
</script>

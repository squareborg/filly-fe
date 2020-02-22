<template>
    <div>
            <table class="table table-striped">
                 <td>Link only</td>
                 <td>
                        <button class="btn btn-primary"
                            v-clipboard:copy="getLink(subscriptionUuid)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">
                        Copy html
                        </button>
                    </td>
                <tr v-for="item in media">
                    <td><img width="200px" :src="item.filepath" /></td>
                    <td>
                        <button class="btn btn-primary"
                            v-clipboard:copy="getImageLink(subscriptionUuid, item.filepath)"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">
                        Copy html
                        </button>
                    </td>
                </tr>
            </table>
    </div>
</template>
<script>

import route from '@/plugins/route.js';

export default {
    props:[
        'subscriptionUuid',
        'programUuid',
    ],
    data(){
        return {
            media: null
        }
    },
    methods:{
        refresh(){
            this.$axios.get(route('api.programs.media.list', this.programUuid))
                .then(response => {
                    this.media = response.data
                });
        },
        onCopy: function (e) {
            //alert('You just copied: ' + e.text)
            this.$toast.success('Copied to clipboard');
        },
        onError: function (e) {
        alert('Failed to copy texts')
        },
        getImageLink(subscriptionUuid, img){
            return `<a href="http://xfil-network.test/in/${subscriptionUuid}"><img src="${img}" /></a>`
        },
        getLink(subscriptionUuid){
            return `<a href="http://xfil-network.test/in/${subscriptionUuid}">link</a>`
        }
    },
    created(){
        this.refresh();
    }
}
</script>


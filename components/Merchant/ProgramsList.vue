<template>
    <div>
        <p v-if="!programs">Loading...</p>

        <table v-if="programs && programs.length" class="table border bg-white mt-2 rounded ">
            <thead>
            <tr>
                <th>Name</th>
                <th>Sales</th>
                <th>Clicks</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="program in programs">
                    <td>{{program.name}}</td>
                    <td>{{program.sales.data.length}}</td>
                    <td>{{program.clicks}}</td>
                    <td><nuxt-link class="btn btn-secondary btn-sm" :to="{ name: 'merchants-programs-uuid-edit', params: {uuid: program.uuid } }">Manage</nuxt-link></td>
                </tr>
            </tbody>
        </table>
        <Pagination :page="this.page" :per-page="perPage" :options="pageOptions" :records="serverTotal" @paginate="setPage"></Pagination>
    </div>
</template>

<script>

import route from '@/plugins/route.js';

import Pagination from 'vue-pagination-2';

export default {
    data(){
        return{
            programs: null,
            page: 0,
            pageOptions: {
              theme: "bootstrap4"
            },
            serverPages: 0,
            perPage: null,
            serverTotal: 0,
        }
    },
    components:{
        Pagination
    },
    created(){
        this.$axios.get(route('api.myprograms'))
        .then(response=>{
            this.programs = response.data.data;
            this.serverPages = response.data.meta.pagination.total_pages;
            this.serverTotal = response.data.meta.pagination.total;
            this.perPage = response.data.meta.pagination.per_page;
        });
    },
    methods:{
        setPage: function(page) {
            this.page = page;
            axios.get(`${process.env.MIX_APP_URL}/api/myPrograms?page=${this.page}`)
            .then(response =>{
                this.programs = response.data.data;
                this.serverPages = response.data.meta.pagination.total_pages;
                this.serverTotal = response.data.meta.pagination.total;
                this.perPage = response.data.meta.pagination.per_page;
            })
        },
    }
}
</script>

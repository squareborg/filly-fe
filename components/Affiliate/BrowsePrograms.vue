<template>
    <div>
        <modal height="auto" :adaptive="true" name="program-modal">
            <preview-program :program-id="previewProgramId"></preview-program>
        </modal>
        <p v-if="!programs">Loading...</p>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Filter By</label>
            </div>
                <b-dropdown :text="filterCategory ? filterCategory.name : 'Category'" aria-labelledby="dropdownMenuButton">
                    <b-dropdown-item @click="clearFilterCategory" href="#">All</b-dropdown-item>
                    <b-dropdown-item  @click="selectFilterCategory(pc)" v-for="pc in programCategories" href="#">{{pc.name}}</b-dropdown-item >
                </b-dropdown>
        </div>

        <p v-if="programs && !programs.length && !filterCategory">No programs available, try subscribing to some Merchant program channels</p>
        <p v-if="programs && !programs.length && filterCategory">No programs available, try changing your filter or subscribing to some Merchant program channels</p>
        <table class="table mt-4 rounded bg-white border table " v-if="programs && programs.length">
            <thead>
                <tr>
                    <th>Program Name</th>
                    <th>Merchant</th>
                    <th>Reward</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="program in programs">
                    <td>{{program.name}}</td>
                    <td>{{program.merchant.name}}</td>
                    <td>{{program.program_reward || program.merchant.merchant_reward}}%</td>
                    <td><span v-if="program.program_category">{{program.program_category.name||""}}</span></td>
                    <td><a @click="show(program.uuid)" class="btn btn-secondary btn-sm" href="#">View</a> <span class="badge badge-pill badge-success" v-if="program.subscribed"> Subscribed</span></td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="programs.length" :page="page" :per-page="perPage" :options="pageOptions" :records="serverTotal" @paginate="getResults"></Pagination>

    </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import route from '@/plugins/route.js';
import PreviewProgram from '@/components/Affiliate/PreviewProgram';
export default {
  components:{
    Pagination,
    PreviewProgram
  },
    props: ['initPrograms'],
    data(){
        return {
            page: 1,
            programs: [],
            previewProgramId: null,
            perPage: null,
            serverTotal: null,
            pageOptions: {
                theme: "bootstrap4"
            },
            filterCategory: null,
            programCategories: []
        }
    },
    computed:{
        queryString(){
            if (this.filterCategory){
                return `&program_category_id=${this.filterCategory.id}`
            }
            else {
                return ""
            }
        },

        noPrograms(){
          if (this.serverTotal === null) {
            return false;
          }
          return this.serverTotal === 0;
        }
    },
    methods: {
        clearFilterCategory(){
            this.filterCategory = null;
            this.getResults();
        },
        selectFilterCategory(category){
            this.filterCategory = category;
            this.getResults();
        },
        show (uuid) {
            this.previewProgramId = uuid;
            this.$modal.show('program-modal');
        },
        hide () {
            this.$modal.hide('hello-world');
        },
            // Our method to GET results from a Laravel endpoint
        getResults(page = 1) {
            this.$api.programs.index(`?page=${page}${this.queryString}`)
                .then(response => {
                    this.programs = response.data;
                    this.serverPages = response.meta.pagination.total_pages;
                    this.serverTotal = response.meta.pagination.total;
                    this.perPage = response.meta.pagination.per_page;
                });
        }
    },
    created(){
      this.$api.programs.index()
        .then(response =>{
          this.programs = response.data;
          this.serverPages = response.meta.pagination.total_pages;
          this.serverTotal = response.meta.pagination.total;
          this.perPage = response.meta.pagination.per_page;
        });

        this.$axios.get(route('api.programs.list'))
            .then(response => {
                this.programs = response.data.data;
                this.serverPages = response.data.meta.pagination.total_pages;
                this.serverTotal = response.data.meta.pagination.total;
                this.perPage = response.data.meta.pagination.per_page;
            });
    }
}
</script>

<template>
    <div>
        <modal height="auto" :adaptive="true" name="merchant-modal">
            <PreviewMerchant :merchant="previewMerchant"></PreviewMerchant>
        </modal>
        <p v-if="!merchants">Loading...</p>
        <div class="overflow-x-scroll flex flex-row ml-2">
          <button class="bg-white border whitespace-no-wrap p-2 text-sm mr-1 rounded font-semibold cursor-pointer" v-for="category in categories">{{category.name}}</button>
        </div>

          <button @click.stop="catDropdownIsOpen = ! catDropdownIsOpen" class="hidden btn btn-secondary dropdown-toggle relative" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span v-if="filterCategory">{{filterCategory.name}}</span>
              <span v-if="!filterCategory">Category</span>
          </button>
          <div v-click-outside="closeDropdown" v-show="catDropdownIsOpen" class="w-48 bg-white rounded-lg mt-2 shadow-md absolute" aria-labelledby="dropdownMenuButton">
              <a @click="clearFilterCategory" class="block px-2 py-1 hover:bg-brand-green-dark hover:text-white" href="#">All</a>
              <a class="block px-2 py-1 hover:bg-brand-green-dark hover:text-white" @click="selectFilterCategory(mc)" v-for="mc in categories" href="#">{{mc.name}}</a>
          </div>
        <p v-if="merchants && !merchants.length">No merchants available</p>
        <div class="flex flex-wrap mt-2">
          <div @click="show(merchant)" class="w-1/3 border border-white bg-black h-32 w-32 flex flex-col justify-center" v-for="merchant in merchants.data">
          <img class="overflow-hidden object-cover" :src="merchant.logo_image_url" alt="">
              <!-- <div class="bg-cover w-full h-32" :style="{ backgroundImage: `url('${merchant.logo_image_url}')`}"> -->
              <!-- </div> -->
          </div>
        </div>
        <!-- <div class="flex flex-wrap">
          <div class="card mt-2 p-2 w-half" v-for="merchant in merchants">
            me
          </div>
        </div>
        <table class="table mt-4 rounded bg-white shadow table-sm " v-if="merchants && merchants.length">
            <thead>
                <tr>
                    <th>Merchant Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="merchant in merchants">
                    <td>{{merchant.name}}</td>
                    <td><span v-if="merchant.merchant_category">{{merchant.merchant_category.data.name||""}}</span></td>
                    <td><a @click="show(merchant.uuid)" class="btn btn-secondary btn-sm" href="#">View</a> <span class="badge badge-pill badge-success" v-if="merchant.subscribed"> Subscribed</span></td>
                </tr>
            </tbody>
        </table>
        <Pagination :page="page" :per-page="perPage" :options="pageOptions" :records="serverTotal" @paginate="getResults"></Pagination> -->

    </div>
</template>

<script>

import Pagination from 'vue-pagination-2';
import route from '@/plugins/route.js';
import PreviewMerchant from '@/components/Affiliate/PreviewMerchant';

export default {
  components:{
    Pagination,
    PreviewMerchant
  },
    props: ['initMerchants'],
    data(){
        return {
          catDropdownIsOpen: false,
          page: 1,
          previewMerchant: null,
          perPage: null,
          serverTotal: 0,
          pageOptions: {
              theme: "bootstrap4"
          },
          filterCategory: null,
          merchantCategories: []
        }
    },
    computed:{
        queryString(){
            if (this.filterCategory){
                return `&merchant_category_id=${this.filterCategory.id}`
            }
            else {
                return ""
            }
        },

        categories() {
          return this.$store.state.merchants.categories;
        },

        merchants() {
          return this.$store.state.merchants.merchants;
        }

    },


    methods: {
      closeDropdown(){
        this.catDropdownIsOpen = false;
      },
        clearFilterCategory(){
          this.catDropdownIsOpen = false;
            this.filterCategory = null;
            this.getResults();
        },
        selectFilterCategory(category){
          this.catDropdownIsOpen = false;
            this.filterCategory = category;
            this.getResults();
        },
        show (merchant) {
          console.log('show');

          console.log(merchant);

            this.previewMerchant = merchant;
            this.$modal.show('merchant-modal');
        },
        hide () {
            this.$modal.hide('hello-world');
        },

        getResults(page = 1) {
          let filter = {
            page,
          }
          if (this.filterCategory) {
            filter.merchant_category_id = this.filterCategory.id;
          }
            this.$api.merchants.index(filter)
                .then(response => {
                    this.merchants = response.data;
                    this.serverPages = response.meta.pagination.total_pages;
                    this.serverTotal = response.meta.pagination.total;
                    this.perPage = response.meta.pagination.per_page;
                });
        }
    },
    created(){
        // this.$api.merchants.index()
        //     .then(response => {
        //         this.merchants = response.data;
        //         this.serverPages = response.meta.pagination.total_pages;
        //         this.serverTotal = response.meta.pagination.total;
        //         this.perPage = response.meta.pagination.per_page;
        //     });
    }
}
</script>

import _ from 'lodash';
import Vue from 'vue';
import route from '@/plugins/route.js';

const MY_AIRPORTS_QUOTA = 3;
const ROUTE_MY_AIRPORTS = `/user/airports`;



export const state = () => {
  return {
    merchant:{
      uuid: null
    },
    myPrograms: null,
    mySubscriptions: []
  }
};

export const mutations = {

  UPDATE_MERCHANT_PROFILE (state, value) {
     Vue.set(state, 'merchant', value)
  },

  SET_MY_PROGRAMS (state, value) {
    Vue.set(state, 'myPrograms', value)
  },

  SET_MY_SUBSCRIPTIONS (state, value) {
    Vue.set(state, 'mySubscriptions', value)
  }

}

export const getters = {
  merchantStats: state => {
    let clicks = 0;
    if (state.myPrograms){
      clicks = state.myPrograms.reduce(function(carry, program) {
        return carry + parseInt(program.clicks)
      }, 0);
    }

    return {
      clicks: clicks
    }
  }
}

export const actions = {

  updateMerchantProfile(merchant) {
    console.log(merchant);
  },

  getMyPrograms({commit}){
    this.$axios.get(route('api.myprograms'))
    .then(response =>{
      this.commit('SET_MY_PROGRAMS', response.data.data);
    })
  },

  getMySubscriptions({commit}){
    this.$api.user.mySubscriptions()
    .then(response =>{
      this.commit('SET_MY_SUBSCRIPTIONS', response.data);
    })
  }

  // getMerchantProfile({commit}) {
  //   this.$axios.get('')
  //   commit('UPDATE_MERCHANT_PROFILE')
  // }
}



export default {
  async getCategories({commit}) {
    const categories = await this.$api.merchants.categories.index();
    commit('UPDATE_MERCHANT_CATEGORIES', categories.data.data);
  },

  async index({ commit }) {
    const merchants = await this.$api.merchants.index();
    commit('SET_MERCHANTS', merchants);
  },

  async subscribe({ commit }, payload) {
    const response = await this.$api.merchants.subscribe(payload.merchantUuid, {  application: payload.applicationText });
    commit('UPDATE_SUBCRIPTION_STATUS', { ...response.data, merchantUuid: payload.merchantUuid });
  }
}

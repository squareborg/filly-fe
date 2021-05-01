export default {
  async getCategories({commit}) {
    const categories = await this.$api.merchants.categories.index();
    commit('UPDATE_MERCHANT_CATEGORIES', categories.data.data);
  }
}

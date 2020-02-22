export default {

  SET_MERCHANTS(state, merchants) {
    state.merchants = merchants
  },

  UPDATE_MERCHANT_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  UPDATE_SUBCRIPTION_STATUS(state, payload) {
    const merchant = _.find(state.merchants.data, { uuid: payload.merchantUuid});
    merchant.subscription_status = payload.subscription_status
  }
}

const qs = require('qs');

export default $axios => ({
    index(query) {
        let queryString = qs.stringify(query);
        console.log(queryString);

        return $axios.$get(`/merchants?${queryString}`)
    },

    show(merchantId) {
      return $axios.get(`/merchants/${merchantId}`);
    },

    categories: {
      index() {
        return $axios.get('/programCategories');
      }
    },

    subscribe(merchantId, payload) {
      return $axios.post(`/merchants/${merchantId}/subscribe`);
    }

})

const qs = require('qs');

export default $axios => ({
    index (query) {
        let queryString = qs.stringify(query);
        console.log(queryString);

        return $axios.$get(`/merchants?${queryString}`)
    },

    categories: {
      index() {
        return $axios.get('/programCategories');
      }
    }

})

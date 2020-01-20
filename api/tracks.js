const qs = require('qs');

export default $axios => ({
    index (query) {
        let queryString = qs.stringify(query);
        return $axios.$get(`/tracks?${queryString}`)
    },

    store (payload) {
        return $axios.$post('/tracks', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    show (id, query) {
        return $axios.$get(`/tracks/${id}`, query)
    },

    update (id, payload) {
        return $axios.$post(`/tracks/${id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    delete (id) {
        return $axios.$delete(`/tracks/${id}`);
    },
})

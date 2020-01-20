const qs = require('qs');

export default $axios => ({
    index (query) {
        let queryString = qs.stringify(query);
        return $axios.$get(`/users?${queryString}`)
    },

    store (payload) {
        return $axios.$post('/users', payload)
    },

    show (id, query) {
        return $axios.$get(`/users/${id}`, query)
    },

    update (id, payload) {
        return $axios.$put(`/users/${id}`, payload)
    },

    suspend (id) {
        return $axios.$post(`/users/${id}/suspend`)
    },

    unsuspend (id) {
        return $axios.$post(`/users/${id}/unsuspend`)
    },

    delete (id) {
        return $axios.$delete(`/users/${id}`);
    },
})

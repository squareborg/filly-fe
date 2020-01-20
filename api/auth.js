export default $axios => ({
  password: {
    email(payload) {
      return $axios.$post(`/password/email`, payload)
    },

    reset(payload) {
      return $axios.$post(`/password/reset`, payload)
    },
  },

  verify: {
    post (payload) {
      return $axios.$post(`/verify`, payload)
    },

    resend (payload) {
      return $axios.$post(`/verify/resend`, payload)
    },
  }
})

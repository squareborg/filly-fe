export default $axios => ({
  mySubscriptions () {
    return $axios.$get(`/mySubscriptions`)
  },
})

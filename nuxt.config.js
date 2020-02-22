import pkg from './package'
require('dotenv').config();

export default {
  mode: 'spa',
  server: {
    port: 3001, // default: 3000
    host: '127.0.0.1', // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  axios: {
    baseURL: process.env.API_BASE_URL,
    timeout: 5000,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': process.env.API_DOMAIN,
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Accept,Origin,Content-Type,X-LS-CORS-Template,X-LS-Auth-Token,X-LS-Auth-User-Token,Content-Type,X-LS-Sync-Result,X-LS-Sequence,token',
      'Content-Type': 'application/json',
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token', timeout: 5000 },
          user: { url: '/me', method: 'get', propertyName: '' },
          logout: false
        },
        tokenType: 'Bearer'
      }
    },
    plugins: ['~/plugins/auth.js'],
    resetOnError: true,
  },
  /*
  ** Global CSS
  */
  css: [
  '~/assets/sass/app.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/api',
    '~/plugins/global',
    '~/plugins/modal',
    '~/plugins/clipboard'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    'nuxt-svg-loader',
    '@nuxtjs/onesignal',
  ],
  /*
  ** Axios module configuration
  */

  /*
  ** Build configuration
  */
 build: {
  filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
  }
},

  toast: {
    position: 'top-right',
    theme: 'bubble',
    fullWidth: false,
    duration: 3000,
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  // target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Higa Coffee データベース",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          'Higa Coffeeではデータを活用して、あなたの"ぴったりな一杯" を探すお手伝いをします。',
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["bulma", "@/assets/main.scss"],
  styleResources: {
    scss: ["./assets/*.scss"],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~plugins/axiosAuthHeader",
    "~plugins/vue-js-toggle-button",
    "~plugins/vue-js-modal",
    "~plugins/vue-burger-menu",
    "~plugins/vue-slider-component",
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    "nuxt-webfontloader",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy",
    "@nuxtjs/style-resources",
    "@nuxtjs/toast",
  ],

  axios: {
    proxy: true,
    prefix: "/api",
  },
  proxy: {
    "/api/": {
      target: process.env.API_URL,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
  webfontloader: {
    google: {
      families: ["Noto+Sans+JP:wght@100;300"],
    },
  },
  toast: {
    // 右上にtoastを表示
    position: "top-right",
    duration: 3000,
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
  router: {
    middleware: ["auth", "logined", "notLogin"],
  },
};

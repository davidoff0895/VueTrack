const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/consts";',
      },
    },
  },
  pluginOptions: {
    vuetify: {
      // custom config
    },
  },
  devServer: {
    proxy: {
      '/bff': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/bff': '',
        },
      },
    },
  },
});

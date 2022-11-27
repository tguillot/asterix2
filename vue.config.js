const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  pluginOptions: {
    electronBuilder: {
        builderOptions: {
            productName: "Asterix",
            appId: 'Asterix.Reader',
            win: {
                "target": [
                    "nsis"
                ],
              icon: 'public/favicon.ico',
            },
            "nsis": {
                "installerIcon": "public/favicon.ico",
                "uninstallerIcon": "public/favicon.ico",
                "uninstallDisplayName": "asterix",
            },
        },
    },
  },
})

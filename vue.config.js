const { defineConfig } = require('@vue/cli-service')
const ArcGISPlugin = require("@arcgis/webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  
  pluginOptions: {
    electronBuilder: {
        builderOptions: {
            productName: "Asterix Reader",
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
                "uninstallDisplayName": "asterix Reader",
            },
        },
    },
  },
})

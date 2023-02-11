
const path = require("path");
const webpack = require("webpack");
const copyDir = require("copy-dir");
const fs = require("fs");
const resolve = path.resolve;
const SOURCE_PATH = resolve(__dirname, "src/");
const CYPRESS = require("./cypress.json");
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "develop" || NODE_ENV === "default";
const isProd = NODE_ENV === "production";

const CUSTOM_CONFIG_FILE = "customConfig.ts"
const CUSTOM_CONFIG_PATH = resolve(SOURCE_PATH, CUSTOM_CONFIG_FILE);
const VUE_APP_TITLE = process.env.VUE_APP_TITLE;
const VUE_APP_API_HOST = process.env.VUE_APP_API_HOST;
const VUE_APP_NODE_VERSION = process.env.VUE_APP_NODE_VERSION;
const VUE_APP_OUTPUT_DIR = process.env.VUE_APP_OUTPUT_DIR;
const VUE_APP_ASSETS_HOST = process.env.VUE_APP_ASSETS_HOST;
const VUE_APP_VERSION = process.env.VUE_APP_VERSION;
const VUE_APP_ENV = process.env.VUE_APP_ENV;
const VUE_APP_SERVER_HOST = process.env.VUE_APP_SERVER_HOST;
// const VUE_APP_FB_TOKEN = process.env.VUE_APP_FB_TOKEN;
const VUE_APP_PUBLIC_DIR = process.env.VUE_APP_PUBLIC_DIR;
const SITE_NAME = 'BRANDING';

const VUE_APP_MOBILE  = process.env.VUE_APP_MOBILE;
const ANDROID_SYNC    = process.env.ANDROID_SYNC;
const USE_HTTP_HOST  = VUE_APP_ENV === "development" || VUE_APP_ENV === "default" || VUE_APP_ENV === "common";
const USE_HTTPS_HOST = VUE_APP_ENV === "production" || VUE_APP_ENV === "release";

/**
*  SYNC FOLDER
*    http : 使用 patch/android
*    https: 使用 patch/android.orig
* */
const SYNC_FOLDER = VUE_APP_MOBILE
  ? USE_HTTP_HOST
    ? "patch/android"
    : "patch/android.orig"
  : "";

CYPRESS.baseUrl = VUE_APP_SERVER_HOST;

function cypressInit(){
  fs.writeFileSync("cypress.json", JSON.stringify(CYPRESS));
}

function customConfigsInit(){
  if (fs.existsSync(CUSTOM_CONFIG_PATH)){
    // pass
  }else{
    fs.writeFileSync(CUSTOM_CONFIG_PATH, `
      /** file generated from vue.config.js **/
      import {IBaseAppConfig} from "~/appCommon/base/baseAppConfigTypes";
      import {TUserState} from "~/types/facadeTypes";
      export function customConfigInit(APP_CONFIGS: IBaseAppConfig<TUserState>){
      }`
    )
  }
}

console.log("-------- INFO --------");
console.log(`VUE_APP_PUBLIC_DIR: ${VUE_APP_PUBLIC_DIR}`);
console.log(`NODE_ENV       : ${NODE_ENV}`);
console.log(`VUE_APP_ENV    : ${VUE_APP_ENV}`);
console.log(`VUE_APP_TITLE  : ${VUE_APP_TITLE}`);
console.log(`API_HOST       : ${VUE_APP_API_HOST}`);
console.log(`ASSETS_HOST    : ${VUE_APP_ASSETS_HOST}`);
console.log(`NODE_VERSION   : ${VUE_APP_NODE_VERSION}`);
console.log(`OUTPUT_DIR     : ${VUE_APP_OUTPUT_DIR}`);
console.log(`VERSION        : ${VUE_APP_VERSION}`);
console.log("VUE_APP_MOBILE:", VUE_APP_MOBILE);
console.log("USE_HTTP_HOST :", USE_HTTP_HOST);
console.log("USE_HTTPS_HOST:", USE_HTTPS_HOST);
console.log("ANDROID_SYNC  :", ANDROID_SYNC);
console.log("SYNC_FOLDER   :", SYNC_FOLDER);

if (fs.existsSync("android") && ANDROID_SYNC === "true"){
  copyDir.sync(SYNC_FOLDER, "android");
}

cypressInit();
customConfigsInit();

module.exports = {
  publicPath: VUE_APP_PUBLIC_DIR,
  pwa: {
    name: SITE_NAME,
    themeColor: "#f0b90b",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    iconPaths: {
      favicon32: "img/icons/coin.svg",
      favicon16: "img/icons/coin.svg",
      appleTouchIcon: "img/icons/coin.svg",
      maskIcon: "img/icons/coin.svg",
      msTileImage: "img/icons/coin.svg"
    }
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        `
      },
      scss: {
        additionalData: `
        `
      },
      less: {
        modifyVars: {}
      }
    }
  },

  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  productionSourceMap: false,

  devServer: {
    disableHostCheck: true
  },

  configureWebpack: config => {
    return {
      optimization: {
        minimize: isProd
      },
      resolve: {
        alias: {
          "~": SOURCE_PATH,
          "@": SOURCE_PATH
        }
      }
    };
  },

  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({symbolId: "icon-[name]"})
      .end()

    config.plugin('html').tap(args => {
      args[0].title = SITE_NAME

      ;
      return args;
    });

    const isProduction = process.env.NODE_ENV === "production";
    let optimization = {};
    if (isProduction) {
      optimization = {
        minimize: true
      };
    }

    return {
      optimization,
      resolve: {
        alias: {
          "~": resolve(__dirname, "src/"),
          "@": resolve(__dirname, "src/")
        }
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(NODE_ENV),
            VUE_APP_API_HOST: JSON.stringify(VUE_APP_API_HOST),
            VUE_APP_ASSETS_HOST: JSON.stringify(VUE_APP_ASSETS_HOST),
            VUE_APP_OUTPUT_DIR: JSON.stringify(VUE_APP_OUTPUT_DIR),
            VUE_APP_TITLE: JSON.stringify(VUE_APP_TITLE),
            VUE_APP_VERSION: JSON.stringify(VUE_APP_NODE_VERSION),
            VUE_APP_ENV: JSON.stringify(VUE_APP_ENV),
            VUE_APP_SERVER_HOST: JSON.stringify(VUE_APP_SERVER_HOST),
            VUE_APP_NAME: JSON.stringify(SITE_NAME),
            // VUE_APP_FB_TOKEN: JSON.stringify(VUE_APP_FB_TOKEN)
          }
        })
      ]
    };
  }
};

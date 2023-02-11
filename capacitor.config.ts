import { CapacitorConfig } from '@capacitor/cli';

/**
 *
 *  使用 npx cap copy / npx cap sync 可以於最後一個 argument 代入 env mode
 *  以變更 capacitor.config.ts 中 webDir 的位置。 如
 *  > yarn cap:sync develop
 *  > yarn cap:sync production
 *  > yarn cap:sync release
 *
 * */
const env = process.env;
let webDir = "develop";

if (Object.keys(env).includes("npm_config_argv")){
  const commandArray = (JSON.parse(env.npm_config_argv) as any).original;
  const maybeEnvMode = commandArray[commandArray.length-1];
  webDir = ["develop", "release", "product", "production"].includes(maybeEnvMode)
    ? maybeEnvMode
    : "develop";

  console.log("Web Folder:", webDir);
  console.log("------------------------------")
  console.log("");
}

const config: CapacitorConfig = {
  appId: 'com.branding.app',
  appName: 'Branding',
  webDir,
  bundledWebRuntime: false,
};

export default config;

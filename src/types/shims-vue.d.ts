/* eslint-disable */
import {DefineComponent} from "vue";
import {VueI18n, PostTranslationHandler} from "vue-i18n"
import en from "~/assets/i18n/en";


declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $i18n: VueI18n;
    // readonly $vuetify: VuetifyOptions;
    $t: PostTranslationHandler;
    $txt: typeof en;
  }
}

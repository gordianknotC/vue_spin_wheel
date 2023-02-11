import "vant/lib/index.css";
import "@/styles/tailwind.scss";
import "@/styles/all.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { useVant } from "~/plugins/useVant";
import { useSvgIcon } from "~/plugins/svgIcon";
import {getAppRouter} from "~/router/router";

const app = createApp(App as any);

useVant(app);
useSvgIcon(app);
const router = getAppRouter();
app.use(router);
// app.config.globalProperties

app.mixin({
  computed: {
  }
});

const vue = app.mount("#app");


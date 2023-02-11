/** desktop 配置*/
import "@vant/touch-emulator";

/** 有用到再加，可以減小專案大小*/
import {
  Button, 
  Toast,
} from "vant";

export function useVant(app: any) {
  app.use(Button);
}

Toast.allowMultiple();

import SvgIcon from "@/components/SvgIcon.vue";

const componentPlugin: any = {
  install: function(vue: any, options: any) {
    if (
      options &&
      options.imports &&
      Array.isArray(options.imports) &&
      options.imports.length > 0
    ) {
      // 按需引入图标
      const { imports } = options;
      imports.forEach((name: any) => {
        require(`@/assets/icon/${name}.svg`);
      });
    } else {
      // 全量引入图标
      const ctx = require.context("@/assets/icon", false, /\.svg$/);
      ctx.keys().forEach(path => {
        const temp = path.match(/\.\/([A-Za-z0-9\-_]+)\.svg$/);
        if (!temp) return;
        const name = temp[1];
        require(`@/assets/icon/${name}.svg`);
      });
    }
    vue.component(SvgIcon.name, SvgIcon);
  }
};

export function useSvgIcon(app: any){
  app.use(componentPlugin, {imports: []});
}

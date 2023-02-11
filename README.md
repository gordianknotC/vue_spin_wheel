
Branch 有四種 
- github_version 
    - 原碼最新
    - fix BaseSpanCounter BasePeriodCounter
    - fix SpinWheelDemo 
    - 修正一些 fixme: temporary, 因 api server network error 的原由無法放上 demo
- vue_spin_wheel
    - 移除不必要檔
    - env.gh-pages
- otp_counter
    - 移除不必要檔
    - env.gh-pages

# template

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn develop
yarn production
yarn release
```

### Lints and fixes files
```
yarn lint
```

### Prettier and fixes files
```
yarn prettier
```

### Project Structure
```
src/assets/images            // 圖片檔案
src/assets/fonts             // 字體檔案
src/assets/styles            // css檔案
src/assets/styles/base.scss  // 基本scss
src/assets/styles/custom     // 調整第三方樣式
src/services                 // api
src/types                    // typescript
src/store                    // 狀態管理
src/router                   // 路由
src/components               // 組件
src/utils                    // 工具
src/views                    // pages
src/i18n                     // 語系
src/plugins                  // 第3方套件
src/layout                   // layout
src/const.ts                 // 專案資料定義
src/config.ts                // 專案設定定義
```
















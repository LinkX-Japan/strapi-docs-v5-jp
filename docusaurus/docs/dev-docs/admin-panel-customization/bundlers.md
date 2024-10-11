---
title: 管理パネルバンドラー
description: ViteとwebpackのStrapi 5での設定方法について学びましょう。
sidebar_label: バンドラー
toc_max_heading_level: 4
tags:
- admin panel 
- 管理パネルカスタマイズ
- webpack
- Vite
---

import FeedbackCallout from '/docs/snippets/backend-customization-feedback-cta.md'

Strapiの管理パネルは、Strapiアプリケーションのすべての機能とインストールされたプラグインを統合する、Reactベースのシングルページアプリケーションです。Strapi 5アプリケーションでは、2つの異なるバンドラーが使用可能で、デフォルトは[Vite](#vite)ですが、[webpack](#webpack)も利用できます。どちらのバンドラーも、ニーズに合わせて設定可能です。

:::info
簡単のため、このドキュメンテーションでは`strapi develop`コマンドを使用していますが、実際には使用するパッケージマネージャに応じて、`yarn develop`または`npm run develop`コマンドを実行することが多いでしょう。
:::

## Vite

Strapi 5では、管理パネルのビルドにデフォルトで[Vite](https://vitejs.dev/)が使用されます。そのため、`strapi develop`コマンドを実行すると、デフォルトでViteが使用されます。

Viteの設定を拡張するには、`/src/admin/vite.config.[js|ts]`内に設定を拡張する関数を定義します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="/src/admin/vite.config.js"
const { mergeConfig } = require("vite");

module.exports = (config) => {
  // 重要: 常に変更したconfigを返す
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="/src/admin/vite.config.ts"
import { mergeConfig } from "vite";

export default (config) => {
  // 重要: 常に変更したconfigを返す
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
```

</TabItem>
</Tabs>

## Webpack

Strapi 5では、デフォルトのバンドラーはViteです。[webpack](https://webpack.js.org/)をバンドラーとして使用するには、`strapi develop`コマンドにオプションとして渡す必要があります。

```bash
strapi develop --bundler=webpack
```

:::prerequisites
webpackをカスタマイズする前に、デフォルトの`webpack.config.example.js`ファイルの名前を`webpack.config.[js|ts]`に変更してください。
:::

webpack v5の使用を拡張するには、`/src/admin/webpack.config.[js|ts]`内に設定を拡張する関数を定義します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="/src/admin/webpack.config.js"
module.exports = (config, webpack) => {
  // 注: webpackは上記で提供されているため、`require`する必要はありません

  // webpack設定にカスタマイズを適用
  config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

  // 重要: 変更したconfigを返す
  return config;
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="/src/admin/webpack.config.ts"
export default (config, webpack) => {
  // 注: webpackは上記で提供されているため、`require`する必要はありません

  // webpack設定にカスタマイズを適用
  config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

  // 重要: 変更したconfigを返す
  return config;
};
```

</TabItem>
</Tabs>
```
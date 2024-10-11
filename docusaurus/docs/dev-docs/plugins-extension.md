---
title: プラグイン拡張
displayed_sidebar: devDocsSidebar
tags:
- bootstrap function
- controllers
- middlewares
- policies
- plugins
- plugins development
- register function 
- services
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# プラグイン拡張

<NotV5 />

Strapiには、[マーケットプレイス](/user-docs/plugins/installing-plugins-via-marketplace#installing-marketplace-plugins-and-providers)やnpmパッケージからインストールできる[プラグイン](/dev-docs/plugins)が付属しています。また、自分自身でプラグインを作成することもできます（[プラグイン開発](/dev-docs/plugins/developing-plugins)を参照）、または既存のものを拡張することもできます。

:::warning
* 任意のプラグイン更新により、このプラグインの拡張が壊れる可能性があります。
* 必要に応じて移行ガイド付きで新しいバージョンのStrapiがリリースされますが、これらのガイドはプラグイン拡張をカバーしていません。大規模なカスタマイズが必要な場合は、プラグインをフォークすることを考えてください。
* 現在、プラグインの管理パネル部分は[patch-package](https://www.npmjs.com/package/patch-package)を使用してのみ拡張できますが、これにより将来のStrapiのバージョンでプラグインが壊れる可能性があることを考慮してください。
:::

プラグイン拡張のコードは `./src/extensions` フォルダに位置しています（[プロジェクト構造](/dev-docs/project-structure)を参照）。一部のプラグインは、そこに自動的にファイルを作成し、修正する準備をします。

<details> 
<summary>拡張フォルダ構造の例</summary>

```bash
/extensions
  /some-plugin-to-extend
    strapi-server.js|ts
    /content-types
      /some-content-type-to-extend
        model.json
      /another-content-type-to-extend
        model.json
  /another-plugin-to-extend
    strapi-server.js|ts
```
</details>

プラグインは2つの方法で拡張できます：

- [プラグイン拡張](#プラグイン拡張)
  - [プラグインのコンテンツタイプを拡張する](#プラグインのコンテンツタイプを拡張する)
  - [プラグインのインターフェースの拡張](#プラグインのインターフェースの拡張)
    - [拡張フォルダ内](#拡張フォルダ内)
    - [registerとbootstrap関数内](#registerとbootstrap関数内)

## プラグインのコンテンツタイプを拡張する

プラグインのコンテンツタイプは2つの方法で拡張できます：`strapi-server.js|ts`内のプログラムインターフェースを使用する方法と、コンテンツタイプのスキーマを上書きする方法です。

最終的なコンテンツタイプのスキーマは、以下のローディング順序に依存します：

1. 元のプラグインのコンテンツタイプ
2. `./src/extensions/plugin-name/content-types/content-type-name/schema.json`で定義された[schema](/dev-docs/backend-customization/models#model-schema)内の宣言によって上書きされたコンテンツタイプ
3. `strapi-server.js|ts`からエクスポートされた[`content-types`キー](/dev-docs/plugins/server-api#content-types)内のコンテンツタイプ宣言
4. Strapiアプリケーションの[`register()`関数](/dev-docs/configurations/functions#register)内のコンテンツタイプ宣言

プラグインの[コンテンツタイプ](/dev-docs/backend-customization/models)を上書きするには：

1. _(任意)_ アプリのルートに `./src/extensions` フォルダを作成します。すでにフォルダが存在する場合はこの手順をスキップします。
2. 拡張するプラグインと同じ名前のサブフォルダを作成します。
3. `content-types` サブフォルダを作成します。
4. `content-types` サブフォルダ内に、上書きするコンテンツタイプと同じ [singularName](/dev-docs/backend-customization/models#model-information) の別のサブフォルダを作成します。
5. この `content-types/name-of-content-type` サブフォルダ内で、`schema.json` ファイル（[schema](/dev-docs/backend-customization/models#model-schema) ドキュメンテーションを参照）に新しいコンテンツタイプのスキーマを定義します。
6. _(任意)_ 上書きする各コンテンツタイプについて、手順4と5を繰り返します。

## プラグインのインターフェースの拡張

Strapiアプリケーションが初期化されるとき、プラグイン、拡張、およびグローバルライフサイクル関数のイベントは次の順序で発生します。

1. プラグインがロードされ、そのインターフェースが公開されます。
2. `./src/extensions`内のファイルがロードされます。
3. `./src/index.js|ts`内の `register()` および `bootstrap()` 関数が呼び出されます。

プラグインのインターフェースは、ステップ2（つまり `./src/extensions`内）またはステップ3（つまり `./src/index.js|ts`内）で拡張できます。

:::note
StrapiプロジェクトがTypeScriptベースの場合、`index` ファイルがTypeScript拡張子（つまり、`src/index.ts`）を持っていることを確認してください。そうでない場合、コンパイルされません。
:::

### 拡張フォルダ内

`./src/extensions` フォルダを使用してプラグインのサーバーインターフェースを拡張するには：

1. _(任意)_ アプリのルートに `./src/extensions` フォルダを作成します。すでにフォルダが存在する場合はこの手順をスキップします。
2. 拡張するプラグインと同じ名前のサブフォルダを作成します。
3. [Server API](/dev-docs/plugins/server-api)を使用してプラグインのバックエンドを拡張するための `strapi-server.js|ts` ファイルを作成します。
4. このファイル内で関数を定義し、エクスポートします。この関数は `plugin` インターフェースを引数として受け取るため、それを拡張できます。

<details>
<summary>バックエンド拡張の例</summary>

```js title="./src/extensions/some-plugin-to-extend/strapi-server.js|ts"

module.exports = (plugin) => {
  plugin.controllers.controllerA.find = (ctx) => {};

  plugin.policies[newPolicy] = (ctx) => {};

  plugin.routes['content-api'].routes.push({
    method: 'GET',
    path: '/route-path',
    handler: 'controller.action',
  });

  return plugin;
};
```
</details>

### registerとbootstrap関数内

プラグインのインターフェースを `./src/index.js|ts` 内で拡張するには、プロジェクト全体の `bootstrap()` および `register()` [関数](/dev-docs/configurations/functions)を使用し、[getters](/dev-docs/plugins/server-api#usage)を使用してインターフェースにプログラム的にアクセスします。

<details>
<summary>./src/index.js|ts内でプラグインのコンテンツタイプを拡張する例</summary>

```js title="./src/index.js|ts"

<details>

```markdown
module.exports = {
  register({ strapi }) {
    const contentTypeName = strapi.contentType('plugin::my-plugin.content-type-name')  
    contentTypeName.attributes = {
      // 既に定義されている属性を広げる
      ...contentTypeName.attributes,
      // 新たに追加する、または属性を上書きする
      'toto': {
        type: 'string',
      }
    }
  },
  bootstrap({ strapi }) {},
};
```
</details>

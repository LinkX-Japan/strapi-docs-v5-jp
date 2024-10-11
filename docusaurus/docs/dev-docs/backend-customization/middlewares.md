---
title: ミドルウェア
tags:
- バックエンドのカスタマイズ
- バックエンドサーバー
- コントローラー
- ctx
- グローバルミドルウェア
- is-ownerポリシー
- ミドルウェア
- ミドルウェアのカスタマイズ
- REST API 
- ルートミドルウェア
- ルート
---

import MiddlewareTypes from '/docs/snippets/middleware-types.md'

# ミドルウェアのカスタマイズ

<MiddlewareTypes />

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-global-middlewares.png" alt="グローバルミドルウェアを強調したシンプル化されたStrapiバックエンドの図" />
  <em><figcaption style={{fontSize: '12px'}}>この図は、グローバルミドルウェアを強調したStrapiバックエンドを通るリクエストのシンプル化されたバージョンを示しています。バックエンドカスタマイズの紹介ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブな図</a>が含まれています。</figcaption></em>
</figure>

## 実装

新しいアプリケーションレベルまたはAPIレベルのミドルウェアは以下の方法で実装できます：

- [インタラクティブCLIコマンド `strapi generate`](/dev-docs/cli#strapi-generate)を使用して
- または適切なフォルダにJavaScriptファイルを手動で作成して（[プロジェクト構造](/dev-docs/project-structure)を参照）：
  - アプリケーションレベルのミドルウェアの場合は`./src/middlewares/`
  - APIレベルのミドルウェアの場合は`./src/api/[api-name]/middlewares/`
  - [プラグインミドルウェア](/dev-docs/plugins/server-api#middlewares)の場合は`./src/plugins/[plugin-name]/middlewares/`

REST APIと連携するミドルウェアは次のような関数です：

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/middlewares/my-middleware.js or ./src/api/[api-name]/middlewares/my-middleware.js"

module.exports = (config, { strapi })=> {
  return (context, next) => {};
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/middlewares/my-middleware.js or ./src/api/[api-name]/middlewares/my-middleware.ts"

export default (config, { strapi })=> {
  return (context, next) => {};
};
```

</TabItem>
</Tabs>

グローバルにスコープされたカスタムミドルウェアは、Strapiがそれらをロードしないように[ミドルウェア設定ファイル](/dev-docs/configurations/middlewares#loading-order)に追加する必要があります。

APIレベルとプラグインミドルウェアは、それらが関連する特定のルーターに次のように追加できます：

```js title="./src/api/[api-name]/routes/[collection-name].js or ./src/plugins/[plugin-name]/server/routes/index.js"
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/[collection-name]",
      handler: "[controller].find",
      config: {
        middlewares: ["[middleware-name]"],
        // ミドルウェアの命名規則については下記の使用方法セクションを参照
      },
    },
  ],
};
```

<details>
<summary>カスタムタイマーミドルウェアの例</summary>

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="path: /config/middlewares.js"
module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

```js
const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', delta + 'ms');
  };
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="/config/middlewares.ts"

export default () => {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', delta + 'ms');
  };
};
```

</TabItem>
</Tabs>

</details>

GraphQLプラグインは、異なる構文で[カスタムミドルウェアの実装](/dev-docs/plugins/graphql#middlewares)も可能です。

## 使用法

ミドルウェアは、その範囲に応じて異なる方法で呼び出されます：

- アプリケーションレベルのミドルウェアには `global::middleware-name` を使います
- APIレベルのミドルウェアには `api::api-name.middleware-name` を使います
- プラグインミドルウェアには `plugin::plugin-name.middleware-name` を使います

:::tip
すべての登録済みミドルウェアをリストするには、 `yarn strapi middlewares:list` を実行します。
:::

### "is-owner policy" でコンテンツのアクセスを制限する

エントリーの作成者がそのエントリーを編集または削除できる唯一のユーザーであることが必要な場合がよくあります。Strapiの以前のバージョンでは、これは "is-owner policy" として知られていました。Strapi v4では、この挙動を達成するための推奨方法はミドルウェアを使用することです。

適切な実装は、プロジェクトのニーズとカスタムコードに大きく依存しますが、最も基本的な実装は以下の手順で達成できるでしょう：

1. プロジェクトのフォルダから、Strapi CLIジェネレータを使用してミドルウェアを作成します。ターミナルで `yarn strapi generate`（または `npm run strapi generate`）コマンドを実行します。
2. キーボードの矢印を使用してリストから `middleware` を選択し、Enterキーを押します。
3. ミドルウェアに名前を付けます。例えば `isOwner` とします。
4. リストから `Add middleware to an existing API` を選択します。
5. ミドルウェアを適用するAPIを選択します。
6. `/src/api/[your-api-name]/middlewares/isOwner.js` ファイルのコードを以下のものに置き換えます。22行目の `api::restaurant.restaurant` を、ステップ5で選択したAPIに対応する識別子（API名が `blog-post` の場合は `api::blog-post.blog-post` など）に置き換えます：

  ```js showLineNumbers title="src/api/blog-post/middlewares/isOwner.js"
    "use strict";

    /**
     * `isOwner` middleware
     */

    module.exports = (config, { strapi }) => {
      // Add your own logic here.
      return async (ctx, next) => {
        const user = ctx.state.user;
        const entryId = ctx.params.id ? ctx.params.id : undefined;
        let entry = {};

        /** 
         * Gets all information about a given entry,
         * populating every relations to ensure 
         * the response includes author-related information
         */
        if (entryId) {
          entry = await strapi.documents('api::restaurant.restaurant').findOne(
            entryId,
            { populate: "*" }
          );
        }

/**
         * ユーザーIDとエントリーの作成者IDを比較し
         * リクエストがStrapiバックエンドサーバーで
         * 処理可能かどうかを判断します
         */
        if (user.id !== entry.author.id) {
          return ctx.unauthorized("この操作は許可されていません。");
        } else {
          return next();
        }
      };
    };
  ```

7. ミドルウェアが一部のルートに適用されるように設定します。`src/api/[あなたのapi–名]/routes/[あなたのコンテンツタイプ名].js` ファイル内の `config` オブジェクトで、ミドルウェアを適用したいメソッド（`create`、`read`、`update`、`delete`）を定義し、これらのルートに対して `isOwner` ミドルウェアを宣言します。<br /><br />例えば、`restaurant` APIの `restaurant` コンテンツタイプに対してGET（つまり、`read` メソッド）とPOST（つまり、`create` メソッド）のリクエストを任意のユーザーに許可し、PUT（つまり、`update` メソッド）とDELETEのリクエストはエントリーを作成したユーザーのみに制限したい場合、`src/api/restaurant/routes/restaurant.js` ファイルで以下のコードを使用できます：

    ```js title="src/api/restaurant/routes/restaurant.js"

    /**
     * レストランルーター
     */
      
    const { createCoreRouter } = require("@strapi/strapi").factories;

    module.exports = createCoreRouter("api::restaurant.restaurant", {
      config: {
        update: {
          middlewares: ["api::restaurant.is-owner"],
        },
        delete: {
          middlewares: ["api::restaurant.is-owner"],
        },
      },
    });
    ```

:::info
ルートミドルウェアについての詳細情報は[ルートドキュメンテーション](/dev-docs/backend-customization/routes)で見つけることができます。
:::

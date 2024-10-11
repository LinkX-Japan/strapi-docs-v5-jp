Here's the translated content maintaining the Markdown format:

---

title: Routes  
description: Strapiのルートは、コンテンツへのリクエストを処理し、コンテンツタイプに対して自動生成されます。ルートはあなたのニーズに合わせてカスタマイズすることができます。  
displayed_sidebar: devDocsSidebar  
tags:  
- バックエンドのカスタマイズ  
- バックエンドサーバー  
- コントローラー  
- コアルーター  
- カスタムルーター  
- ctx  
- ミドルウェア  
- ポリシー  
- パブリックルート  
- REST API  
- ルート  
---

# ルート

Strapiに送られる任意のURLのリクエストは、ルートによって処理されます。デフォルトでは、Strapiはすべてのコンテンツタイプに対してルートを生成します（[REST API documentation](/dev-docs/api/rest)を参照）。ルートは[追加](#実装)や設定が可能です。

- [ポリシー](#ポリシー)を使用して、ルートへのアクセスをブロックすることができます。  
- [ミドルウェア](#ミドルウェア)を使用して、リクエストフローとリクエスト自体を制御し、変更することができます。

ルートが一度存在すると、それに到達するとコントローラーによって処理されるコードが実行されます（[コントローラーのドキュメンテーション](/dev-docs/backend-customization/controllers)を参照）。すべての既存のルートとその階層順序を表示するには、`yarn strapi routes:list`を実行します（[CLI reference](/dev-docs/cli)を参照）。

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-routes.png" alt="ルートが強調表示されたStrapiバックエンドの簡略化されたダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>このダイアグラムは、リクエストがStrapiのバックエンドを通過する様子を簡略化したもので、ルートが強調表示されています。バックエンドカスタマイズの導入ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブなダイアグラム</a>が含まれています。</figcaption></em>
</figure>

## 実装

新しいルートの実装は、`./src/api/[apiName]/routes`フォルダ内のルーターファイルにそれを定義することで行います（[プロジェクト構造](/dev-docs/project-structure)を参照）。

使用ケースにより、2つの異なるルーターファイル構造があります：

- [ルート](#ルート)
  - [実装](#実装)
    - [コアルーターの設定](#コアルーターの設定)
    - [カスタムルータの作成](#カスタムルータの作成)
  - [設定](#設定)
    - [ポリシー](#ポリシー)
    - [ミドルウェア](#ミドルウェア)
    - [パブリックルート](#パブリックルート)

### コアルーターの設定

コアルーター（すなわち、`find`、`findOne`、`create`、`update`、および`delete`）は、新しい[コンテンツタイプ](/dev-docs/backend-customization/models#model-creation)が作成されたときにStrapiによって自動的に作成される[デフォルトのルート](/dev-docs/api/rest#endpoints)に対応します。

Strapiは`createCoreRouter`ファクトリ関数を提供しており、これによりコアルーターが自動的に生成され、次のことが可能になります：

- 各ルーターに設定オプションを渡す  
- 一部のコアルーターを無効にして[カスタムルーターを作成する](#カスタムルータの作成)。

コアルーターファイルは、以下のパラメーターを使用して`createCoreRouter`の呼び出し結果をエクスポートするJavaScriptファイルです：

| パラメータ  | 説明                                                                                   | タイプ      |  
| ---------- | --------------------------------------------------------------------------------------- | ---------- |  
| `prefix`   | このモデルのすべてのルータに追加するカスタムプレフィックスを指定することができます（例：`/test`）| `String`   |  
| `only`     | 読み込むだけのコアルート<br /><br/>この配列にないものは無視されます。                 | `Array`    |  
| `except`   | 読み込まれるべきでないコアルート<br/><br />これは機能的に`only`パラメータの逆です。   | `Array`    |  
| `config`   | ルートの[policies](#policies)、[middlewares](#middlewares)、および[public availability](#public-routes)を処理する設定 | `Object`   |  

<br />

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/[apiName]/routes/[routerName].js (例 './src/api/restaurant/routes/restaurant.js')"

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/[apiName]/routes/[routerName].ts (例 './src/api/restaurant/routes/restaurant.ts')"

import { factories } from '@strapi/strapi'; 

export default factories.createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
```

</TabItem>
</Tabs>

<br />

一般的な実装例：

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/restaurant.js"

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    }
  }
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/restaurant.ts"

import { factories } from '@strapi/strapi'; 

export default factories.createCoreRouter('api::restaurant.restaurant', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    }
  }
});
```

</TabItem>
</Tabs>

これにより、認証なしでコアの `find` [controller](/dev-docs/backend-customization/controllers)から `/restaurants` パスに `GET` リクエストを許可します。

### カスタムルータの作成

カスタムルータを作成するとは、各オブジェクトが以下のパラメータを持つルートであるオブジェクトの配列をエクスポートするファイルを作成することです：

| パラメータ                  | 説明                                                                      | タイプ     |
| -------------------------- | -------------------------------------------------------------------------------- | -------- |
| `method`                   | ルートに関連するメソッド（例：`GET`、`POST`、`PUT`、`DELETE`、`PATCH`）  | `String` |
| `path`                     | フォワードリーディングスラッシュで始まる到達するパス（例：`/articles`）| `String` |
| `handler`                  | ルートに到達したときに実行する関数。<br/>この構文に従うべきです：`<controllerName>.<actionName>` | `String` |
| `config`<br /><br />_オプション_ | ルートの[policies](#policies)、[middlewares](#middlewares)、[public availability](#public-routes)を処理する設定<br/><br/>           | `Object` |

<br />

動的な

ルートはパラメータと正規表現を使用して作成することができます。これらのパラメータは`ctx.params`オブジェクトで公開されます。詳細については、[PathToRegex](https://github.com/pillarjs/path-to-regexp)のドキュメンテーションを参照してください。

:::caution
ルートファイルはアルファベット順にロードされます。カスタムルートをコアルートの前にロードするには、カスタムルートの名前を適切に設定してください（例：`01-custom-routes.js`および`02-core-routes.js`）。
:::

<details>

<summary>URLパラメータと正規表現を使用したカスタムルーターの例</summary>

次の例では、カスタムルートファイルの名前に`01-`がプレフィックスとして付けられています。これにより、ルートはコアルートの前に到達します。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/01-custom-restaurant.js"

module.exports = {
  routes: [
    { // URLパラメータで定義されたパス
      method: 'POST',
      path: '/restaurants/:id/review', 
      handler: 'restaurant.review',
    },
    { // 正規表現で定義されたパス
      method: 'GET',
      path: '/restaurants/:category([a-z]+)', // URLパラメータが小文字の文字で構成されている場合のみマッチします
      handler: 'restaurant.findByCategory',
    }
  ]
}
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/01-custom-restaurant.ts"

export default {
  routes: [
    { // URLパラメータで定義されたパス
      method: 'GET',
      path: '/restaurants/:category/:id',
      handler: 'Restaurant.findOneByCategory',
    },
    { // 正規表現で定義されたパス
      method: 'GET',
      path: '/restaurants/:region(\\d{2}|\\d{3})/:id', // 最初のパラメータが2または3桁の数字を含んでいる場合のみマッチします。
      handler: 'Restaurant.findOneByRegion',
    }
  ]
}
```

</TabItem>
</Tabs>

</details>

## 設定

[コアルータ](#configuring-core-routers)と[カスタムルータ](#creating-custom-routers)の両方が同じ設定オプションを持っています。ルートの設定は、[ポリシー](#policies)と[ミドルウェア](#middlewares)を処理したり、[ルートを公開する](#public-routes)ために使用できる`config`オブジェクトで定義されます。

### ポリシー

[ポリシー](/dev-docs/backend-customization/policies)はルート設定に追加できます：

- `./src/policies`に登録されたポリシーを指定することで、カスタム設定を渡すことなく追加する  
- または、ポリシーの実装を直接宣言し、[Koaのコンテキスト](https://koajs.com/#context) (`ctx`)と`strapi`インスタンスを引数として取る関数として追加します（[ポリシーのドキュメンテーション](/dev-docs/backend-customization/routes)を参照）

<Tabs groupId="core-vs-custom-router">

<TabItem value="core-router" label="コアルータポリシー">

<Tabs  groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/restaurant.js"

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      policies: [
        // 登録されたポリシーを指定
        'policy-name',

        // カスタム設定を渡して登録されたポリシーを指定
        { name: 'policy-name', config: {} }, 
        
        // ポリシーの実装を直接渡す
        (policyContext, config, { strapi }) => {
          return true;
        },
      ]
    }
  }
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/restaurant.ts"

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      policies: [
        // 登録されたポリシーを指定
        'policy-name',

        // カスタム設定を渡して登録されたポリシーを指定
        { name: 'policy-name', config: {} }, 
        
        // ポリシーの実装を直接渡す
        (policyContext, config, { strapi }) => {
          return true;
        },
      ]
    }
  }
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="custom-router" label="カスタムルータポリシー">

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        policies: [
          // 登録されたポリシーを指定
          'policy-name',

          // カスタム設定を渡して登録されたポリシーを指定
          { name: 'policy-name', config: {} },

// ポリシーの実装を直接渡す
          (policyContext, config, { strapi }) => {
            return true;
          },
        ]
      },
    },
  ],
};

```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/custom-restaurant.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // または 'plugin::plugin-name.controllerName.functionName' プラグイン固有のコントローラーの場合
      config: {
        policies: [
          // 登録済みのポリシーを指定
          'policy-name',

          // カスタム設定を持つ登録済みのポリシーを指定
          { name: 'policy-name', config: {} }, 

          // ポリシーの実装を直接渡す
          (policyContext, config, { strapi }) => {
            return true;
          },
        ]
      },
    },
  ],
};
```

</TabItem>
</Tabs>

</TabItem>

</Tabs>

### ミドルウェア

[ミドルウェア](/dev-docs/backend-customization/middlewares)は、ルート設定に追加することができます：

- `./src/middlewares`に登録されているミドルウェアを指定することで、カスタム設定を渡すことなく追加することができます。  
- または、[Koaのコンテキスト](https://koajs.com/#context)（`ctx`）と`strapi`インスタンスを引数に取る関数としてミドルウェアの実装を直接宣言します。

<Tabs groupId="core-vs-custom-router">

<TabItem value="core-router" label="Core router middleware">

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/restaurant.js"

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      middlewares: [
        // 登録済みのミドルウェアを指定
        'middleware-name', 

        // カスタム設定を持つ登録済みのミドルウェアを指定
        { name: 'middleware-name', config: {} }, 

        // ミドルウェアの実装を直接渡す
        (ctx, next) => {
          return next();
        },
      ]
    }
  }
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/restaurant.ts"

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      middlewares: [
        // 登録済みのミドルウェアを指定
        'middleware-name', 

        // カスタム設定を持つ登録済みのミドルウェアを指定
        { name: 'middleware-name', config: {} }, 

        // ミドルウェアの実装を直接渡す
       

 (ctx, next) => {
          return next();
        },
      ]
    }
  }
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="custom-router" label="Custom router middleware">

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/custom-restaurant.ts"

export default  {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</TabItem>
</Tabs>

</TabItem>

</Tabs>

### パブリックルート

デフォルトでは、ルートはStrapiの認証システムによって保護されています。これは[APIトークン](/dev-docs/configurations/api-tokens)に基づいているか、[ユーザー＆パーミッションプラグイン](/user-docs/plugins/strapi-plugins#users-permissions-plugin)の使用に基づいています。

一部のシナリオでは、ルートを公開し、通常のStrapi認証システムの外部でアクセスを制御することが役立ちます。これは、ルートの`auth`設定パラメータを`false`に設定することで達成できます：

<Tabs groupId="core-vs-custom-router">

<TabItem value="core-router" label="パブリックルート付きコアルータ">

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/restaurant.js"

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      auth: false
    }
  }
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/restaurant.ts"

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      auth: false
    }
  }
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="custom-router" label="パブリックルート付きカスタムルータ">

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/routes/custom-restaurant.ts"

export default  {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'api::api-name.controllerName.functionName', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</TabItem>
</Tabs>

</TabItem>

</Tabs>


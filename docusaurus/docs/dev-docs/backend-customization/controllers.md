---
tags: 
- バックエンドのカスタマイズ
- バックエンドサーバー
- コントローラー
- createCoreController
- コアコントローラー
- ctx
- REST API 
- ルート
- sanitizeQuery関数
- strapi-utils
- validateQuery関数
---

# コントローラー

コントローラーは、クライアントが要求した[ルート](/dev-docs/backend-customization/routes)に応じてクライアントに到達する一連のメソッド、つまりアクションを含むJavaScriptファイルです。クライアントがルートを要求するたびに、アクションはビジネスロジックコードを実行し、[レスポンス](/dev-docs/backend-customization/requests-responses)を返送します。コントローラーは、モデル-ビュー-コントローラー(MVC)パターンのCを表します。

ほとんどの場合、コントローラーはプロジェクトのビジネスロジックの大部分を含むでしょう。しかし、コントローラーのロジックがますます複雑になると、[サービス](/dev-docs/backend-customization/services)を使用してコードを再利用可能な部分に整理するのが良い実践です。

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-controllers-services.png" alt="コントローラーが強調表示された簡略化されたStrapiバックエンドのダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>このダイアグラムは、リクエストがStrapiバックエンドを通過する方法の簡略化されたバージョンを表しており、コントローラーが強調表示されています。バックエンドカスタマイズの導入ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブなダイアグラム</a>が含まれています。</figcaption></em>
</figure>

## 実装

コントローラーは[生成または手動で追加](#新しいコントローラーの追加)することができます。Strapiは`createCoreController`ファクトリ関数を提供しており、これにより自動的にコアコントローラーが生成され、カスタムのものを作成したり[生成されたコントローラーを拡張または置換](#コアコントローラーの拡張)することができます。

### 新しいコントローラーの追加

新しいコントローラーは以下の方法で実装できます：

- [対話型CLIコマンド`strapi generate`](/dev-docs/cli)を使用する。
- または、JavaScriptファイルを手動で作成する：
  - APIコントローラーの場合は`./src/api/[api-name]/controllers/`（この場所は重要で、Strapiはここからコントローラーを自動的にロードします）
  - プラグインコントローラーの場合は、`./src/plugins/[plugin-name]/server/controllers/`のようなフォルダに作成しますが、`strapi-server.js`ファイルでプラグインインターフェースが適切にエクスポートされていれば、他の場所にも作成できます（[プラグインのサーバーAPIドキュメンテーション](/dev-docs/plugins/server-api)を参照）。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/controllers/restaurant.js"

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

// メソッド2: コアアクションのラッピング（コアロジックはそのまま）
  async find(ctx) {
    // ここにカスタムロジックを記述
    ctx.query = { ...ctx.query, local: 'en' }

    // デフォルトのコアアクションを呼び出す
    const { data, meta } = await super.find(ctx);

    // さらにカスタムロジックを追加
    meta.date = Date.now()

    return { data, meta };
  },

  // メソッド3: 適切なサニタイズとともにコアアクションを置き換える
  async find(ctx) {
    // validateQuery (オプション)
    // 不正なクエリパラメータまたはユーザーがアクセス権を持っていないクエリパラメータに対してエラーをスローする
    await this.validateQuery(ctx);

    // sanitizeQuery は、不正なクエリパラメータやユーザーがアクセス権を持っていないクエリパラメータを削除します
    // validateQuery を使用する場合でも、sanitizeQuery の使用を強く推奨します
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi.service('api::restaurant.restaurant').find(sanitizedQueryParams);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  }
}));
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/controllers/restaurant.ts"

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // メソッド1: 完全にカスタムアクションを作成する
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // メソッド2: コアアクションのラッピング（コアロジックはそのまま）
  async find(ctx) {
    // ここにカスタムロジックを記述
    ctx.query = { ...ctx.query, local: 'en' }

    // デフォルトのコアアクションを呼び出す
    const { data, meta } = await super.find(ctx);

    // さらにカスタムロジックを追加
    meta.date = Date.now()

    return { data, meta };
  },

  // メソッド3: 適切なサニタイズとともにコアアクションを置き換える
  async find(ctx) {
    // validateQuery (オプション)
    // 不正なクエリパラメータまたはユーザーがアクセス権を持っていないクエリパラメータに対してエラーをスローする
    await this.validateQuery(ctx); 

    // sanitizeQuery は、不正なクエリパラメータやユーザーがアクセス権を持っていないクエリパラメータを削除します
    // validateQuery を使用する場合でも、sanitizeQuery の使用を強く推奨します
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi.service('api::restaurant.restaurant').find(sanitizedQueryParams);

    // sanitizeOutput は、ユーザーがアクセス権を持っていないデータを受け取らないようにするためのものです
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  }
}));
```

</TabItem>
</Tabs>

各コントローラーのアクションは、`async` または `sync` 関数にすることができます。
すべてのアクションは、パラメータとしてコンテキストオブジェクト（`ctx`）を受け取ります。`ctx` には、[リクエストコンテキスト](/dev-docs/backend-customization/requests-responses#requests)と[レスポンスコンテキスト](/dev-docs/backend-customization/requests-responses#responses)が含まれています。

<details>
<summary>例：基本的なコントローラを呼び出す GET /hello ルート</summary>

特定の `GET /hello` [ルート](/dev-docs/backend-customization/routes)が定義され、ルーターファイルの名前（つまり `index`）がコントローラーハンドラ（つまり `index`）を呼び出すために使用されます。`GET /hello` リクエストがサーバーに送信されるたびに、Strapi は `hello.js` コントローラーの `index` アクションを呼び出し、`Hello World!` を返します：

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js "title="./src/api/hello/routes/hello.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/hello',
      handler: 'hello.index',
    }
  ]
}
```

```js "title="./src/api/hello/controllers/hello.js"

module.exports = {
  async index(ctx, next) { // called by GET /hello
    ctx.body = 'Hello World!'; // we could also send a JSON
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js "title="./src/api/hello/routes/hello.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/hello',
      handler: 'hello.index',
    }
  ]
}
```

```js title="./src/api/hello/controllers/hello.ts"

export default {
  async index(ctx, next) { // called by GET /hello
    ctx.body = 'Hello World!'; // we could also send a JSON
  },
};
```

</TabItem>

</Tabs>

</details>

:::note
新しい[コンテンツタイプ](/dev-docs/backend-customization/models#content-types)が作成されると、Strapi はプレースホルダーコードを含む一般的なコントローラを構築し、カスタマイズする準備ができます。
:::

:::tip
カスタムコントローラの高度な使用法については、バックエンドカスタマイズ例のレシピブックにある[services and controllers](/dev-docs/backend-customization/examples/services-and-controllers)のページをご覧ください。
:::

### コントローラーでのサニタイゼーションとバリデーション

:::warning
新しい `sanitizeQuery` および `validateQuery` 関数を使用して、送信されるリクエストクエリをサニタイズ（v4.8.0+）および/またはバリデート（v4.13.0+）することを強く推奨します。これにより、プライベートデータの漏洩を防ぐことができます。
:::

サニタイゼーションとは、オブジェクトが「クリーニング」されて返されることを意味します。

バリデーションとは、データが既にクリーンであるという主張がなされ、そこに存在してはならない何かが見つかった場合にエラーがスローされることを意味します。

Strapi 5では、クエリパラメータと入力データ（つまり、作成と更新のボディデータ）がバリデートされます。以下の無効な入力を含む作成および更新データリクエストは、`400 Bad Request` エラーをスローします：

- ユーザーが作成する権限を持っていない関係
- スキーマに存在しない認識されない値
- `createdAt` や `createdBy` などの書き込み不可フィールドや内部タイムスタンプ
- 関係を接続する場合を除き、`id` フィールドの設定や更新

#### コントローラーファクトリーを利用する際のサニタイズ

Strapiのファクトリー内では、サニタイズとバリデーションに使用できる以下の関数が公開されています：

| 関数名             | パラメータ                 | 説明                                                                          |
|------------------|----------------------------|--------------------------------------------------------------------------------------|
| `sanitizeQuery`  | `ctx`                      | リクエストクエリをサニタイズします                                                          |
| `sanitizeOutput` | `entity`/`entities`, `ctx` | エンティティ/エンティティはオブジェクトまたはデータの配列であるべきで、出力データをサニタイズします |
| `sanitizeInput`  | `data`, `ctx`              | 入力データをサニタイズします                                                             |
| `validateQuery`  | `ctx`                      | リクエストクエリを検証します（無効なパラメータがあるとエラーが発生します）                      |
| `validateInput`  | `data`, `ctx`              | (実験的) 入力データを検証します（無効なデータがあるとエラーが発生します）                           |

これらの関数は、モデルからサニタイズ設定を自動的に継承し、コンテンツタイプスキーマとコンテンツAPI認証戦略（ユーザー＆パーミッションプラグインやAPIトークンなど）に基づいてデータをサニタイズします。

:::warning
これらのメソッドは現在のコントローラーに関連付けられたモデルを使用するため、別のモデルからのデータをクエリする場合（つまり、「レストラン」コントローラーメソッド内で「メニュー」を検索するなど）、代わりに`@strapi/utils`ツールを使用する必要があります。たとえば、[カスタムコントローラーのサニタイズ](#sanitize-validate-custom-controllers)で説明されている`sanitize.contentAPI.query`などを使用するか、そうでなければ、クエリの結果が間違ったモデルに対してサニタイズされます。
:::

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/controllers/restaurant.js"

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  async find(ctx) {
    await this.validateQuery(ctx);
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi.service('api::restaurant.restaurant').find(sanitizedQueryParams);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  }
}));
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/controllers/restaurant.ts"

import { factories } from '@strapi/strapi';

```ts title="./src/api/restaurant/controllers/restaurant.ts"

import { sanitize, validate } from '@strapi/utils';

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  async find(ctx) {
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi.service('api::restaurant.restaurant').find(sanitizedQueryParams);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  }
}));
```

</TabItem>
</Tabs>

#### カスタムコントローラーの作成時のサニタイズとバリデーション  {#sanitize-validate-custom-controllers}

カスタムコントローラー内では、`@strapi/utils`パッケージを通じて公開される5つの主要な関数がサニタイズとバリデーションに使用できます:

| 関数名                | パラメータ         | 説明                                             |
|------------------------------|--------------------|---------------------------------------------------------|
| `sanitize.contentAPI.input`  | `data`, `schema`, `auth`      | 書き込み不可フィールド、制限された関係、プラグインによって追加された他のネストされた "visitors" を含むリクエスト入力をサニタイズします |
| `sanitize.contentAPI.output` | `data`, `schema`, `auth`      | 制限された関係、プライベートフィールド、パスワード、プラグインによって追加された他のネストされた "visitors" を含むレスポンス出力をサニタイズします  |
| `sanitize.contentAPI.query`  | `ctx.query`, `schema`, `auth` | フィルタ、ソート、フィールド、populateを含むリクエストクエリをサニタイズします  |
| `validate.contentAPI.query`  | `ctx.query`, `schema`, `auth` | フィルタ、ソート、フィールド（現在はpopulateを含まない）を含むリクエストクエリをバリデートします |
| `validate.contentAPI.input`  | `data`, `schema`, `auth` | (実験的) 書き込み不可フィールド、制限された関係、プラグインによって追加された他のネストされた "visitors" を含むリクエスト入力をバリデートします |

:::note
カスタムコントローラーの複雑さによっては、特に複数のソースからのデータを組み合わせる場合、Strapiが現在対応できない追加のサニタイズが必要になることがあります。
:::

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/controllers/restaurant.js"

const { sanitize, validate } = require('@strapi/utils');

module.exports = {
  async findCustom(ctx) {
    const contentType = strapi.contentType('api::test.test');
    await validate.contentAPI.query(ctx.query, contentType, { auth: ctx.state.auth });
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.query, contentType, { auth: ctx.state.auth });

    const documents = await strapi.documents(contentType.uid).findMany(sanitizedQueryParams);

    return await sanitize.contentAPI.output(documents, contentType, { auth: ctx.state.auth });
  }
}
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/restaurant/controllers/restaurant.ts"

import { sanitize, validate } from '@strapi/utils';

```js
export default {
  async findCustom(ctx) {
    const contentType = strapi.contentType('api::test.test');

    await validate.contentAPI.query(ctx.query, contentType, { auth: ctx.state.auth });
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.query, contentType, { auth: ctx.state.auth });

    const documents = await strapi.documents(contentType.uid).findMany(sanitizedQueryParams);

    return await sanitize.contentAPI.output(documents, contentType, { auth: ctx.state.auth });
  }
}
```

</TabItem>
</Tabs>

### コアコントローラーの拡張

各コンテンツタイプに対してデフォルトのコントローラーとアクションが作成されます。これらのデフォルトのコントローラーは、APIリクエストへのレスポンスを返すために使用されます（例：`GET /api/articles/3`にアクセスすると、"Article"コンテンツタイプのデフォルトコントローラーの`findOne`アクションが呼び出されます）。デフォルトのコントローラーは、独自のロジックを実装するためにカスタマイズすることができます。以下のコード例は、あなたが始めるのに役立つはずです。

:::tip
コアコントローラーのアクションは、[カスタムアクションを作成する](#adding-a-new-controller)ことで完全に置き換えることができます。アクションの名前を元のアクション（例：`find`、`findOne`、`create`、`update`、`delete`）と同じにします。
:::

:::tip
コアコントローラーを拡張するとき、既にコアコントローラーによって処理されるので、再度サニタイズを実装する必要はありません。可能な限り、カスタムコントローラーを作成するのではなく、コアコントローラーを拡張することを強く推奨します。
:::

<details>
<summary>コレクションタイプの例</summary>

:::tip
[バックエンドのカスタマイズ例のクックブック](/dev-docs/backend-customization/examples)では、デフォルトのコントローラーアクション（例：[`create`アクション](/dev-docs/backend-customization/examples/services-and-controllers#custom-controller)）を上書きする方法を示しています。
:::

<Tabs>
<TabItem value="find" label="`find()`">

```js
async find(ctx) {
  // some logic here
  const { data, meta } = await super.find(ctx);
  // some more logic

  return { data, meta };
}
```

</TabItem>

<TabItem value="findOne" label="findOne()">

```js
async findOne(ctx) {
  // some logic here
  const response = await super.findOne(ctx);
  // some more logic

  return response;
}
```

</TabItem>

<TabItem value="create" label="create()">

```js
async create(ctx) {
  // some logic here
  const response = await super.create(ctx);
  // some more logic

  return response;
}
```

</TabItem>

<TabItem value="update" label="update()">

```js
async update(ctx) {
  // some logic here
  const response = await super.update(ctx);
  // some more logic

  return response;
}
```

</TabItem>

<TabItem value="delete" label="delete()">

```js
async delete(ctx) {
  // some logic here
  const response = await super.delete(ctx);
  // some more logic

  return response;
}
```

</TabItem>
</Tabs>
</details>

<details>
<summary>シングルタイプの例</summary>
<Tabs>

<TabItem value="find" label="find()">

```js
async find(ctx) {
  // ここにロジックを記述
  const response = await super.find(ctx);
  // さらにロジックを記述

  return response;
}
```

</TabItem>

<TabItem value="update" label="update()">

```js
async update(ctx) {
  // ここにロジックを記述
  const response = await super.update(ctx);
  // さらにロジックを記述

  return response;
}
```

</TabItem>

<TabItem value="delete" label="delete()">

```js
async delete(ctx) {
  // ここにロジックを記述
  const response = await super.delete(ctx);
  // さらにロジックを記述

  return response;
}
```

</TabItem>
</Tabs>
</details>

## 使用法

コントローラーは宣言され、ルートにアタッチされます。ルートが呼び出されると自動的にコントローラーが呼び出されるため、通常、コントローラーを明示的に呼び出す必要はありません。ただし、[サービス](/dev-docs/backend-customization/services)はコントローラーを呼び出すことができ、その場合は次の構文を使用する必要があります：

```js
// APIコントローラーにアクセス
strapi.controller('api::api-name.controller-name');
// プラグインコントローラーにアクセス
strapi.controller('plugin::plugin-name.controller-name');
```

:::tip
利用可能なすべてのコントローラーを一覧表示するには、`yarn strapi controllers:list`を実行します。
:::

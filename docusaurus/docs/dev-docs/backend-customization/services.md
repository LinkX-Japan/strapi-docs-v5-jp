---
title: サービス
description: Strapiのサービスは、再利用可能な関数のセットで、コントローラのロジックを簡略化するのに便利です。
displayed_sidebar: devDocsSidebar
tags:
- バックエンドのカスタマイズ
- バックエンドサーバー
- コントローラ
- createCoreService 
- サービス
- REST API 
---

# サービス

サービスは再利用可能な関数のセットです。これらは特に "don’t repeat yourself" (DRY) プログラミングコンセプトを尊重し、[コントローラ](/dev-docs/backend-customization/controllers.md)のロジックを簡略化するのに役立ちます。

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-controllers-services.png" alt="サービスが強調表示されたStrapiバックエンドの簡略化されたダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>このダイアグラムは、リクエストがStrapiバックエンドを通過する簡略化されたバージョンを表しており、サービスが強調表示されています。バックエンドカスタマイズの導入ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブなダイアグラム</a>が含まれています。</figcaption></em>
</figure>

## 実装

サービスは[生成または手動で追加](#adding-a-new-service)することができます。Strapiは、コアサービスを自動的に生成し、カスタムのものを構築したり、[生成されたサービスを拡張または置き換える](#extending-core-services)ことを可能にする`createCoreService`ファクトリ関数を提供します。

### 新しいサービスの追加

新しいサービスは次の方法で実装できます:

- [インタラクティブなCLIコマンド `strapi generate`](/dev-docs/cli#strapi-generate)を使用する
- または適切なフォルダにJavaScriptファイルを手動で作成する([プロジェクト構造](/dev-docs/project-structure.md)を参照):
  - APIサービスの場合は `./src/api/[api-name]/services/`
  - [プラグインサービス](/dev-docs/plugins/server-api#services)の場合は `./src/plugins/[plugin-name]/services/`。

サービスを手動で作成するには、サービス実装（つまり、メソッドを持つオブジェクト）を返すファクトリ関数をエクスポートします。このファクトリ関数は `strapi` インスタンスを受け取ります:

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/services/restaurant.js"

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {  
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

// Method 3: コアサービスの置換
  async findOne(documentId, params = {}) {
    return strapi.documents('api::restaurant.restaurant').findOne(documentId, this.getFetchParams(params));
  }
}));
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/services/restaurant.ts"

import { factories } from '@strapi/strapi'; 

export default factories.createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: 完全にカスタムサービスを作成
  async exampleService(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: コアサービスをラップ（コアロジックをそのままにする）
  async find(...args) {  
    // デフォルトのコアコントローラーを呼び出す
    const { results, pagination } = await super.find(...args);

    // 一部のカスタムロジック
    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: コアサービスの置換
  async findOne(documentId, params = {}) {
     return strapi.documents('api::restaurant.restaurant').findOne(documentId, this.getFetchParams(params));
  }
}));
```

</TabItem>
</Tabs>

:::strapi ドキュメントサービスAPI
独自のサービスを作成するためのスタートポイントとして、[ドキュメントサービスAPI](/dev-docs/api/document-service)のドキュメンテーションにあるStrapiの組み込み関数を参照してください。
:::

<details>

<summary>カスタムメールサービスの例（Nodemailerを使用）</summary>

サービスの目的は、再利用可能な関数を保存することです。特定の目的を持つコードベースのさまざまな関数からメールを送信するための`sendNewsletter`サービスは有用でしょう。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/services/restaurant.js"


const { createCoreService } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer'); // Nodemailerのインストールが必要（npm install nodemailer）

// SMTPトランスポートを使用して再利用可能なトランスポーターオブジェクトを作成します。
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'password',
  },
});

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) => ({
  sendNewsletter(from, to, subject, text) {
    // Eメールデータの設定
    const options = {
      from,
      to,
      subject,
      text,
    };

    // メールを送信する関数のプロミスを返す。
    return transporter.sendMail(options);
  },
}));
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/services/restaurant.ts"


import { factories } from '@strapi/strapi'; 
const nodemailer = require('nodemailer'); // Nodemailerのインストールが必要（npm install nodemailer)

// SMTPトランスポートを使用して再利用可能なトランスポーターオブジェクトを作成します。
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'password',
  },
});

export default factories.createCoreService('api::restaurant.restaurant', ({ strapi }) => ({
  sendNewsletter(from, to, subject, text) {
    // Eメールデータの設定。
    const options = {
      from,
      to,
      subject,
      text,
    };

    // メールを送信する関数のプロミスを返します。
    return transporter.sendMail(options);
  },
}));
```

</TabItem>

</Tabs>

サービスは、`strapi.service('api::restaurant.restaurant').sendNewsletter(...args)`グローバル変数を通じて利用可能になりました。以下のコントローラーのように、コードベースの別の部分で使用できます。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/controllers/restaurant.js"

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // GET /hello
  async signup(ctx) {
    const { userData } = ctx.body;

    // 新規ユーザーをデータベースに保存します。
    const user = await strapi.service('plugin::users-permissions.user').add(userData);

    // サブスクリプションを確認するためのメールを送信します。
    strapi.service('api::restaurant.restaurant').sendNewsletter('welcome@mysite.com', user.email, 'Welcome', '...');

    // サーバーにレスポンスを送信します。
    ctx.send({
      ok: true,
    });
  },
}));
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/restaurant/controllers/restaurant.ts"

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // GET /hello
  async signup(ctx) {
    const { userData } = ctx.body;

    // 新規ユーザーをデータベースに保存します。
    const user = await strapi.service('plugin::users-permissions.user').add(userData);

    // サブスクリプションを確認するためのメールを送信します。
    strapi.service('api::restaurant.restaurant').sendNewsletter('welcome@mysite.com', user.email, 'Welcome', '...');

    // サーバーにレスポンスを送信します。
    ctx.send({
      ok: true,
    });
  },
}));
```

</TabItem>

</Tabs>

</details>

:::note
新しい[コンテンツタイプ](/dev-docs/backend-customization/models.md#content-types)が作成されると、Strapiはプレースホルダーコード付きの一般的なサービスを作成し、カスタマイズする準備ができています。
:::

### コアサービスの拡張

コアサービスは各コンテンツタイプごとに作成され、[コントローラー](/dev-docs/backend-customization/controllers.md)によってStrapiプロジェクト全体で再利用可能なロジックを実行するために使用できます。コアサービスは、独自のロジックを実装するためにカスタマイズできます。以下のコード例は、始めるのに役立つはずです。

:::tip
コアサービスは、[新しいサービスを作成](#adding-a-new-service)し、それをコアサービスと同じ名前（例えば、`find`、`findOne`、`create`、`update`、または`delete`）に命名することで、完全に置き換えることができます。
:::

<details>
<summary>コレクションタイプの例</summary>

<Tabs groupdId="crud-methods">

<TabItem value="find" label="find()">

```js
async find(params) {
  // ここにロジックを書く
  const { results, pagination } = await super.find(params);
  // さらにロジックを書く

  return { results, pagination };
}
```

</TabItem>

<TabItem value="find-one" label="findOne()">

```js
async findOne(documentId, params) {
  // ここにロジックを書く
  const result = await super.findOne(documentId, params);
  // さらにロジックを書く

  return result;
}
```

</TabItem>

<TabItem value="create" label="create()">

```js
async create(params) {
  // ここにロジックを書く
  const result = await super.create(params);
  // さらにロジックを書く

  return result;
}
```

</TabItem>

<TabItem value="update" label="update()">

```js
async update(documentId, params) {
  // ここにロジックを書く
  const result = await super.update(documentId, params);
  // さらにロジックを書く

  return result;
}
```

</TabItem>

<TabItem value="delete" label="delete()">

```js
async delete(documentId, params) {
  // ここにロジックを書く
  const result = await super.delete(documentId, params);
  // さらにロジックを書く

  return result;
}
```

</TabItem>
</Tabs>

</details>

<details>

<summary>単一タイプの例</summary>

<Tabs groupdId="crud-methods">

<TabItem value="find" label="find()">

```js
async find(params) {
  // ここにロジックを書く
  const document = await super.find(params);
  // さらにロジックを書く

  return document;
}
```

</TabItem>

<TabItem value="update" label="update()">

```js
async createOrUpdate({ data, ...params }) {
  // ここにロジックを書く
  const document = await super.createOrUpdate({ data, ...params });
  // さらにロジックを書く

  return document;
}
```

</TabItem>

<TabItem value="delete" label="delete()">

```js
async delete(params) {
  // ここにロジックを書く
  const document = await super.delete(params);
  // さらにロジックを書く

  return document;
}
```

</TabItem>
</Tabs>

</details>

## 使用法

サービスが作成されると、[コントローラー](/dev-docs/backend-customization/controllers.md)や他のサービスからアクセスできます。

```js
// APIサービスにアクセス
strapi.service('api::apiName.serviceName').FunctionName();
// プラグインサービスにアクセス
strapi.service('plugin::pluginName.serviceName').FunctionName();
```

上記の構文例では、`serviceName`はAPIサービスのサービスファイル名、またはプラグインサービスの`services/index.js`にサービスファイルをエクスポートするために使用される名前です。

:::tip
利用可能なすべてのサービスをリストするには、`yarn strapi services:list`を実行します。
:::

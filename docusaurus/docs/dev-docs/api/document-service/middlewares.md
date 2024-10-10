---
title: Document Serviceの振る舞いを拡張する
description: この文書では、Document Service APIのミドルウェアについて説明しています。
toc_max_heading_level: 4
displayed_sidebar: devDocsSidebar
---

# Document Service API: ミドルウェア

[Document Service API](/dev-docs/api/document-service)は、ミドルウェアのおかげでその振る舞いを拡張する能力を提供します。

Document Serviceのミドルウェアは、メソッドが実行される前と/または後にアクションを実行することを可能にします。

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-controllers-services.png" alt="コントローラーが強調表示されたシンプル化されたStrapiバックエンドのダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>このダイアグラムは、リクエストがStrapiバックエンドを通過する方法の簡略化されたバージョンを示しており、Document Serviceが強調表示されています。バックエンドのカスタマイズ紹介ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブなダイアグラム</a>が含まれています。</figcaption></em>
</figure>

## ミドルウェアの登録

構文: `strapi.documents.use(middleware)`

### パラメータ

ミドルウェアは、コンテキストと次の関数を受け取る関数です。

構文: `(context, next) => ReturnType<typeof next>`

| パラメータ | 説明                           | タイプ       |
|-----------|---------------------------------------|------------|
| `context` | ミドルウェアのコンテキスト                    | `Context`  |
| `next`    | スタック内の次のミドルウェアを呼び出す | `function` |

#### `context`

| パラメータ     | 説明                                                                          | タイプ          |
|---------------|--------------------------------------------------------------------------------------|---------------|
| `action`      | 実行中のメソッド ([利用可能なメソッドを参照](/dev-docs/api/document-service)) | `string`      |
| `params`      | メソッドのパラメータ ([利用可能なメソッドを参照](/dev-docs/api/document-service))          | `Object`      |
| `uid`         | コンテンツタイプの一意の識別子                                                       | `string`      |
| `contentType` | コンテンツタイプ                                                                         | `ContentType` |

<details>
<summary>例:</summary>

以下の例は、呼び出されたメソッドによって`context`が含む可能性があるものを示しています:

<Tabs>


<TabItem value="find-one" label="findOne">

```js
{
  uid: "api::restaurant.restaurant",
  contentType: {
    kind: "collectionType",
    collectionName: "restaurants",
    info: {
      singularName: "restaurant",
      pluralName: "restaurants",
      displayName: "restaurant"
    },
    options: {
      draftAndPublish: true
    },
    pluginOptions: {},
    attributes: {
      name: { /*...*/ },
      description: { /*...*/ },
      createdAt: { /*...*/ },
      updatedAt: { /*...*/ },
      publishedAt: { /*...*/ },
      createdBy: { /*...*/ },
      updatedBy: { /*...*/ },
      locale: { /*...*/ },
    },
    apiName: "restaurant",
    globalId: "Restaurants",
    uid: "api::restaurant.restaurant",
    modelType: "contentType",
    modelName: "restaurant",
    actions: { /*...*/ },
    lifecycles: { /*...*/ },
  },
  action: "update",
  params: {
    documentId: 'hp7hjvrbt8rcgkmabntu0aoq',
    data: { /*...*/ },
    status: "draft",
    populate: { /*...*/ },
  }
}
```

</TabItem>

<TabItem value="find-many" label="findMany">

```js
{
  uid: "api::restaurant.restaurant",
  contentType: {
    kind: "collectionType",
    collectionName: "restaurants",
    info: {
      singularName: "restaurant",
      pluralName: "restaurants",
      displayName: "restaurant"
    },
    options: {
      draftAndPublish: true
    },
    pluginOptions: {},
    attributes: {
      name: { /*...*/ },
      description: { /*...*/ },
      createdAt: { /*...*/ },
      updatedAt: { /*...*/ },
      publishedAt: { /*...*/ },
      createdBy: { /*...*/ },
      updatedBy: { /*...*/ },
      locale: { /*...*/ },
    },
    apiName: "restaurant",
    globalId: "Restaurants",
    uid: "api::restaurant.restaurant",
    modelType: "contentType",
    modelName: "restaurant",
    actions: { /*...*/ },
    lifecycles: { /*...*/ },
  },
  action: "update",
  params: {
    data: { /*...*/ },
    documentId: 'hp7hjvrbt8rcgkmabntu0aoq',
    locale: undefined,
    status: "draft"
    populate: { /*...*/ },
  }
}
```

</TabItem>

<TabItem value="delete" label="delete">

```js
{
  uid: "api::restaurant.restaurant",
  contentType: {
    kind: "collectionType",
    collectionName: "restaurants",
    info: {
      singularName: "restaurant",
      pluralName: "restaurants",
      displayName: "restaurant"
    },
    options: {
      draftAndPublish: true
    },
    pluginOptions: {},
    attributes: {
      name: { /*...*/ },
      description: { /*...*/ },
      createdAt: { /*...*/ },
      updatedAt: { /*...*/ },
      publishedAt: { /*...*/ },
      createdBy: { /*...*/ },
      updatedBy: { /*...*/ },
      locale: { /*...*/ },
    },
    apiName: "restaurant",
    globalId: "Restaurants",
    uid: "api::restaurant.restaurant",
    modelType: "contentType",
    modelName: "restaurant",
    actions: { /*...*/ },
    lifecycles: { /*...*/ },
  },
  action: "delete",
  params: {
    data: { /*...*/ },
    documentId: 'hp7hjvrbt8rcgkmabntu0aoq',
    locale: "*",
    populate: { /*...*/ },
  }
}
```

</TabItem>
</Tabs>
</details>

#### `next`

`next`は、スタック内の次のミドルウェアを呼び出し、そのレスポンスを返すパラメータなしの関数です。

**例**

```js
strapi.documents.use((context, next) => {
  return next();
});
```

### 登録する場所

一般的に、あなたはStrapiの登録フェーズ中にミドルウェアを登録するべきです。

#### ユーザー

ミドルウェアは一般的な `register()` ライフサイクルメソッドで登録する必要があります：

```js title="/src/index.js|ts"
module.exports = {
  register({ strapi }) {
    strapi.documents.use((context, next) => {
      // あなたのロジック
      return next();
    });
  },

  // bootstrap({ strapi }) {},
  // destroy({ strapi }) {},
};
```

#### プラグイン開発者

ミドルウェアはプラグインの `register()` ライフサイクルメソッドで登録する必要があります：

```js title="/(plugin-root-folder)/strapi-server.js|ts"
module.exports = {
  register({ strapi }) {
    strapi.documents.use((context, next) => {
      // あなたのロジック
      return next();
    });
  },

## ミドルウェアの実装

ミドルウェアを実装する際は、常に`next()`からのレスポンスを返すようにしてください。
これを怠ると、Strapiアプリケーションが壊れます。

### 例

```js
const applyTo = ['api::article.article'];

strapi.documents.use((context, next) => {
  // 特定のコンテンツタイプのみで実行
  if (!applyTo.includes(context.uid)) {
    return next();
  }

  // 特定のアクションのみで実行
  if (['create', 'update'].includes(context.action)) {
    context.params.data.fullName = `${context.params.data.firstName} ${context.params.data.lastName}`;
  }

  const result = await next();

  // 返す前に結果で何かをする
  return result
});
```

<br/>

:::strapi ライフサイクルフック
Document Service APIは、呼び出されるメソッドに基づいて、さまざまなデータベースライフサイクルフックをトリガーします。完全なリファレンスについては、[Document Service API: ライフサイクルフック](/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service#table)を参照してください。
:::

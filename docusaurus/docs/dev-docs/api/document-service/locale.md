---
title: Document Service APIをlocaleパラメータとともに使用する
description: StrapiのDocument Service APIを使用して、クエリでロケールバージョンを操作します。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- create()
- count()
- コンテンツの削除
- Document Service API
- discardDraft()
- findOne()
- findMany()
- findFirst()
- locale
- publish()
- update()
- コンテンツの非公開化
---

# Document Service API: `locale`パラメータの使用

デフォルトでは、[Document Service API](/dev-docs/api/document-service)はドキュメントのデフォルトのロケールバージョン（つまり、'en'、すなわち英語版）を返します（アプリケーションに別のデフォルトロケールが設定されている場合を除く、詳しくは[ユーザーガイド](/user-docs/settings/internationalization)を参照）。このページでは、特定のロケールのデータのみを取得または操作するために`locale`パラメータを使用する方法について説明します。

## `findOne()`でロケールバージョンを取得する {#find-one}

`locale`が渡されると、Document Service APIの[`findOne()`メソッド](/dev-docs/api/document-service#find-one)はそのロケールのドキュメントのバージョンを返します：

<ApiCall>

<Request>

```js
await strapi.documents('api::restaurant.restaurant').findOne({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  locale: 'fr',
});
```

</Request>

<Response>

```js {5}
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "Biscotte Restaurant",
  publishedAt: null, // ドラフトバージョン (デフォルト)
  locale: "fr", // パラメータから要求された通り
  // …
}
```

</Response>

</ApiCall>

`status`パラメータが渡されない場合、デフォルトで`draft`バージョンが返されます。

## `findFirst()`でロケールバージョンを取得する {#find-first}

Document Service APIでパラメータに一致する最初のドキュメントを[見つける](/dev-docs/api/document-service#findfirst)際に特定のロケールを返すには：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
const document = await strapi.documents('api::article.article').findFirst({
  locale: 'fr',
});
```

</Request>

<Response title="例のレスポンス">

```json
{
  "documentId": "cjld2cjxh0000qzrmn831i7rn",
  "title": "Test Article"
  // …
}
```

</Response>
</ApiCall>

`status`パラメータが渡されない場合、デフォルトで`draft`バージョンが返されます。

## `findMany()`でロケールバージョンを取得する {#find-many}

`locale`がDocument Service APIの[`findMany()`メソッド](/dev-docs/api/document-service#findmany)に渡されると、レスポンスはこのロケールが利用可能なすべてのドキュメントを返します。

`status`パラメータが渡されない場合、デフォルトで`draft`バージョンが返されます。

<ApiCall>
<Request>

```js
// デフォルトでstatus: draft
await strapi.documents('api::restaurant.restaurant').findMany({ locale: 'fr' });
```

</Request>

<Response>

```js {6}
[
  {
    documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
    name: 'Restaurant Biscotte',
    publishedAt: null,
    locale: 'fr',
    // …
  },
  // …
];
```

</Response>
</ApiCall>

<details>
<summary>説明:</summary>

以下の4つのドキュメントが各々異なるロケールを持つ場合：

- ドキュメントA：
  - en
  - `fr`
  - it
- ドキュメントB：
  - en
  - it
- ドキュメントC：
  - `fr`
- ドキュメントD：
  - `fr`
  - it

`findMany({ locale: 'fr' })`は、`‘fr’`ロケールバージョンを持つドキュメントのドラフトバージョンのみを返します。つまり、ドキュメントA、C、およびDです。

</details>

## ロケールのドキュメントを`create()`する {#create}

特定のロケールのドキュメントを作成するには、`locale`をDocument Service APIの[`create`メソッド](/dev-docs/api/document-service#create)のパラメータとして渡します：

<ApiCall>

<Request title="ドキュメントのスペイン語ドラフトロケールを作成する">

```js
await strapi.documents('api::restaurant.restaurant').create({
  locale: 'es' // 渡されなかった場合、ドラフトはデフォルトのロケールで作成されます
  data: { name: 'Restaurante B' }
})
```

</Request>

<Response>

```js
{
  documentId: "pw2s0nh5ub1zmnk0d80vgqrh",
  name: "Restaurante B",
  publishedAt: null,
  locale: "es"
  // …
}
```

</Response>

</ApiCall>

## ロケールバージョンを`update()`する {#update}

ドキュメントの特定のロケールバージョンのみを更新するには、`locale`パラメータをDocument Service APIの[`update()`メソッド](/dev-docs/api/document-service#update)に渡します：

<ApiCall>

<Request title="ドキュメントのスペイン語ロケールを更新する">

```js
await strapi.documents('api::restaurant.restaurant').update({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  locale: 'es',
  data: { name: 'Nuevo nombre del restaurante' },
});
```

</Request>

<Response>

```js {3}
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "Nuevo nombre del restaurante",
  locale: "es",
  publishedAt: null,
  // …
}
```

</Response>

</ApiCall>

## ロケールバージョンを`delete()`する {#delete}

Document Service APIの[`delete()`メソッド](/dev-docs/api/document-service#delete)で`locale`パラメータを使用して、一部のロケールのみを削除します。特定の`status`パラメータが渡されない限り、これによりドラフトと公開バージョンの両方が削除されます。

### ロケールバージョンを削除する

ドキュメントの特定のロケールバージョンを削除するには：

<Request title="ドキュメントのスペイン語ロケールを削除する">

```js
await strapi.documents('api::restaurant.restaurant').delete({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm', // documentId,
  locale: 'es',
});
```

</Request>

### すべてのロケールバージョンを削除する

`locale`パラメータは`*`ワイルドカードをサポートし、ドキュメントのすべてのロケールバージョンを削除するために使用できます：

<ApiCall>
<Request>

```js
await strapi.documents('api::restaurant.restaurant').delete({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm', // documentId,
  locale: '*',
}); // for all existing locales
```

</Request>

<Response title="例のレスポンス">

```json
{
  "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
  // 削除されたすべてのロケールバージョンが返されます
  "versions": [
    {
      "title": "Test Article"
    }
  ]
}
```

</Response>
</ApiCall>

## ロケールバージョンを`publish()`する {#publish}

Document Service APIの[`publish()` メソッド](/dev-docs/api/document-service#publish)を使用して、特定のロケールバージョンのみのドキュメントを公開するには、`locale`をパラメータとして渡します:

### ロケールバージョンの公開

特定のロケールバージョンのドキュメントを公開するには：

<ApiCall>

<Request title="ドキュメントのフレンチロケールを公開する">

```js
await strapi.documents('api::restaurant.restaurant').publish({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  locale: 'fr',
});
```

</Request>

<Response>

```js
{
  versions: [
    {
      documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
      name: 'Restaurant Biscotte',
      publishedAt: '2024-03-14T18:38:05.674Z',
      locale: 'fr',
      // …
    },
  ];
}
```

</Response>

</ApiCall>

### すべてのロケールバージョンを公開する

`locale` パラメータは `*` ワイルドカードをサポートしており、ドキュメントのすべてのロケールバージョンを公開することができます：

<ApiCall>

<Request title="ドキュメントのすべてのロケールを公開する">

```js
await strapi
  .documents('api::restaurant.restaurant')
  .publish({ documentId: 'a1b2c3d4e5f6g7h8i9j0klm', locale: '*' });
```

</Request>

<Response>

```js
{
  "versions": [
    {
      "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
      "publishedAt": "2024-03-14T18:45:21.857Z",
      "locale": "en"
      // …
    },
    {
      "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
      "publishedAt": "2024-03-14T18:45:21.857Z",
      "locale": "es"
      // …
    },
    {
      "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
      "publishedAt": "2024-03-14T18:45:21.857Z",
      "locale": "fr"
      // …
    }
  ]
}
```

</Response>

</ApiCall>

## `unpublish()` ロケールバージョン {#unpublish}

Document Service APIの[`unpublish()` メソッド](/dev-docs/api/document-service#unpublish)を使用して、特定のロケールバージョンのみのドキュメントを非公開にするには、`locale`をパラメータとして渡します：

### ロケールバージョンの非公開

特定のロケールバージョンのドキュメントを非公開にするには、`locale`を`unpublish()`のパラメータとして渡します：

<ApiCall>

<Request title="ドキュメントのフレンチロケールバージョンを非公開にする">

```js
await strapi
  .documents('api::restaurant.restaurant')
  .unpublish({ documentId: 'a1b2c3d4e5f6g7h8i9j0klm', locale: 'fr' });
```

</Request>

<Response>

```js
{
  versions: 1;
}
```

</Response>

</ApiCall>

### すべてのロケールバージョンを非公開にする

`locale` パラメータは `*` ワイルドカードをサポートしており、ドキュメントのすべてのロケールバージョンを非公開にすることができます：

<ApiCall>

<Request title="ドキュメントのすべてのロケールバージョンを非公開にする">

```js
await strapi
  .documents('api::restaurant.restaurant')
  .unpublish({ documentId: 'a1b2c3d4e5f6g7h8i9j0klm', locale: '*' });
```

</Request>

<Response>

```js
{
  versions: 3;
}
```

</Response>

</ApiCall>

<ApiCall noSideBySide>
<Request title="リクエスト例">

```js
const document = await strapi.documents('api::article.article').unpublish({
  documentId: 'cjld2cjxh0000qzrmn831i7rn',
  fields: ['title'],
});
```

</Request>

<Response title="レスポンス例">

```json
{
  "documentId": "cjld2cjxh0000qzrmn831i7rn",
  // 未公開のロケールバージョンすべてが返されます
  "versions": [
    {
      "title": "テスト記事"
    }
  ]
}
```

</Response>
</ApiCall>

## ロケールバージョンの`discardDraft()` {#discard-draft}

ドキュメントの一部のロケールバージョンのみドラフトデータを破棄するには、Document Service APIの[`discardDraft()` メソッド](/dev-docs/api/document-service#discarddraft)に`locale`をパラメータとして渡します：

### ロケールバージョンのドラフトを破棄する

ドキュメントの特定のロケールバージョンのドラフトデータを破棄し、そのロケールの公開バージョンからのデータで上書きするには、`locale`を`discardDraft()`のパラメータとして渡します：

<ApiCall>

<Request title="ドキュメントのフランス語ロケールバージョンのドラフトを破棄する">

```js
await strapi
  .documents('api::restaurant.restaurant')
  .discardDraft({ documentId: 'a1b2c3d4e5f6g7h8i9j0klm', locale: 'fr' });
```

</Request>

<Response>

```js
{
  versions: [
    {
      documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
      name: 'Restaurant Biscotte',
      publishedAt: null,
      locale: 'fr',
      // …
    },
  ];
}
```

</Response>

</ApiCall>

### すべてのロケールバージョンのドラフトを破棄する

`locale`パラメータは`*`ワイルドカードをサポートしており、ドキュメントのすべてのロケールバージョンのドラフトデータを破棄し、それらを公開バージョンからのデータで置き換えることができます：

<ApiCall>

<Request title="ドキュメントのすべてのロケールバージョンのドラフトを破棄する">

```js
await strapi
  .documents('api::restaurant.restaurant')
  .discardDraft({ documentId: 'a1b2c3d4e5f6g7h8i9j0klm', locale: '*' });
```

</Request>

<Response>

```js
{
  versions: [
    {
      documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
      name: 'Biscotte Restaurant',
      publishedAt: null,
      locale: 'en',
      // …
    },
    {
      documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
      name: 'Restaurant Biscotte',
      publishedAt: null,
      locale: 'fr',
      // …
    },
    {
      documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
      name: 'Biscotte Restaurante',
      publishedAt: null,
      locale: 'es',
      // …
    },
  ];
}
```

</Response>

</ApiCall>

## ロケールのドキュメントを`count()`する {#count}

特定のロケールのドキュメントを数えるには、`locale`を他のパラメータとともにDocument Service APIの[`count()` メソッド](/dev-docs/api/document-service#count)に渡します。

`status`パラメータが渡されない場合、ドラフトのドキュメントが数えられます（これは、公開されたドキュメントもドラフトバージョンとして数えられるため、ロケールで利用可能なドキュメントの合計です）：

```js
// フランス語の公開ドキュメントの数を数える
strapi.documents('api::restaurant.restaurant').count({ locale: 'fr' });
```

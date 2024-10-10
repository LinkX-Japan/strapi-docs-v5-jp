---
title: ドキュメントサービスAPI
description: ドキュメントサービスAPIは、バックエンドサーバーやプラグインからコンテンツと対話するための推奨方法です。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- Documents
- documentId
- Document Service API
---

# ドキュメントサービスAPI

ドキュメントサービスAPIは**クエリエンジンAPI** <Annotation>2つの異なるバックエンドAPIがあなたのコンテンツと対話することを可能にします：<ul><li>[クエリエンジンAPI](/dev-docs/api/query-engine)は、データベースへの無制限のアクセスを提供する下位層で、しかし、コンポーネントやダイナミックゾーンなどの複雑なStrapiデータ構造を認識していません。</li><li>ドキュメントサービスAPIはクエリエンジンの上に構築されており、バックエンドサーバーのカスタマイズやプラグインの開発を行っている間、コンテンツと対話するための推奨方法です。</li></ul>[コンテンツAPI](/dev-docs/api/content-api)と[バックエンドのカスタマイズ](/dev-docs/backend-customization)の紹介で詳細を見つけることができます。</Annotation>の上に構築され、**ドキュメント**<DocumentDefinition />のCRUD（[作成](#create)、[取得](#findone)、[更新](#update)、[削除](#delete)）操作を実行するために使用されます。

ドキュメントサービスAPIを使用すると、ドキュメントの[カウント](#count)も行うことができ、コンテンツタイプに[Draft & Publish](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合は、ドキュメントの[公開](#publish)/[非公開](#unpublish)や[ドラフトの破棄](#discarddraft)など、Strapi特有の機能を実行することもできます。

:::strapi Entity Service APIはStrapi 5で廃止されました
ドキュメントサービスAPIは、Strapi v4で使用されていたEntity Service APIを置き換えることを意図しています（[Strapi v4のドキュメンテーションを参照](https://docs-v4.strapi.io/dev-docs/api/entity-service)）。Entity Service APIからドキュメントサービスAPIへの移行に関する追加情報は、関連する[移行リファレンス](/dev-docs/migration/v4-to-v5/additional-resources/from-entity-service-to-document-service)で見つけることができます。
:::

:::note
関連性もまた、REST APIと同様に、ドキュメントサービスAPIを通じて接続、切断、設定することができます（例は[REST API関連性ドキュメンテーション](/dev-docs/api/rest/relations)を参照）。
:::

## `findOne()`

渡された`documentId`とパラメータに一致するドキュメントを見つけます。

構文: `findOne(parameters: Params) => Document`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId` | ドキュメントのID | | `ID` |
| [`locale`](/dev-docs/api/document-service/locale#find-one)|  作成するドキュメントのロケール | デフォルトのロケール | 文字列または`undefined` |
| [`status`](/dev-docs/api/document-service/status#find-one) | _コンテンツタイプに対して[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効化されている場合_:<br/>公開ステータス、次のいずれか可能: <ul><li>`'published'` は公開済みのドキュメントのみを検索</li><li>`'draft'` は下書きのドキュメントのみを検索</li></ul> | `'draft'` | `'published'`または`'draft'` |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-findone-queries)   | 返却する[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-findone-queries)   | すべてのフィールド<br/>(デフォルトでは取得されないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)する。 | `null` | オブジェクト |

### 例

`documentId`のみが他のパラメータなしで渡される場合、`findOne()`はデフォルトのロケールでドキュメントの下書きバージョンを返します。

<ApiCall>

<Request title="documentIdを渡してドキュメントを検索する">

```js
await strapi.documents('api:restaurant.restaurant').findOne({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm'
})
```

</Request>

<Response>

```js {4,5}
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "Biscotte Restaurant",
  publishedAt: null, // 下書きバージョン (デフォルト)
  locale: "en", // デフォルトのロケール
  // …
}
```

</Response>

</ApiCall>

## `findFirst()`

パラメータに一致する最初のドキュメントを見つけます。

構文:  `findFirst(parameters: Params) => Document`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| [`locale`](/dev-docs/api/document-service/locale#find-first) |  検索するドキュメントのロケール | デフォルトのロケール | 文字列または`undefined` |
| [`status`](/dev-docs/api/document-service/status#find-first) | _コンテンツタイプに対して[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効化されている場合_:<br/>公開ステータス、次のいずれか可能: <ul><li>`'published'` は公開済みのドキュメントのみを検索</li><li>`'draft'` は下書きのドキュメントのみを検索</li></ul> | `'draft'` | `'published'`または`'draft'` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-findfirst-queries)   | 返却する[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-findfirst-queries)   | すべてのフィールド<br/>(デフォルトでは取得されないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)する。 | `null` | オブジェクト |

### 例

#### 一般的な例

デフォルトでは、`findFirst()`は、渡された一意の識別子（コレクションタイプIDまたはシングルタイプID）の最初のドキュメントの下書きバージョンをデフォルトのロケールで返します：

<ApiCall>

<Request title="最初のドキュメントを見つける">

```js
await strapi.documents('api::restaurant.restaurant').findFirst()
```

</Request>

<Response>

```js
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "Restaurant Biscotte",
  publishedAt: null,
  locale: "en"
  // …
}
```

</Response>

</ApiCall>

#### パラメーターに一致する最初のドキュメントを見つける

`findFirst()`にいくつかのパラメーターを渡すと、それらに一致する最初のドキュメントが返されます。

`locale`や`status`のパラメーターが渡されない場合、結果はデフォルトのロケールの下書きバージョンを返します：

<ApiCall>

<Request title="定義されたフィルターに一致する最初のドキュメントを見つける">

```js
await strapi.documents('api::restaurant.restaurant').findFirst(
  {
    filters: {
      name: {
        $startsWith: "Pizzeria"
      }
    }
  }
)
```

</Request>

<Response>

```js
{
  documentId: "j9k8l7m6n5o4p3q2r1s0tuv",
  name: "Pizzeria Arrivederci",
  publishedAt: null,
  locale: "en"
  // …
}
```

</Response>

</ApiCall>

## `findMany()`

パラメーターに一致するドキュメントを見つけます。

構文：`findMany(parameters: Params) => Document[]`

### パラメーター

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| [`locale`](/dev-docs/api/document-service/locale#find-many) |  検索するドキュメントのロケール。 | デフォルトのロケール | 文字列または`undefined` |
| [`status`](/dev-docs/api/document-service/status#find-many) | _コンテンツタイプに対して[Draft & Publish](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合_：<br/>公開ステータスは次のいずれかです：<ul><li>`'published'` は公開済みのドキュメントのみを見つける</li><li>`'draft'` は下書きのドキュメントのみを見つける</li></ul> | `'draft'` | `'published'`または`'draft'` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルター](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-findmany-queries)   | 返す[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-findmany-queries)   | すべてのフィールド<br/>(デフォルトでは生成されないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)します。 | `null` | オブジェクト |
| [`pagination`](/dev-docs/api/document-service/sort-pagination#pagination) | 結果を[ページネーション](/dev-docs/api/document-service/sort-pagination#pagination)する |
| [`sort`](/dev-docs/api/document-service/sort-pagination#sort) | 結果を[ソート](/dev-docs/api/document-service/sort-pagination#sort)する | | | 

### 例

#### 一般的な例

パラメーターが渡されない場合、`findMany()`は各ドキュメントの下書きバージョンをデフォルトのロケールで返します：

<ApiCall>

<Request title="特定のフィルターに一致するドキュメントを見つける">

```js
await strapi.documents('api::restaurant.restaurant').findMany()
```

</Request>

<Response>

```js {5,6}
[
  {
    documentId: "a1b2c3d4e5f6g7h8i9j0klm",
    name: "Biscotte Restaurant",
    publishedAt: null, // ドラフトバージョン（デフォルト）
    locale: "en" // デフォルトのロケール
    // …
  },
  {
    documentId: "j9k8l7m6n5o4p3q2r1s0tuv",
    name: "Pizzeria Arrivederci",
    publishedAt: null,
    locale: "en"
    // …
  },
]
```

</Response>

</ApiCall>

#### パラメータに一致するドキュメントを見つける

使用可能なフィルタは、ドキュメントサービスAPIリファレンスの[フィルタ](/dev-docs/api/document-service/filters)ページで詳細に説明されています。

`locale`や`status`パラメータが渡されない場合、結果はデフォルトのロケールのドラフトバージョンを返します：

<ApiCall>

<Request title="特定のフィルタに一致するドキュメントを見つける">

```js
await strapi.documents('api::restaurant.restaurant').findMany(
  {
    filters: {  
      name: {
        $startsWith: 'Pizzeria'
      }
    }
  }
)
```

</Request>

<Response>

```js
[
  {
    documentId: "j9k8l7m6n5o4p3q2r1s0tuv",
    name: "Pizzeria Arrivederci",
    locale: "en", // デフォルトのロケール
    publishedAt: null, // ドラフトバージョン (デフォルト)
    // …
  }, 
  // …
]
```

</Response>

</ApiCall>

<!-- TODO: v5 GA後に完成させる -->
<!-- #### デフォルト（英語）にフォールバックするすべてのドキュメントの「fr」バージョンを見つける

```js
await documents('api:restaurant.restaurant').findMany({ locale: 'fr', fallbackLocales: ['en'] } );
``` -->

<!-- TODO: v5 GA後に完成させる -->
<!-- #### 1つまたは複数のドキュメントの兄弟ロケールを見つける

```js
await documents('api:restaurant.restaurant').findMany({ locale: 'fr', populateLocales: ['en', 'it'] } );
// このケースのレスポンスフォーマットのオプション 
{
  data: {
		title: { "Wonderful" }
  },
  localizations: [
    { enLocaleData },
    { itLocaleData }
  ]
}


await documents('api:restaurant.restaurant').findMany({ locale: ['en', 'it'] } );
// このケースのレスポンスフォーマットのオプション 
{
  data: {
		title: {
			"en": "Wonderful",
			"it": "Bellissimo"
		}
  },
}
```

</Request> -->

## `create()`

ドラフトのドキュメントを作成し、それを返します。

`data`オブジェクトに作成するコンテンツのフィールドを渡します。

構文：`create(parameters: Params) => Document`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| [`locale`](/dev-docs/api/document-service/locale#create) | 作成するドキュメントのロケール。 | デフォルトのロケール | 文字列または `undefined` |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-create-queries)   | 返す[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-create-queries)   | すべてのフィールド<br/>(デフォルトでは入力されないものを除く)  | オブジェクト |
| [`status`](/dev-docs/api/document-service/status#create) | _コンテンツタイプに[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合_：<br/>ドキュメントを作成する際に自動的に下書きバージョンを`'published'`に設定できます  | -| `'published'` |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)します。 | `null` | オブジェクト |

### 例

`locale`パラメータが指定されていない場合、`create()`はデフォルトのロケールのドキュメントの下書きバージョンを作成します：

<ApiCall>

<Request title="新しい 'Restaurant B' ドキュメントを作成">

```js
await strapi.documents('api::restaurant.restaurant').create({
  data: {
    name: 'Restaurant B'
  }
})
```

</Request>

<Response>

```js
{
  documentId: "ln1gkzs6ojl9d707xn6v86mw",
  name: "Restaurant B",
  publishedAt: null,
  locale: "en",
}
```

</Response>
</ApiCall>

:::tip
コンテンツタイプに[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)機能が有効になっている場合、ドキュメントを作成する際に自動的に公開することができます（[`status`ドキュメンテーション](/dev-docs/api/document-service/status#create)を参照してください）。
:::

## `update()`

ドキュメントのバージョンを更新し、それらを返します。

構文: `update(parameters: Params) => Promise<Document>`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId` | ドキュメントのID | | `ID` |
| [`locale`](/dev-docs/api/document-service/locale#update) | 更新するドキュメントのロケール。 | デフォルトのロケール | 文字列または `null` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-update-queries)   | 返す[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-update-queries)   | すべてのフィールド<br/>(デフォルトでは入力されないものを除く)  | オブジェクト |
| [`status`](/dev-docs/api/document-service/status#update) | _コンテンツタイプに[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合_：<br/>ドキュメントを更新する際に自動的に下書きバージョンを`'published'`に設定できます  | - | `'published'` |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)します。 | `null` | オブジェクト |

:::tip
公開されたバージョンは読み取り専用なので、文書の公開バージョンを技術的に更新することはできません。
文書を更新し、新しいバージョンをすぐに公開するには、次の方法があります:

- ドラフトバージョンを `update()` で更新し、それを `publish()` で[公開する](#publish)。
- または、`update()` に渡される他のパラメータと一緒に `status: 'published'` を直接追加します（[`status` のドキュメンテーション](/dev-docs/api/document-service/status#update)を参照）。

:::

### 例

`locale` パラメータが渡されない場合、`update()` はデフォルトのロケールの文書を更新します:

<ApiCall>

<Request>

```js
await strapi.documents('api::restaurant.restaurant').update({ 
    documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
    data: { name: "New restaurant name" }
})
```

</Request>

<Response>

```js {3}
{
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  name: "New restaurant name",
  locale: "en",
  publishedAt: null, // draft
  // …
}
```

</Response>

</ApiCall>

<!-- ! not working -->
<!-- #### Update many document locales

```js
// Updates the default locale by default
await documents('api:restaurant.restaurant').update(documentId, {locale: ['es', 'en'], data: {name: "updatedName" }}
``` -->

## `delete()`

文書、またはその特定のロケールを削除します。

構文: `delete(parameters: Params): Promise<{ documentId: ID, entries: Number }>`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId`| 文書のID | | `ID`|
| [`locale`](/dev-docs/api/document-service/locale#delete) | 削除する文書のロケールバージョン。 | `null`<br/>(デフォルトのロケールのみを削除) | 文字列、`'*'`、または `null` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-delete-queries)   | 戻り値に含める[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-delete-queries)   | 全てのフィールド<br/>(デフォルトではないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[補完](/dev-docs/api/document-service/populate)する。 | `null` | オブジェクト |

### 例

`locale` パラメータが渡されない場合、`delete()` は文書のデフォルトのロケールバージョンのみを削除します。これにより、ドラフトバージョンと公開バージョンの両方が削除されます:

<Request>

```js
await strapi.documents('api::restaurant.restaurant').delete({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm', // documentId,
})
```

</Request>


<Response>

```js {6}
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  entries: [
    {
      "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
      "name": "Biscotte Restaurant",
      "publishedAt": "2024-03-14T18:30:48.870Z",
      "locale": "en"
      // …
    }
  ]
}
```

</Response>

<!-- ! not working -->
<!-- #### Delete a document with filters

To delete documents matching parameters, pass these parameters to `delete()`. -->

`locale`パラメータが渡されない場合、デフォルトのロケールバージョンのみが削除されます：

<Request>

```js
await strapi.documents('api::restaurant.restaurant').delete(
  { filters: { name: { $startsWith: 'Pizzeria' }}}
)
```

</Request> -->

## `publish()`

ドキュメントの1つまたは複数のロケールを公開します。

このメソッドは、コンテンツタイプで[ドラフト＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合のみ利用可能です。

構文: `publish(parameters: Params): Promise<{ documentId: ID, entries: Number }>`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId`| ドキュメントのID | | `ID`|
| [`locale`](/dev-docs/api/document-service/locale#publish) | 公開するドキュメントのロケール。 | デフォルトのロケールのみ | String, `'*'`, または `null` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-publish-queries)   | 戻り値として選択する[フィールド](/dev-docs/api/document-service/fields#selecting-fields-with-publish-queries)   | すべてのフィールド<br/>(デフォルトで人口が多いものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 結果を追加フィールドで[補完](/dev-docs/api/document-service/populate)します。 | `null` | オブジェクト |

### 例

`locale`パラメータが渡されない場合、`publish()`はドキュメントのデフォルトのロケールバージョンのみを公開します：

<ApiCall>

<Request>

```js
await strapi.documents('api::restaurant.restaurant').publish({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
});
```

</Request>

<Response>

```js {6}
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  entries: [
    {
      "documentId": "a1b2c3d4e5f6g7h8i9j0klm",
      "name": "Biscotte Restaurant",
      "publishedAt": "2024-03-14T18:30:48.870Z",
      "locale": "en"
      // …
    }
  ]
}
```

</Response>

</ApiCall>

<!-- ! 動作しない -->
<!-- #### フィルタを使用してドキュメントのロケールを公開する

```js
// タイトルが"Ready to publish"のロケールのみを公開します
await strapi.documents('api::restaurant.restaurant').publish(
  { filters: { title: 'Ready to publish' }}
);
``` -->

## `unpublish()`

ドキュメントの1つまたはすべてのロケールバージョンを非公開にし、非公開にしたロケールバージョンの数を返します。

このメソッドは、コンテンツタイプで[ドラフト＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合のみ利用可能です。

構文: `unpublish(parameters: Params): Promise<{ documentId: ID, entries: Number }>`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId`| ドキュメントのID | | `ID`|
| [`locale`](/dev-docs/api/document-service/locale#unpublish) | 非公開にするドキュメントのロケール。 | デフォルトのロケールのみ | 文字列、`'*'`、または `null` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-unpublish-queries)   | 戻す[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-unpublish-queries)   | すべてのフィールド<br/>(デフォルトでポピュレートされないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[ポピュレート](/dev-docs/api/document-service/populate)する。 | `null` | オブジェクト |

### 例

`locale`パラメータが渡されない場合、`unpublish()`はドキュメントのデフォルトロケールバージョンのみを非公開にします：

<ApiCall>

<Request>

```js
await strapi.documents('api::restaurant.restaurant').unpublish({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm' 
});
```

</Request>

<Response>

```js
{
  documentId: "lviw819d5htwvga8s3kovdij",
  entries: [
    {
      documentId: "lviw819d5htwvga8s3kovdij",
      name: "Biscotte Restaurant",
      publishedAt: null,
      locale: "en"
      // …
    }
  ]
}
```

</Response>

</ApiCall>

## `discardDraft()`

ドラフトデータを破棄し、公開されたバージョンで上書きします。

このメソッドは、コンテンツタイプに[ドラフト&公開](/user-docs/content-manager/saving-and-publishing-content)が有効化されている場合のみ利用可能です。

構文: `discardDraft(parameters: Params): Promise<{ documentId: ID, entries: Number }>`

### パラメータ

| パラメータ | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| `documentId`| ドキュメントのID | | `ID`|
| [`locale`](/dev-docs/api/document-service/locale#discard-draft) | 破棄するドキュメントのロケール。 | デフォルトのロケールのみ。 | 文字列、`'*'`、または `null` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | オブジェクト |
| [`fields`](/dev-docs/api/document-service/fields#selecting-fields-with-discarddraft-queries)   | 戻す[フィールドを選択](/dev-docs/api/document-service/fields#selecting-fields-with-discarddraft-queries)   | すべてのフィールド<br/>(デフォルトでポピュレートされないものを除く)  | オブジェクト |
| [`populate`](/dev-docs/api/document-service/populate) | 追加のフィールドで結果を[ポピュレート](/dev-docs/api/document-service/populate)する。 | `null` | オブジェクト |

### 例

`locale`パラメータが渡されない場合、`discardDraft()`はデフォルトのロケールのドラフトデータを破棄し、公開されたバージョンで上書きします：

<ApiCall>

<Request title="ドキュメントのデフォルトロケールのドラフトを破棄する">

```js
strapi.documents.discardDraft({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm', 
});
```

</Request>

<Response>

```js
{
  documentId: "lviw819d5htwvga8s3kovdij",
  entries: [
    {
      documentId: "lviw819d5htwvga8s3kovdij",
      name: "Biscotte Restaurant",
      publishedAt: null,
      locale: "en"
      // …
    }
  ]
}
```

</Response>

</ApiCall>

## `count()`

指定したパラメーターに一致するドキュメントの数を数えます。

構文: `count(parameters: Params) => number`

### パラメーター

| パラメーター | 説明 | デフォルト | タイプ |
|-----------|-------------|---------|------|
| [`locale`](/dev-docs/api/document-service/locale#count) | 数えるドキュメントのロケール | デフォルトのロケール | String または `null` |
| [`status`](/dev-docs/api/document-service/status#count) | _コンテンツタイプに対して[Draft & Publish](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合_:<br/>出版状態は次のいずれかになります：<ul><li>`'published'` は公開済みのドキュメントのみを見つけます </li><li>`'draft'` はドラフトのドキュメントを見つけます（すべてのドキュメントを返します）</li></ul> | `'draft'` | `'published'` または `'draft'` |
| [`filters`](/dev-docs/api/document-service/filters) | 使用する[フィルタ](/dev-docs/api/document-service/filters) | `null` | Object |

:::note
公開されたドキュメントは必ずドラフト版も持っているため、公開されたドキュメントはドラフト版があるとしてもカウントされます。

これは、`status: 'draft'` パラメーターでカウントすると、他のパラメーターに一致するドキュメントの総数が返されるということを意味します。たとえ一部のドキュメントがすでに公開されており、Content Managerで「ドラフト」または「修正済み」として表示されなくなっても、すでに公開されたドキュメントがカウントされることを防ぐ方法は現在ありません。
:::

### 例

#### 一般的な例

パラメーターが何も渡されない場合、`count()` メソッドはデフォルトのロケールのドキュメントの総数を返します:
<ApiCall>

<Request>

```js
await strapi.documents('api::restaurant.restaurant').count()
```

</Request>

</ApiCall>

#### 公開されたドキュメントの数を数える

公開されたドキュメントのみを数えるには、`status: 'published'` を他のパラメーターと一緒に `count()` メソッドに渡します。

`locale` パラメーターが渡されない場合、デフォルトのロケールのドキュメントが数えられます。

<Request>

```js
strapi.documents('api::restaurant.restaurant').count({ status: 'published' })
```

</Request>

#### フィルターを使用してドキュメントの数を数える

任意の[フィルタ](/dev-docs/api/document-service/filters)を `count()` メソッドに渡すことができます。

`locale` と `status` パラメーターが渡されない場合、ドラフトのドキュメント（公開されたドキュメントもドラフト版としてカウントされるので、ロケールの利用可能なドキュメントの総数）がデフォルトのロケールのみで数えられます：

```js
/**
 * ドラフトのドキュメント数を数える（ステータスが省略された場合のデフォルト） 
 * 英語（デフォルトのロケール） 
 * 名前が 'Pizzeria' で始まる
 */
strapi.documents('api::restaurant.restaurant').count({ filters: { name: { $startsWith: "Pizzeria" }}})`
```
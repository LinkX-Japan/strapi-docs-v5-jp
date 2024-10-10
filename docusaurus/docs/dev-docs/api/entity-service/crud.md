---
title: CRUD操作
description: StrapiのEntity Service APIを使用して、コンテンツに対してCRUD（作成、読み取り、更新、削除）操作を行います。
displayed_sidebar: devDocsSidebar
unlisted: true
---
import ManagingRelations from '/docs/snippets/managing-relations.md'
import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# Entity Service APIを用いたCRUD操作

<ESdeprecated />

[Entity Service API](/dev-docs/api/entity-service)は[Query Engine API](/dev-docs/api/query-engine)の上に構築され、エンティティに対してCRUD操作を行います。


このAPIで関数呼び出しに使用される`uid`パラメータは、次の形式で構築された`string`です：`[category]::[content-type]` ここで、`category`は`admin`、`plugin`、または`api`のいずれかです。

例：
- Strapi管理パネルのユーザーを取得するための正しい`uid`は`admin::user`です。
- アップロードプラグインの可能な`uid`は`plugin::upload.file`となるかもしれません。
- ユーザー定義のカスタムコンテンツタイプの`uid`は`api::[content-type]`の構文に従うため、`article`というコンテンツタイプが存在する場合、それは`api::article.article`によって参照されます。

:::tip
ターミナルで[`strapi content-types:list`](/dev-docs/cli#strapi-content-types-list)コマンドを実行して、特定のStrapiインスタンスのすべての可能なコンテンツタイプの`uid`を表示します。
:::

## findOne()

パラメータに一致する最初のエントリを見つけます。

構文: `findOne(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

### パラメータ

| パラメータ  | 説明 | タイプ |
| ---------- | --------------- | --------------- |
| `fields`   | 返す属性 | `String[]`  |
| `populate` | [populate](/dev-docs/api/entity-service/populate)する関係、コンポーネント、およびダイナミックゾーン | [`PopulateParameter`](/dev-docs/api/entity-service/populate) |

### 例

```js
const entry = await strapi.entityService.findOne('api::article.article', 1, {
  fields: ['title', 'description'],
  populate: { category: true },
});
```

## findMany()

パラメータに一致するエントリを見つけます。

構文: `findMany(uid: string, parameters: Params)` ⇒ `Entry[]`

### パラメータ

| パラメータ   | 説明 | タイプ   |
| ----------- | ------ | -------------- |
| `fields`  | 返す属性   | `String[]`  |
| `filters` | 使用する[フィルタ](/dev-docs/api/entity-service/filter)   | [`FiltersParameters`](/dev-docs/api/entity-service/filter)             |
| `start`   | スキップするエントリの数 (参照 [ページネーション](/dev-docs/api/entity-service/order-pagination#pagination))   | `Number`  |
| `limit`   | 返すエントリの数 (参照 [ページネーション](/dev-docs/api/entity-service/order-pagination#pagination)) | `Number`  |
| `sort`   | [順序](/dev-docs/api/entity-service/order-pagination)定義  | [`OrderByParameter`](/dev-docs/api/entity-service/order-pagination) |
| `populate`  | [populate](/dev-docs/api/entity-service/populate)する関係、コンポーネント、ダイナミックゾーン  | [`PopulateParameter`](/dev-docs/api/entity-service/populate)         |
| `publicationState` | 公開状態、次のいずれかになります:<ul><li>`live` は公開済みのエントリのみを返します</li><li>`preview` はドラフトエントリと公開エントリの両方を返します（デフォルト）</li></ul>   | `PublicationStateParameter`  |

### 例

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  fields: ['title', 'description'],
  filters: { title: 'Hello World' },
  sort: { createdAt: 'DESC' },
  populate: { category: true },
});
```

<br/>

:::tip
ドラフトエントリのみを取得するには、`preview`公開状態と`publishedAt`フィールドを組み合わせて使用します:

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  publicationState: 'preview',
  filters: {
    publishedAt: {
      $null: true,
    },
  },
});

:::

## create()

1つのエントリを作成し、それを返します

構文: `create(uid: string, parameters: Params)` ⇒ `Entry`

### パラメータ

| パラメータ   | 説明 | タイプ |
| ---------- | ----------- | ---------- |
| `fields`   | 返す属性 | `String[]`  |
| `populate` | [populate](/dev-docs/api/entity-service/populate)する関係、コンポーネント、ダイナミックゾーン | [`PopulateParameter`](/dev-docs/api/entity-service/populate) |
| `data`     | 入力データ  | `Object` |

<ManagingRelations components={props.components} />

### 例

```js
const entry = await strapi.entityService.create('api::article.article', {
  data: {
    title: 'My Article',
  },
});
```

## update()

1つのエントリを更新し、それを返します。

:::note
`update()`は部分的な更新のみを行うため、含まれていない既存のフィールドは置き換えられません。
:::

構文: `update(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

<ManagingRelations components={props.components} />

### パラメータ

| パラメータ   | 説明 | タイプ |
| ---------- | ------------- | ---------- |
| `fields`   | 返す属性 | `String[]`  |
| `populate` | [populate](/dev-docs/api/entity-service/populate)する関係、コンポーネント、ダイナミックゾーン | [`PopulateParameter`](/dev-docs/api/entity-service/populate) |
| `data`     | 入力データ  | `object`  |

### 例

```js
const entry = await strapi.entityService.update('api::article.article', 1, {
  data: {
    title: 'xxx',
  },
});
```

## delete()

エントリーを1つ削除し、それを返します。

構文：`delete(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

### パラメータ

| パラメータ  | 説明 | タイプ |
| ---------- | --------- | -------- |
| `fields`   | 返す属性 | `String[]`  |
| `populate` | [populate](/dev-docs/api/entity-service/populate)する関係、コンポーネント、およびダイナミックゾーン | [`PopulateParameter`](/dev-docs/api/entity-service/populate) |

### 例

```js
const entry = await strapi.entityService.delete('api::article.article', 1);
```

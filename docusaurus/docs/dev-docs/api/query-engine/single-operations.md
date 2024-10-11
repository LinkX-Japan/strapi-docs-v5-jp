---
unlisted: true
title: 単一のオペレーション
description: StrapiのQuery Engine APIを使用して、単一のエントリに対する操作を行います。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- create()
- コンテンツの削除
- findOne()
- findMany()
- findWithCount()
- Query Engine API
- update()
---

import ManagingRelations from '/docs/snippets/managing-relations.md'
import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# Query Engine APIによる単一のオペレーション

<ConsiderDocumentService />

## findOne()

:::note
 [Document Serviceの`findOne()`](/dev-docs/api/document-service#findone) メソッドがあなたのユースケースをカバーできない場合のみ、Query Engineの`findOne()`メソッドを使用してください。
:::
パラメータに一致する最初のエントリを見つけます。

構文: `findOne(parameters) ⇒ Entry`

### パラメータ

| パラメータ  | タイプ   | 説明   |
| ---------- | -------------- | --------- |
| `select`   | 文字列、または文字列の配列 | 返す[属性](/dev-docs/backend-customization/models#model-attributes) |
| `where`    | [`WhereParameter`](/dev-docs/api/query-engine/filtering/) | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/)   |
| `offset`   | 整数   | スキップするエントリの数   |
| `orderBy`  | [`OrderByParameter`](/dev-docs/api/query-engine/order-pagination/) | [順序](/dev-docs/api/query-engine/order-pagination/)の定義 |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/) | [populate](/dev-docs/api/query-engine/populating/)する関係 |

### 例

```js
const entry = await strapi.db.query('api::blog.article').findOne({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  populate: { category: true },
});
```

## findMany()

:::note
 [Document Serviceの`findMany()`](/dev-docs/api/document-service#findmany) メソッドがあなたのユースケースをカバーできない場合のみ、Query Engineの`findMany()`メソッドを使用してください。
:::

パラメータに一致するエントリを見つけます。

構文: `findMany(parameters) ⇒ Entry[]`

### パラメータ

| パラメータ | タイプ                           | 説明                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | 文字列、または文字列の配列 | 返す[属性](/dev-docs/backend-customization/models#model-attributes) |
| `where`    | [`WhereParameter`](/dev-docs/api/query-engine/filtering/)  | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/) |
| `limit`   | 整数  | 返すエントリの数  |
| `offset`   | 整数  | スキップするエントリの数 |
| `orderBy`  | [`OrderByParameter`](/dev-docs/api/query-engine/order-pagination/) | [順序](/dev-docs/api/query-engine/order-pagination/)の定義 |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/)      | [populate](/dev-docs/api/query-engine/populating/)する関係 |

### 例

```js
const entries = await strapi.db.query('api::blog.article').findMany({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  orderBy: { publishedAt: 'DESC' },
  populate: { category: true },
});
```

## findWithCount()

パラメータに一致するエントリを検索し、その数を数えます。

構文: `findWithCount(parameters) => [Entry[], number]`

### パラメータ

| パラメータ | タイプ                           | 説明                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | 文字列、または文字列の配列 | 返すべき[属性](/dev-docs/backend-customization/models#model-attributes) |
| `where`    | [`WhereParameter`](/dev-docs/api/query-engine/filtering/)          | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/) |
| `limit`     | 整数    | 返すエントリの数    |
| `offset`   | 整数  | スキップするエントリの数  |
| `orderBy`  | [`OrderByParameter`](/dev-docs/api/query-engine/order-pagination/) | [順序](/dev-docs/api/query-engine/order-pagination/)定義 |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/)      | [populate](/dev-docs/api/query-engine/populating/)する関連 |

### 例

```js
const [entries, count] = await strapi.db.query('api::blog.article').findWithCount({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  orderBy: { title: 'DESC' },
  populate: { category: true },
});
```

## create()

:::note
[Document Serviceの `create()` メソッド](/dev-docs/api/document-service#create)でカバーできない場合にのみ、Query Engineの `create()` メソッドを使用してください。
:::

一つのエントリを作成し、それを返します。

構文: `create(parameters) => Entry`

### パラメータ

| パラメータ | タイプ                           | 説明                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | 文字列、または文字列の配列 | 返すべき[属性](/dev-docs/backend-customization/models#model-attributes) |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/)  | [populate](/dev-docs/api/query-engine/populating/)する関連 |
| `data`  | オブジェクト   | 入力データ  |

### 例

```js
const entry = await strapi.db.query('api::blog.article').create({
  data: {
    title: 'My Article',
  },
});
```

<ManagingRelations components={props.components} />

## update()

:::note
[Document Serviceの `update()` メソッド](/dev-docs/api/document-service#update)でカバーできない場合にのみ、Query Engineの `update()` メソッドを使用してください。
:::

一つのエントリを更新し、それを返します。

構文: `update(parameters) => Entry`

### パラメータ

| パラメータ | タイプ                           | 説明                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, または文字列の配列 | 返すべき[属性](/dev-docs/backend-customization/models#model-attributes) |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/)      | [populate](/dev-docs/api/query-engine/populating/)する関係 |
| `where`    | [`WhereParameter`](/dev-docs/api/query-engine/filtering/)          | 使用する[フィルター](/dev-docs/api/query-engine/filtering/)  |
| `data`  | オブジェクト     | 入力データ   |

### 例

```js
const entry = await strapi.db.query('api::blog.article').update({
  where: { id: 1 },
  data: {
    title: 'xxx',
  },
});
```

<ManagingRelations components={props.components} />

## delete()

:::note
 [Document Service `delete()`](/dev-docs/api/document-service#delete) メソッドがあなたのユースケースをカバーできない場合にのみ、Query Engineの`delete()`メソッドを使用してください。
:::

1つのエントリを削除し、それを返します。

構文: `delete(parameters) => Entry`

### パラメータ

| パラメータ | タイプ                           | 説明                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, または文字列の配列 | 返すべき[属性](/dev-docs/backend-customization/models#model-attributes) |
| `populate` | [`PopulateParameter`](/dev-docs/api/query-engine/populating/)      | [populate](/dev-docs/api/query-engine/populating/)する関係 |
| `where`    | [`WhereParameter`](/dev-docs/api/query-engine/filtering/)          | 使用する[フィルター](/dev-docs/api/query-engine/filtering/)  |

### 例

```js
const entry = await strapi.db.query('api::blog.article').delete({
  where: { id: 1 },
});
```

---
unlisted: true
title: 一括操作
description: StrapiのクエリエンジンAPIを使用して、複数のエントリに対する操作を行います。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- createMany()
- count()
- 内容の削除
- クエリエンジンAPI
- updateMany()
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# クエリエンジンAPIを使用した一括操作

<ConsiderDocumentService />

:::caution
パフォーマンスの問題を避けるため、リレーションに対する一括操作は許可されていません。
:::

## createMany()

複数のエントリを作成します。

構文: `createMany(parameters) => { count: number, ids: id[] }`

### パラメータ

| パラメータ | タイプ             | 説明         |
| --------- | ---------------- | ------------------- |
| `data`    | オブジェクトの配列 | 入力データの配列 |

:::caution
* MySQLは最後に挿入されたidを含む1つのidの配列のみを返し、リスト全体は返しません。
* Strapi v4.9.0以前では、`createMany()`は`count`のみを返します。 
:::

### 例

```js
await strapi.db.query("api::blog.article").createMany({
  data: [
    {
      title: "ABCD",
    },
    {
      title: "EFGH",
    },
  ],
});

// { count: 2 , ids: [1,2]}
```

## updateMany()

パラメータに一致する複数のエントリを更新します。

構文: `updateMany(parameters) => { count: number }`

### パラメータ

| パラメータ | タイプ                                                      | 説明                                             |
| --------- | --------------------------------------------------------- | ------------------------------------------------------- |
| `where`   | [`WhereParameter`](/dev-docs/api/query-engine/filtering/) | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/) |
| `data`    | オブジェクト                                                    | 入力データ                                              |

### 例

```js
await strapi.db.query("api::shop.article").updateMany({
  where: {
    price: 20,
  },
  data: {
    price: 18,
  },
});

// { count: 42 }
```

## deleteMany()

パラメータに一致する複数のエントリを削除します。

構文: `deleteMany(parameters) => { count: number }`

### パラメータ

| パラメータ | タイプ                                                      | 説明                                             |
| --------- | --------------------------------------------------------- | ------------------------------------------------------- |
| `where`   | [`WhereParameter`](/dev-docs/api/query-engine/filtering/) | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/) |

### 例

```js
await strapi.db.query("api::blog.article").deleteMany({
  where: {
    title: {
      $startsWith: "v3",
    },
  },
});

// { count: 42 }
```

## 集計

### count()

パラメータに一致するエントリを数えます。

構文: `count(parameters) => number`

#### パラメータ

| パラメータ | タイプ                                                      | 説明                                             |
| --------- | --------------------------------------------------------- | ------------------------------------------------------- |
| `where`   | [`WhereParameter`](/dev-docs/api/query-engine/filtering/) | 使用する[フィルタ](/dev-docs/api/query-engine/filtering/) |

```js
const count = await strapi.db.query("api::blog.article").count({
  where: {
    title: {
      $startsWith: "v3",
    },
  },
});

// 12
```

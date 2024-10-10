---
unlisted: true
title: クエリエンジンAPIを使用したフィルタリング
description: StrapiのクエリエンジンAPIを使用して、クエリ結果をフィルタリングする方法を説明します。
displayed_sidebar: devDocsSidebar
tags:
- API
- コンテンツAPI
- フィルタ
- 論理演算子
- クエリエンジンAPI
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# クエリエンジンAPIを使用したフィルタリング

<ConsiderDocumentService />

[クエリエンジンAPI](/dev-docs/api/query-engine/) では、[findMany()](/dev-docs/api/query-engine/single-operations#findmany) メソッドを使用して見つかった結果をフィルタリングすることができます。

結果は、`where` パラメーターでフィルタリングされ、このパラメーターは[論理演算子](#logical-operators)および[属性演算子](#attribute-operators)を受け入れます。すべての演算子には `$` が付けられる必要があります。

## 論理演算子

### `$and`

すべてのネストされた条件が `true` である必要があります。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $and: [
      {
        title: 'Hello World',
      },
      {
        createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
      },
    ],
  },
});
```

オブジェクトにネストされた条件を渡すと、暗黙的に `$and` が使用されます。

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: 'Hello World',
    createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
  },
});
```

### `$or`

1つまたは複数のネストされた条件が `true` である必要があります。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $or: [
      {
        title: 'Hello World',
      },
      {
        createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
      },
    ],
  },
});
```

### `$not`

ネストされた条件を否定します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $not: {
      title: 'Hello World',
    },
  },
});
```

:::note
`$not` は以下の方法で使用できます:

- 論理演算子として（例: `where: { $not: { // 条件… }}`）
- [属性演算子](#not-2)として（例: `where: { attribute-name: $not: { … } }`）
:::

:::tip
`$and`、`$or`、`$not` 演算子は、他の `$and`、`$or`、`$not` 演算子の内部にネストできます。
:::

## 属性演算子

:::caution
これらの演算子を使用すると、データベースの実装によって結果が異なる場合があります。比較はStrapiではなく、データベースによって処理されるためです。
:::

### `$not`

ネストされた条件を否定します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $not: {
        $contains: 'Hello World',
      },
    },
  },
});
```

### `$eq`

属性が入力値と等しいことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $eq: 'Hello World',
    },
  },
});
```

`$eq` は省略可能です:

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: 'Hello World',
  },
});
```

### `$eqi`

属性が入力値と等しいことを確認します（大文字小文字を区別しない）。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $eqi: 'HELLO World',
    },
  },
});
```

### `$ne`

属性が入力値と等しくないことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $ne: 'ABCD',
    },
  },
});
```

### `$nei`

属性が入力値と等しくないことを確認します（大文字小文字を区別しない）。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $nei: 'abcd',
    },
  },
});
```

### `$in`

属性が入力リストに含まれていることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $in: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

配列を渡す場合、`$in` は省略可能です:

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: ['Hello', 'Hola', 'Bonjour'],
  },
});
```

### `$notIn`

属性が入力リストに含まれていないことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notIn: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

### `$lt`

属性が入力値より小さいことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $lt: 10,
    },
  },
});
```

### `$lte`

属性が入力値以下であることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $lte: 10,
    },
  },
});
```

### `$gt`

属性が入力値より大きいことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $gt: 5,
    },
  },
});
```

### `$gte`

属性が入力値以上であることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $gte: 5,
    },
  },
});
```

### `$between`

属性が2つの入力値の間にあることを確認します。境界値を含みます（例: `$between[1, 3]` は `1` と `3` も返します）。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $between: [1, 20],
    },
  },
});
```

### `$contains`

属性が入力値を含んでいることを確認します（大文字小文字を区別）。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $contains: 'Hello',
    },
  },
});
```

### `$notContains`

属性が入力値を含んでいないことを確認します（大文字小文字を区別）。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notContains: 'Hello',
    },
  },
});
```

### `$containsi`

属性が入力値を含んでいることを確認します。`$containsi` は大文字小文字を区別しませんが、[$contains](#contains) は区別します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $containsi: 'hello',
    },
  },
});
```

### `$notContainsi`

属性が入力値を含んでいないことを確認します。`$notContainsi` は大文字小文字を区別しませんが、[$notContains](

#notcontains) は区別します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notContainsi: 'hello',
    },
  },
});
```

### `$startsWith`

属性が入力値で始まることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $startsWith: 'ABCD',
    },
  },
});
```

### `$endsWith`

属性が入力値で終わることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $endsWith: 'ABCD',
    },
  },
});
```

### `$null`

属性が `null` であることを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $null: true,
    },
  },
});
```

### `$notNull`

属性が `null` でないことを確認します。

**例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notNull: true,
    },
  },
});
```

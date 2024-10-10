---
title: Document Service APIでのフィルターの使用
description: このドキュメントでは、Document Service APIで利用可能なフィルターについて説明します。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- Document Service API
- filters
- logical operators
---

# Document Service API: フィルター

[Document Service API](/dev-docs/api/document-service)は、結果をフィルタリングする機能を提供します。

以下の演算子が利用可能です：

| 演算子                          | 説明                                      |
| -------------------------------- | ---------------------------------------- |
| [`$eq`](#eq)                     | 等しい                                    |
| [`$eqi`](#eqi)                   | 等しい（大文字・小文字を区別しない）         |
| [`$ne`](#ne)                     | 等しくない                                |
| [`$nei`](#nei)                   | 等しくない（大文字・小文字を区別しない）     |
| [`$lt`](#lt)                     | より小さい                                |
| [`$lte`](#lte)                   | 以下                                      |
| [`$gt`](#gt)                     | より大きい                                |
| [`$gte`](#gte)                   | 以上                                      |
| [`$in`](#in)                     | 配列に含まれる                            |
| [`$notIn`](#notin)               | 配列に含まれない                          |
| [`$contains`](#contains)         | 含む                                      |
| [`$notContains`](#notcontains)   | 含まない                                  |
| [`$containsi`](#containsi)       | 含む（大文字・小文字を区別しない）           |
| [`$notContainsi`](#notcontainsi) | 含まない（大文字・小文字を区別しない）       |
| [`$null`](#null)                 | nullである                                |
| [`$notNull`](#notnull)           | nullでない                                |
| [`$between`](#between)           | ～の間である                              |
| [`$startsWith`](#startswith)     | ～で始まる                                |
| [`$startsWithi`](#startswithi)   | ～で始まる（大文字・小文字を区別しない）     |
| [`$endsWith`](#endswith)         | ～で終わる                                |
| [`$endsWithi`](#endswithi)       | ～で終わる（大文字・小文字を区別しない）     |
| [`$or`](#or)                     | フィルタを"or"式で結合する                 |
| [`$and`](#and)                   | フィルタを"and"式で結合する                |
| [`$not`](#not)                   | フィルタを"not"式で結合する                |

## 属性演算子

### `$not`

ネストされた条件を否定します。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $not: {
        $contains: 'Hello World',
      },
    },
  },
});
```

### `$eq`

属性が入力値と等しい。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $eq: 'Hello World',
    },
  },
});
```

`$eq`は省略可能です：

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: 'Hello World',
  },
});
```

### `$eqi`

属性が入力値と等しい（大文字小文字を区別しない）。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $eqi: 'HELLO World',
    },
  },
});
```

### `$ne`

属性が入力値と等しくない。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $ne: 'ABCD',
    },
  },
});
```

### `$nei`

属性が入力値と等しくない（大文字小文字を区別しない）。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $nei: 'abcd',
    },
  },
});
```

### `$in`

属性が入力リストに含まれている。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $in: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

値の配列を渡す場合、`$in`は省略可能です：

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: ['Hello', 'Hola', 'Bonjour'],
  },
});
```

### `$notIn`

属性が入力リストに含まれていない。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $notIn: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

### `$lt`

属性が入力値より小さい。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    rating: {
      $lt: 10,
    },
  },
});
```

### `$lte`

属性が入力値以下。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    rating: {
      $lte: 10,
    },
  },
});
```

### `$gt`

属性が入力値より大きい。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    rating: {
      $gt: 5,
    },
  },
});
```

### `$gte`

属性が入力値以上。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    rating: {
      $gte: 5,
    },
  },
});
```

### `$between`

属性が2つの入力値の間にある、境界を含む（例えば、`$between[1, 3]`は`1`と`3`も返します）。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    rating: {
      $between: [1, 20],
    },
  },
});
```

### `$contains`

属性が入力値を含む（大文字小文字を区別）。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $contains: 'Hello',
    },
  },
});
```

### `$notContains`

属性は入力値を含まない（大文字と小文字を区別します）。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $notContains: 'Hello',
    },
  },
});
```

### `$containsi`

属性が入力値を含む。`$containsi`は大文字と小文字を区別しませんが、[$contains](#contains)は区別します。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $containsi: 'hello',
    },
  },
});
```

### `$notContainsi`

属性は入力値を含まない。`$notContainsi`は大文字と小文字を区別しませんが、[$notContains](#notcontains)は区別します。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $notContainsi: 'hello',
    },
  },
});
```

### `$startsWith`

属性が入力値で始まる。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $startsWith: 'ABCD',
    },
  },
});
```

### `$endsWith`

属性が入力値で終わる。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $endsWith: 'ABCD',
    },
  },
});
```

### `$null`

属性が`null`である。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $null: true,
    },
  },
});
```

### `$notNull`

属性が`null`でない。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: {
      $notNull: true,
    },
  },
});
```

## 論理演算子

### `$and`

すべてのネストされた条件が`true`でなければなりません。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
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

ネストされた条件を持つオブジェクトを渡すときは、暗黙的に`$and`が使用されます：

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    title: 'Hello World',
    createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
  },
});
```

### `$or`

1つまたは複数のネストされた条件が`true`である必要があります。

**例**

```js
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
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
const entries = await strapi.documents('api::article.article').findMany({
  filters: {
    $not: {
      title: 'Hello World',
    },
  },
});
```

:::note
`$not`は次のように使用できます：

- 論理演算子（例：`filters: { $not: { // conditions… }}`）
- [属性演算子](#not)（例：`filters: { attribute-name: $not: { … } }`）。
:::

:::tip
`$and`、`$or`、`$not`の演算子は、別の`$and`、`$or`、または`$not`演算子の中にネストすることができます。
:::

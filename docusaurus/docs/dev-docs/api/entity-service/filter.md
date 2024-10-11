---
title: エンティティサービスAPIを使用したフィルタリング
description: StrapiのエンティティサービスAPIを使用して、クエリ結果をフィルタリングする方法を説明します。
displayed_sidebar: devDocsSidebar
unlisted: true
---

import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# エンティティサービスAPIを使用したフィルタリング

<ESdeprecated />

[エンティティサービスAPI](/dev-docs/api/entity-service) では、[findMany()](/dev-docs/api/entity-service/crud#findmany) メソッドを使用して見つかった結果をフィルタリングすることができます。

結果は、`filters` パラメーターでフィルタリングされ、このパラメーターは[論理演算子](#logical-operators)および[属性演算子](#attribute-operators)を受け入れます。すべての演算子には `$` が付けられる必要があります。

## 論理演算子

### `$and`

すべてのネストされた条件が `true` である必要があります。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
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

オブジェクトにネストされた条件を渡すと、暗黙的に `$and` が使用されます。

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: 'Hello World',
    createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
  },
});
```

### `$or`

1つまたは複数のネストされた条件が `true` である必要があります。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    $not: {
      title: 'Hello World',
    },
  },
});
```

:::note
`$not` は以下の方法で使用できます:

- 論理演算子として（例: `filters: { $not: { // 条件… }}`）
- [属性演算子](#not-2)として（例: `filters: { attribute-name: $not: { … } }`）
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
const entries = await strapi.entityService.findMany('api::article.article', {
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

属性が入力値と等しいことを確認します。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $eq: 'Hello World',
    },
  },
});
```

`$eq` は省略可能です:

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: 'Hello World',
  },
});
```

### `$eqi`

属性が入力値と等しいことを確認します（大文字小文字を区別しない）。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $in: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

配列を渡す場合、`$in` は省略可能です:

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: ['Hello', 'Hola', 'Bonjour'],
  },
});
```

### `$notIn`

属性が入力リストに含まれていないことを確認します。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $containsi: 'hello',
    },
  },
});
```

### `$notContainsi`

属性が入力値を含んでいないことを確認します。`$notContainsi` は大文字小文字を区別しませんが、[$notContains](#notcontains) は区別します。

**例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $notNull: true,
    },
  },
});
```

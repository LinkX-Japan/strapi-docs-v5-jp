---
title: Entity Service APIを使用した並べ替えとページネーション
description: StrapiのEntity Service APIを使用してクエリ結果を並べ替え、ページネーションします。
displayed_sidebar: devDocsSidebar
---

import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# Entity Service APIを使用した並べ替えとページネーション

<ESdeprecated />

[Entity Service API](/dev-docs/api/entity-service)は、[findMany()](/dev-docs/api/entity-service/crud#findmany)メソッドで見つかった結果を[並べ替え](#ordering)および[ページネーション](#pagination)する機能を提供します。

## 並べ替え

Entity Service APIで返された結果を並べ替えるには、`sort`パラメータを使用します。結果は、[単一](#single)または[複数](#multiple)の属性に基づいて並べ替えることができ、[関連順序](#relational-ordering)の使用も可能です。

### 単一

単一のフィールドで結果を並べ替えるには、以下のいずれかの方法で`sort`パラメータに渡します:

- デフォルトの昇順で並べ替えるための`string`
- フィールド名と順序（つまり、昇順の場合は`'asc'`、降順の場合は`'desc'`）を定義するための`object`

```js
strapi.entityService.findMany('api::article.article', {
  sort: 'id',
});

// single with direction
strapi.entityService.findMany('api::article.article', {
  sort: { id: 'desc' },
});
```

### 複数

複数のフィールドで結果を並べ替えるには、以下のいずれかの方法で`sort`パラメータにフィールドを配列として渡します:

- デフォルトの昇順で複数のフィールドを並べ替えるための文字列の配列
- フィールド名と順序（つまり、昇順の場合は`'asc'`、降順の場合は`'desc'`）を定義するためのオブジェクトの配列

```js
strapi.entityService.findMany('api::article.article', {
  sort: ['publishDate', 'name'],
});

// multiple with direction
strapi.entityService.findMany('api::article.article', {
  sort: [{ title: 'asc' }, { publishedAt: 'desc' }],
});
```

### 関連順序

フィールドは、関連フィールドに基づいて並べ替えることもできます：

```js
strapi.entityService.findMany('api::article.article', {
  sort: {
    author: {
      name: 'asc',
    },
  },
});
```

## ページネーション

Entity Service APIで返された結果をページネーションするには、`start`と`limit`パラメータを使用できます：

```js
strapi.entityService.findMany('api::article.article', {
  start: 10,
  limit: 15,
});
```

代わりに、`page`と`pageSize`パラメータを使用することもできます：

```js
strapi.entityService.findMany('api::article.article', {
  page: 1,
  pageSize: 15,
});
```

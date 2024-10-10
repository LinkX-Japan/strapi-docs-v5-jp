---
unlisted: true
title: クエリエンジンAPIを用いた並べ替えとページネーション
description: StrapiのクエリエンジンAPIを使って、クエリの結果を並べ替え、ページネーションします。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- sort
- pagination
- Query Engine API
---

import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# クエリエンジンAPIでの並べ替えとページネーション

<ConsiderDocumentService />

[クエリエンジンAPI](/dev-docs/api/query-engine)は、結果を[並べ替え](#ordering)および[ページネーション](#pagination)する機能を提供します。

## 並べ替え

クエリエンジンで返される結果を並べ替えるには、`orderBy`パラメーターを使用します。結果は、[単一](#single)または[複数](#multiple)の属性に基づいて並べ替えることができ、[関連性のある並べ替え](#relational-ordering)も使用できます。

### 単一

```js
strapi.db.query('api::article.article').findMany({
  orderBy: 'id',
});

// 単一の並べ替え方向
strapi.db.query('api::article.article').findMany({
  orderBy: { id: 'asc' },
});
```

### 複数

```js
strapi.db.query('api::article.article').findMany({
  orderBy: ['id', 'name'],
});

// 複数の並べ替え方向
strapi.db.query('api::article.article').findMany({
  orderBy: [{ title: 'asc' }, { publishedAt: 'desc' }],
});
```

### 関連性のある並べ替え

```js
strapi.db.query('api::article.article').findMany({
  orderBy: {
    author: {
      name: 'asc',
    },
  },
});
```

## ページネーション

クエリエンジンAPIで返される結果をページネーションするには、`offset`と`limit`パラメーターを使用します：

```js
strapi.db.query('api::article.article').findMany({
  offset: 15, 
  limit: 10,
});
```

---
title: Document Service APIを利用したソートとページネーション
description: StrapiのDocument Service APIを使用してクエリ結果をソートし、ページネートする
displayed_sidebar: devDocsSidebar
tags:
- API 
- Content API 
- Document Service API 
- sort
- pagination
---

# Document Service API: 結果のソートとページネーション

[Document Service API](/dev-docs/api/document-service)は、クエリ結果のソートとページネーションを行う機能を提供します。

## ソート

Document Service APIによって返される結果をソートするには、クエリに`sort`パラメーターを含めてください。

### 単一フィールドでのソート

単一のフィールドに基づいて結果をソートするには：

<ApiCall noSideBySide>
<Request title="リクエスト例">

```js
const documents = await strapi.documents("api::article.article").findMany({
  sort: "title:asc",
});
```

</Request>

<Response title="レスポンス例">

```json
[
  {
    "documentId": "cjld2cjxh0000qzrmn831i7rn",
    "title": "Test Article",
    "slug": "test-article",
    "body": "Test 1"
    // ...
  },
  {
    "documentId": "cjld2cjxh0001qzrm5q1j5q7m",
    "title": "Test Article 2",
    "slug": "test-article-2",
    "body": "Test 2"
    // ...
  }
  // ...
]
```

</Response>
</ApiCall>

### 複数フィールドでのソート

複数のフィールドでソートするには、それらすべてを配列で渡します：

<ApiCall noSideBySide>
<Request title="リクエスト例">

```js
const documents = await strapi.documents("api::article.article").findMany({
  sort: [{ title: "asc" }, { slug: "desc" }],
});
```

</Request>

<Response title="レスポンス例">

```json
[
  {
    "documentId": "cjld2cjxh0000qzrmn831i7rn",
    "title": "Test Article",
    "slug": "test-article",
    "body": "Test 1"
    // ...
  },
  {
    "documentId": "cjld2cjxh0001qzrm5q1j5q7m",
    "title": "Test Article 2",
    "slug": "test-article-2",
    "body": "Test 2"
    // ...
  }
  // ...
]
```

</Response>
</ApiCall>

## ページネーション

結果をページネーションするには、`limit`と`start`パラメーターを渡します：

<ApiCall noSideBySide>
<Request title="リクエスト例">

```js
const documents = await strapi.documents("api::article.article").findMany({
  limit: 10,
  start: 0,
});
```

</Request>

<Response title="レスポンス例">

```json
[
  {
    "documentId": "cjld2cjxh0000qzrmn831i7rn",
    "title": "Test Article",
    "slug": "test-article",
    "body": "Test 1"
    // ...
  },
  {
    "documentId": "cjld2cjxh0001qzrm5q1j5q7m",
    "title": "Test Article 2",
    "slug": "test-article-2",
    "body": "Test 2"
    // ...
  }
  // ... (8 more)
]
```

</Response>
</ApiCall>

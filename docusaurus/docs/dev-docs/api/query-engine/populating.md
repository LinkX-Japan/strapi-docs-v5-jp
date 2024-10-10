---
unlisted: true
title: クエリエンジンAPIを使ったポピュレート
description: StrapiのクエリエンジンAPIを使って、コンテンツを問い合わせる際に関連付けをポピュレートします。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- populate
- findMany()
- Query Engine API
---

import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# クエリエンジンAPIを使ったポピュレート

<ConsiderDocumentService />

関連付けとコンポーネントは、それらをポピュレートするための統一されたAPIを持っています。

すべてのルートレベルの関連付けをポピュレートするには、`populate: true`を使用します：

```js
strapi.db.query('api::article.article').findMany({
  populate: true,
});
```

ポピュレートするデータを選択するには、属性名の配列を渡します：

```js
strapi.db.query('api::article.article').findMany({
  populate: ['componentA', 'relationA'],
});
```

より高度な使用法のために、オブジェクトを渡すこともできます：

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    componentB: true,
    dynamiczoneA: true,
    relation: someLogic || true,
  },
});
```

複雑なポピュレートは、`where`フィルターを適用してネストされた関連付けを選択またはポピュレートすることで実現できます：

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    relationA: {
      where: {
        name: {
          $contains: 'Strapi',
        },
      },
    },

    repeatableComponent: {
      select: ['someAttributeName'],
      orderBy: ['someAttributeName'],
      populate: {
        componentRelationA: true,
      },
    },

    dynamiczoneA: true,
  },
});
```

ポリモーフィックなデータ構造（ダイナミックゾーン、ポリモーフィックな関連付けなど）を扱う場合、ポピュレートの粒度をより細かくするためにポピュレートフラグメントを使用することが可能です。

```js
strapi.db.query('api::article.article').findMany('api::article.article', {
  populate: {
    dynamicZone: {
      on: {
        'components.foo': {
          select: ['title'],
          where: { title: { $contains: 'strapi' } },
        },
        'components.bar': {
          select: ['name'],
        },
      },
    },

    morphAuthor: {
      on: {
        'plugin::users-permissions.user': {
          select: ['username'],
        },
        'api::author.author': {
          select: ['name'],
        },
      },
    },
  },
});
```

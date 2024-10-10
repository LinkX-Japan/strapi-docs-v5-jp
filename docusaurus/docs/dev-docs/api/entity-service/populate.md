---
title: エンティティサービスAPIを使用したポピュレート
description: StrapiのエンティティサービスAPIを使用して、クエリに関係をポピュレートします。
displayed_sidebar: devDocsSidebar
unlisted: true
---

import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# エンティティサービスAPIを使用したポピュレート

<ESdeprecated />

[エンティティサービスAPI](/dev-docs/api/entity-service)は、デフォルトでは関係、コンポーネント、ダイナミックゾーンをポピュレートしません。つまり、`populate`パラメータを使用しないエンティティサービスAPIクエリは、関係、コンポーネント、ダイナミックゾーンに関する情報を返しません。

## 基本的なポピュレート

すべてのルートレベルの関係をポピュレートするには、`populate: '*'`を使用します：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: '*',
});
```

配列の属性名を渡すことで、さまざまなコンポーネントまたは関係フィールドをポピュレートします：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: ['componentA', 'relationA'],
});
```

## 高度なポピュレート

より高度なポピュレートのために、オブジェクトを渡すことができます：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: {
    relationA: true,
    repeatableComponent: {
      fields: ['fieldA'],
      filters: {},
      sort: 'fieldA:asc',
      populate: {
        relationB: true,
      },
    },
  },
});
```

[`filters`パラメータ](/dev-docs/api/entity-service/filter)を使用して、ネストされた関係やコンポーネントを選択またはポピュレートすることで、複雑なポピュレートを実現できます：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: {
    relationA: {
      filters: {
        name: {
          $contains: 'Strapi',
        },
      },
    },

    repeatableComponent: {
      fields: ['someAttributeName'],
      sort: ['someAttributeName'],
      populate: {
        componentRelationA: true,
      },
    },
  },
});
```

## フラグメントのポピュレート

ポリモーフィックなデータ構造（ダイナミックゾーン、ポリモーフィックな関係など）を扱う場合、ポピュレートの戦略により細かい粒度を持つために、ポピュレートフラグメントを使用することができます。

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: {
    dynamicZone: {
      on: {
        'components.foo': {
          fields: ['title'],
          filters: { title: { $contains: 'strapi' } },
        },
        'components.bar': {
          fields: ['name'],
        },
      },
    },

    morphAuthor: {
      on: {
        'plugin::users-permissions.user': {
          fields: ['username'],
        },
        'api::author.author': {
          fields: ['name'],
        },
      },
    },
  },
});
```

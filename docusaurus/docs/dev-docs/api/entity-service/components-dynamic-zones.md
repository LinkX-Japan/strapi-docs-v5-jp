---
title: コンポーネントとダイナミックゾーン
description: Strapiのエンティティサービスを使用して、コンポーネントとダイナミックゾーンを作成、更新します。
displayed_sidebar: devDocsSidebar
unlisted: true
---

import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# Entity Service APIを使用したコンポーネントとダイナミックゾーンの作成

<ESdeprecated />

[Entity Service](/dev-docs/api/entity-service)は、[コンポーネント](/dev-docs/backend-customization/models#components)と[ダイナミックゾーン](/dev-docs/backend-customization/models#dynamic-zones)のロジックを処理する層です。Entity Service APIを使用すると、エントリの作成や更新時に、コンポーネントとダイナミックゾーンを[作成](#creation)および[更新](#update)することができます。

## 作成

Entity Service APIを使用してエントリを作成する際に、[コンポーネント](/dev-docs/backend-customization/models#components)を作成することができます：

```js
strapi.entityService.create('api::article.article', {
  data: {
    myComponent: {
      foo: 'bar',
    },
  },
});
```

Entity Service APIを使用してエントリを作成する際に、[ダイナミックゾーン](/dev-docs/backend-customization/models#dynamic-zones)（すなわち、コンポーネントのリスト）を作成することができます：

```js
strapi.entityService.create('api::article.article', {
  data: {
    myDynamicZone: [
      {
        __component: 'compo.type',
        foo: 'bar',
      },
      {
        __component: 'compo.type2',
        foo: 'bar',
      },
    ],
  },
});
```

## 更新

Entity Service APIを使用してエントリを更新する際に、[コンポーネント](/dev-docs/backend-customization/models#components)を更新することができます。コンポーネントの`id`が指定されていれば、そのコンポーネントが更新されます。指定されていなければ、古いものが削除され、新しいものが作成されます：

```js
strapi.entityService.update('api::article.article', 1, {
  data: {
    myComponent: {
      id: 1, // id: 1のコンポーネントを更新します（指定されていなければ、削除して新しいものを作成します）
      foo: 'bar',
    },
  },
});
```

Entity Service APIを使用してエントリを更新する際に、[ダイナミックゾーン](/dev-docs/backend-customization/models#dynamic-zones)（すなわち、コンポーネントのリスト）を更新することができます。コンポーネントの`id`が指定されていれば、そのコンポーネントが更新されます。指定されていなければ、古いものが削除され、新しいものが作成されます：

```js
strapi.entityService.update('api::article.article', 1, {
  data: {
    myDynamicZone: [
      {
        // 更新します
        id: 2,
        __component: 'compo.type',
        foo: 'bar',
      },
      {
        // 新しいものを追加し、古いものを削除します
        __component: 'compo.type2',
        foo: 'bar2',
      },
    ],
  },
});
```

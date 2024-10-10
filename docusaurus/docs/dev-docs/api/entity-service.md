---
title: エンティティサービスAPI
description: エンティティサービスは、Strapiの複雑なデータ構造、例えばコンポーネントやダイナミックゾーンを扱うレイヤーであり、クエリエンジンAPIを内部で使用してデータベースのクエリを実行します。
displayed_sidebar: devDocsSidebar
unlisted: true
---

import EntityQueryKnex from '/docs/snippets/entity-query-knex.md'
import BackendIntroCrosslink from '/docs/snippets/backend-custom-intro-crosslink.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ESdeprecated from '/docs/snippets/entity-service-deprecated.md'

# エンティティサービスAPI

<ESdeprecated />

:::prerequisites
エンティティサービスAPIの詳細なドキュメンテーションを読む前に、以下の紹介を読むことをお勧めします:
- [バックエンドのカスタマイズの紹介](/dev-docs/backend-customization)、
- そして [Content APIsの紹介](/dev-docs/api/content-api)。
:::

Strapiのバックエンドは、[Query Engine API](/dev-docs/api/query-engine/)の上に構築されたエンティティサービスAPIを提供しています。エンティティサービスは、Strapiの複雑なデータ構造、例えば[コンポーネント](/dev-docs/backend-customization/models#components)や[ダイナミックゾーン](/dev-docs/backend-customization/models#dynamic-zones)を扱うレイヤーであり、クエリエンジンAPIを内部で使用してデータベースのクエリを実行します。

:::strapi エンティティサービスAPI vs. クエリエンジンAPI
<EntityQueryKnex components={props.components} />
:::

:::info 曖昧さの解消: サービス vs. エンティティサービス
[サービス](/dev-docs/backend-customization/services)はエンティティサービスAPIを使用することができますが、サービスとエンティティサービスAPIは直接関連していません。Strapiのバックエンドのコア要素についての詳細な情報は、[バックエンドのカスタマイズ](/dev-docs/backend-customization)のドキュメンテーションで見つけることができます。
:::

## 基本的な使用方法

エンティティサービスは `strapi.entityService` を通じて利用可能です：

```js
const entry = await strapi.entityService.findOne('api::article.article', 1, {
  populate: { someRelation: true },
});
```

## 利用可能な操作

エンティティサービスAPIは、エンティティに対して以下の操作を許可します：

<CustomDocCardsWrapper>
<CustomDocCard emoji="" title="CRUD操作" description="Entity Service APIを使用してエンティティを作成、読み取り、更新、削除します。" link="/dev-docs/api/entity-service/crud" />
<CustomDocCard emoji="" title="フィルター" description="Entity Service APIのクエリでエンティティをフィルタリングし、必要なものを正確に取得します。" link="/dev-docs/api/entity-service/filter" />
<CustomDocCard emoji="" title="Populate" description="関係をポピュレートすることで、Entity Service APIのクエリに追加データを取得します。" link="/dev-docs/api/entity-service/populate" />
<CustomDocCard emoji="" title="順序付けとページネーション" description="Entity Service APIのクエリの結果をソートし、ページネーションします。" link="/dev-docs/api/entity-service/order-pagination" />
<CustomDocCard emoji="" title="コンポーネント/ダイナミックゾーン" description="Entity Service APIのクエリでコンポーネントとダイナミックゾーンを作成および更新します。" link="/dev-docs/api/entity-service/components-dynamic-zones" />
</CustomDocCardsWrapper>
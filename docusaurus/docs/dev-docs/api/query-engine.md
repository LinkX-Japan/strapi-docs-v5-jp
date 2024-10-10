---
unlisted: true
title: クエリエンジンAPI
description: Strapiは、データベースレイヤーへの制限のない内部アクセスをより低いレベルで提供するクエリエンジンAPIを提供しています。
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- はじめに
- クエリエンジンAPI
---

import EntityQueryKnex from '/docs/snippets/entity-query-knex.md'
import BackendIntroCrosslink from '/docs/snippets/backend-custom-intro-crosslink.md'
import ConsiderDocumentService from '/docs/snippets/consider-document-service.md'

# クエリエンジンAPI

Strapiのバックエンドは、データベースレイヤーとより低いレベルで対話するためのクエリエンジンAPIを提供しています。

<ConsiderDocumentService />

:::prerequisites
クエリエンジンAPIのドキュメンテーションを深く掘り下げる前に、以下の紹介を読むことをお勧めします:
- [バックエンドのカスタマイズの紹介](/dev-docs/backend-customization)、
- [Content APIsの紹介](/dev-docs/api/content-api)。
:::


## 基本的な使用方法

クエリエンジンは `strapi.db.query` を通じて利用できます:

```js
strapi.db.query('api::blog.article').findMany({ // uid syntax: 'api::api-name.content-type-name'
  where: {
    title: {
      $startsWith: '2021',
      $endsWith: 'v4',
    },
  },
  populate: {
    category: true,
  },
});
```

## 利用可能な操作

クエリエンジンは、データベースエントリーに対して以下の操作を許可します:

<CustomDocCardsWrapper>
<CustomDocCard emoji="" title="単一の操作" description="クエリエンジンAPIを使用して、データベースエントリーを作成、読み取り、更新、削除します。" link="/dev-docs/api/query-engine/single-operations" />
<CustomDocCard emoji="" title="一括操作" description="クエリエンジンAPIを使用して、複数のデータベースエントリを作成、読み取り、更新、削除します。" link="/dev-docs/api/query-engine/bulk-operations" />
<CustomDocCard emoji="" title="フィルター" description="クエリエンジンAPIを使用してデータベースエントリをフィルタリングし、必要なものを正確に取得します。" link="/dev-docs/api/query-engine/filtering" />
<CustomDocCard emoji="" title="Populate" description="関係をポピュレートすることで、クエリエンジンAPIのクエリに追加データを取得します。" link="/dev-docs/api/query-engine/populating" />
<CustomDocCard emoji="" title="順序付けとページネーション" description="クエリエンジンAPIのクエリの結果をソートし、ページネーションします。" link="/dev-docs/api/query-engine/order-pagination" />
</CustomDocCardsWrapper>
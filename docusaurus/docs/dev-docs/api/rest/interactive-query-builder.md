---
title: インタラクティブクエリビルダー
description: querystringライブラリを活用したインタラクティブツールを使用して、クエリURLを作成します
displayed_sidebar: restApiSidebar
tags:
- Content API
- interactive query builder
- REST API
- qs library
---

# StrapiのインタラクティブツールでクエリURLを作成する

多くのパラメータを使用して組み合わせることで、[REST API](/dev-docs/api/rest)を使用してコンテンツをクエリすることができます。これにより、長く複雑なクエリURLが生成されることがあります。

Strapiのコードベースは、ネストされたJavaScriptオブジェクトを解析し、文字列化するために [the `qs` library](https://github.com/ljharb/qs) を使用しています。手動で作成するのではなく、`qs`を直接使用して複雑なクエリURLを生成することをお勧めします。

以下のインタラクティブクエリビルダーツールを使用して、クエリURLを自動的に生成することができます：

1. _エンドポイント_ と _エンドポイントクエリパラメータ_ フィールドの値を、あなたのニーズに合ったコンテンツに置き換えます。
2. **クリップボードにコピー** ボタンをクリックして、自動的に生成され更新される _クエリ文字列URL_ をコピーします。

:::info パラメータの使用方法
パラメータの使用方法をよりよく理解するためには、[REST APIパラメータテーブル](/dev-docs/api/rest/parameters)を参照し、対応するパラメータドキュメンテーションページを読んでください。
:::

<br />

<InteractiveQueryBuilder
  endpoint="/api/books"
  code={`
{
  sort: ['title:asc'],
  filters: {
    title: {
      $eq: 'hello',
    },
  },
  populate: {
    author: {
      fields: ['firstName', 'lastName']
    }
  },
  fields: ['title'],
  pagination: {
    pageSize: 10,
    page: 1,
  },
  status: 'published',
  locale: ['en'],
}
  `}
/>

<br />
 
<br />

:::note
デフォルトのエンドポイントパスは `/api/` で始まり、[the `rest.prefix` API configuration option](/dev-docs/configurations/api)を使用して異なるAPIプレフィックスを設定しない限り、そのまま保持する必要があります。<br/> 例えば、デフォルトのAPIプレフィックスを使用して `books` コレクションタイプをクエリするには、_エンドポイント_ フィールドに `/api/books` と入力します。
:::

:::caution 免責事項
このページで提供される `qs` ライブラリとインタラクティブクエリビルダーは：
- すべての構文エラーを検出できないかもしれません，
- Strapiプロジェクトで利用可能なパラメータと値を認識していません，
- オートコンプリート機能を提供していません。

現在、これらのツールはJavaScriptオブジェクトをインラインクエリ文字列URLに変換するためだけに提供されています。生成されたクエリURLを使用しても、適切な結果がAPIから返されることを保証するものではありません。
:::

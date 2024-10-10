---
title: パラメータ
description: APIパラメータを使用して、Strapi REST APIのクエリを絞り込む。

next: ./filtering-locale-publication.md
tags:
- API
- Content API
- filters
- locale
- populate
- REST API
- sort
- status
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# REST APIパラメータ

APIパラメータは、[REST API](/dev-docs/api/rest)と一緒に使用して結果をフィルタリング、ソート、ページネーションしたり、フィールドや関連を選択してポピュレートしたりすることができます。また、Strapiのオプション機能に関連する特定のパラメータを使用することも可能です。例えば、コンテンツタイプのパブリケーション状態やロケールなどです。

以下のAPIパラメータが利用可能です：

| オペレータ           | タイプ          | 説明                                           |
| ------------------ | ------------- | ----------------------------------------------------- |
| `populate`         | 文字列またはオブジェクト | [関連、コンポーネント、またはダイナミックゾーンをポピュレート](/dev-docs/api/rest/populate-select#population) |
| `fields`           | 配列         | [表示する特定のフィールドのみを選択](/dev-docs/api/rest/populate-select#field-selection) |
| `filters`          | オブジェクト        | [レスポンスをフィルタリング](/dev-docs/api/rest/filters-locale-publication#filtering) |
| `locale`           | 文字列        | [ロケールを選択](/dev-docs/i18n#rest) |
| `status`           | 文字列        | [ドラフト＆パブリッシュのステータスを選択](/dev-docs/api/rest/filters-locale-publication#status) |
| `sort`             | 文字列または配列  | [レスポンスをソート](/dev-docs/api/rest/sort-pagination.md#sorting) |
| `pagination`       | オブジェクト        | [エントリをページごとに表示](/dev-docs/api/rest/sort-pagination.md#pagination) |

クエリパラメータは、[LHSブラケット構文](https://christiangiacomi.com/posts/rest-design-principles/#lhs-brackets)（つまり、角括弧 `[]` を使用してエンコードされます）を使用します。

:::tip
REST APIパラメータは、幅広く使用し、組み合わせることができます。これにより、長く複雑なクエリURLが生成される可能性があります。<br/>👉 Strapiの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用すると、クエリURLをより便利に作成することができます。🤗
:::

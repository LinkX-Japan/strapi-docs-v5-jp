---
title: PopulateとSelect
description: StrapiのREST APIを使用して特定のフィールドをポピュレートまたは選択します。
sidebarDepth: 3
displayed_sidebar: restApiSidebar
tags:
- API
- Content API
- Combining operators
- find
- populate
- REST API
- select
- qs library
---

import QsIntroFull from '/docs/snippets/qs-intro-full.md'
import QsForQueryTitle from '/docs/snippets/qs-for-query-title.md'
import QsForQueryBody from '/docs/snippets/qs-for-query-body.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# REST API: ポピュレーションとフィールド選択

[REST API](/dev-docs/api/rest)はデフォルトでは、関係、メディアフィールド、コンポーネント、またはダイナミックゾーンをポピュレートしません。特定のフィールドをポピュレートするために[`populate`パラメータ](#population)を、クエリ結果と共に特定のフィールドのみを返すために[`select`パラメータ](#field-selection)を使用します。

:::tip
<QsIntroFull />
:::

:::callout 🏗 作業中
Strapi v4のドキュメントには最近、`populate`パラメータの使用方法についてより詳細な説明が含まれており、[詳細なAPIリファレンス](https://docs.strapi.io/dev-docs/api/rest/populate-select#population)や[追加のガイド](https://docs.strapi.io/dev-docs/api/rest/guides/intro)も含まれています。これらのv4のページは現在、Strapi 5のドキュメントに移植および適応されており、例が新しいデータレスポンスフォーマットを反映するようになっています。

その間、このページの内容は正確であると信じていただけます。というのも、これはすでに新しいStrapi 5、フラット化されたレスポンスフォーマットを反映しているからです（[breaking change entry](/dev-docs/migration/v4-to-v5/breaking-changes/new-response-format)および[REST API introduction](/dev-docs/api/rest#requests)を参照してください）。このページはまだv4と同等の完成度には達していません。
:::

## フィールド選択

クエリは`fields`パラメータを受け入れて、一部のフィールドのみを選択することができます。デフォルトでは、以下の[フィールドのタイプ](/dev-docs/backend-customization/models#model-attributes)のみが返されます：

- 文字列タイプ: string、text、richtext、enumeration、email、password、uid
- 日付タイプ: date、time、datetime、timestamp
- 数値タイプ: integer、biginteger、float、decimal
- 汎用タイプ: boolean、array、JSON。

| ユースケース              | 例のパラメータ構文              |
|-----------------------|---------------------------------------|
| 単一フィールドの選択 | `fields=name`                         |
| 複数フィールドの選択| `fields[0]=name&fields[1]=description`|

:::note
フィールド選択は、関係、メディア、コンポーネント、ダイナミックゾーンのフィールドでは動作しません。これらのフィールドをポピュレートするには、[`populate`パラメータ](#population)を使用します。
:::

<ApiCall noSideBySide>
<Request title="例のリクエスト: 名前と説明フィールドのみを返す">

`GET /api/restaurants?fields[0]=name&fields[1]=description`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 4,
      "Name": "ピッツェリアアリヴェデルチ",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "ピザ専門店として、私たちはあなたに4フォルマッジやカルツォーネなどのクラシックを再発見することをお勧めします。また、ド・ルイージやンドゥージャなどのオリジナルクリエーションもご用意しています。"
            }
          ]
        }
      ],
      "documentId": "lr5wju2og49bf820kj9kz8c3"
    },
    // …
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle/></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify(
  {
    fields: ['name', 'description'],
  },
  {
    encodeValuesOnly: true, // URLをきれいにする
  }
);

await request(`/api/users?${query}`);
```

</details>

## ポピュレーション

REST APIはデフォルトではフィールドのタイプをポピュレートしません。つまり、関連フィールド、メディアフィールド、コンポーネント、ダイナミックゾーンは、`populate`パラメータを渡して各種フィールドタイプをポピュレートしない限り、ポピュレートされません。

`populate`パラメータは単独で使用することも、[複数の演算子と組み合わせて使用することも](#combining-population-with-other-operators)可能で、ポピュレーションの制御をより詳細に行うことができます。

:::caution
ポピュレートされるコンテンツタイプに対して`find`権限が有効になっている必要があります。ロールがコンテンツタイプにアクセスできない場合、そのコンテンツタイプはポピュレートされません（`find`権限をコンテンツタイプに有効にする方法については、[ユーザーガイド](/user-docs/users-roles-permissions/configuring-end-users-roles#editing-a-role)を参照してください）。
:::

:::note
現在、リクエストでIDの配列のみを返すことはできません。
:::

:::strapi ポピュレートガイド

[REST APIガイド](/dev-docs/api/rest/guides/intro)セクションには、populateパラメータの様々な使用例について、より詳細な情報が含まれています：

- [populateの理解](/dev-docs/api/rest/guides/understanding-populate)ガイドでは、populateの仕組みを図解や比較、実際の例を交えて詳しく説明しています。
- [作成者フィールドのポピュレート方法](/dev-docs/api/rest/guides/populate-creator-fields)ガイドでは、クエリ応答に`createdBy`と`updatedBy`フィールドを追加する方法をステップバイステップで説明しています。

:::

以下の表は、可能なポピュレートの使用例とそれに関連するパラメータ構文、およびpopulateガイドの詳細な説明へのリンクをまとめたものです：

| ユースケース  | 例のパラメーター構文 | 読むための詳細な説明 |
|-----------| ---------------|-----------------------|
| メディアフィールド、リレーション、コンポーネント、ダイナミックゾーンを含む、1レベル深くすべてを埋める | `populate=*`| [すべてのリレーションとフィールドを1レベル深く埋める](/dev-docs/api/rest/guides/understanding-populate#populate-all-relations-and-fields-1-level-deep) |
| 1つのリレーションを埋める、<br/>1レベル深く | `populate=a-relation-name`| [特定のリレーションに対して1レベル深く埋める](/dev-docs/api/rest/guides/understanding-populate#populate-1-level-deep-for-specific-relations) |
| 複数のリレーションを埋める、<br/>1レベル深く | `populate[0]=relation-name&populate[1]=another-relation-name&populate[2]=yet-another-relation-name`| [特定のリレーションに対して1レベル深く埋める](/dev-docs/api/rest/guides/understanding-populate#populate-1-level-deep-for-specific-relations) |
| いくつかのリレーションを埋める、複数レベル深く | `populate[root-relation-name][populate][0]=nested-relation-name`| [特定のリレーションに対して複数レベル深く埋める](/dev-docs/api/rest/guides/understanding-populate#populate-several-levels-deep-for-specific-relations) |
| コンポーネントを埋める | `populate[0]=component-name`| [コンポーネントを埋める](/dev-docs/api/rest/guides/understanding-populate#populate-components) |
| コンポーネントとそのネストされたコンポーネントの一つを埋める | `populate[0]=component-name&populate[1]=component-name.nested-component-name`| [コンポーネントを埋める](/dev-docs/api/rest/guides/understanding-populate#populate-components) |
| ダイナミックゾーンを埋める（その最初のレベルの要素のみ） | `populate[0]=dynamic-zone-name`| [ダイナミックゾーンを埋める](/dev-docs/api/rest/guides/understanding-populate#populate-dynamic-zones) |
| 正確に定義された、詳細な埋め込み戦略を使用して、ダイナミックゾーンとそのネストされた要素とリレーションを埋める | `populate[dynamic-zone-name][on][component-category.component-name][populate][relation-name][populate][0]=field-name`| [ダイナミックゾーンを埋める](/dev-docs/api/rest/guides/understanding-populate#detailed-population-strategy) |

:::tip
複数レベルの埋め込みを含む複雑なクエリを作成する最も簡単な方法は、私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用することです。
:::

### 埋め込みと他のオペレーターの組み合わせ

`populate`オペレーターを利用することで、[フィールド選択](/dev-docs/api/rest/populate-select#field-selection)、[フィルター](/dev-docs/api/rest/filters-locale-publication)、および[ソート](/dev-docs/api/rest/sort-pagination)などの他のオペレーターを埋め込みクエリに組み合わせることができます。

:::caution
埋め込みとページネーションのオペレーターは組み合わせることができません。
:::

#### フィールド選択との埋め込み

`fields`と`populate`は組み合わせることができます。

<ApiCall noSideBySide>
<Request title="リクエスト例">

`GET /api/articles?fields[0]=title&fields[1]=slug&populate[headerImage][fields][0]=name&populate[headerImage][fields][1]=url`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "h90lgohlzfpjf3bvan72mzll",
      "title": "テスト記事",
      "slug": "test-article",
      "headerImage": {
        "id": 1,
        "documentId": "cf07g1dbusqr8mzmlbqvlegx",
        "name": "17520.jpg",
        "url": "/uploads/17520_73c601c014.jpg"
      }
    }
  ],
  "meta": {
    // ...
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle/></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify(
  {
    fields: ['title', 'slug'],
    populate: {
      headerImage: {
        fields: ['name', 'url'],
      },
    },
  },
  {
    encodeValuesOnly: true, // URLを整形する
  }
);

await request(`/api/articles?${query}`);
```

</details>

#### フィルタリングと組み合わせたPopulate

`filters`と`populate`は組み合わせて使用することができます。

<ApiCall noSideBySide>
<Request title="Example request">

`GET /api/articles?populate[categories][sort][0]=name%3Aasc&populate[categories][filters][name][$eq]=Cars`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "a1b2c3d4e5d6f7g8h9i0jkl",
      "title": "テスト記事",
      // ...
      "categories": {
        "data": [
          {
            "id": 2,
            "documentId": "jKd8djla9ndalk98hflj3",
            "name": "車"
            // ...
          }
        ]
        }
      }
    }
  ],
  "meta": {
    // ...
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle/></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify(
  {
    populate: {
      categories: {
        sort: ['name:asc'],
        filters: {
          name: {
            $eq: '車',
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true, // URLを整形する
  }
);

await request(`/api/articles?${query}`);
```

</details>

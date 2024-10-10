---
title: 並び替えとページネーション
description: StrapiのREST APIを使用してデータを並び替えたり、ページネーションを行います。
sidebarDepth: 3
displayed_sidebar: restApiSidebar
tags:
- API
- Content API
- interactive query builder
- pagination
- pagination by page
- pagination by offset
- REST API
- sort
- qs library
---

import QsIntroFull from '/docs/snippets/qs-intro-full.md'
import QsForQueryTitle from '/docs/snippets/qs-for-query-title.md'
import QsForQueryBody from '/docs/snippets/qs-for-query-body.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# REST API: 並び替えとページネーション

[REST API](/dev-docs/api/rest)へのクエリによって返されるエントリは、並び替えやページネーションが可能です。

:::tip

<QsIntroFull />

:::

## 並び替え

クエリは、以下の構文で1つまたは複数のフィールドを並び替えることを許可する`sort`パラメータを受け入れることができます：

- `GET /api/:pluralApiId?sort=value` で1つのフィールドを並び替える
- `GET /api/:pluralApiId?sort[0]=value1&sort[1]=value2` で複数のフィールドを並び替える（例：2つのフィールド）

並び替えの順序は以下のように定義できます：

- `:asc` で昇順（デフォルトの順序、省略可能）
- または `:desc` で降順。

<SideBySideContainer>
<SideBySideColumn>

### 例：2つのフィールドを使用して並び替える

`sort`配列にフィールドを渡すことで、複数のフィールドで並び替えることができます。

</SideBySideColumn>

<SideBySideColumn>

<br />

<ApiCall>
<Request title="例：2つのフィールドを使用して並び替えるリクエスト">

`GET /api/restaurants?sort[0]=Description&sort[1]=Name`

</Request>

<Response title="例：レスポンス">

```json
{
  "data": [
    {
      "id": 9,
      "documentId": "hgv1vny5cebq2l3czil1rpb3",
      "Name": "BMK Paris Bamako",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "A very short description goes here."
            }
          ]
        }
      ],
      // …
    },
    {
      "id": 8,
      "documentId": "flzc8qrarj19ee0luix8knxn",
      "Name": "Restaurant D",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "A very short description goes here."
            }
          ]
        }
      ],
      // …
    },
   // … 
  ],
  "meta": {
    // …
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  sort: ['Description', 'Name'],
}, {
  encodeValuesOnly: true, // prettify URL
});

await request(`/api/restaurants?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

<SideBySideContainer>
<SideBySideColumn>

### 例：2つのフィールドを使用して並び替え、順序を設定する

`sort`パラメータを使用し、並び替えたフィールドに`:asc`または`:desc`を定義することで、特定の順序で結果を並び替えることができます。

</SideBySideColumn>

<SideBySideColumn>

<br />

<ApiCall>
<Request title="例：2つのフィールドを使用して並び替え、順序を設定するリクエスト">

`GET /api/restaurants?sort[0]=Description:asc&sort[1]=Name:desc`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 8,
      "documentId": "flzc8qrarj19ee0luix8knxn",
      "Name": "レストランD",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "ここに非常に短い説明が入ります。"
            }
          ]
        }
      ],
      // …
    },
    {
      "id": 9,
      "documentId": "hgv1vny5cebq2l3czil1rpb3",
      "Name": "BMK Paris Bamako",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "ここに非常に短い説明が入ります。"
            }
          ]
        }
      ],
      // …
    },
    // …
  ],
  "meta": {
    // …
  }
}
```

</Response>

</ApiCall>

<details>
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  sort: ['Description:asc', 'Name:desc'],
}, {
  encodeValuesOnly: true, // URLをきれいにする
});

await request(`/api/restaurants?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

## ページネーション

クエリは`pagination`パラメータを受け入れることができます。結果はページネーションできます：

- [ページ](#pagination-by-page)ごと（つまり、ページ番号とページごとのエントリ数を指定）
- または[オフセット](#pagination-by-offset)ごと（つまり、スキップするエントリ数と返すエントリ数を指定）

:::note
ページネーション方法は混在できません。常に`page`と`pageSize`、**または** `start`と`limit`を使用してください。
:::

### ページごとのページネーション

ページごとに結果をページネーションするには、以下のパラメータを使用します：

| パラメータ               | タイプ    | 説明                                                               | デフォルト |
| ----------------------- | ------- | ------------------------------------------------------------------------- | ------- |
| `pagination[page]`      | 整数 | ページ番号                                                               | 1       |
| `pagination[pageSize]`  | 整数 | ページサイズ                                                                 | 25      |
| `pagination[withCount]` | ブール | 応答にエントリの総数とページ数を追加します | True    |

<ApiCall>
<Request title="例のリクエスト: ページ1に10エントリだけを返す">

`GET /api/articles?pagination[page]=1&pagination[pageSize]=10`

</Request>
<Response title="例のレスポンス">

```json
{
  "data": [
    // ...
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 48
    }
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  pagination: {
    page: 1,
    pageSize: 10,
  },
}, {
  encodeValuesOnly: true, // URLをきれいにする
});

await request(`/api/articles?${query}`);
```

</details>

### オフセットによるページネーション

オフセットによる結果のページネーションには、以下のパラメーターを使用します：

| パラメーター               | タイプ    | 説明                                                    | デフォルト |
| ----------------------- | ------- | -------------------------------------------------------------- | ------- |
| `pagination[start]`     | 整数 | 開始値（つまり、最初に返すエントリー）                      | 0       |
| `pagination[limit]`     | 整数 | 返すエントリーの数                                    | 25      |
| `pagination[withCount]` | ブール値 | レスポンスにエントリーの総数を表示するかどうかを切り替えます | `true`  |

:::tip
`pagination[limit]`のデフォルト値と最大値は、`./config/api.js`ファイルの`api.rest.defaultLimit`と`api.rest.maxLimit`キーで[設定できます](/dev-docs/configurations/api)。
:::

<ApiCall>
<Request title="例：最初の10エントリーのみを返すリクエスト">

`GET /api/articles?pagination[start]=0&pagination[limit]=10`

</Request>

<Response title="例：レスポンス">

```json
{
  "data": [
    // ...
  ],
  "meta": {
    "pagination": {
      "start": 0,
      "limit": 10,
      "total": 42
    }
  }
}
```

</Response>
</ApiCall>

<details>
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  pagination: {
    start: 0,
    limit: 10,
  },
}, {
  encodeValuesOnly: true, // URLを綺麗にする
});

await request(`/api/articles?${query}`);
```

</details>

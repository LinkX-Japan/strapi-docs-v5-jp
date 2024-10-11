---
title: フィルター、ロケール、公開状態
description: StrapiのREST APIを使用して、リクエストの結果をフィルタリングします。
sidebarDepth: 3
displayed_sidebar: restApiSidebar
tags:
- API
- 複雑なフィルタリング
- Content API
- 深層フィルタリング
- フィルター
- find
- インタラクティブなクエリビルダー
- ロケール
- REST API
- qsライブラリ
---

import QsIntroFull from '/docs/snippets/qs-intro-full.md'
import QsForQueryBody from '/docs/snippets/qs-for-query-body.md'
import QsForQueryTitle from '/docs/snippets/qs-for-query-title.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# REST API: フィルタリング、ロケール、公開状態

[REST API](/dev-docs/api/rest) は、["エントリの取得"](/dev-docs/api/rest#get-entries)メソッドで見つけた結果をフィルタリングする機能を提供します。<br/>
オプショナルなStrapiの機能を使用すると、さらに多くのフィルターが提供されます：

- コンテンツタイプで[国際化（i18n）プラグイン](/dev-docs/i18n)が有効になっている場合、ロケールでフィルタリングすることが可能です。
- [下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)が有効になっている場合、`published`（デフォルト）または`draft`のステータスに基づいてフィルタリングすることが可能です。

:::tip
<QsIntroFull />
:::

## フィルタリング

クエリは以下の構文で`filters`パラメータを受け入れることができます：

`GET /api/:pluralApiId?filters[field][operator]=value`

以下のオペレーターが利用可能です：

| オペレーター        | 説明                              |
| --------------- | ---------------------------------------- |
| `$eq`           | 等しい                                    |
| `$eqi`          | 等しい（大文字小文字を区別しない）                 |
| `$ne`           | 等しくない                                |
| `$nei`          | 等しくない（大文字小文字を区別しない）             |
| `$lt`           | より小さい                                |
| `$lte`          | 以下                    |
| `$gt`           | より大きい                             |
| `$gte`          | 以上                 |
| `$in`           | 配列に含まれる                     |
| `$notIn`        | 配列に含まれない                 |
| `$contains`     | 含む                                 |
| `$notContains`  | 含まない                         |
| `$containsi`    | 含む（大文字小文字を区別しない）              |
| `$notContainsi` | 含まない（大文字小文字を区別しない）      |
| `$null`         | nullである                                  |
| `$notNull`      | nullでない                              |
| `$between`      | ～の間                               |
| `$startsWith`   | ～で始まる                              |
| `$startsWithi`  | ～で始まる（大文字小文字を区別しない）           |
| `$endsWith`     | ～で終わる                                |
| `$endsWithi`    | ～で終わる（大文字小文字を区別しない）             |
| `$or`           | フィルターを"or"式で結合する  |
| `$and`          | フィルターを"and"式で結合する |
| `$not`          | フィルターを"not"式で結合する |

:::caution
デフォルトでは、フィルタはContent-type BuilderやCLIによって生成された`find`エンドポイントからのみ使用できます。
:::

<SideBySideContainer>
<SideBySideColumn>

### 例：名前が'John'のユーザーを探す

`$eq`フィルタ演算子を使用して、正確な一致を見つけることができます。

</SideBySideColumn>

<SideBySideColumn>

<br />

<ApiCall>
<Request title="名前が'John'のユーザーを探す">

`GET /api/users?filters[username][$eq]=John`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "znrlzntu9ei5onjvwfaalu2v",
      "username": "John",
      "email": "john@test.com",
      "provider": "local",
      "confirmed": true,
      "blocked": false,
      "createdAt": "2021-12-03T20:08:17.740Z",
      "updatedAt": "2021-12-03T20:08:17.740Z"
    }
  ],
  "meta": {
  "pagination": {
    "page": 1,
    "pageSize": 25,
    "pageCount": 1,
    "total": 1
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
  filters: {
    username: {
      $eq: 'John',
    },
  },
}, {
  encodeValuesOnly: true, // URLを整形
});

await request(`/api/users?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

<SideBySideContainer>
<SideBySideColumn>

### 例：IDが3、6、8の複数のレストランを探す

`$in`フィルタ演算子を値の配列と共に使用して、複数の正確な値を見つけることができます。

</SideBySideColumn>

<SideBySideColumn>

<br />

<ApiCall>
<Request title="IDが3、6、8の複数のレストランを探す">

`GET /api/restaurants?filters[id][$in][0]=6&filters[id][$in][1]=8`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 6,
      "documentId": "ethwxjxtvuxl89jq720e38uk",
      "name": "test6",
      // ...
    },
    {
      "id": 8,
      "documentId": "cf07g1dbusqr8mzmlbqvlegx",
      "name": "test8",
      // ...
    },
  ],
  "meta": {
    // ...
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
  filters: {
    id: {
      $in: [3, 6, 8],
    },
  },
}, {
  encodeValuesOnly: true, // URLを整形
});

await request(`/api/restaurants?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

<SideBySideContainer>
<SideBySideColumn>

### 複雑なフィルタリング

複雑なフィルタリングとは、`$and`や`$or`などの高度な方法を使用して複数のフィルタを組み合わせることです。これにより、必要なデータを正確にリクエストするための柔軟性が増します。

</SideBySideColumn>

<SideBySideColumn>

<br />
<ApiCall>
<Request title="2つの可能な日付と特定の著者を持つ本を探す">

`GET /api/books?filters[$or][0][date][$eq]=2020-01-01&filters[$or][1][date][$eq]=2020-01-02&filters[author][name][$eq]=Kai%20doe`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "rxngxzclq0zdaqtvz67hj38d",
      "name": "test1",
      "date": "2020-01-01",
      // ...
    },
    {
      "id": 2,
      "documentId": "kjkhff4e269a50b4vi16stst",
      "name": "test2",
      "date": "2020-01-02",
      // ...
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
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  filters: {
    $or: [
      {
        date: {
          $eq: '2020-01-01',
        },
      },
      {
        date: {
          $eq: '2020-01-02',
        },
      },
    ],
    author: {
      name: {
        $eq: 'Kai doe',
      },
    },
  },
}, {
  encodeValuesOnly: true, // prettify URL
});

await request(`/api/books?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

<SideBySideContainer>
<SideBySideColumn>

### ディープフィルタリング

ディープフィルタリングとは、関連フィールドのフィルタリングを指します。

<br />

:::caution

- ディープフィルタを使用してAPIをクエリすると、パフォーマンスに問題が発生する可能性があります。 ディープフィルタリングのクエリが遅すぎる場合は、クエリの最適化版を持つカスタムルートを作成することをお勧めします。
- ディープフィルタリングは、メディアフィールドなどの一部の多態的な関係では利用できませんが、ダイナミックゾーンでは機能します。

:::

:::note

- 関係、メディアフィールド、コンポーネント、ダイナミックゾーンはデフォルトではポピュレートされません。これらのデータ構造をポピュレートするには、`populate`パラメータを使用してください（[`populate`ドキュメンテーション](/dev-docs/api/rest/populate-select#population)を参照）
- ダイナミックゾーンやメディアフィールドにフィルタをかけることはできません。

:::

</SideBySideColumn>

<SideBySideColumn>

<br />

<ApiCall>
<Request title="5つ星のレストランに所属しているシェフが所有するレストランを探す">

`GET /api/restaurants?filters[chef][restaurants][stars][$eq]=5`

</Request>

<Response title="例のレスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "cvsz61qg33rtyv1qljb1nrtg",
      "name": "GORDON RAMSAY STEAK",
      "stars": 5
      // ...
    },
    {
      "id": 2,
      "documentId": "uh17h7ibw0g8thit6ivi71d8",
      "name": "GORDON RAMSAY BURGER",
      "stars": 5
      // ...
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
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  filters: {
    chef: {
      restaurants: {
        stars: {
          $eq: 5,
        },
      },
    },
  },
}, {
  encodeValuesOnly: true, // prettify URL
});

await request(`/api/restaurants?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

## ロケール

:::prerequisites

- [国際化（i18n）機能](/dev-docs/i18n)がインストールされていること。
- [コンテンツタイプに対してローカライゼーションが有効になっていること](/user-docs/content-type-builder/creating-new-content-type.md#creating-a-new-content-type)。
:::

`locale` APIパラメータは、特定のロケールからのエントリーを操作するために使用できます（[国際化ドキュメンテーション](/dev-docs/i18n#rest)を参照）。

<SideBySideContainer>
<SideBySideColumn>

## ステータス

:::prerequisites
[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)機能が有効になっているべきです。
:::

クエリは`status`パラメータを受け入れて、そのステータスに基づいてドキュメントを取得できます：

- `published`：公開されたバージョンのドキュメントのみを返します（デフォルト）
- `draft`：ドラフトバージョンのドキュメントのみを返します

:::tip
レスポンスデータでは、ドラフトの`publishedAt`フィールドは`null`です。
:::

:::note
公開されたバージョンがデフォルトで返されるため、ステータスパラメータを渡さないことは`status=published`を渡すことと同等です。
:::

</SideBySideColumn>

<SideBySideColumn>

<br /><br />

<ApiCall>
<Request title="レストランのドラフトバージョンを取得する">

`GET /api/articles?status=draft`

</Request>
<Response title="例のレスポンス">

```json {21}
{
  "data": [
    // …
    {
      "id": 5,
      "documentId": "znrlzntu9ei5onjvwfaalu2v",
      "Name": "Biscotte Restaurant",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "This is the draft version."
            }
          ]
        }
      ],
      "createdAt": "2024-03-06T13:43:30.172Z",
      "updatedAt": "2024-03-06T21:38:46.353Z",
      "publishedAt": null,
      "locale": "en"
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
<summary><QsForQueryTitle /></summary>

<QsForQueryBody />

```js
const qs = require('qs');
const query = qs.stringify({
  status: 'draft',
}, {
  encodeValuesOnly: true, // URLをきれいにする
});

await request(`/api/articles?${query}`);
```

</details>

</SideBySideColumn>
</SideBySideContainer>

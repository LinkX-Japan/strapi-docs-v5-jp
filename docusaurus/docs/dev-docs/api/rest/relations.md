---
title: 関係性
description: REST APIを使用して関係性の順序を管理します
displayed_sidebar: restApiSidebar
tags:
- API 
- 関係性
- Content API
- 切断
- REST API
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# APIリクエストでの関係性の管理

コンテンツタイプ間の関係性を定義することは、データベースレイヤーでエンティティとして指定されたコンテンツタイプを互いに接続することです。

コンテンツタイプ間の関係性は、[管理パネル](/user-docs/content-manager/managing-relational-fields#managing-multiple-choices-relational-fields)または[REST API](/dev-docs/api/rest)または[Document Service API](/dev-docs/api/document-service)のリクエストを通じて管理することができます。

関係性は、リクエストのボディにパラメータを渡すことにより、Content APIを通じて接続、切断、または設定することができます:

|  パラメータ名         | 説明 | 更新のタイプ |
|-------------------------|-------------|----------------|
| [`connect`](#connect)   | 新しいエンティティを接続します。<br /><br />`disconnect`と組み合わせて使用することができます。<br /><br />関係性の順序を定義するために[位置引数](#relations-reordering)と組み合わせて使用することができます。    | 部分的な更新 |
| [`disconnect`](#disconnect)    | エンティティを切断します。<br /><br />`connect`と組み合わせて使用することができます。 | 部分的な更新 |
| [`set`](#set)           | エンティティを特定のセットに設定します。`set`を使用すると、他のエンティティへのすべての既存の接続が上書きされます。<br /><br />`connect`または`disconnect`と組み合わせて使用することはできません。  | 完全な更新 |

:::note
コンテンツタイプに[国際化（i18n）](/user-docs/content-manager/translating-content)が有効になっている場合、特定のロケールの関係性を設定するためにロケールを渡すこともできます。以下にDocument Service APIの例を示します:

```js
await strapi.documents('api::restaurant.restaurant').update({ 
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  locale: 'fr',
  data: { 
    category: {
      connect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']
    }
  }
})
```

ロケールが渡されない場合、デフォルトのロケールが想定されます。
:::

## `connect`

リクエストのボディで`connect`を使用すると、指定された関係性を接続する部分的な更新が行われます。

`connect`は省略形式または詳細形式の構文を受け入れます:

| 構文タイプ | 構文の例 |
| ------------|----------------|
| 省略形   | `connect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']` |
| 詳細形    | ```connect: [{ documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }, { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }]``` |

詳細形式の構文を使用して[関係性の順序を変更](#relations-reordering)することもできます。

`connect`は[`disconnect`](#disconnect)と組み合わせて使用することができます。

:::caution
`connect`はメディア属性には使用できません（詳細は[Upload plugin documentation](/dev-docs/plugins/upload#examples)を参照してください）。
:::

<Tabs groupId="shorthand-longhand">

<TabItem value="shorthand" label="省略形構文の例">

以下のリクエストを送信すると、その`documnentId` `a1b2c3d4e5f6g7h8i9j0klm`で特定される`restaurant`が更新されます。リクエストは`categories`属性を使用して、その`documentId`で特定される2つのカテゴリとレストランを接続します。

<MultiLanguageSwitcher title="短縮構文を使用した例のリクエスト">
<MultiLanguageSwitcherRequest language="REST">

`PUT` `http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      connect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']
    }
  }
}
```

</MultiLanguageSwitcherRequest>

<MultiLanguageSwitcherRequest language="Node">

```js
const fetch = require('node-fetch');

const response = await fetch(
  'http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm',
  {
    method: 'put',
    body: {
      data: {
        categories: {
          connect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']
        }
      }
    }
  }
);
```

</MultiLanguageSwitcherRequest>
</MultiLanguageSwitcher>

</TabItem>

<TabItem value="longhand" label="詳細構文の例">

以下のリクエストを送信すると、その`documnentId` `a1b2c3d4e5f6g7h8i9j0klm`で特定される`restaurant`が更新されます。リクエストは`categories`属性を使用して、その`documentId`で特定される2つのカテゴリとレストランを接続します。

<MultiLanguageSwitcher title="詳細構文を使用した例のリクエスト">
<MultiLanguageSwitcherRequest language="REST">

`PUT` `http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      connect: [
        { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' },
        { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
      ]
    }
  }
}
```

</MultiLanguageSwitcherRequest>

<MultiLanguageSwitcherRequest language="Node">

```js
const fetch = require('node-fetch');

const response = await fetch(
  'http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm',
  {
    method: 'put',
    body: {
      data: {
        categories: {
          connect: [
            { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' },
            { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
          ]
        }
      }
    }
  }
);
```

</MultiLanguageSwitcherRequest>
</MultiLanguageSwitcher>

</TabItem>
</Tabs>

### 関係の並べ替え

`connect`の詳細構文には、関係の順序を定義するための位置引数を渡すことができます。

詳細構文は、各オブジェクトが接続するエントリーの`documentId`と、関係を接続する位置を定義するオプションの`position`オブジェクトを含むオブジェクトの配列を受け入れます。

:::note 異なる関係性に対する異なる構文
このドキュメントで説明されている構文は、一対多、多対多、多方向の関係性に有用です。<br />一対一、多対一、一方向の関係性についても、構文はサポートされていますが、最後の関係性のみが使用されるため、より短い形式を使用することが望ましいです（例：`{ data: { category: 'a1b2c3d4e5f6g7h8i9j0klm' } }`、[REST API ドキュメンテーション](/dev-docs/api/rest#requests)を参照）。
:::

関係性の`position`を定義するには、以下の4つの異なる位置属性のうちの1つを指定します：

| パラメータ名と構文 | 説明                                                            | タイプ       |
| ------------------------- | ---------------------------------------------------------------------- | ---------- |
| `before: documentId`      | 指定した`documentId`の前に関係性を配置します。                  | `documentId`（文字列） |
| `after: documentId`       | 指定した`documentId`の後に関係性を配置します。                   | `documentId`（文字列） |
| `start: true`             | 既存の関係性のリストの先頭に関係性を配置します。 | Boolean    |
| `end: true`               | 既存の関係性のリストの末尾に関係性を配置します。   | Boolean    |

`position`引数はオプションで、デフォルトは`position: { end: true }`です。

:::note 順序の連続性
`connect`は配列であるため、操作の順序は重要で、それらは順番に処理されます（以下の組み合わせ例を参照）。
:::

:::caution
同じ関係性を複数回接続しないでください。そうすると、APIによってバリデーションエラーが返されます。
:::

<Tabs>

<TabItem value="basic" label="基本的な例">

データベースには以下のレコードが存在するとします：

```js
categories: [
  { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
  { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }
]
```

以下のリクエストを送信すると、`documentId`が`a1b2c3d4e5f6g7h8i9j0klm`の`restaurant`を更新し、`categories`属性のエンティティの関係性を`documentId`が`ma12bc34de56fg78hi90jkl`のエンティティと接続し、それを`documentId`が`z0y2x4w6v8u1t3s5r7q9onm`のエンティティの前に配置します：

<Request title="関係性の位置を更新するための例示リクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      connect: [
        { documentId: 'ma12bc34de56fg78hi90jkl', position: { before: 'z0y2x4w6v8u1t3s5r7q9onm' } },
      ]
    }
  }
}
```

</Request>
</TabItem>

<TabItem value="combined" label="組み合わせ例">

データベースには以下のレコードが存在するとします：

```js
categories: [
  { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
  { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }
]
```

以下の例をPUTリクエストのリクエストボディに含めて送信すると、複数の関係性が更新されます：

<Request title="複数の関係性の順序を変更するための例示リクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      connect: [
        { id: '6u86wkc6x3parjd4emikhmx', position: { after: 'j9k8l7m6n5o4p3q2r1s0tuv'} },
        { id: '3r1wkvyjwv0b9b36s7hzpxl', position: { before: 'z0y2x4w6v8u1t3s5r7q9onm' } },
        { id: 'rkyqa499i84197l29sbmwzl', position: { end: true } },
        { id: 'srkvrr77k96o44d9v6ef1vu' },
        { id: 'nyk7047azdgbtjqhl7btuxw', position: { start: true } },
      ]
    }
  }
}
```

</Request>

`position`引数を省略する（`documentId: 'srkvrr77k96o44d9v6ef1vu9'`のように）と、デフォルトでは`position: { end: true }`が適用されます。他のすべての関係は、既存の`id`に対して相対的に（`after`や`before`を使用して）または関係のリストに対して相対的に（`start`や`end`を使用して）位置付けられます。操作は、`connect`配列で定義された順序で逐次的に処理されるため、結果として得られるデータベースレコードは次のようになります：

```js
categories: [
  { id: 'nyk7047azdgbtjqhl7btuxw' },
  { id: 'j9k8l7m6n5o4p3q2r1s0tuv' },
  { id: '6u86wkc6x3parjd4emikhmx6' },
  { id: '3r1wkvyjwv0b9b36s7hzpxl7' },
  { id: 'a1b2c3d4e5f6g7h8i9j0klm' },
  { id: 'rkyqa499i84197l29sbmwzl' },
  { id: 'srkvrr77k96o44d9v6ef1vu9' }
]
```

</TabItem>

</Tabs>

### エッジケース：ドラフト＆パブリッシュまたはi18nが無効

Strapi 5の組み込み機能の一部がコンテンツタイプに対して無効にされている場合、例えば[ドラフト＆パブリッシュ](/user-docs/content-manager/saving-and-publishing-content)や[国際化（i18）](/user-docs/content-manager/translating-content)など、`connect`パラメーターの使用方法が異なる場合があります：

**i18nが_off_の`Category`からi18nが_on_の`Article`への関係：**

この状況では、どのロケールに接続するかを選択できます：

```js
data: {
    categories: {
      connect: [
        { documentId: 'z0y2x4w6v8u1t3s5r7q9onm', locale: 'en' },
        // 同じドキュメントIDに異なるロケールで接続 👇
        { documentId: 'z0y2x4w6v8u1t3s5r7q9onm', locale: 'fr' },
      ]
   }
}
```

**ドラフト＆パブリッシュが_off_の`Category`からドラフト＆パブリッシュが_on_の`Article`への関係：**

```js
data: {
  categories: {
    connect: [
      { documentId: 'z0y2x4w6v8u1t3s5r7q9onm', status: 'draft' },
      // 同じドキュメントIDに異なる公開状態で接続 👇
      { documentId: 'z0y2x4w6v8u1t3s5r7q9onm', status: 'published' },
    ]
  }
}
```

## `disconnect`

リクエストの本文で`disconnect`を使用すると、指定された関係を切断する部分的な更新が行われます。

`disconnect`は省略形または詳細形の構文を受け入れます：

| 構文タイプ | 構文例 |
| ------------|----------------|
| 省略形   | `disconnect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']`
| 詳細形    | ```disconnect: [{ documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }, { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }]``` |

`disconnect`は[`connect`](#connect)と組み合わせて使用できます。

<br />

<Tabs groupId="shorthand-longhand">

<TabItem value="shorthand" label="Shorthand syntax example">

次のリクエストを送信すると、`documentId` `a1b2c3d4e5f6g7h8i9j0klm`によって識別される`restaurant`が更新され、その`documentId`によって識別される2つのエントリとの関連が切断されます：

<Request title="省略形式を使用した例のリクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      disconnect: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv'],
    }
  }
}
```

</Request>

</TabItem>

<TabItem value="longhand" label="詳細形式の例">

次のリクエストを送信すると、`documentId` `a1b2c3d4e5f6g7h8i9j0klm`によって識別される`restaurant`が更新され、その`documentId`によって識別される2つのエントリとの関連が切断されます：

<Request title="詳細形式を使用した例のリクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      disconnect: [
        { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' },
        { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
      ],
    }
  }
}
```

</Request>

</TabItem>
</Tabs>

## `set`

`set`を使用すると、全体の更新が行われ、指定された順序で既存のすべての関連が指定されたものに置き換えられます。

`set`は省略形式または詳細形式の構文を受け入れます：

| 構文タイプ | 構文の例                  |
| ----------- | ------------------------------- |
| 省略形式   | `set: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv']`                   |
| 詳細形式   | ```set: [{ documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }, { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }]``` |

`set`はすべての既存の関連を置き換えるため、他のパラメータと組み合わせて使用するべきではありません。部分的な更新を行うには、[`connect`](#connect)と[`disconnect`](#disconnect)を使用してください。

:::note setの省略
あらゆるパラメータを省略することは、`set`を使用することと同等です。<br/>例えば、以下の3つの構文はすべて同等です：

- `data: { categories: set: [{ documentId: 'z0y2x4w6v8u1t3s5r7q9onm' }, { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }] }}`
- `data: { categories: set: ['z0y2x4w6v8u1t3s5r7q9onm2', 'j9k8l7m6n5o4p3q2r1s0tuv'] }}`
- `data: { categories: ['z0y2x4w6v8u1t3s5r7q9onm2', 'j9k8l7m6n5o4p3q2r1s0tuv'] }`

:::

<Tabs groupId="shorthand-longhand">

<TabItem value="shorthand" label="省略形式の例">

次のリクエストを送信すると、`documentId` `a1b2c3d4e5f6g7h8i9j0klm`によって識別される`restaurant`が更新され、すべての既存の関連が置き換えられ、`categories`属性を使用して、その`documentId`で識別される2つのカテゴリーに接続されます：

<Request title="setを使用した省略形式の例のリクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      set: ['z0y2x4w6v8u1t3s5r7q9onm', 'j9k8l7m6n5o4p3q2r1s0tuv4'],
    }
  }
}
```

</Request>

</TabItem>

<TabItem value="longhand" label="詳細形式の例">

以下のリクエストを送信すると、`documentId` `a1b2c3d4e5f6g7h8i9j0klm`で識別される`restaurant`が更新され、すべての既存の関係が置き換えられ、`categories`属性を使用して、`documentId`で識別される2つのカテゴリが接続されます：

<Request title="長い構文を使用したsetとともに例示するリクエスト">

`PUT http://localhost:1337/api/restaurants/a1b2c3d4e5f6g7h8i9j0klm`

```js
{
  data: {
    categories: {
      set: [
        { documentId: 'z0y2x4w6v8u1t3s5r7q9onm' },
        { documentId: 'j9k8l7m6n5o4p3q2r1s0tuv' }
      ],
    }
  }
}
```

</Request>

</TabItem>
</Tabs>
<FeedbackPlaceholder />

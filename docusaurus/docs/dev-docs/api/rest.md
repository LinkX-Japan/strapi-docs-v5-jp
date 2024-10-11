---
title: REST APIリファレンス
description: Strapiが生成するREST APIエンドポイントを使用して、Content-Typesと対話します。
displayed_sidebar: restApiSidebar
tags:
- API
- Content API
- documentId
- Documents
- 複数形のAPI ID
- REST API
- 単数形のAPI ID
---

# REST APIリファレンス

REST APIは、APIエンドポイントを通じて[content-types](/dev-docs/backend-customization/models)にアクセスすることを可能にします。Strapiは、content-typeが作成されると自動的に[APIエンドポイント](#endpoints)を作成します。[APIパラメータ](/dev-docs/api/rest/parameters)は、APIエンドポイントをクエリする際に結果を絞り込むために使用することができます。

このドキュメンテーションのセクションは、REST APIリファレンスのためのものです。また、特定のユースケースに対応する[ガイド](/dev-docs/api/rest/guides/intro)も用意しています。

:::prerequisites
すべてのコンテンツタイプはデフォルトでプライベートであり、公開するか、適切な権限を持つ認証が必要です。詳細は[クイックスタートガイド](/dev-docs/quick-start#step-3-set-roles--permissions)、[Users & Permissionsプラグインのユーザーガイド](/user-docs/users-roles-permissions/configuring-end-users-roles)、および[APIトークン設定ドキュメンテーション](/dev-docs/configurations/api-tokens)をご覧ください。
:::

:::note
デフォルトでは、REST APIのレスポンスはトップレベルのフィールドのみを含み、関連性、メディアフィールド、コンポーネント、またはダイナミックゾーンは展開されません。特定のフィールドを展開するには、[`populate` パラメータ](/dev-docs/api/rest/populate-select)を使用してください。展開する関連性のフィールドに対してfind権限が与えられていることを確認してください。
:::

:::strapi Upload plugin API
Uploadプラグイン（[Media Library](/user-docs/media-library)で見つかるメディアを処理する）は、[Uploadプラグインドキュメンテーション](/dev-docs/plugins/upload)で説明されている特定のAPIを持っています。
:::

## エンドポイント

各Content-Typeに対して、以下のエンドポイントが自動的に生成されます：

<details>
<summary>複数形のAPI IDと単数形のAPI ID:</summary>
以下の表では：

- `:singularApiId`はcontent-typeの"API ID (Singular)"フィールドの値を指します。
- `:pluralApiId`はcontent-typeの"API ID (Plural)"フィールドの値を指します。

これらの値は、Content-Type Builderでcontent-typeを作成する際に定義され、管理パネルでcontent-typeを編集する際に見つけることができます（[ユーザーガイド](/user-docs/content-type-builder/creating-new-content-type)を参照してください）。例えば、デフォルトでは、"Article" content-typeでは：

- `:singularApiId`は `article`になります
- `:pluralApiId`は `articles`になります

<ThemedImage
alt="単数形と複数形のAPI IDを取得するためのContent-Type Builderのスクリーンショット"
sources={{
  light: '/img/assets/rest-api/plural-api-id.png',
  dark: '/img/assets/rest-api/plural-api-id_DARK.png'
}}
/>

</details>

<Tabs groupId="collection-single">

<TabItem value="collection" label="コレクションタイプ">

| メソッド   | URL                             | 説明                           |
| -------- | ------------------------------- | ------------------------------------- |
| `GET`    | `/api/:pluralApiId`             | [ドキュメントのリストを取得する](#get-all) |
| `POST`   | `/api/:pluralApiId`             | [ドキュメントを作成する](#create)   |
| `GET`    | `/api/:pluralApiId/:documentId` | [ドキュメントを取得する](#get)         |
| `PUT`    | `/api/:pluralApiId/:documentId` | [ドキュメントを更新する](#update)   |
| `DELETE` | `/api/:pluralApiId/:documentId` | [ドキュメントを削除する](#delete)   |

</TabItem>

<TabItem value="single" label="シングルタイプ">

| メソッド   | URL                   | 説明                                |
| -------- | --------------------- | ------------------------------------------ |
| `GET`    | `/api/:singularApiId` | [ドキュメントを取得する](#get-an-entry)              |
| `PUT`    | `/api/:singularApiId` | [ドキュメントを更新/作成する](#update-an-entry) |
| `DELETE` | `/api/:singularApiId` | [ドキュメントを削除する](#delete-an-entry)        |

</TabItem>

</Tabs>

<details>

<summary>エンドポイントの実際の例：</summary>

以下のエンドポイントの例は、[FoodAdvisor](https://github.com/strapi/foodadvisor)のサンプルアプリケーションから取得されています。

<Tabs groupId="collection-single">

<TabItem value="collection" label="コレクションタイプ">

`Restaurant` **コンテンツタイプ**

| メソッド | URL                      | 説明               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/api/restaurants`       | レストランのリストを取得する |
| POST   | `/api/restaurants`       | レストランを作成する       |
| GET    | `/api/restaurants/:documentId`   | 特定のレストランを取得する |
| DELETE | `/api/restaurants/:documentId`   | レストランを削除する       |
| PUT    | `/api/restaurants/:documentId`   | レストランを更新する       |

</TabItem>

<TabItem value="single" label="シングルタイプ">

`Homepage` **コンテンツタイプ**

| メソッド | URL             | 説明                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/api/homepage` | ホームページのコンテンツを取得する           |
| PUT    | `/api/homepage` | ホームページのコンテンツを更新/作成する |
| DELETE | `/api/homepage` | ホームページのコンテンツを削除する        |

</TabItem>
</Tabs>
</details>

:::note
[コンポーネント](/dev-docs/backend-customization/models#components)はAPIエンドポイントを持っていません。
:::

## リクエスト

:::strapi Strapi 5 vs. Strapi v4
Strapi 5のContent APIには、Strapi v4と比べて2つの主な違いがあります：

- レスポンスフォーマットがフラット化され、属性はもはや`data.attributes`オブジェクト内にネストされていないため、`data`オブジェクトの最初のレベルで直接アクセスできます（例えば、コンテンツタイプの"title"属性は`data.title`でアクセスします）。
- Strapi 5では、**ドキュメント** <DocumentDefinition/>を使用し、ドキュメントはその`documentId`でアクセスされます。
:::

リクエストは、通常以下のキーを含むオブジェクトとしてレスポンスを返します：

- `data`：レスポンスデータそのもので、以下のいずれかとなります：
  - 単一のドキュメント。以下のキーを持つオブジェクト：
    - `id`（整数）
    - `documentId`（文字列）、これは特定のドキュメントを問い合わせる際に使用する一意の識別子です。
    - 属性（各属性のタイプは属性によります、詳細は[モデル属性](/dev-docs/backend-customization/models#model-attributes)のドキュメンテーションを参照してください）
    - `meta`（オブジェクト）
  - ドキュメントのリスト。オブジェクトの配列
  - カスタムレスポンス

- `meta`（オブジェクト）：ページネーション、公開状態、利用可能なロケールなどについての情報。

- `error`（オブジェクト、_オプション_）：リクエストによってスローされた[エラー](/dev-docs/error-handling)に関する情報。

:::note
一部のプラグイン（Users & PermissionsやUploadを含む）はこのレスポンス形式に従わない場合があります。
:::

<SideBySideContainer>

<SideBySideColumn>

### ドキュメントの取得 {#get-all}

クエリフィルタに一致するドキュメントを返します（[APIパラメータ](/dev-docs/api/rest/parameters)のドキュメンテーションを参照）。

:::tip ヒント：Strapi 5 vs. Strapi 4
Strapi 5ではレスポンス形式がフラット化され、属性は`data.attributes`にネストされる代わりに、`data`オブジェクトから直接アクセスできます。

Strapi 5に移行する際には、オプションのヘッダーを渡すことができます（[関連する破壊的変更](/dev-docs/migration/v4-to-v5/breaking-changes/new-response-format)を参照）。
:::

</SideBySideColumn>

<SideBySideColumn>

<ApiCall>

<Request>

`GET http://localhost:1337/api/restaurants`

</Request>

<Response>

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "hgv1vny5cebq2l3czil1rpb3",
      "Name": "BMK Paris Bamako",
      "Description": null,
      "createdAt": "2024-03-06T13:42:05.098Z",
      "updatedAt": "2024-03-06T13:42:05.098Z",
      "publishedAt": "2024-03-06T13:42:05.103Z",
      "locale": "en"
    },
    {
      "id": 4,
      "documentId": "znrlzntu9ei5onjvwfaalu2v",
      "Name": "Biscotte Restaurant",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "Welcome to Biscotte restaurant! Restaurant Biscotte offers a cuisine based on fresh, quality products, often local, organic when possible, and always produced by passionate producers."
            }
          ]
        }
      ],
      "createdAt": "2024-03-06T13:43:30.172Z",
      "updatedAt": "2024-03-06T13:43:30.172Z",
      "publishedAt": "2024-03-06T13:43:30.175Z",
      "locale": "en"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

</Response>

</ApiCall>

</SideBySideColumn>

</SideBySideContainer>

<SideBySideContainer>

<SideBySideColumn>

### ドキュメントの取得 {#get}

`documentId`によるドキュメントの取得。

:::strapi Strapi 5 vs. Strapi v4
Strapi 5では、特定のドキュメントはその`documentId`でアクセスされます。
:::

</SideBySideColumn>

<SideBySideColumn>

<ApiCall>

<Request title="例：リクエスト">

`GET http://localhost:1337/api/restaurants/j964065dnjrdr4u89weh79xl`

</Request>

<レスポンス title="例のレスポンス">

```json
{
  "data": {
    "id": 6,
    "documentId": "znrlzntu9ei5onjvwfaalu2v",
    "Name": "Biscotte Restaurant",
    "Description": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "Biscotte レストランへようこそ！レストラン Biscotte では、4 Formaggi や Calzone などの基本的な料理や、Do Luigi や Nduja などのオリジナルクリエーションを提供しています。"
          }
        ]
      }
    ],
    "createdAt": "2024-02-27T10:19:04.953Z",
    "updatedAt": "2024-03-05T15:52:05.591Z",
    "publishedAt": "2024-03-05T15:52:05.600Z",
    "locale": "en"
  },
  "meta": {}
}

```

</レスポンス>

</ApiCall>

</SideBySideColumn>

</SideBySideContainer>

<SideBySideContainer>

<SideBySideColumn>

### ドキュメントの作成 {#create}

ドキュメントを作成し、その値を返します。

デフォルトでは、ドキュメントは公開ステータスで作成されます。ドラフトとしてドキュメントを作成するには、[`status`](/dev-docs/api/rest/filters-locale-publication#status) クエリパラメータを `draft` の値で渡します（例：`?status=draft`）。

コンテンツタイプで国際化（i18n）機能が有効化されている場合、REST APIへのPOSTリクエストを使用して[ローカライズされたドキュメントを作成](/dev-docs/i18n#creating-a-new-localized-entry)することが可能です。

:::note
ドキュメントを作成する際、その関連性と順序を定義することができます（詳細は [REST APIを通じた関連性の管理](/dev-docs/api/rest/relations.md)を参照してください）。
:::

</SideBySideColumn>

<SideBySideColumn>

<ApiCall>

<リクエスト title="例のリクエスト">

`POST http://localhost:1337/api/restaurants`

```json
{ 
  "data": {
    "Name": "Restaurant D",
    "Description": [ // "リッチテキスト（ブロック）"フィールドタイプを使用
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "ここに非常に短い説明を入力します。"
          }
        ]
      }
    ]
  }
}
```

</リクエスト>

<レスポンス title="例のレスポンス">

```json
{
  "data": {
    "documentId": "bw64dnu97i56nq85106yt4du",
    "Name": "Restaurant D",
    "Description": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "ここに非常に短い説明を入力します。"
          }
        ]
      }
    ],
    "createdAt": "2024-03-05T16:44:47.689Z",
    "updatedAt": "2024-03-05T16:44:47.689Z",
    "publishedAt": "2024-03-05T16:44:47.687Z",
    "locale": "en"
  },
  "meta": {}
}
```

</レスポンス>

</ApiCall>

</SideBySideColumn>
</SideBySideContainer>


<SideBySideContainer>

<SideBySideColumn>

### ドキュメントの更新 {#update}

`id`によってドキュメントを部分的に更新し、その値を返します。

フィールドをクリアするには `null` 値を送信します。

:::note ノート
* 変更されていないフィールドもリクエストのボディに含める必要があります。
* [国際化（i18n）プラグイン](/dev-docs/i18n)をインストールしていても、現在は[ドキュメントのロケールを更新する](/dev-docs/i18n#rest-update)ことはできません。
* ドキュメントを更新する際に、その関連性と順序を定義することができます（詳細は[REST APIを通じた関連性の管理](/dev-docs/api/rest/relations)を参照してください）。
:::

</SideBySideColumn>

<SideBySideColumn>

<ApiCall>

<Request title="リクエスト例">

`PUT http://localhost:1337/api/restaurants/hgv1vny5cebq2l3czil1rpb3`

```json
{ 
  "data": {
    "Name": "BMK Paris Bamako", // このフィールドは変更していませんが、それでも含める必要があります
    "Description": [ // "Rich text (blocks)" フィールドタイプを使用
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "A very short description goes here."
          }
        ]
      }
    ]
  }
}
```

</Request>

<Response title="レスポンス例">

```json
{
  "data": {
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
    "createdAt": "2024-03-06T13:42:05.098Z",
    "updatedAt": "2024-03-06T14:16:56.883Z",
    "publishedAt": "2024-03-06T14:16:56.895Z",
    "locale": "en"
  },
  "meta": {}
}
```

</Response>

</ApiCall>

</SideBySideColumn>
</SideBySideContainer >

<SideBySideContainer>

<SideBySideColumn>

### ドキュメントの削除 {#delete}

ドキュメントを削除します。

`DELETE`リクエストは成功時にのみ204のHTTPステータスコードを送信し、レスポンスボディにはデータを返しません。

</SideBySideColumn>

<SideBySideColumn>
<ApiCall>

<Request title="リクエスト例">

`DELETE http://localhost:1337/api/restaurants/bw64dnu97i56nq85106yt4du`

</Request>

</ApiCall>

</SideBySideColumn>
</SideBySideContainer>
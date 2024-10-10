---
title: GraphQL API
displayed_sidebar: devDocsSidebar
tags:
- API
- Content API
- documentId
- filters
- GraphQL
- mutation
- pagination
- pagination by offset
- pagination by page
- plural API ID
- sort
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# GraphQL API

GraphQL APIは、Strapiの[GraphQLプラグイン](/dev-docs/plugins/graphql.md)を通じて[content-types](/dev-docs/backend-customization/models#content-types)と対話するためのクエリと変異を実行することができます。結果は[フィルタリング](#filters)、[ソート](#sorting)、[ページネーション](#pagination)が可能です。

:::prerequisites
GraphQL APIを使用するには、[GraphQL](/dev-docs/plugins/graphql.md)プラグインをインストールしてください：

<Tabs groupId="yarn-npm">
<TabItem value="yarn" label="Yarn">

```sh
yarn add @strapi/plugin-graphql
```

</TabItem>
<TabItem value="npm" label="NPM">

```sh
npm install @strapi/plugin-graphql
```

</TabItem>

</Tabs>
:::

インストールが完了すると、GraphQL playgroundは`/graphql` URLでアクセス可能となり、対話的にクエリと変異を構築し、あなたのcontent-typesに特化したドキュメンテーションを読むことができます：

<ThemedImage
  alt="GraphQL playgroundの使用例"
  sources={{
    light:'/img/assets/apis/use-graphql-playground.gif',
    dark:'/img/assets/apis/use-graphql-playground_DARK.gif',
  }}
/>

<br/>

:::note メディアファイルをアップロードするためのGraphQL APIはありません
GraphQL APIはメディアのアップロードをサポートしていません。すべてのファイルのアップロードには[REST API `POST /upload` エンドポイント](/dev-docs/plugins/upload#endpoints)を使用し、返された情報をcontent typesにリンクするために使用します。メディアファイルの`id`を使用して`updateUploadFile`と`deleteUploadFile`変異を使用してアップロードしたファイルを更新または削除することはできます（[メディアファイルに対する変異](#mutations-on-media-files)を参照）。
:::

## クエリ

GraphQLのクエリは、データを変更することなくフェッチするために使用されます。

content-typeがあなたのプロジェクトに追加されると、2つの自動生成されたGraphQLクエリがあなたのスキーマに追加されます。これらはcontent-typeの単数形と複数形のAPI IDに基づいて命名されます。以下に例を示します：

| Content-type display name | Singular API ID | Plural API ID |
|---------------------------|-----------------|---------------|
| レストラン                | `restaurant`    | `restaurants` |

<details>
<summary>単数形のAPI ID vs. 複数形のAPI ID:</summary>

単数形のAPI IDと複数形のAPI IDの値は、Content-Type Builderでcontent-typeを作成する際に定義され、admin panelでcontent-typeを編集する際に見つけることができます（[ユーザーガイド](/user-docs/content-type-builder/creating-new-content-type)を参照）。content-typeを作成する際にカスタムAPI IDを定義することができますが、これらは後から変更することはできません。

<ThemedImage
alt="単数形と複数形のAPI IDを取得するためのContent-Type Builderのスクリーンショット"
sources={{
  light: '/img/assets/apis/singular-and-plural-api-ids.png',
  dark: '/img/assets/apis/singular-and-plural-api-ids_DARK.png',
}}
/>

</details>

### 単一のドキュメントをフェッチする

ドキュメント <DocumentDefinition/> は、その `documentId` によって取得することができます。

```graphql title="Example query: Find a restaurant with its documentId"
{
  restaurant(documentId: "a1b2c3d4e5d6f7g8h9i0jkl") {
    name
    description
  }
}
```

### 複数のドキュメントを取得する

複数のドキュメント <DocumentDefinition/> を取得するためには、シンプルなフラットクエリまたは [Relay-style](https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/) クエリを使用することができます。

<Tabs groupId="flat-relay">

<TabItem value="flat" label="Flat queries">

複数のドキュメントを取得するためには、以下のようなフラットクエリを使用することができます。

```graphql title="Example query: Find all restaurants"
restaurants {
  documentId
  title
}
```

</TabItem>

<TabItem value="relay" label="Relay-style queries">

Relay-style クエリは、複数のドキュメントを取得し、メタ情報を返すために使用することができます。

```graphql title="Example query: Find all restaurants"
{
  restaurants_connection {
    nodes {
      documentId
      name
    }
    pageInfo {
      pageSize
      page
      pageCount
      total
    }
  }
}
```

</TabItem>

</Tabs>

#### 関連を取得する

フラットクエリまたは [Relay-style](https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/) クエリにおいて、関連データを含めて取得することができます。

<Tabs groupId="flat-relay">

<TabItem value="flat" label="Flat queries">

次の例は、"Restaurant" コンテンツタイプのすべてのドキュメントを取得し、それぞれに対して、"Category" コンテンツタイプとの多対多の関係に対するいくつかのフィールドも返します。

```graphql title="Example query: Find all restaurants and their associated categories"
{
  restaurants {
    documentId
    name
    description
    # categories is a many-to-many relation
    categories {
      documentId
      name
    }
  }
}
```

</TabItem>

<TabItem value="relay" label="Relay-style queries">

次の例は、Relay-style クエリを使用して "Restaurant" コンテンツタイプのすべてのドキュメントを取得し、各レストランに対して、"Category" コンテンツタイプとの多対多の関係に対するいくつかのフィールドも返します。

```graphql title="Example query: Find all restaurants and their associated categories"
{
  restaurants_connection {
    nodes {
      documentId
      name
      description
      # categories is a many-to-many relation
      categories_connection {
        nodes {
          documentId
          name
        } 
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
```

:::info
現時点では、`pageInfo` は最初のレベルのドキュメントに対してのみ動作します。Strapiの将来の実装では、関連に対して `pageInfo` を実装するかもしれません。

<details>
<summary><code>pageInfo</code> の可能な使用例：</summary>

<Columns>
<ColumnLeft>
これは動作します：

```graphql
{
  restaurants_connection {
    nodes {
      documentId
      name
      description
      # 多対多の関連性
      categories_connection {
        nodes {
          documentId
          name
        } 
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
```

</ColumnLeft>
<ColumnRight>
これは動作しません：

```graphql {13-19}
{
  restaurants_connection {
    nodes {
      documentId
      name
      description
      # 多対多の関連性
      categories_connection {
        nodes {
          documentId
          name
        }
        # サポートされていません
        pageInfo {
          page
          pageCount
          pageSize
          total
        }
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}}
```

</ColumnRight>
</Columns>
</details>

:::

</TabItem>

</Tabs>

### メディアフィールドの取得

メディアフィールドの内容は、他の属性と同様に取得します。

次の例では、"Restaurants" コンテンツタイプの各ドキュメントに添付された `cover` メディアフィールドの `url` 属性値を取得します：

```graphql
{
  restaurants {
    images {
      documentId
      url
    }
  }
}
```

複数のメディアフィールドに対しては、フラットクエリまたは[Relayスタイル](https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/)のクエリを使用できます：

<Tabs groupId="flat-relay">

<TabItem value="flat" label="フラットクエリ">

次の例では、"Restaurant" コンテンツタイプにある `images` 複数メディアフィールドからいくつかの属性を取得します：

```graphql
{
  restaurants {
    images_connection {
      nodes {
        documentId
        url
      }
    }
  }
}
```

</TabItem>

<TabItem value="relay" label="Relayスタイルクエリ">

次の例では、"Restaurant" コンテンツタイプにある `images` 複数メディアフィールドからいくつかの属性を取得します。これはRelayスタイルのクエリを使用しています：

```graphql
{
  restaurants {
    images_connection {
      nodes {
        documentId
        url
      }
    }
  }
}
```

:::info
現在、`pageInfo` はドキュメントに対してのみ機能します。Strapiの将来の実装では、メディアフィールドの `_connection` に対しても `pageInfo` が実装されるかもしれません。
:::

</TabItem>

</Tabs>

### コンポーネントの取得

コンポーネントの内容は、他の属性と同様に取得します。

次の例では、"Restaurants" コンテンツタイプの各ドキュメントに追加された `closingPeriod` コンポーネントの `label`、`start_date`、および `end_date` 属性値を取得します：

```graphql
{
  restaurants {
    closingPeriod {
      label
      start_date
      end_date
    }
  }
}
```

### ダイナミックゾーンデータの取得

ダイナミックゾーンはGraphQLのunion typesなので、フィールドをクエリするためには[fragments](https://www.apollographql.com/docs/react/data/fragments/)（つまり、`...on`を使用して）を使用する必要があります。ここで、コンポーネント名（`ComponentCategoryComponentname`の構文）を[`__typename`](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-__typename-field)に渡します：

次の例では、"Default"コンポーネントカテゴリの"Closingperiod"コンポーネントから`label`属性のデータを取得します。これは、"dz"ダイナミックゾーンに追加することができます：

```graphql
{
  restaurants {
    dz {
      __typename
      ...on ComponentDefaultClosingperiod {
        # コンポーネントの返す属性を定義
        label
      }
    }
  }
}
```

### 下書きまたは公開バージョンの取得 {#status}

[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)機能がコンテンツタイプに有効になっている場合、下書きまたは公開バージョンのドキュメント<DocumentDefinition/>を取得するために、クエリに`status`パラメータを追加することができます。

```graphql title="例：ドキュメントの下書きバージョンを取得する"
query Query($status: PublicationStatus) {
  restaurants(status: DRAFT) {
    documentId
    name
    publishedAt # nullを返すべき
  }
}
```

```graphql title="例：ドキュメントの公開バージョンを取得する"
query Query($status: PublicationStatus) {
  restaurants(status: PUBLISHED) {
    documentId
    name
    publishedAt
  }
}
```

## ミューテーション

GraphQLのミューテーションは、データの変更（例：データの作成、更新、削除）に使用されます。

コンテンツタイプがプロジェクトに追加されると、ドキュメント<DocumentDefinition/>の作成、更新、削除を行うための3つの自動生成されたGraphQLミューテーションがスキーマに追加されます。

例えば、"Restaurant"というコンテンツタイプの場合、以下のミューテーションが生成されます：

| ユースケース                              | 単数形のAPI ID      |
|-----------------------------------------|---------------------|
| 新しい"Restaurant"ドキュメントの作成      | `createRestaurant`  |
| 既存の"Restaurant"レストランの更新       | `updateRestaurant`  |
| 既存の"Restaurant"レストランの削除       | `deleteRestaurant`  |

### 新しいドキュメントの作成

新しいドキュメントを作成する際、`data`引数には、コンテンツタイプに特有の入力タイプが関連付けられます。

例えば、Strapiプロジェクトに"Restaurant"コンテンツタイプが含まれている場合、以下のようになります：

| ミューテーション           | 引数             | 入力タイプ           |
|------------------------|------------------|----------------------|
| `createRestaurant`     | `data`           | `RestaurantInput!`   |

次の例は、"Restaurant"コンテンツタイプの新しいドキュメントを作成し、その`name`と`documentId`を返します：

```graphql
mutation CreateRestaurant($data: RestaurantInput!) {
  createRestaurant(data: {
    name: "Pizzeria Arrivederci"
  }) {
    name
    documentId
  }
}
```

新しいドキュメントを作成すると、`documentId`が自動的に生成されます。

ミューテーションの実装では、リレーション属性もサポートされています。例えば、新しい"Category"を作成し、多くの"Restaurants"（それぞれの`documentId`を使用して）をそれに関連付けるクエリを以下のように書くことができます：

```graphql
mutation CreateCategory {
  createCategory(data: { 
    Name: "Italian Food"
    restaurants: ["a1b2c3d4e5d6f7g8h9i0jkl", "bf97tfdumkcc8ptahkng4puo"]
  }) {
    documentId
    Name
    restaurants {
      documentId
      name
    }
  }
}
```

:::tip
あなたのコンテンツタイプに対して国際化（i18n）機能が有効化されている場合、特定のロケール向けのドキュメントを作成することができます（詳細は[i18nドキュメンテーション](/dev-docs/i18n#graphl-create)を参照してください）。
:::

### 既存のドキュメントの更新

既存のドキュメント<DocumentDefinition/>を更新する際には、`documentId`と新しいコンテンツを含む`data`オブジェクトを渡します。`data`引数は、あなたのコンテンツタイプに特有の入力タイプを持つでしょう。

例えば、あなたのStrapiプロジェクトが"Restaurant"コンテンツタイプを含んでいる場合、以下のようになるでしょう：

| ミューテーション           | 引数         | 入力タイプ         |
|--------------------|------------------|--------------------|
| `updateRestaurant` | `data`           | `RestaurantInput!` |

例えば、以下の例では"Restaurants"コンテンツタイプから既存のドキュメントを更新し、新しい名前を付けています：

```graphql
mutation UpdateRestaurant($documentId: ID!, $data: RestaurantInput!) {
  updateRestaurant(
    documentId: "bf97tfdumkcc8ptahkng4puo",
    data: { name: "Pizzeria Amore" }
  ) {
    documentId
    name
  }
}
```

:::tip
あなたのコンテンツタイプに対して国際化（i18n）機能が有効化されている場合、特定のロケール向けのドキュメントを作成することができます（詳細は[i18nドキュメンテーション](/dev-docs/i18n#graphql-update)を参照してください）。
:::

#### 関係の更新

`documentId`または`documentId`の配列（関係のタイプによる）を渡すことで、関係的な属性を更新することができます。

例えば、以下の例では"Restaurant"コンテンツタイプからのドキュメントを更新し、`categories`関係フィールドを通じて"Category"コンテンツタイプからのドキュメントに関係を追加します：

```graphql
mutation UpdateRestaurant($documentId: ID!, $data: RestaurantInput!) {
  updateRestaurant(
    documentId: "slwsiopkelrpxpvpc27953je",
    data: { categories: ["kbbvj00fjiqoaj85vmylwi17"] }
  ) {
    documentId
    name
    categories {
      documentId
      Name
    }
  }
}
```

### ドキュメントの削除

ドキュメント<DocumentDefinition/>を削除するには、その`documentId`を渡します：

```graphql
mutation DeleteRestaurant {
  deleteRestaurant(documentId: "a1b2c3d4e5d6f7g8h9i0jkl") {
    documentId
  }
}
```

:::tip
あなたのコンテンツタイプに対して国際化（i18n）機能が有効化されている場合、ドキュメントの特定のローカライズバージョンを削除することができます（詳細は[i18nドキュメンテーション](/dev-docs/i18n#graphql-delete)を参照してください）。
:::

### メディアファイルに対するミューテーション

:::caution
現在、メディアフィールドに対するミューテーションは、メディアファイルの一意の識別子としてStrapi v4の`id`を使用し、Strapi 5の`documentId`は使用していません。
:::

メディアフィールドのミューテーションはファイルの`id`を使用します。しかし、Strapi 5のGraphQL APIのクエリでは、もはや`id`は返されません。メディアファイルの`id`は次のように見つけることができます：

- 管理パネルからの[メディアライブラリ](/user-docs/media-library)で、

<ThemedImage
    alt="メディアファイルIDを見つける方法を強調したメディアライブラリのスクリーンショット"
    sources={{
      light: '/img/assets/apis/media-field-id.png',
      dark: '/img/assets/apis/media-field-id.png'
    }}
  />

- または、REST APIの `GET` リクエストを送信して[メディアファイルを取得](/dev-docs/api/rest/populate-select#relations--media-fields)します。なぜなら、現在のREST APIのリクエストはメディアファイルの `id` と `documentId` の両方を返すからです。

#### アップロードしたメディアファイルの更新

アップロードしたメディアファイルを更新する際には、メディアの `id` （ `documentId` ではない）と新しい内容を含む `info` オブジェクトを渡します。 `info` 引数は、メディアファイルに特化した入力タイプを持っています。

例えば、あなたのStrapiプロジェクトが "Restaurant" コンテンツタイプを含んでいる場合、以下のようになります：

| ミューテーション           | 引数         | 入力タイプ         |
|--------------------|------------------|--------------------|
| `updateUploadFile` | `info`           | `FileInfoInput!`   |

例えば、以下の例では `id` が3のメディアファイルの `alternativeText` 属性を更新します：

```graphql
mutation Mutation($updateUploadFileId: ID!, $info: FileInfoInput) {
  updateUploadFile(
    id: 3,
    info: {
      alternativeText: "New alt text"
    }
  ) {
    documentId
    url
    alternativeText
  }
}
```

:::tip
アップロードのミューテーションがアクセス禁止エラーを返す場合は、Uploadプラグインの適切な権限が設定されていることを確認してください（[ユーザーガイド](/user-docs/users-roles-permissions/configuring-end-users-roles#editing-a-role)を参照）。
:::

#### アップロードしたメディアファイルの削除

アップロードしたメディアファイルを削除する際には、メディアの `id` （ `documentId` ではない）を渡します。

```graphql title="例：idが4のメディアファイルを削除"
mutation DeleteUploadFile($deleteUploadFileId: ID!) {
  deleteUploadFile(id: 4) {
    documentId # return its documentId
  }
}
```

:::tip
アップロードのミューテーションがアクセス禁止エラーを返す場合は、Uploadプラグインの適切な権限が設定されていることを確認してください（[ユーザーガイド](/user-docs/users-roles-permissions/configuring-end-users-roles#editing-a-role)を参照）。
:::

## フィルタ

<!-- TODO: create examples for every filter and expand this into a section -->
クエリは次の構文を持つ `filters` パラメータを受け入れることができます：

`filters: { field: { operator: value } }`

複数のフィルタを組み合わせることができ、また、論理演算子（`and`, `or`, `not`）も使用でき、オブジェクトの配列を受け入れます。

以下の演算子が利用可能です：

| 演算子           | 説明                              |
| -------------- | ---------------------------------- |
| `eq`           | 等しい                            |
| `ne`           | 等しくない                        |
| `lt`           | より小さい                        |
| `lte`          | 以下                              |
| `gt`           | より大きい                        |
| `gte`          | 以上                              |
| `in`           | 配列に含まれる                     |
| `notIn`        | 配列に含まれない                   |
| `contains`     | 含む、大文字小文字を区別           |
| `notContains`  | 含まない、大文字小文字を区別       |
| `containsi`    | 含む、大文字小文字を区別しない     |
| `notContainsi` | 含まない、大文字小文字を区別しない |
| `null`         | nullである                        |
| `notNull`      | nullでない                        |
| `between`      | ～の間にある                       |
| `startsWith`   | ～で始まる                        |
| `endsWith`     | ～で終わる                        |
| `and`          | 論理 `and`                        |
| `or`           | 論理 `or`                         |
| `not`          | 論理 `not`                        |

```graphql title="Example with advanced filters: Fetch pizzerias with an averagePrice lower than 20"
{
  restaurants(
    filters: { 
      averagePrice: { lt: 20 },
      or: [
        { name: { eq: "Pizzeria" }}
        { name: { startsWith: "Pizzeria" }}
      ]}
    ) {
    documentId
    name
    averagePrice
  }
}
```

## ソート

クエリは次の構文を持つ `sort` パラメータを受け入れることができます：

- 単一の値に基づいてソートするには：`sort: "value"` 
- 複数の値に基づいてソートするには：`sort: ["value1", "value2"]`

ソート順は `:asc`（昇順、デフォルト、省略可能）または `:desc`（降順）で定義できます。

```graphql title="Example: Fetch and sort on name by ascending order"
{
  restaurants(sort: "name") {
    documentId
    name
  }
}
```

```graphql title="Example: Fetch and sort on average price by descending order"
{
  restaurants(sort: "averagePrice:desc") {
    documentId
    name
    averagePrice
  }
}
```

```graphql title="Example: Fetch and sort on title by ascending order, then on average price by descending order"
{
  restaurants(sort: ["name:asc", "averagePrice:desc"]) {
    documentId
    name
    averagePrice
  }
}
```

## ページネーション

[Relay-style](https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/) クエリは `pagination` パラメータを受け入れることができます。結果はページまたはオフセットでページネーションできます。

:::note
ページネーション方法は混在させることはできません。常に `page` と `pageSize` または `start` と `limit` を使用してください。
:::

### ページによるページネーション

| パラメータ              | 説明 | デフォルト |
| ---------------------- | ----------- | ------- |
| `pagination.page`      | ページ番号 | 1       |
| `pagination.pageSize`  | ページサイズ   | 10      |

```graphql title="例: ページによるページネーション"
{
  restaurants_connection(pagination: { page: 1, pageSize: 10 }) {
    nodes {
      documentId
      name
    }
    pageInfo {
      page
      pageSize
      pageCount
      total
    }
  }
}
```

### オフセットによるページネーション

| パラメーター          | 説明                  | デフォルト | 最大値 |
| ------------------ | ---------------------------- | ------- | ------- |
| `pagination.start` | 開始値                  | 0       | -       |
| `pagination.limit` | 返すエンティティの数 | 10      | -1      |

```graphql title="例: オフセットによるページネーション"
{
  restaurants_connection(pagination: { start: 10, limit: 19 }) {
    nodes {
      documentId
      name
    }
    pageInfo {
      page
      pageSize
      pageCount
      total
    }
  }
}
```

:::tip
`pagination.limit`のデフォルト値と最大値は、`graphql.config.defaultLimit`と`graphql.config.maxLimit`のキーを使って[`./config/plugins.js`](/dev-docs/configurations/plugins#graphql-configuration)ファイルで設定できます。
:::

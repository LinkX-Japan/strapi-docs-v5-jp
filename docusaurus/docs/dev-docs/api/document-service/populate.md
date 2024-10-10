---
title: Document Service APIを使用したフィールドのPopulate
description: StrapiのDocument Service APIを使用して、特定のフィールドをpopulateまたはselectします。
displayed_sidebar: devDocsSidebar
tags:
- Components
- Content API
- Document Service API
- dynamic zones
- populate
- Populating with create()
- Populating with publish()
- Populating with update()
---

# Document Service API: フィールドのPopulate

デフォルトでは、[Document Service API](/dev-docs/api/document-service)は関連性、メディアフィールド、コンポーネント、またはダイナミックゾーンをpopulateしません。このページでは、特定のフィールドを[`populate`](#populate)するためにpopulateパラメーターを使用する方法について説明します。

:::tip
クエリ結果で特定のフィールドのみを返すために、`select`パラメータも使用できます（[`select`パラメータ](/dev-docs/api/document-service/fields)のドキュメンテーションを参照してください）。
:::

:::caution
Users & Permissionsプラグインがインストールされている場合、populateされているコンテンツタイプに対して`find`権限が有効になっている必要があります。ロールがコンテンツタイプへのアクセス権を持っていない場合、そのコンテンツタイプはpopulateされません。
:::

<!-- TODO: add link to populate guides (even if REST API, the same logic still applies) -->

## 関連性とメディアフィールド

クエリは`populate`パラメータを受け入れ、どのフィールドをpopulateするかを明示的に定義できます。以下に構文オプションの例を示します。

### すべての関連性に対して1レベルをPopulateする

すべての関連性に対して1レベル深くpopulateするには、`*`ワイルドカードを`populate`パラメータと組み合わせて使用します：

<ApiCall noSideBySide>
<Request title="Example request">

```js
const documents = await strapi.documents("api::article.article").findMany({
  populate: "*",
});
```

</Request>

<Response title="Example response">

```json
{
  [
    {
      "id": "cjld2cjxh0000qzrmn831i7rn",
      "title": "Test Article",
      "slug": "test-article",
      "body": "Test 1",
      // ...
      "headerImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "17520.jpg",
            "alternativeText": "17520.jpg",
            "formats": {
              // ...
            }
            // ...
          }
        }
      },
      "author": {
        // ...
      },
      "categories": {
        // ...
      }
    }
    // ...
  ]
}
```

</Response>
</ApiCall>

### 特定の関連性に対して1レベルをPopulateする

特定の関連性に対して1レベル深くpopulateするには、`populate`配列に関連性の名前を渡します：

<ApiCall noSideBySide>
<Request title="Example request">

```js
const documents = await strapi.documents("api::article.article").findMany({
  populate: ["headerImage"],
});
```

</Request>

<Response title="Example response">

```json
[
  {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "title": "Test Article",
    "slug": "test-article",
    "body": "Test 1",
    // ...
    "headerImage": {
      "id": 2,
      "name": "17520.jpg"
      // ...
    }
  }
  // ...
]
```

</Response>
</ApiCall>

### 特定の関連性に対して複数のレベルをPopulateする

特定の関連を複数レベル深く充実させるためには、`populate`とともにオブジェクト形式を使用します：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
const documents = await strapi.documents("api::article.article").findMany({
  populate: {
    categories: {
      populate: ["articles"],
    },
  },
});
```

</Request>

<Response title="例のレスポンス">

```json
[
  {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "title": "テスト記事",
    "slug": "test-article",
    "body": "テスト1",
    // ...
    "categories": {
      "id": 1,
      "name": "テストカテゴリ",
      "slug": "test-category",
      "description": "テスト1"
      // ...
      "articles": [
        {
          "id": 1,
          "title": "テスト記事",
          "slug": "test-article",
          "body": "テスト1",
          // ...
        }
        // ...
      ]
    }
  }
  // ...
]
```

</Response>
</ApiCall>

## コンポーネントとダイナミックゾーン

コンポーネントは関連と同じように充実します：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
const documents = await strapi.documents("api::article.article").findMany({
  populate: ["testComp"],
});
```

</Request>

<Response title="例のレスポンス">

```json
[
  {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "title": "テスト記事",
    "slug": "test-article",
    "body": "テスト1",
    // ...
    "testComp": {
      "id": 1,
      "name": "テストコンポーネント"
      // ...
    }
  }
  // ...
]
```

</Response>
</ApiCall>

ダイナミックゾーンは本質的に高度にダイナミックなコンテンツ構造です。ダイナミックゾーンを充実させるには、`on`プロパティを使用してコンポーネントごとにpopulateクエリを定義する必要があります。

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
const documents = await strapi.documents("api::article.article").findMany({
  populate: {
    testDZ: {
      on: {
        "test.test-compo": {
          fields: ["testString"],
          populate: ["testNestedCompo"],
        },
      },
    },
  },
});
```

</Request>

<Response title="例のレスポンス">

```json
[
  {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "title": "テスト記事",
    "slug": "test-article",
    "body": "テスト1",
    // ...
    "testDZ": [
      {
        "id": 3,
        "__component": "test.test-compo",
        "testString": "test1",
        "testNestedCompo": {
          "id": 3,
          "testNestedString": "testNested1"
        }
      }
    ]
  }
  // ...
]
```

</Response>
</ApiCall>

## `create()`での充実

ドキュメントを作成しながら充実するには：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
strapi.documents("api::article.article").create({
  data: {
    title: "テスト記事",
    slug: "test-article",
    body: "テスト1",
    headerImage: 2,
  },
  populate: ["headerImage"],
});
```

</Request>

<Response title="例のレスポンス">

```json
{
  "id": "cjld2cjxh0000qzrmn831i7rn",
  "title": "テスト記事",
  "slug": "test-article",
  "body": "テスト1",
  "headerImage": {
    "id": 2,
    "name": "17520.jpg"
    // ...
  }
}
```

</Response>
</ApiCall>

## `update()`でのPopulating

ドキュメントを更新しながらPopulateする方法：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
strapi.documents("api::article.article").update("cjld2cjxh0000qzrmn831i7rn", {
  data: {
    title: "テスト記事の更新",
  },
  populate: ["headerImage"],
});
```

</Request>

<Response title="例のレスポンス">

```json
{
  "id": "cjld2cjxh0000qzrmn831i7rn",
  "title": "テスト記事の更新",
  "slug": "test-article",
  "body": "テスト1",
  "headerImage": {
    "id": 2,
    "name": "17520.jpg"
    // ...
  }
}
```

</Response>
</ApiCall>

## `publish()`でのPopulating

ドキュメントを公開しながらPopulateする方法（`unpublish()`や`discardDraft()`でも同じ動作）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

```js
strapi.documents("api::article.article").publish("cjld2cjxh0000qzrmn831i7rn", {
  populate: ["headerImage"],
});
```

</Request>

<Response title="例のレスポンス">

```json
{
  "id": "cjld2cjxh0000qzrmn831i7rn",
  "versions": [
    {
      "id": "cjld2cjxh0001qzrm1q1i7rn",
      "locale": "en",
      // ...
      "headerImage": {
        "id": 2,
        "name": "17520.jpg"
        // ...
      }
    }
  ]
}
```

</Response>
</ApiCall>

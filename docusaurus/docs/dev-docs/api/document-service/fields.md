---
title: ドキュメントサービスAPIを使用したフィールドの選択
description: StrapiのドキュメントサービスAPIを使用して、クエリの結果に返されるフィールドを選択する方法を説明します。
displayed_sidebar: devDocsSidebar
tags:
- API
- コンテンツAPI
- create()
- コンテンツの削除
- ドキュメントサービスAPI
- discardDraft()
- findOne()
- findMany()
- findFirst()
- publish()
- fields
- update()
- コンテンツの非公開化
---

import IdsInResponse from '/docs/snippets/id-in-responses.md'

# ドキュメントサービスAPI: フィールドの選択

デフォルトでは、[ドキュメントサービスAPI](/dev-docs/api/document-service) はドキュメントのすべてのフィールドを返しますが、フィールドのポピュレートは行いません。このページでは、`fields` パラメーターを使用してクエリ結果に特定のフィールドのみを返す方法について説明します。

:::tip
`populate` パラメーターを使用して、関連データやメディアフィールド、コンポーネント、ダイナミックゾーンをポピュレートすることもできます（[`populate` パラメーター](/dev-docs/api/document-service/populate)のドキュメントを参照してください）。
:::

<IdsInResponse />

## `findOne()` クエリでフィールドを選択

[特定のドキュメントを取得](/dev-docs/api/document-service#findone)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").findOne({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm',
  fields: ["name", "description"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "ビスコッテレストラン",
  description: "ビスコッテレストランへようこそ！…"
}
```

</Response>
</ApiCall>

## `findFirst()` クエリでフィールドを選択

[条件に一致する最初のドキュメントを取得](/dev-docs/api/document-service#findfirst)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").findFirst({
  fields: ["name", "description"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{
  documentId: "a1b2c3d4e5f6g7h8i9j0klm",
  name: "ビスコッテレストラン",
  description: "ビスコッテレストランへようこそ！…"
}
```

</Response>
</ApiCall>

## `findMany()` クエリでフィールドを選択

[複数のドキュメントを取得](/dev-docs/api/document-service#findmany)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const documents = await strapi.documents("api::restaurant.restaurant").findMany({
  fields: ["name", "description"],
});
```

</Request>

<Response title="レスポンスの例">

```js
[
  {
    documentId: "a1b2c3d4e5f6g7h8i9j0klm",
    name: "ビスコッテレストラン",
    description: "ビスコッテレストランへようこそ！…"
  }
  // …
]
```

</Response>
</ApiCall>

## `create()` クエリでフィールドを選択

[ドキュメントを作成](/dev-docs/api/document-service#create)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").create({
  data: {
    name: "レストランB",
    description: "レストランの説明",
  },
  fields: ["name", "description"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{
  id: 4,
  documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
  name: 'レストランB',
  description: 'レストランの説明'
}
```

</Response>
</ApiCall>

## `update()` クエリでフィールドを選択

[ドキュメントを更新](/dev-docs/api/document-service#update)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").update({
  documentId: "fmtr6d7ktzpgrijqaqgr6vxs",
  data: {
    name: "レストランC",
  },
  fields: ["name"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{ 
  documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
  name: 'レストランC'
}
```

</Response>
</ApiCall>

## `delete()` クエリでフィールドを選択

[ドキュメントを削除](/dev-docs/api/document-service#delete)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").delete({
  documentId: "fmtr6d7ktzpgrijqaqgr6vxs",
  fields: ["name"],
});
```

</Request>

<Response title="レスポンスの例">

```js
  documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
  // 削除されたドキュメントの全バージョンが返されます
  entries: [
    {
      id: 4,
      documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
      name: 'レストランC',
      // …
    }
  ]
}
```

</Response>
</ApiCall>

## `publish()` クエリでフィールドを選択

[ドキュメントを公開](/dev-docs/api/document-service#publish)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").publish({
  documentId: "fmtr6d7ktzpgrijqaqgr6vxs",
  fields: ["name"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{
  documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
  // 公開されたロケールエントリーがすべて返されます
  entries: [
    {
      documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
      name: 'レストランB'
    }
  ]
}
```

</Response>
</ApiCall>

## `unpublish()` クエリでフィールドを選択

[ドキュメントの公開を取り消す](/dev-docs/api/document-service#unpublish)際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").unpublish({
  documentId: "cjld2cjxh0000qzrmn831i7rn",
  fields: ["name"],
});
```

</Request>

<Response title="レスポンスの例">

```js
{
  documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
  // 公開されたロケールエントリーがすべて返されます
  entries: [
    {
      documentId: 'fmtr6d7ktzpgrijqaqgr6vxs',
      name: 'レストランB'
    }
  ]
}
```

</Response>
</ApiCall>

## `discardDraft()` クエリでフィールドを選択

[ドキュメントの

ドラフトバージョンを破棄](/dev-docs/api/document-service#discarddraft)する際に、ドキュメントサービスAPIで返されるフィールドを選択するには:

<ApiCall noSideBySide>
<Request title="リクエストの例">

```js
const document = await strapi.documents("api::restaurant.restaurant").discardDraft({
  documentId: "fmtr6d7ktzpgrijqaqgr6vxs",
  fields: ["name"],
});
```

</Request>

<Response title="レスポンスの例">

```json
{
  documentId: "fmtr6d7ktzpgrijqaqgr6vxs",
  // 破棄されたドラフトエントリーがすべて返されます
  entries: [
    {
      "name": "レストランB"
    }
  ]
}
```

</Response>
</ApiCall>

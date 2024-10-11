---
title: モデル
description: Strapiのモデル（つまり、コンテンツタイプ、コンポーネント、ダイナミックゾーン）はデータ構造の表現を定義します。
toc_max_heading_level: 4
tags:
- 管理パネル
- バックエンドのカスタマイズ
- バックエンドサーバー
- コンテンツタイプ
- コンテンツタイプビルダー
- モデル
- モデルスキーマ
- ライフサイクルフック
- REST API 
---

# モデル

Strapiはヘッドレスのコンテンツ管理システム（CMS）であるため、コンテンツのデータ構造を作成することは、このソフトウェアを使用する上で最も重要な側面の一つです。モデルはデータ構造の表現を定義します。

Strapiには2種類のモデルがあります：

- コンテンツタイプは、管理するエントリーの数により、コレクションタイプまたはシングルタイプになります。
- コンポーネントは、複数のコンテンツタイプで再利用可能なデータ構造です。

初めての方は、管理パネル内の[Content-type Builder](/user-docs/content-type-builder)でいくつかのモデルを生成するのが便利です。ユーザーインターフェースは多くの検証タスクを引き受け、コンテンツのデータ構造を作成するためのすべてのオプションを提示します。生成されたモデルマッピングは、このドキュメンテーションを使用してコードレベルでレビューすることができます。

## モデルの作成

コンテンツタイプとコンポーネントモデルはそれぞれ異なる方法で作成および保存されます。

### コンテンツタイプ

Strapiのコンテンツタイプは次の方法で作成できます：

- 管理パネルの[Content-type Builder](/user-docs/content-type-builder/introduction-to-content-types-builder.md)を使用する
- または、[StrapiのインタラクティブCLI `strapi generate`](/dev-docs/cli#strapi-generate) コマンドを使用する。

コンテンツタイプでは以下のファイルが使用されます：

- モデルの[スキーマ](#model-schema)定義のための `schema.json`（どちらの方法でコンテンツタイプを作成しても自動的に生成されます）
- [ライフサイクルフック](#lifecycle-hooks)のための `lifecycles.js`。このファイルは手動で作成する必要があります。

これらのモデルファイルは `./src/api/[api-name]/content-types/[content-type-name]/` に保存され、これらのフォルダ内にあるJavaScriptまたはJSONファイルはすべてコンテンツタイプのモデルとしてロードされます（[プロジェクト構造](/dev-docs/project-structure)を参照してください）。

:::note
[TypeScript](/dev-docs/typescript.md)を有効にしたプロジェクトでは、`ts:generate-types`コマンドを使用してスキーマの型定義を生成できます。
:::

### コンポーネント

コンポーネントモデルはCLIツールで作成することはできません。[Content-type Builder](/user-docs/content-type-builder)を使用するか、手動で作成してください。

コンポーネントモデルは `./src/components` フォルダに保存されます。各コンポーネントは、そのコンポーネントが所属するカテゴリーに名前をつけたサブフォルダ内になければなりません（[プロジェクト構造](/dev-docs/project-structure)を参照してください）。

## モデルスキーマ

モデルの `schema.json` ファイルは以下から構成されます：

- [設定](#model-settings)、モデルが表現するコンテンツタイプの種類や、データが保存されるべきテーブル名など、
- [情報](#model-information)、主に管理パネルでモデルを表示したり、RESTおよびGraphQL APIを通じてアクセスするために使用されます、
- [属性](#model-attributes)、モデルのデータ構造を記述します、
- そして[オプション](#model-options)は、モデルに特定の振る舞いを定義するために使用されます。

### モデル設定

モデルの一般的な設定は、以下のパラメータで設定できます：

| パラメータ                                          | タイプ   | 説明                                                                                                            |
| -------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `collectionName`                                  | String | データが保存されるべきデータベースのテーブル名                                                    |
| `kind`<br /><br />_オプション、<br/>コンテンツタイプのみ_ | String | コンテンツタイプが：<ul><li>コレクションタイプ (`collectionType`)</li><li>またはシングルタイプ (`singleType`)</li></ul>であることを定義します |

```json
// ./src/api/[api-name]/content-types/restaurant/schema.json

{
  "kind": "collectionType",
  "collectionName": "Restaurants_v1",
}
```

### モデル情報

モデルのスキーマの`info`キーは、管理パネルでモデルを表示し、Content APIを通じてアクセスするために使用される情報を記述します。以下のパラメータを含みます：

<!-- ? with the new design system, do we still use FontAwesome?  -->

| パラメータ            | タイプ   | 説明                                                                                                                                 |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `displayName`  | String | 管理パネルで使用するデフォルトの名前                                                                                                      |
| `singularName` | String | コンテンツタイプ名の単数形。<br />APIルートとデータベース/テーブルコレクションの生成に使用されます。<br /><br />ケバブケースであるべきです。 |
| `pluralName`   | String | コンテンツタイプ名の複数形。<br />APIルートとデータベース/テーブルコレクションの生成に使用されます。<br /><br />ケバブケースであるべきです。    |
| `description`  | String | モデルの説明                                                                                                                   |

```json title="./src/api/[api-name]/content-types/restaurant/schema.json"

  "info": {
    "displayName": "Restaurant",
    "singularName": "restaurant",
    "pluralName": "restaurants",
    "description": ""
  },
```

### モデル属性

モデルのデータ構造は、属性のリストで構成されています。各属性には `type` パラメータがあり、これはその性質を記述し、属性を単純なデータピースまたはStrapiによって使用されるより複雑な構造として定義します。

利用可能な属性のタイプは多岐にわたります：

- スカラータイプ（例：文字列、日付、数値、ブーリアンなど），
- Strapi特有のタイプ、例えば：
  - ファイルを[メディアライブラリ](/user-docs/content-type-builder/configuring-fields-content-type.md#media)を通じてアップロードするための `media`
  - コンテンツタイプ間の[関連](#relations)を記述するための `relation`
  - [カスタムフィールド](#custom-fields)とその特定のキーを記述するための `customField`
  - [コンポーネント](#components-1)（つまり、複数のコンテンツタイプで使用可能なデータ構造）を定義するための `component`
  - [ダイナミックゾーン](#dynamic-zones)（つまり、コンポーネントのリストに基づく柔軟なスペース）を定義するための `dynamiczone`
  - そして `locale` と `localizations` のタイプは、[国際化（i18n）プラグイン](/dev-docs/i18n)にのみ使用されます。

属性の `type` パラメータは、以下の値のいずれかであるべきです：

| タイプのカテゴリ | 利用可能なタイプ |
|------|-------|
| 文字列タイプ | <ul><li>`string`</li> <li>`text`</li> <li>`richtext`</li><li>`enumeration`</li> <li>`email`</li><li>`password`</li><li>[`uid`](#uid-type)</li></ul> |
| 日付タイプ | <ul><li>`date`</li> <li>`time`</li> <li>`datetime`</li> <li>`timestamp`</li></ul> |
| 数値タイプ | <ul><li>`integer`</li><li>`biginteger`</li><li>`float`</li> <li>`decimal`</li></ul> |
| その他の汎用タイプ |<ul><li>`boolean`</li><li>`json`</li></ul> |
| Strapi固有の特別なタイプ |<ul><li>`media`</li><li>[`relation`](#relations)</li><li>[`customField`](#custom-fields)</li><li>[`component`](#components)</li><li>[`dynamiczone`](#dynamic-zones)</li></ul> |
| 国際化（i18n）関連タイプ<br /><br />_コンテンツタイプで[i18n](/dev-docs/i18n)が有効になっている場合のみ使用可能_|<ul><li>`locale`</li><li>`localizations`</li></ul> |

#### バリデーション

基本的なバリデーションは、以下のパラメータを使用して属性に適用することができます：

| パラメータ | タイプ    | 説明                                                                                               | デフォルト |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------- | ------- |
| `required`     | Boolean | `true`の場合、このプロパティに必須のバリデータを追加します                                                     | `false` |
| `max`          | Integer | 値が指定した最大値以上であるかチェックします                                        | -       |
| `min`          | Integer | 値が指定した最小値以下であるかチェックします                                           | -       |
| `minLength`    | Integer | フィールド入力値の最小文字数                                                      | -       |
| `maxLength`    | Integer | フィールド入力値の最大文字数                                                      | -       |
| `private`      | Boolean | `true`の場合、属性はサーバーの応答から削除されます。<br/><br/>💡これは、機密データを隠すのに便利です。 | `false` |
| `configurable` | Boolean | `false`の場合、属性はContent-type Builderプラグインから設定できません。                         | `true`  |

```json title="./src/api/[api-name]/content-types/restaurant/schema.json"

{
  // ...
  "attributes": {
    "title": {
      "type": "string",
      "minLength": 3,
      "maxLength": 99,
      "unique": true
    },
    "description": {
      "default": "My description",
      "type": "text",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    }
    // ...
  }
}
```

#### データベースの検証と設定

:::caution 🚧 このAPIは実験的なものと考えられています。
これらの設定は高度な使用に予約されており、一部の機能を壊す可能性があります。これらの設定を安定したものにする計画はありません。
:::

データベースの検証と設定は、スキーマ移行中に`tableBuilder` Knex.js関数に直接渡されるカスタムオプションです。データベースの検証を使用すると、カスタム列設定を設定するための高度な制御が可能になります。以下のオプションは、属性ごとに`column: {}`オブジェクトで設定されます:

| パラメータ     | タイプ    | 説明                                                                                   | デフォルト |
| ------------- | ------- | --------------------------------------------------------------------------------------------- | ------- |
| `name`        | 文字列  | データベースのカラムの名前を変更します                                                | -       |
| `defaultTo`   | 文字列  | データベースの `defaultTo` を設定します。通常は `notNullable` と一緒に使用します                              | -       |
| `notNullable` | ブーリアン | データベースの `notNullable` を設定します。これにより、カラムが null になることがないようにします                          | `false` |
| `unsigned`    | ブーリアン | 数値のカラムにのみ適用され、負の値を取ることができないようにしますが、最大長は2倍になります | `false` |
| `unique`      | ブーリアン | データベースレベルでユニークを強制します。ドラフト＆公開機能と一緒に使用するときは注意が必要です               | `false` |
| `type`        | 文字列  | データベースのタイプを変更します。`type` に引数がある場合、それらは `args` に渡す必要があります            | -       |
| `args`        | 配列   | `type` などを変更するための Knex.js 関数に渡される引数                    | `[]`    |

```json title="./src/api/[api-name]/content-types/restaurant/schema.json"

{
  // ...
  "attributes": {
    "title": {
      "type": "string",
      "minLength": 3,
      "maxLength": 99,
      "unique": true,
      "column": {
        "unique": true // データベースでもユニークを強制
      }
    },
    "description": {
      "default": "My description",
      "type": "text",
      "required": true,
      "column": {
        "defaultTo": "My description", // データベースレベルでのデフォルトを設定
        "notNullable": true // データベースレベルで必須を強制、ドラフトでも
      }
    },
    "rating": {
      "type": "decimal",
      "default": 0,
      "column": {
        "defaultTo": 0,
        "type": "decimal", // ネイティブの decimal タイプを使用しつつ、カスタム精度を許可
        "args": [
          6,1 // カスタム精度とスケールを使用
        ]
      }
    }
    // ...
  }
}
```

#### `uid` タイプ

`uid` タイプは、管理パネルでフィールドの値をユニークな識別子 (UID)（例えば、記事のスラッグ）で自動的にプリフィルするために使用されます。これは2つのオプションパラメータに基づいています：

- `targetField` (文字列): 使用される場合、ターゲットとして定義されたフィールドの値がUIDの自動生成に使用されます。
- `options` (文字列): 使用される場合、UIDは[基礎となる `uid` ジェネレータ](https://github.com/sindresorhus/slugify)に渡された一連のオプションに基づいて生成されます。結果として得られる `uid` は次の正規表現パターンに一致する必要があります：`/^[A-Za-z0-9-_.~]*$`。

#### 関係

関係はコンテンツタイプを互いにリンクします。関係はモデルの [属性](#model-attributes) で `type: 'relation'` として明示的に定義され、以下の追加パラメータを受け入れます：

| パラメータ                         | 説明                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `relation`                  | これらの値の間の関係のタイプ:<ul><li>`oneToOne`</li><li>`oneToMany`</li><li>`manyToOne`</li><li>`manyToMany`</li></ul>                   |
| `target`                    | ターゲットのコンテンツタイプの名前を文字列値として受け入れます                                                                                   |
| `mappedBy` と `inversedBy`<br /><br />_オプション_ | 双方向の関係では、所有側が `inversedBy` キーを宣言し、逆側が `mappedBy` キーを宣言します |

<Tabs>

<TabItem value="one-to-one" label="一対一">

一対一の関係は、1つのエントリが他の1つのエントリにのみリンクできる場合に便利です。

これらは一方向または双方向の関係性を持つことができます。一方向の関係では、モデルのうちの1つだけがそのリンクされたアイテムと共に問い合わせることができます。

<details>
<summary>一方向のユースケース例:</summary>

  - ブログ記事はカテゴリに所属しています。
  - 記事を問い合わせるとそのカテゴリを取得できますが、
  - カテゴリを問い合わせてもその所有記事は取得できません。

  ```json title="./src/api/[api-name]/content-types/article/schema.json"

    // …
    attributes: {
      category: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'category',
      },
    },
    // …
  ```

</details>

<details>
<summary>双方向のユースケース例:</summary>

  - ブログ記事はカテゴリに所属しています。
  - 記事を問い合わせるとそのカテゴリを取得できますし、
  - カテゴリを問い合わせるとその所有記事も取得できます。

  ```json title="./src/api/[api-name]/content-types/article/schema.json"

    // …
    attributes: {
      category: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'category',
        inversedBy: 'article',
      },
    },
    // …

  ```

  ```json title="./src/api/[api-name]/content-types/category/schema.json"

    // …
    attributes: {
      article: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'article',
        mappedBy: 'category',
      },
    },
    // …

  ```

</details>

</TabItem>

<TabItem value="one-to-many" label="一対多">

一対多の関係は、以下の場合に便利です：

- コンテンツタイプAからのエントリが別のコンテンツタイプBの多くのエントリにリンクされている場合、
- コンテンツタイプBからのエントリがコンテンツタイプAからの1つのエントリにのみリンクされている場合。

一対多の関係は常に双方向であり、通常は対応する多対一の関係と共に定義されます：

<details>
<summary>例:</summary>
一人の人が多くの植物を所有することができますが、一つの植物は一人の人にのみ所有されます。

```json title="./src/api/[api-name]/content-types/plant/schema.json"

  // …
  attributes: {
    owner: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::person.person',
      inversedBy: 'plants',
    },
  },
  // …

```

```json title="./src/api/person/models/schema.json"

  // …
  attributes: {
    plants: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::plant.plant',
      mappedBy: 'owner',
    },
  },
  // …
```

</details>

</TabItem>

<TabItem value="many-to-one" label="多対一">

多対一の関係は、多数のエントリを1つのエントリにリンクするのに便利です。

これらは一方向または双方向の関係性を持つことができます。一方向の関係では、モデルのうち1つだけがリンクされたアイテムと共にクエリを実行できます。

<details>
<summary>一方向の使用ケース例:</summary>

  1冊の本は多数の著者によって書かれることができます。

  ```json title="./src/api/[api-name]/content-types/book/schema.json"

    // …
    attributes: {
      author: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'author',
      },
    },
    // …

  ```

</details>

<details>
<summary>双方向の使用ケース例:</summary>

  記事は1つのカテゴリーにしか属せず、カテゴリーは多数の記事を持つことができます。

  ```json title="./src/api/[api-name]/content-types/article/schema.json"

    // …
    attributes: {
      author: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'category',
        inversedBy: 'article',
      },
    },
    // …
  ```

  ```json title="./src/api/[api-name]/content-types/category/schema.json"

    // …
    attributes: {
      books: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'article',
        mappedBy: 'category',
      },
    },
    // …
  ```

</details>

</TabItem>

<TabItem value="many-to-many" label="多対多">

多対多の関係は以下の場合に便利です：

- コンテンツタイプAのエントリがコンテンツタイプBの多数のエントリにリンクされている場合、
- そして、コンテンツタイプBのエントリもコンテンツタイプAの多数のエントリにリンクされている場合。

多対多の関係は一方向または双方向の関係性を持つことができます。一方向の関係では、モデルのうち1つだけがリンクされたアイテムと共にクエリを実行できます。

<details>
<summary>一方向の使用ケース例:</summary>

  ```json
    // …
    attributes: {
      categories: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'category',
      },
    },
    // …
  ```

</details>

<details>
<summary>双方向の使用ケース例:</summary>

記事は多数のタグを持つことができ、タグは多数の記事に割り当てることができます。

  ```json title="/src/api/[api-name]/content-types/article/schema.json"

    // …
    attributes: {
      tags: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'tag',
        inversedBy: 'articles',
      },
    },
    // …
  ```

  ```json title="./src/api/[api-name]/content-types/tag/schema.json"

// …
    attributes: {
      articles: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'article',
        mappedBy: 'tag',
      },
    },
    // …
  ```

</details>

<!-- ? この注釈と次の例に何をすべきかわからないので、とりあえずコメントアウトしています -->
<!-- :::tip 注意
`tableName`キーは結合テーブルの名前を定義します。これは一度だけ指定する必要があります。指定されていない場合、Strapiはデフォルトのものを使用します。Strapiによって生成された名前が使用しているデータベースにとって長すぎる場合、結合テーブルの名前を定義するのに便利です。
:::

**パス —** `./src/api/category/models/Category.settings.json`.

```js
{
  "attributes": {
    "products": {
      "collection": "product",
      "via": "categories"
    }
  }
}
``` -->

</TabItem>

</Tabs>

#### カスタムフィールド

[カスタムフィールド](/dev-docs/custom-fields.md)は、新しいタイプのフィールドをコンテンツタイプに追加することでStrapiの機能を拡張します。カスタムフィールドは、モデルの[属性](#model-attributes)で`type: customField`と明示的に定義されます。
カスタムフィールドの属性は以下も受け入れます:

カスタムフィールドの属性は以下の特性を示します:

- `customField`属性は、どの登録済みのカスタムフィールドを使用するべきかを示す一意の識別子として機能します。その値は以下に従います:
   - プラグインがカスタムフィールドを作成した場合は`plugin::plugin-name.field-name`形式
   - 現在のStrapiアプリケーション特有のカスタムフィールドの場合は`global::field-name`形式
- そして、カスタムフィールドを登録する際に定義されたものに応じて追加のパラメータ（[カスタムフィールドのドキュメンテーション](/dev-docs/custom-fields.md)を参照）。

```json title="./src/api/[apiName]/[content-type-name]/content-types/schema.json"

{
  // …
  "attributes": {
    "attributeName": { // attributeNameは実際の属性名に置き換えられます
      "type": "customField",
      "customField": "plugin::color-picker.color",
      "options": {
        "format": "hex"
      }
    }
  }
  // …
}
```

#### コンポーネント

コンポーネントフィールドは、コンテンツタイプとコンポーネント構造との間の関係を作り出します。コンポーネントは、モデルの[属性](#model-attributes)で`type: 'component'`と明示的に定義され、以下の追加パラメータを受け入れます:

| パラメータ    | タイプ    | 説明                                                                              |
| ------------ | ------- | ---------------------------------------------------------------------------------------- |
| `repeatable` | Boolean | コンポーネントが繰り返し可能かどうかにより、`true`または`false`になります       |
| `component`  | String  | 対応するコンポーネントを定義し、この形式に従います:<br/>`<category>.<componentName>`  |

```json title="./src/api/[apiName]/restaurant/content-types/schema.json"

{
  "attributes": {
    "openinghours": {
      "type": "component",
      "repeatable": true,
      "component": "restaurant.openinghours"
    }
  }
}
```

#### ダイナミックゾーン

ダイナミックゾーンは、[コンポーネント](#components-2)の混在リストに基づいてコンテンツを構成するための柔軟なスペースを作成します。

ダイナミックゾーンは、モデルの[属性](#model-attributes)で `type: 'dynamiczone'`と明示的に定義されています。また、`components`配列を受け入れ、各コンポーネントはこの形式に従って名前付けされるべきです：`<category>.<componentName>`。

```json title="./src/api/[api-name]/content-types/article/schema.json"

{
  "attributes": {
    "body": {
      "type": "dynamiczone",
      "components": ["article.slider", "article.content"]
    }
  }
}
```

### モデルオプション

`options`キーは特定の動作を定義するために使用され、以下のパラメータを受け入れます：

| パラメータ           | タイプ             | 説明                                                                                                                                                                                                                                                                                                        |
|---------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `privateAttributes` | 文字列の配列 | モデルの属性として実際に定義されていない一連の属性をプライベートとして扱うことができます。これは、APIのレスポンスからタイムスタンプを削除するために使用できます。<br /><br /> モデルで定義された`privateAttributes`は、グローバルなStrapi設定で定義された`privateAttributes`とマージされます。 |
| `draftAndPublish`   | ブーリアン          | 下書きと公開の機能を有効にします。<br /><br /> デフォルト値: `true`（コンテンツタイプがインタラクティブなCLIから作成された場合は`false`）。                                                                                                                                                                                    |
| `populateCreatorFields` | ブーリアン | REST APIによって返されるレスポンスに`createdBy`と`updatedBy`フィールドを埋め込みます（詳細は[ガイド](/dev-docs/api/rest/guides/populate-creator-fields)を参照してください）。<br/><br/>デフォルト値: `false`。 |

```json title="./src/api/[api-name]/content-types/restaurant/schema.json"

{
  "options": {
    "privateAttributes": ["id", "createdAt"],
    "draftAndPublish": true
  }
}
```

## ライフサイクルフック

ライフサイクルフックは、Strapiクエリが呼び出されるときにトリガーされる関数です。これらは、管理パネルを通じてコンテンツを管理したり、`queries`を使用してカスタムコードを開発したりするときに自動的にトリガーされます。

ライフサイクルフックは、宣言的にまたはプログラム的にカスタマイズすることができます。

:::caution
Strapiの関数ではなく[knex](https://knexjs.org/)ライブラリを直接使用すると、ライフサイクルフックはトリガーされません。
:::

:::strapi ドキュメントサービスAPI：ライフサイクルとミドルウェア
ドキュメントサービスAPIは、呼び出されるメソッドに基づいてさまざまなデータベースライフサイクルフックをトリガーします。完全なリファレンスについては、[ドキュメントサービスAPI：ライフサイクルフック](/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service#table)を参照してください。バルクアクションのライフサイクル（`createMany`、`updateMany`、`deleteMany`）は、ドキュメントサービスAPIメソッドによってトリガーされることはありません。[ドキュメントサービスミドルウェア](/dev-docs/api/document-service/middlewares)も実装することができます。
:::

### 利用可能なライフサイクルイベント

以下のライフサイクルイベントが利用可能です：

- `beforeCreate`
- `beforeCreateMany`
- `afterCreate`
- `afterCreateMany`
- `beforeUpdate`
- `beforeUpdateMany`
- `afterUpdate`
- `afterUpdateMany`
- `beforeDelete`
- `beforeDeleteMany`
- `afterDelete`
- `afterDeleteMany`
- `beforeCount`
- `afterCount`
- `beforeFindOne`
- `afterFindOne`
- `beforeFindMany`
- `afterFindMany`

### フック `event` オブジェクト

ライフサイクルフックは、以下のキーを持つオブジェクトである `event` パラメータを取る関数です：

| キー      | タイプ              | 説明                                                                                                                                                      |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action` | String            | トリガーされたライフサイクルイベント（[リスト](#available-lifecycle-events)を参照）                                                                                |
| `model`  | 文字列の配列（uid）            | イベントがリッスンされるコンテンツタイプのuidの配列。<br />この引数が指定されていない場合、すべてのコンテンツタイプでイベントがリッスンされます。 |
| `params` | Object            | 以下のパラメータを受け入れます：<ul><li>`data`</li><li>`select`</li><li>`where`</li><li>`orderBy`</li><li>`limit`</li><li>`offset`</li><li>`populate`</li></ul> |
| `result` | Object            | _オプション、`afterXXX`イベントでのみ利用可能_<br /><br />アクションの結果を含みます。                                                                      |
| `state`  | Object            | クエリの状態で、`beforeXXX`と`afterXXX`のクエリイベントの間で状態を共有するために使用できます。                                                               |
<!-- TODO: `state`はまだ実装されていません、詳細が分かり次第お問い合わせください -->

### 宣言的およびプログラム的な使用法

コンテンツタイプのライフサイクルフックを設定するには、`./src/api/[api-name]/content-types/[content-type-name]/`フォルダに`lifecycles.js`ファイルを作成します。

各イベントリスナーは順番に呼び出されます。それらは同期的または非同期的にすることができます。

<Tabs groupdId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/[api-name]/content-types/[content-type-name]/lifecycles.js"

module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // 毎回20%の割引をしましょう
    event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;

    // 結果に何かを行う;
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./src/api/[api-name]/content-types/[content-type-name]/lifecycles.ts"

export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // 毎回20%の割引をしましょう
    event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;

    // 結果に何かを行う;
  },
};
```

</TabItem>
</Tabs>

データベースレイヤーAPIを使用すると、サブスクライバーを登録し、プログラム的にイベントをリッスンすることも可能です：

```js title="./src/index.js"
module.exports = {
  async bootstrap({ strapi }) {
// サブスクライバーを登録する
    strapi.db.lifecycles.subscribe({
      models: [], // 任意;

      beforeCreate(event) {
        const { data, where, select, populate } = event.params;

        event.state = 'doStuffAfterWards';
      },

      afterCreate(event) {
        if (event.state === 'doStuffAfterWards') {
        }

        const { result, params } = event;

        // 結果に何かを行う
      },
    });

    // 一般的な処理のための一般的なサブスクライブ
    strapi.db.lifecycles.subscribe((event) => {
      if (event.action === 'beforeCreate') {
        // 何かを行う
      }
    });
  }
}
```

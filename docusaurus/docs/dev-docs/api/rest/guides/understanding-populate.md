---
title: populateの理解
description: populateとは何か、そしてREST APIのクエリでpopulateパラメータをどのように使用してレスポンスに追加のフィールドを追加できるかを学びます。
displayed_sidebar: restApiSidebar
toc_max_heading_level: 6
tags:
- API
- components
- Content API
- dynamic zones
- guides
- populate
- REST API
- REST API guides
---

import QsIntroFull from '/docs/snippets/qs-intro-full.md'
import QsForQueryTitle from '/docs/snippets/qs-for-query-title.md'
import QsForQueryBody from '/docs/snippets/qs-for-query-body.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ScreenshotNumberReference from '/src/components/ScreenshotNumberReference.jsx';

# 🧠 REST APIの`populate`パラメータの理解

<NotV5/>

:::note メモ: 例示されるレスポンスはあなたの経験と異なる場合があります

このページの内容はStrapi 5と完全には最新状態ではないかもしれません:

- すべての概念的な情報と説明は正確で最新のものです。
- しかし、例示されるレスポンスの内容は若干異なるかもしれません。

例示はStrapi 5.0.0（安定版）のリリース後、および[FoodAdvisor](https://github.com/strapi/foodadvisor)のサンプルアプリケーションがStrapi 5にアップグレードされた後に完全に最新状態になります。

しかし、レスポンスの例示が若干異なるとしても、このページで教えられる基本的な概念を理解することには影響を及ぼさないはずです。
:::

Strapiの[REST API](/dev-docs/api/rest)でコンテンツタイプを問い合わせると、デフォルトではレスポンスにはトップレベルのフィールドのみが含まれ、関連性、メディアフィールド、コンポーネント、ダイナミックゾーンは含まれません。

Strapi REST APIのコンテキストでのPopulatingとは、デフォルトで返されるものよりも多くのフィールドを返すことでレスポンスに追加のコンテンツを含めることを指します。これを達成するためには[`populate`パラメータ](#population)を使用します。

:::info
このガイドでは、[FoodAdvisor](https://github.com/strapi/foodadvisor)のサンプルアプリケーションからサーバーに問い合わせて取得した実際のデータを使用して例を作成しています。自分で例をテストするためには、FoodAdvisorをセットアップし、`/api/`フォルダでサーバーを起動し、クエリを送信する前に問い合わせるコンテンツタイプに適切な`find`権限が与えられていることを確認してください。
:::

このガイドでは、以下のユースケースについて詳細な説明を提供します：

- [すべてのフィールドと関連性、1レベル深く](#populate-all-relations-and-fields-1-level-deep)をpopulateする。
- [いくつかのフィールドと関連性、1レベル深く](#populate-1-level-deep-for-specific-relations)をpopulateする。
- [いくつかのフィールドと関連性、複数レベル深く](#populate-several-levels-deep-for-specific-relations)をpopulateする。
- [コンポーネント](#populate-components)をpopulateする。
- [ダイナミックゾーン](#populate-dynamic-zones)をpopulateする。

:::info
複数のレベルを深くpopulateすることは、しばしば"deep populate"と呼ばれます。
:::

:::strapi 高度な使用例：作成者フィールドのポピュレート
クエリで`populate`パラメータを使用するさまざまな方法に加えて、作成者フィールド（例：`createdBy`や`updatedBy`）をポピュレートするための回避策としてカスタムコントローラーを作成することもできます。これについては、専用の[作成者フィールドのポピュレート方法](/dev-docs/api/rest/guides/populate-creator-fields)ガイドで説明しています。
:::

## 関係やフィールドをすべてポピュレートし、1レベル深くする

単一のクエリですべての関係、メディアフィールド、コンポーネント、ダイナミックゾーンを返すことができます。関係については、パフォーマンスの問題や長い応答時間を防ぐため、1レベル深くするだけで動作します。

1レベル深くすべてをポピュレートするには、クエリに`populate=*`パラメータを追加します。

以下の図は、1レベル深くすべてをポピュレートした場合としなかった場合の[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションで返されるデータを比較しています：

![FoodAdvisorデータを用いたポピュレート使用例の図 ](/img/assets/rest-api/populate-foodadvisor-diagram1.png)

このクエリパラメータがある場合とない場合に何が起こるかを比較して説明しましょう：

### 例：`populate`なし

ポピュレートパラメータがない場合、`/api/articles`への`GET`リクエストはデフォルトの属性のみを返し、メディアフィールド、関係、コンポーネント、ダイナミックゾーンは返しません。

次の例は、`articles`コンテンツタイプからのすべての4つのエントリーの完全なレスポンスです。

レスポンスが`title`、`slug`、`createdAt`、`updatedAt`、`publishedAt`、`locale`フィールドと、CKEditorプラグインによって処理される記事のフィールドコンテンツ（`ckeditor_content`、省略形）のみを含んでいることに注意してください：

<ApiCall noSideBySide>
<Request title="リクエスト例">

`GET /api/articles`

</Request>

<Response title="レスポンス例">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "t3q2i3v1z2j7o8p6d0o4xxg",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": // truncated content
    },
    {
      "id": 2,
      "documentId": "k2r5l0i9g3u2j3b4p7f0sed",
      "title": "中国のハンバーガーとは何か、なぜあなたはそれを食べていないのか？",
      "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
      "createdAt": "2021-11-11T13:33:19.948Z",
      "updatedAt": "2023-06-01T14:32:50.984Z",
      "publishedAt": "2022-09-22T12:36:48.312Z",
      "locale": "en",
      "ckeditor_content": // truncated content
    },
    {
      "id": 3,
      "documentId": "k6m6l9q0n6v9z2m3i0z5jah"
      "title": "食事だけで訪れる価値がある7つの場所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": // truncated content
    },
    {
      "id": 4,
      "documentId": "d5m4b6z6g5d9e3v1k9n5gbn",
      "title": "これらの国では食事を残すと、誰かを怒らせるかもしれません",
      "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
      "createdAt": "2021-11-15T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:59:35.148Z",
      "publishedAt": "2022-09-22T12:35:53.899Z",
      "locale": "en",
      "ckeditor_content": // truncated content
    }
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

### 例：`populate=*`を使用した場合

`populate=*`パラメータを使用すると、`GET`リクエストを`/api/articles`に送信すると、すべてのメディアフィールド、第一階層の関連、コンポーネント、ダイナミックゾーンも返されます。

以下の例は、`articles`コンテンツタイプのすべての4エントリーの最初のものに対する完全なレスポンスです（データはID 2、3、4の記事のデータは簡潔さのために省略されています）。

下にスクロールすると、populateがない場合に比べてレスポンスサイズが大幅に大きいことがわかります。レスポンスには、以下のような追加フィールドが含まれています（ハイライトされた行を参照）：
* `image`メディアフィールド（記事のカバーに関するすべての情報、それぞれの異なる形式を含む）。
* `blocks`ダイナミックゾーンと`seo`コンポーネントの第一階層フィールド。
* `category`関連とそのフィールド。
* 他の言語で翻訳された記事に関する情報も含まれています。これは`localizations`オブジェクトによって示されています。

:::tip
深くネストされたコンポーネントをpopulateするには、[populate components](#populate-components)セクションを参照してください。
:::

<br />
<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate=*`

</Request>

<Response title="例のレスポンス">

<br />
<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate=*`

</Request>
</ApiCall>
</Response>

<Response title="例のレスポンス">

```json {13-122}
{
  "data": [
    {
      "id": 1,
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": // truncated content
      "image": {
        "data": {
            "id": 12,
            "documentId": "o5d4b0l4p8l4o4k5n1l3rxa",
            "name": "バスクの料理",
            "alternativeText": "バスクの料理",
            "caption": "バスクの料理",
            "width": 758,
            "height": 506,
            "formats": {
              "thumbnail": {
                "name": "thumbnail_https://4d40-2a01-cb00-c8b-1800-7cbb-7da-ea9d-2011.ngrok.io/uploads/basque_cuisine_17fa4567e0.jpeg",
                "hash": "thumbnail_basque_cuisine_17fa4567e0_f033424240",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 234,
                "height": 156,
                "size": 11.31,
                "path": null,
                "url": "/uploads/thumbnail_basque_cuisine_17fa4567e0_f033424240.jpeg"
              },
              "medium": {
                "name": "medium_https://4d40-2a01-cb00-c8b-1800-7cbb-7da-ea9d-2011.ngrok.io/uploads/basque_cuisine_17fa4567e0.jpeg",
                "hash": "medium_basque_cuisine_17fa4567e0_f033424240",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 750,
                "height": 501,
                "size": 82.09,
                "path": null,
                "url": "/uploads/medium_basque_cuisine_17fa4567e0_f033424240.jpeg"
              },
              "small": {
                "name": "small_https://4d40-2a01-cb00-c8b-1800-7cbb-7da-ea9d-2011.ngrok.io/uploads/basque_cuisine_17fa4567e0.jpeg",
                "hash": "small_basque_cuisine_17fa4567e0_f033424240",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 500,
                "height": 334,
                "size": 41.03,
                "path": null,
                "url": "/uploads/small_basque_cuisine_17fa4567e0_f033424240.jpeg"
              }
            },
            "hash": "basque_cuisine_17fa4567e0_f033424240",
            "ext": ".jpeg",
            "mime": "image/jpeg",
            "size": 58.209999999999994,
            "url": "/uploads/basque_cuisine_17fa4567e0_f033424240.jpeg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2021-11-23T14:05:33.460Z",
            "updatedAt": "2021-11-23T14:05:46.084Z"
            }
          }
        },
        "blocks": [
          {
            "id": 2,
            "__component": "blocks.related-articles"
          },
          {
            "id": 2,
            "documentId": "w8r5k8o8v0t9l9e0d7y6vco",
            "__component": "blocks.cta-command-line",
            "theme": "primary",
            "title": "Strapiスターターを試してみませんか？",
            "text": "❤️",
            "commandLine": "git clone https://github.com/strapi/nextjs-corporate-starter.git"
          }
        ],
        "seo": {
          "id": 1,
          "documentId": "h7c8d0u3i3q5v1j3j3r4cxf",
          "metaTitle": "記事 - FoodAdvisor",
          "metaDescription": "食べ物、レストラン、バーなどについての記事を探してみてください！

- "FoodAdvisor",
          "キーワード": "食べ物",
          "metaRobots": null,
          "structuredData": null,
          "metaViewport": null,
          "canonicalURL": null
        },
        "category": {
          "data": {
            "id": 4,
            "documentId": "t1t3d9k6n1k5a6r8l7f8rox",
            "name": "ヨーロッパ",
            "slug": "european",
            "createdAt": "2021-11-09T13:33:20.123Z",
            "updatedAt": "2021-11-09T13:33:20.123Z"
          }
        },
        "localizations": {
          "data": [
            {
              "id": 10,
              "documentId": "h7c8d0u3i3q5v1j3j3r4cxf",
              "title": "バスク料理を試すべき理由、バスクのシェフによる",
              "slug": "voici-pourquoi-il-faut-essayer-la-cuisine-basque-selon-un-chef-basque",
              "createdAt": "2021-11-18T13:33:19.948Z",
              "updatedAt": "2023-06-02T10:57:19.606Z",
              "publishedAt": "2022-09-22T13:00:00.069Z",
              "locale": "fr-FR",
              "ckeditor_content": // 内容を省略
            }
          ]
        }
      }
    },
    {
      "id": 2,
      // 内容を省略
    },
    {
      "id": 3,
      // 内容を省略
    },
    {
      "id": 4,
      // 内容を省略
    }
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

## 特定のリレーションとフィールドをポピュレートする

特定のリレーションとフィールドを明示的に定義してポピュレートすることもできます。これには、ポピュレートするフィールドとリレーションの名前を知っている必要があります。

この方法でポピュレートされるリレーションとフィールドは、1つまたは複数のレベル深くすることができます。以下の図は、[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションが返すデータを、[1レベル深く](#populate-1-level-deep-for-specific-relations)する場合と、[複数レベル深く](#populate-several-levels-deep-for-specific-relations)する場合を比較しています：

![FoodAdvisorのデータを用いたポピュレートの使用例の図](/img/assets/rest-api/populate-foodadvisor-diagram2.png)

<SubtleCallout emoji="🤓" title="同様の結果のための異なるポピュレート戦略">
データ構造によっては、異なるクエリで同様のデータが異なる形で表示されることがあります。例えば、FoodAdvisorの例のアプリケーションには、記事、カテゴリ、レストランのコンテンツタイプが含まれており、これらはそれぞれ異なる方法で関連付けられています。これは、単一のGETリクエストで3つのコンテンツタイプに関するデータを取得したい場合、2つのオプションがあることを意味します：

- カテゴリとレストラン間のネストされた関係を含む、記事をクエリしてカテゴリを生成します（[2レベル深くまでのポピュレーション](#populate-several-levels-deep-for-specific-relations)）
- カテゴリをクエリして、記事とレストランの両方を生成します。なぜなら、カテゴリは他の2つのコンテンツタイプと1レベルの関係を持っているからです（[1レベル深く](#populate-1-level-deep-for-specific-relations)）

2つの異なる戦略は以下の図で示されています：

![FoodAdvisorデータを使用したpopulateの使用例のダイアグラム ](/img/assets/rest-api/populate-foodadvisor-diagram3.png)

</SubtleCallout>

<details>
<summary>オブジェクトとしてのpopulateと配列としてのpopulate：インタラクティブなクエリビルダーの使用</summary>

高度なクエリパラメータの構文は手動で作成するのがかなり複雑になることがあります。私たちはあなたがURLを生成するために私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用することをお勧めします。

このツールを使用すると、あなたは綺麗で読みやすいリクエストを熟知した（JavaScript）形式で書くことができます。これはあなたが異なるクエリや異なるpopulateの方法の違いを理解するのに役立つはずです。例えば、2レベル深くpopulateすることは、オブジェクトとしてのpopulateを使用することを意味し、1レベル深く複数の関係をpopulateすることは、配列としてのpopulateを使用することを意味します：

<Columns>
<ColumnLeft>

オブジェクトとしてのpopulate<br/>(1つの関係を複数のレベル深くpopulateするために)：

```json
{
  populate: {
    category: {
      populate: ['restaurants'],
    },
  },
}
```

</ColumnLeft>
<ColumnRight>

配列としてのpopulate<br/>(多くの関係を1レベル深くpopulateするために)

```json
{
  populate: [ 
    'articles',
    'restaurants'
  ],
}

```

</ColumnRight>
</Columns>

</details>

### 特定の関係に対して1レベル深くpopulateする

populateパラメータを配列として使用することで、特定の関係を1レベル深くpopulateすることができます。

REST APIは[LHS ブラケット記法](https://christiangiacomi.com/posts/rest-design-principles/#lhs-brackets)（つまり、四角いブラケット `[]` を使用）を使用しているため、1レベル深くpopulateするためのパラメータ構文は以下のようになります：

| populateする関係の数 | 構文例    |
|-------------------------------|--------------------|
| 1つの関係のみ |  `populate[0]=a-relation-name`   |
| 複数の関係 | `populate[0]=relation-name&populate[1]=another-relation-name&populate[2]=yet-another-relation-name` |

[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションにクエリを送信する際に、1レベル深く関係をpopulateする場合としない場合の違いを比較して説明しましょう：

#### 例：`populate`なし

populateパラメータがない場合、`GET`リクエストは`/api/articles`に対してデフォルトの属性のみを返します。

以下の例は、`articles`コンテンツタイプからの全4エントリーの完全なレスポンスです。

レスポンスには、メディアフィールド、関係、コンポーネント、または動的ゾーンは含まれていません：

<br/>

<ApiCall noSideBySide>
<Request title="リクエスト例">

`GET /api/articles`

</Request>

<レスポンスタイトル="例：レスポンス">

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "x2m0d7d9o4m2z3u2r2l9yes",
      "title": "バスク料理を試すべき理由、バスク料理人による解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 2,
      "documentId": "k6m6l9q0n6v9z2m3i0z5jah",
      "title": "中国のハンバーガーとは何か、なぜあなたはそれを食べていないのか？",
      "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
      "createdAt": "2021-11-11T13:33:19.948Z",
      "updatedAt": "2023-06-01T14:32:50.984Z",
      "publishedAt": "2022-09-22T12:36:48.312Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 3,
      "documentId": "o5d4b0l4p8l4o4k5n1l3rxa",
      "title": "食事だけで訪れる価値がある7つの場所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 4,
      "documentId": "t3q2i3v1z2j7o8p6d0o4xxg",
      "title": "これらの国では皿を残すと誰かを怒らせるかもしれません",
      "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
      "createdAt": "2021-11-15T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:59:35.148Z",
      "publishedAt": "2022-09-22T12:35:53.899Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    }
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
}
```

</レスポンス>
</ApiCall>

#### 例： `populate[0]=category`付き

`populate[0]=category`をリクエストに追加することで、`articles`と`categories`のコンテンツタイプをリンクする関係フィールドである`category`についての情報を明示的に含めるように求めています。

次の例は、`articles`コンテンツタイプからの全4エントリーの完全なレスポンスです。

レスポンスには、各記事の`category`フィールドについての追加データが含まれていることに注意してください（強調表示された行を参照）：

<ApiCall noSideBySide>
<Request title="例：リクエスト">

`GET /api/articles?populate[0]=category`

</Request>

<Response title="例：レスポンス">


```json
{
  "data": [
    {
      "id": 1,
      "documentId": "x2m0d7d9o4m2z3u2r2l9yes",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 2,
      "documentId": "k6m6l9q0n6v9z2m3i0z5jah",
      "title": "中華ハンバーガーとは何か、なぜあなたがそれを食べていないのか？",
      "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
      "createdAt": "2021-11-11T13:33:19.948Z",
      "updatedAt": "2023-06-01T14:32:50.984Z",
      "publishedAt": "2022-09-22T12:36:48.312Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 3,
      "documentId": "o5d4b0l4p8l4o4k5n1l3rxa",
      "title": "食べ物だけで訪れる価値がある7つの場所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    },
    {
      "id": 4,
      "documentId": "t3q2i3v1z2j7o8p6d0o4xxg",
      "title": "これらの国では皿を残すと誰かを怒らせるかもしれません",
      "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
      "createdAt": "2021-11-15T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:59:35.148Z",
      "publishedAt": "2022-09-22T12:35:53.899Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
    }
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
}
```

</Response>
</ApiCall>

#### 例：`populate[0]=category`を指定した場合

`populate[0]=category`をリクエストに追加すると、`articles`と`categories`のコンテンツタイプをリンクするリレーションフィールドである`category`についての情報を明示的に含めるように求めます。

以下の例は、`articles`コンテンツタイプからのすべての4つのエントリに対する完全な応答です。

応答には、各記事の`category`フィールドに関する追加データが含まれていることに注意してください（ハイライトされた行を参照）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=category`

</Request>
<Response title="例の応答">

```json {13-23,36-46,59-69,82-92}
{
  "data": [
    {
      "id": 1,
      "documentId": "w8r5k8o8v0t9l9e0d7y6vco",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 4,
          "documentId": "u6x8u7o7j5q1l5y3t8j9yxi",
          "name": "ヨーロッパ",
          "slug": "european",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 2,
      "documentId": "k6m6l9q0n6v9z2m3i0z5jah",
      "title": "中国のハンバーガーとは何か、なぜあなたはそれを食べていないのか？",
      "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
      "createdAt": "2021-11-11T13:33:19.948Z",
      "updatedAt": "2023-06-01T14:32:50.984Z",
      "publishedAt": "2022-09-22T12:36:48.312Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 13,
          "documentId": "x2m0d7d9o4m2z3u2r2l9yes",
          "name": "中国",
          "slug": "chinese",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 3,
      "title": "食べ物だけで訪れる価値がある7つの場所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 3,
          "documentId": "h7c8d0u3i3q5v1j3j3r4cxf",
          "name": "インターナショナル",
          "slug": "international",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 4,
      "documentId": "t1t3d9k6n1k5a6r8l7f8rox",
      "title": "これらの国では皿を空にしないと誰かを怒らせるかもしれません",
      "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
      "createdAt": "2021-11-15T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:59:35.148Z",
      "publishedAt": "2022-09-22T12:35:53.899Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 3,
          "documentId": "u6x8u7o7j5q1l5y3t8j9yxi",
          "name": "インターナショナル",
          "slug": "international",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    }
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

### 特定の関係を何層にもわたって埋め込む

特定の関係を何層にもわたって埋め込むこともできます。例えば、ある関係を埋め込むときにそれ自体が別の関係を埋め込むと、2層深く埋め込むことになります。このガイドでは2層深く埋め込む例を扱っています。

:::caution
埋め込むレベルの数に制限はありません。しかし、埋め込むほど深く、リクエストが完了するまでの時間が長くなります。
:::

REST APIでは、[LHSブラケット記法](https://christiangiacomi.com/posts/rest-design-principles/#lhs-brackets)（つまり、角括弧`[]`を使用）を用いています。例えば、別の関係の中にネストされた関係を埋め込む場合、パラメータの構文は次のようになります。

`populate[first-level-relation-to-populate][populate][0]=second-level-relation-to-populate`

:::tip
高度なクエリパラメータの構文は手動で作成するのがかなり複雑になることがあります。URLを生成するために、私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールの使用をお勧めします。例えば、以下の例で使用されている`/api/articles?populate[category][populate][0]=restaurants` URLは、私たちのツールを使用して以下のオブジェクトを変換することで生成されました。

```json
{
  populate: {
    category: {
      populate: ['restaurants'],
    },
  },
}
```

:::

[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションには、コンテンツタイプ間で様々なレベルの関係が含まれています。例えば：

- `article` コンテンツタイプには `category` コンテンツタイプとの関係が含まれています。
- しかし、`category`は任意の`restaurant`コンテンツタイプにも割り当てることができます。

適切なpopulateパラメータとともに`/api/articles`への単一の`GET`リクエストで、記事、レストラン、カテゴリーに関する情報を同時に返すことができます。

FoodAdvisorにクエリを送信し、`populate[0]=category`（1レベル深く）と`populate[category][populate][0]=restaurants`（2レベル深く）で返されるレスポンスを比較し、説明しましょう。

#### 例：1レベル深くの埋め込み

1レベル深くだけ埋め込む場合、記事に関連するカテゴリを求めると、以下の例のようなレスポンスを得ることができます（ハイライトされた行は`category`関係フィールドを示しています）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=category`

</Request>

<Response title="例のレスポンス">

</Response>
</ApiCall>

### 特定の関係を複数レベル深くポピュレートする

特定の関係を複数レベル深くポピュレートすることもできます。例えば、ある関係をポピュレートする際に、その中に別の関係をポピュレートする場合、2レベル深くポピュレートしていることになります。このガイドでは2レベル深くポピュレートする例を扱っています。

:::caution
ポピュレートできるレベルの数には上限はありません。しかし、ポピュレートが深くなるほど、リクエストの実行に時間がかかることになります。
:::

REST APIでは[LHSブラケット記法](https://christiangiacomi.com/posts/rest-design-principles/#lhs-brackets)（つまり、角括弧`[]`を使用）を使用しているため、例えばある関係の中にネストされた別の関係をポピュレートしたい場合、パラメータの構文は次のようになります：

`populate[first-level-relation-to-populate][populate][0]=second-level-relation-to-populate`

:::tip
高度なクエリパラメータの構文は手動で作成するのがかなり複雑になることがあります。URLを生成するために私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用することをお勧めします。例えば、以下の例で使用されている`/api/articles?populate[category][populate][0]=restaurants` URLは、私たちのツールを使って以下のオブジェクトを変換することで生成されました：

```json
{
  populate: {
    category: {
      populate: ['restaurants'],
    },
  },
}
```

:::

[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションは、コンテンツタイプ間のさまざまなレベルの関係を含んでいます。例えば：

- `article` コンテンツタイプは `category` コンテンツタイプとの関係を持っています。
- しかし、`category`は任意の`restaurant` コンテンツタイプにも割り当てることができます。

適切なポピュレートパラメータとともに`/api/articles`への単一の`GET`リクエストで、記事、レストラン、カテゴリの情報を同時に返すことができます。

FoodAdvisorへのクエリを送信する際に`populate[0]=category`（1レベル深く）と`populate[category][populate][0]=restaurants`（2レベル深く）で返されるレスポンスを比較し、説明しましょう：

#### 例：1レベル深いポピュレートの場合

1レベルだけポピュレートする場合、記事に関連するカテゴリを求めると、以下の例のようなレスポンスを得ることができます（ハイライトされた行は `category` 関係フィールドを示しています）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=category`

</Request>

<Response title="例のレスポンス">

```json {13-23,36-46,59-69,82-92}
{
  "data": [
    {
      "id": 1,
      "documentId": "9ih6hy1bnma3q3066kdwt3",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 4,
          "name": "ヨーロッパ",
          "slug": "european",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 2,
      "documentId": "sen6qfgxcac13pwchf8xbu",
      "title": "中国のハンバーガーって何？なぜあなたはそれを食べていないの？",
      "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
      "createdAt": "2021-11-11T13:33:19.948Z",
      "updatedAt": "2023-06-01T14:32:50.984Z",
      "publishedAt": "2022-09-22T12:36:48.312Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 13,
          "documentId": "r3rhzcxd7gjx07vkq3pia5",
          "name": "中国",
          "slug": "chinese",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 3,
      "documentId": "s9uu7rkukhfcsmj2e60b67",
      "title": "食事だけで訪れる価値がある7つの場所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 3,
          "documentId": "4sevz15w6bdol6y4t8kblk",
          "name": "国際",
          "slug": "international",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    },
    {
      "id": 4,
      "documentId": "iy5ifm3xj8q0t8vlq6l23h",
      "title": "これらの国では皿を残すと誰かを怒らせるかもしれません",
      "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
      "createdAt": "2021-11-15T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:59:35.148Z",
      "publishedAt": "2022-09-22T12:35:53.899Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "category": {
        "data": {
          "id": 3,
          "documentId": "0eor603u8qej933maphdv3",
          "name": "国際",
          "slug": "international",
          "createdAt": "2021-11-09T13:33:20.123Z",
          "updatedAt": "2021-11-09T13:33:20.123Z"
        }
      }
    }
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

#### 例：2レベル深いポピュレーションの場合

2レベル深くポピュレートするとき、記事に関連するカテゴリーを求めるだけでなく、これらのカテゴリーに関連するレストランも求めることができます。その結果、以下のようなレスポンスが得られます。

ここで注意すべきは、`category`関係内のレスポンスに`restaurants`関係フィールドが含まれていることです（ハイライトされた行を参照）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[category][populate][0]=restaurants`

</Request>

<Response title="例のレスポンス">

```json {13-56}
{{
  "data": [
    {
      "id": 1,
      "documentId": "iy5ifm3xj8q0t8vlq6l23h",
      "attributes": {
        "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
        "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
        "createdAt": "2021-11-09T13:33:19.948Z",
        "updatedAt": "2023-06-02T10:57:19.584Z",
        "publishedAt": "2022-09-22T09:30:00.208Z",
        "locale": "en",
        "ckeditor_content": "…", // 内容は省略
        "category": {
          "data": {
            "id": 4,
            "name": "ヨーロッパ",
            "slug": "european",
            "createdAt": "2021-11-09T13:33:20.123Z",
            "updatedAt": "2021-11-09T13:33:20.123Z",
            "restaurants": {
              "data": [
                {
                  "id": 1,
                  "documentId": "ozlqrdxpnjb7wtvf6lp74v",
                  "name": "ミントラウンジ",
                  "slug": "mint-lounge",
                  "price": "p3",
                  "createdAt": "2021-11-09T14:07:47.125Z",
                  "updatedAt": "2021-11-23T16:41:30.504Z",
                  "publishedAt": "2021-11-23T16:41:30.501Z",
                  "locale": "en"
                },
                {
                  "id": 9,
                  // 内容は省略
                },
                {
                  "id": 10,
                  // 内容は省略
                },
                {
                  "id": 12,
                  // 内容は省略
                },
                {
                  "id": 21,
                  // 内容は省略
                },
                {
                  "id": 26,
                  // 内容は省略
                }
              ]
            }
          }
        }
      }
    },
    {
      "id": 2,
      // 内容は省略
    },
    {
      "id": 3,
      // 内容は省略
    },
    {
      "id": 4,
      // 内容は省略
    }
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

### コンポーネントのポピュレート

コンポーネントとダイナミックゾーンはデフォルトではレスポンスに含まれません。それぞれのダイナミックゾーン、コンポーネント、およびそのネストされたコンポーネントを明示的にポピュレートする必要があります。

REST APIが[LHSブラケット表記法](https://christiangiacomi.com/posts/rest-design-principles/#lhs-brackets)（つまり、角括弧`[]`を使用）を使用しているため、すべての要素を`populate`配列にパスする必要があります。ネストされたフィールドもパスすることができ、パラメータ構文は次のようになる可能性があります：

`populate[0]=a-first-field&populate[1]=a-second-field&populate[2]=a-third-field&populate[3]=a-third-field.a-nested-field&populate[4]=a-third-field.a-nested-component.a-nested-field-within-the-component`

:::tip
高度なクエリパラメータの構文は、手動で作成するのが非常に複雑になることがあります。URLを生成するために、私たちの[インタラクティブクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用することをお勧めします。例えば、以下の例で使用されている`/api/articles?populate[0]=seo&populate[1]=seo.metaSocial&populate[2]=seo.metaSocial.image` URLは、私たちのツールを使用して以下のオブジェクトを変換することで生成されました：

```json
{
  populate: [
    'seoData',
    'seoData.sharedImage',
    'seoData.sharedImage.media',
  ],
},
```

:::

[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションには、さまざまなコンポーネントや他のコンポーネントの中にネストされたコンポーネントが含まれています。例えば：

- `article`コンテンツタイプには`seo`コンポーネントが含まれています<ScreenshotNumberReference number="1" />。
- `seo`コンポーネントにはネストされた、繰り返し可能な`metaSocial`コンポーネントが含まれています<ScreenshotNumberReference number="2" />。
- `metaSocial`コンポーネント自体には、`image`メディアフィールドを含むいくつかのフィールドがあります<ScreenshotNumberReference number="3" />。

![Content-Type BuilderにおけるFoodAdvisorのSEOコンポーネント構造](/img/assets/rest-api/ctb-article-components-structure.png)

デフォルトでは、これらのフィールドやコンポーネントは`GET`リクエストの`/api/articles`のレスポンスには含まれません。しかし、適切なpopulateパラメータを使用すると、一回のリクエストでこれらすべてを返すことができます。

`populate[0]=seo`（1stレベルのコンポーネント）と`populate[0]=seo&populate[1]=seo.metaSocial`（1stレベルのコンポーネント内にネストされた2ndレベルのコンポーネント）で返されるレスポンスを比較し、説明してみましょう：

#### 例：1stレベルのコンポーネントのみ

`seo`コンポーネントのみをpopulateすると、1レベルの深さまでしか行かず、以下のような例のレスポンスを得ることができます。強調表示された行は`seo`コンポーネントを示しています。

`seo`コンポーネント内にネストされた`metaSocial`コンポーネントの言及はありません：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=seo`

</Request>

<Response title="例のレスポンス">

```json {13-22}
{
  "data": [
    {
      "id": 1,
      "documentId": "md60m5cy3dula5g87x1uar",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "seo": {
        "id": 1,
        "documentId": "kqcwhq6hes25kt9ebj8x7j",
        "metaTitle": "記事 - FoodAdvisor",
        "metaDescription": "食事、レストラン、バーなどに関する記事を発見しましょう！ - FoodAdvisor",
        "keywords": "food",
        "metaRobots": null,
        "structuredData": null,
        "metaViewport": null,
        "canonicalURL": null
      }
    },
    {
      "id": 2,
      // truncated content
    },
    {
      "id": 3,
      // truncated content
    },
    {
      "id": 4,
      // truncated content
    },
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

#### 例: 1階層目と2階層目のコンポーネント

`seo`コンポーネントと、その中にネストされた`metaSocial`コンポーネントの両方を要求して2階層深く取得すると、以下の例のようなレスポンスを得ることができます。

今回はレスポンスに`metaSocial`コンポーネント関連のデータが含まれていることに注意してください（ハイライトされた行を参照）：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=seo&populate[1]=seo.metaSocial`

</Request>

<Response title="例のレスポンス">

```json {13,22-29}
{
  "data": [
    {
      "id": 1,
      "documentId": "c2imt19iywk27hl2ftph7s",
      "title": "バスク料理を試すべき理由、バスク料理のシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // 内容が省略されています
      "seo": {
        "id": 1,
        "documentId": "e8cnux5ejxyqrejd5addfv",
        "metaTitle": "記事 - FoodAdvisor",
        "metaDescription": "食べ物、レストラン、バーなどについての記事を探索しましょう！ - FoodAdvisor",
        "keywords": "食べ物",
        "metaRobots": null,
        "structuredData": null,
        "metaViewport": null,
        "canonicalURL": null,
        "metaSocial": [
          {
            "id": 1,
            "documentId": "ks7xsp9fewoi0qljcz9qa0",
            "socialNetwork": "Facebook",
            "title": "私たちの最高の食べ物やレストランについての記事をブラウズ",
            "description": "食べ物、レストラン、バーなどについての記事を探索しましょう！"
          }
        ]
      }
    },
    {
      "id": 2,
      // 内容が省略されています
    },
    {
      "id": 3,
      // 内容が省略されています
    },
    {
      "id": 4,
      // 内容が省略されています
    },
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

### 動的ゾーンのデータを補充する

動的ゾーンは、その本質的に高度に動的なコンテンツ構造です。動的ゾーンとそのコンテンツを補充するためには、レスポンスで具体的に何を補充するかを定義する必要があります。

<!-- ! Strapi 5では動作しません -->
<!-- #### 共有補充戦略

共有補充戦略では、動的ゾーンのすべてのコンポーネントに同じ補充を適用します。

例えば、[FoodAdvisor](https://github.com/strapi/foodadvisor)のサンプルアプリケーションでは：

- `article`コンテンツタイプに`blocks`という動的ゾーンが存在します <ScreenshotNumberReference number="1" />。
- この動的ゾーンには3つの異なるコンポーネントが含まれています：`relatedArticles` <ScreenshotNumberReference number="2" />、`faq` <ScreenshotNumberReference number="3" />、`CtaCommandLine` <ScreenshotNumberReference number="4" />。すべてのコンポーネントは、さまざまなフィールドを含む異なるデータ構造を持っています。

![Content-Type BuilderにおけるFoodAdvisorの'blocks'動的ゾーン構造](/img/assets/rest-api/ctb-blocks-dynamic-zone-structure.png)

デフォルトでは、これらのフィールドやコンポーネントは`/api/articles`への`GET`リクエストのレスポンスには含まれません。しかし、適切な補充パラメータを使用すると、これらすべてを単一のリクエストで返すことができます。そして、補充するフィールド名をすべて明示的に定義する代わりに、`[populate=*]`を渡すことで共有補充戦略を使用してすべてのコンポーネントのすべてのフィールドを補充することができます。

:::tip
高度なクエリパラメータの構文は手動で作成するのがかなり複雑になることがあります。URLを生成するためには、私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールの使用をお勧めします。例えば、以下の例で使用されている`/api/articles?populate[blocks][populate]=*` URLは、私たちのツールを使用して以下のオブジェクトを変換することで生成されました。

```json
{
  populate: {
    blocks: { // blocks dynamic zone の populate を指定
      populate: '*' // すべてのコンポーネントのすべての第一レベルのフィールドをpopulate
    }
  },
}
```

:::

`populate[0]=blocks`（動的ゾーンのみをpopulate）と`populate[blocks][populate]=*`（動的ゾーンをpopulateし、そのすべてのコンポーネントに共有のpopulate戦略を適用）で返されるレスポンスを比較し、説明しましょう。

##### 例：動的ゾーンのみをpopulateする

`blocks`動的ゾーンのみをpopulateすると、1レベルの深さまで行き、以下の例のようなレスポンスを得ることができます。強調表示された行は`blocks`動的ゾーンと、それが含む2つのコンポーネントを示しています。

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=blocks`

</Request>

<Response title="例のレスポンス">

```json {13-26}
{
  "data": [
    {
      "id": 1,
      "documentId": "e8cnux5ejxyqrejd5addfv",
      "title": "Here's why you have to try basque cuisine, according to a basque chef",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…" // truncated content
      "blocks": [
        {
          "id": 2,
          "documentId": "it9bbhcgc6mcfsqas7h1dp",
          "__component": "blocks.related-articles"
        },
        {
          "id": 2,
          "documentId": "ugagwkoce7uqb0k2yof4lz",
          "__component": "blocks.cta-command-line",
          "theme": "primary",
          "title": "Want to give a try to a Strapi starter?",
          "text": "❤️",
          "commandLine": "git clone https://github.com/strapi/nextjs-corporate-starter.git"
        }
      ]
    },
    {
      "id": 2,
      // …
    },
    {
      "id": 3,
      // …
    },
    {
      "id": 4,
      // …
    }
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

##### 例：動的ゾーンをpopulateし、そのコンポーネントに共有の戦略を適用する

`blocks`動的ゾーンをpopulateし、`[populate]=*`を用いてそのすべてのコンポーネントに共有のpopulate戦略を適用すると、コンポーネントのフィールドだけでなく、その1st-levelの関連も含まれます。以下の例のレスポンスで強調表示された行がこれを示しています。

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[blocks][populate]=*`

</Request>

<Response>

:::tip
高度なクエリパラメータの構文は手動で作成するのが非常に複雑な場合があります。URLを生成するために、私たちの[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用することをお勧めします。例えば、以下の例で使用されている`/api/articles?populate[blocks][populate]=*` URLは、ツールを使用して以下のオブジェクトを変換することで生成されました：

```json
{
  populate: {
    blocks: { // ブロック動的ゾーンをポピュレートする要求
      populate: '*' // すべてのコンポーネントのすべての第一レベルのフィールドをポピュレート
    }
  },
}
```

:::

`populate[0]=blocks`（動的ゾーンのみをポピュレート）と`populate[blocks][populate]=*`（動的ゾーンをポピュレートし、そのすべてのコンポーネントに共有ポピュレーション戦略を適用）で返されるレスポンスを比較し、説明してみましょう：

##### 例：動的ゾーンのみをポピュレート

`blocks`動的ゾーンのみをポピュレートすると、1レベルだけ深くなり、以下の例のようなレスポンスを得ることができます。ハイライトされた行は`blocks`動的ゾーンと、それが含む2つのコンポーネントを示しています：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[0]=blocks`

</Request>

<Response title="例のレスポンス">

```json {13-26}
{
  "data": [
    {
      "id": 1,
      "documentId": "e8cnux5ejxyqrejd5addfv",
      "title": "Here's why you have to try basque cuisine, according to a basque chef",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…" // 内容は省略
      "blocks": [
        {
          "id": 2,
          "documentId": "it9bbhcgc6mcfsqas7h1dp",
          "__component": "blocks.related-articles"
        },
        {
          "id": 2,
          "documentId": "ugagwkoce7uqb0k2yof4lz",
          "__component": "blocks.cta-command-line",
          "theme": "primary",
          "title": "Want to give a try to a Strapi starter?",
          "text": "❤️",
          "commandLine": "git clone https://github.com/strapi/nextjs-corporate-starter.git"
        }
      ]
    },
    {
      "id": 2,
      // …
    },
    {
      "id": 3,
      // …
    },
    {
      "id": 4,
      // …
    }
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

##### 例：動的ゾーンをポピュレートし、そのコンポーネントに共有戦略を適用

`blocks`動的ゾーンをポピュレートし、`[populate]=*`を使用してそのすべてのコンポーネントに共有ポピュレーション戦略を適用すると、コンポーネントのフィールドだけでなく、その1stレベルの関係も含めることができます。以下の例のレスポンスのハイライトされた行がこれを示しています：

<ApiCall noSideBySide>
<Request title="例のリクエスト">

`GET /api/articles?populate[blocks][populate]=*`

</Request>

<Response>

```json {13-63}
{
  "data": [
    {
      "id": 1,
      "documentId": "c14dwiff3b4os6gs4yyrag",
      "title": "バスク料理を試すべき理由、バスク料理のシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "blocks": [
        {
          "id": 2,
          "documentId": "lu16w9g4jri8ppiukg542j",
          "__component": "blocks.related-articles",
          "header": {
            "id": 2,
            "documentId": "c2imt19iywk27hl2ftph7s",
            "theme": "primary",
            "label": "もっと、もっと欲しい！",
            "title": "類似の記事"
          },
          "articles": {
            "data": [
              {
                "id": 2,
                "documentId": "isn91s2bxk3jib97evvjni",
                "title": "中国のハンバーガーとは何か、なぜあなたはそれを食べていないのか？",
                "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
                "createdAt": "2021-11-11T13:33:19.948Z",
                "updatedAt": "2023-06-01T14:32:50.984Z",
                "publishedAt": "2022-09-22T12:36:48.312Z",
                "locale": "en",
                "ckeditor_content": "…", // truncated content
              },
              {
                "id": 3,
                "documentId": "yz6lg7tp5ph8dr79gidoyl",
                "title": "食べ物だけで訪れる価値がある7つの場所",
                "slug": "7-places-worth-visiting-for-the-food-alone",
                "createdAt": "2021-11-12T13:33:19.948Z",
                "updatedAt": "2023-06-02T11:30:00.075Z",
                "publishedAt": "2023-06-02T11:30:00.075Z",
                "locale": "en",
                "ckeditor_content": "…", // truncated content
              },
              {
                "id": 4,
                "documentId": "z5jnfvyuj07fogzh1kcbd3",
                "title": "これらの国では皿を残すと誰かを侮辱するかもしれません",
                "slug": "if-you-don-t-finish-your-plate-in-these-countries-you-might-offend-someone",
                "createdAt": "2021-11-15T13:33:19.948Z",
                "updatedAt": "2023-06-02T10:59:35.148Z",
                "publishedAt": "2022-09-22T12:35:53.899Z",
                "locale": "en",
                "ckeditor_content": "…", // truncated content
              }
            ]
          }
        },
        {
          "id": 2,
          "documentId": "vpihrdqj5984k8ynrc39p0",
          "__component": "blocks.cta-command-line",
          "theme": "primary",
          "title": "Strapiスターターを試してみたいですか？",
          "text": "❤️",
          "commandLine": "git clone https://github.com/strapi/nextjs-corporate-starter.git"
        }
      ]
    },
    {
      "id": 2,
      // …
    },
    {
      "id": 3,
      // … 
    },
    {
      "id": 4,
      // …
    }
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
</ApiCall> -->

これを実現するためには、`on`プロパティを使用してコンポーネントごとにpopulateクエリを定義できます。

例えば、[FoodAdvisor](https://github.com/strapi/foodadvisor)の例のアプリケーションでは：

- `blocks`というダイナミックゾーンが`article`コンテンツタイプに存在します<ScreenshotNumberReference number="1" />。
- このダイナミックゾーンには3つの異なるコンポーネントが含まれています：`relatedArticles`<ScreenshotNumberReference number="2" />、`faq`<ScreenshotNumberReference number="3" />、そして`CtaCommandLine`<ScreenshotNumberReference number="4" />です。すべてのコンポーネントは、さまざまなフィールドを含む異なるデータ構造を持っています。
- `relatedArticles`コンポーネントは、記事コンテンツタイプとの`articles`関係を持っています<ScreenshotNumberReference number="5" />。

![FoodAdvisorの'blocks'ダイナミックゾーン構造 in the Content-Type Builder](/img/assets/rest-api/ctb-blocks-dynamic-zone-structure-2.png)

デフォルトでは、深くネストされたフィールドや関係は`GET`リクエストのレスポンスに含まれません。適切なpopulateパラメータを使用し、詳細なpopulate戦略を適用することで、必要なデータを正確に返すことができます。

:::tip
高度なクエリパラメータの構文は手動で構築するのがかなり複雑になることがあります。私たちは[インタラクティブなクエリビルダー](/dev-docs/api/rest/interactive-query-builder)ツールを使用してURLを生成することをお勧めします。例えば、次の例で使用されている`/api/articles?populate[blocks][on][blocks.related-articles][populate][articles][populate][0]=image&populate[blocks][on][blocks.cta-command-line][populate]=*`というURLは、以下のオブジェクトをツールを使用して変換することで生成されました：

```json
{
  populate: {
    blocks: { // blocksダイナミックゾーンのpopulateを要求
      on: { // 何を明示的に定義したいかを詳細に定義するためのpopulate戦略を使用
        'blocks.related-articles': {
          populate: {
           'articles': {
             populate: ['image']
           }
         }
        },
        'blocks.cta-command-line': {
          populate: '*'
        }
      },
    },
  },
}
```

:::

共有populate戦略と詳細populate戦略の例をいくつか比較し、返されたレスポンスを説明しましょう：

#### 例

`blocks`ダイナミックゾーンをpopulateするとき、populateするデータを明示的に定義します。

以下の例のレスポンスでは、ハイライトされた行が示しています：

- `relatedArticles`コンポーネントの`articles`関係を深くpopulateし、関連する記事の`image`メディアフィールドまでpopulateします。

- しかし、`CtaCommandLine`コンポーネントについては全てをpopulateするように指定し、`faq`コンポーネントについては何も定義していないため、`faq`コンポーネントからのデータは返されません。

<ApiCall noSideBySide>

<Request title="詳細なpopulateを持つ例のリクエスト">

`GET /api/articles?populate[blocks][on][blocks.related-articles][populate][articles][populate][0]=image&populate[blocks][on][blocks.cta-command-line][populate]=*`

</Request>


<Response title="詳細人口に関する例のレスポンス">

```json {16-17,29-34}
{
  "data": [
    {
      "id": 1,
      "documentId": "it9bbhcgc6mcfsqas7h1dp",
      "title": "バスク料理を試すべき理由、バスクのシェフによる解説",
      "slug": "here-s-why-you-have-to-try-basque-cuisine-according-to-a-basque-chef",
      "createdAt": "2021-11-09T13:33:19.948Z",
      "updatedAt": "2023-06-02T10:57:19.584Z",
      "publishedAt": "2022-09-22T09:30:00.208Z",
      "locale": "en",
      "ckeditor_content": "…", // truncated content
      "blocks": [
        {
          "id": 2,
          "documentId": "e8cnux5ejxyqrejd5addfv",
          "__component": "blocks.related-articles",
          "articles": {
            "data": [
              {
                "id": 2,
                "documentId": "wkgojrcg5bkz8teqx1foz7",
                "title": "中国のハンバーガーって何？なぜあなたはそれを食べていないの？",
                "slug": "what-are-chinese-hamburgers-and-why-aren-t-you-eating-them",
                "createdAt": "2021-11-11T13:33:19.948Z",
                "updatedAt": "2023-06-01T14:32:50.984Z",
                "publishedAt": "2022-09-22T12:36:48.312Z",
                "locale": "en",
                "ckeditor_content": "…", // truncated content
                "image": {
                  "data": {
                      // …
                    }
                  }
                }
              },
              {
                "id": 3,
                // …
              },
              {
                "id": 4,
                // …
              }
            ]
          }
        },
        {
          "id": 2,
          "__component": "blocks.cta-command-line",
          "theme": "primary",
          "title": "Strapiスターターを試してみませんか？",
          "text": "❤️",
          "commandLine": "git clone https://github.com/strapi/nextjs-corporate-starter.git"
        }
      ]
    },
    {
      "id": 2,
      // …
    },
    {
      "id": 3,
      "documentId": "z5jnfvyuj07fogzh1kcbd3",
      "title": "食事だけで訪れる価値がある7か所",
      "slug": "7-places-worth-visiting-for-the-food-alone",
      "createdAt": "2021-11-12T13:33:19.948Z",
      "updatedAt": "2023-06-02T11:30:00.075Z",
      "publishedAt": "2023-06-02T11:30:00.075Z",
      "locale": "en",
      "ckeditor_content": "…", // … truncated content
      "blocks": [
        {
          "id": 1,
          "documentId": "ks7xsp9fewoi0qljcz9qa0",
          "__component": "blocks.related-articles",
          "articles": {
            // …
          }
        },
        {
          "id": 1,
          "documentId": "c2imt19iywk27hl2ftph7s",
          "__component": "blocks.cta-command-line",
          "theme": "secondary",
          "title": "新しいプロジェクトで試してみませんか？",
          "text": "数秒で起動 🚀",
          "commandLine": "npx create-strapi-app my-project --quickstart"
        }
      ]
    },
    {
      "id": 4,
      // …
    }
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

---
title: リクエストとレスポンス
description: 最も人気のあるヘッドレスCMS、Strapiのリクエストとレスポンスについて詳しく学びましょう。
tags:
- バックエンドのカスタマイズ
- バックエンドサーバー
- ctx
- REST API 
---

# リクエストとレスポンス

Strapiのバックエンドサーバーは[Koa](https://koajs.com/)に基づいています。[REST API](/dev-docs/api/rest)を通じてリクエストを送信すると、コンテキストオブジェクト(`ctx`)がStrapiのバックエンドの各要素（例：[ポリシー](/dev-docs/backend-customization/policies)、[コントローラー](/dev-docs/backend-customization/controllers)、[サービス](/dev-docs/backend-customization/services)）に渡されます。

`ctx`には3つの主要なオブジェクトが含まれています：

- APIリクエストを行うクライアントによって送信されたリクエストに関する情報のための[`ctx.request`](#ctxrequest)、
- Strapiのバックエンド内のリクエストの状態に関する情報のための[`ctx.state`](#ctxstate)、
- サーバーが返すレスポンスに関する情報のための[`ctx.response`](#ctxresponse)。

:::tip
リクエストのコンテキストは、コードのどこからでも[`strapi.requestContext`関数](#accessing-the-request-context-anywhere)を使ってアクセスすることができます。
:::

:::info
以下のドキュメンテーションで説明されている概念とパラメーターに加えて、[Koaリクエストドキュメンテーション](http://koajs.com/#request)、[Koaルータードキュメンテーション](https://github.com/koajs/router/blob/master/API.md)、[Koaレスポンスドキュメンテーション](http://koajs.com/#response)で追加の情報を見つけることができるかもしれません。
:::

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-requests-responses.png" alt="リクエストとレスポンスが強調表示されたシンプルなStrapiバックエンドダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>この図は、リクエストとレスポンスが強調表示されたStrapiバックエンドを通るリクエストのシンプルなバージョンを表しています。バックエンドカスタマイズの導入ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブな図</a>が含まれています。</figcaption></em>
</figure>

## `ctx.request`

`ctx.request`オブジェクトには以下のパラメータが含まれています：

| パラメータ             | 説明                                                                                  | タイプ     |
| --------------------- | -------------------------------------------------------------------------------------------- | -------- |
| `ctx.request.body`    | 本文の解析されたバージョン。 | `Object` |
| `ctx.request.files`   | リクエストと共に送信されたファイル。 | `Array` |
| `ctx.request.headers` | リクエストと共に送信されたヘッダー。 | `Object` |
| `ctx.request.host`    | ポートを含むURLのホスト部分。 | `String` |
| `ctx.request.hostname`| ポートを除いたURLのホスト部分。 | `String` |
| `ctx.request.href`    | プロトコル、ドメイン、ポート（指定されている場合）、パス、クエリパラメータを含む、リクエストされたリソースの完全なURL。 | `String` |
| `ctx.request.ip`      | リクエストを送信した人のIP。| `String` |
| `ctx.request.ips`     | `X-Forwarded-For`が存在し、`app.proxy`が有効になっている場合、上流から下流への順番でIPの配列が返されます。<br /><br />例えば、その値が "client, proxy1, proxy2" の場合、`["client", "proxy1", "proxy2"]` の配列を受け取ります。 | `Array` |
| `ctx.request.method`  | リクエストメソッド（例：`GET`、`POST`）。 | `String` |
| `ctx.request.origin`  | 最初の `/` の前のURL部分。 | `String` |
| `ctx.request.params`  | URLに送信されたパラメータ。<br /><br/>例えば、内部URLが `/restaurants/:id` の場合、実際のリクエストで `:id` を置き換えたものが `ctx.request.params.id` を通じてアクセス可能になります。 | `Object` |
| `ctx.request.path`    | クエリパラメータを除いた、リクエストされたリソースのパス。 | `String` |
| `ctx.request.protocol`| 使用されているプロトコル（例：`https` または `http`）。 | `String` |
| `ctx.request.query`   | Strapi固有の[クエリパラメータ](#ctxrequestquery)。 | `Object` |
| `ctx.request.subdomains`| URLに含まれるサブドメイン。<br /><br />例えば、ドメインが `tobi.ferrets.example.com` の場合、値は次の配列になります: `["ferrets", "tobi"]`。 | `Array` |
| `ctx.request.url`     | プロトコル、ドメイン、ポートを除いた、リクエストされたリソースのパスとクエリパラメータ。 | `String` |

<details>
<summary>プロトコル、オリジン、URL、href、パス、ホスト、ホスト名の間の違い :</summary>

`https://example.com:1337/api/restaurants?id=123` URLに送信されたAPIリクエストを考えてみましょう。以下は `ctx.request` オブジェクトの異なるパラメータが返すものです：

| パラメータ  | 返される値                                    |
| ---------- | ------------------------------------------------- |
| `ctx.request.href`     | `https://example.com:1337/api/restaurants?id=123` |
| `ctx.request.protocol` | `https`                                           |
| `ctx.request.host`     | `localhost:1337`                                  |
| `ctx.request.hostname` | `localhost`                                       |
| `ctx.request.origin`   | `https://example.com:1337`                          |
| `ctx.request.url`      | `/api/restaurants?id=123`                         |
| `ctx.request.path`     | `/api/restaurants`                                |

</details>

### `ctx.request.query`

`ctx.request`は、Strapiクエリパラメータにアクセスするための`query`オブジェクトを提供します。以下の表は、利用可能なパラメータを短い説明と関連するREST APIドキュメンテーションセクションへのリンクとともにリストしています（詳細は[REST APIパラメータ](/dev-docs/api/rest/parameters)を参照してください）：

| パラメータ | 説明                                                                                                                                            | タイプ                 |
| -------------------------------------| --------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `ctx.request.query`<br />`ctx.query` | クエリオブジェクト全体。                                                                                                    | `Object`             |
| `ctx.request.query.sort`             | [レスポンスをソートする](/dev-docs/api/rest/sort-pagination.md#sorting)パラメータ                                            | `String` or `Array`  |
| `ctx.request.query.filters`          | [レスポンスをフィルタリングする](/dev-docs/api/rest/filters-locale-publication#filtering)パラメータ                                | `Object`             |
| `ctx.request.query.populate`         | [関連性、コンポーネント、またはダイナミックゾーンを埋め込む](/dev-docs/api/rest/populate-select#population)パラメータ             | `String` or `Object` |
| `ctx.request.query.fields`           | [レスポンスとともに特定のフィールドのみを返す](/dev-docs/api/rest/populate-select#field-selection)ためのパラメータ | `Array`              |
| `ctx.request.query.pagination`       | [エントリをページングする](/dev-docs/api/rest/sort-pagination.md#pagination)パラメータ                                       | `Object`             |
| `ctx.request.query.publicationState` | [下書き＆公開状態を選択する](/dev-docs/api/rest/filters-locale-publication#publication-state)パラメータ            | `String`             |
| `ctx.request.query.locale`           | [1つまたは複数のロケールを選択する](/dev-docs/api/rest/filters-locale-publication#locale)パラメータ                         | `String` or `Array`  |

## `ctx.state`

`ctx.state`オブジェクトは、Strapiバックエンド内のリクエストの状態にアクセスを提供し、[user](#ctxstateuser)、[authentication](#ctxstateauth)、[route](#ctxstateroute)についての特定の値を含みます：

| パラメータ                   | 説明                                                                 | 型       |
| ---------------------------|----------------------------------------------------------------------| -------- |
| `ctx.state.isAuthenticated`| 現在のユーザーが何らかの方法で認証されているかどうかを返します。               | `Boolean` |

### `ctx.state.user`

`ctx.state.user`オブジェクトは、リクエストを行うユーザーに関する情報にアクセスを提供し、以下のパラメータを含みます：

| パラメータ | 説明                                                                                  | 型       |
| ----------| --------------------------------------------------------------------------------------| -------- |
| `ctx.state.user`| ユーザーの情報。関連性は一つだけが詳細表示されます。                    | `Object` |
| `ctx.state.user.role`| ユーザーの役割 | `Object` |
<!-- ここで話している"user"はどの種類の"user"を指していますか？ "U&P"に関連するユーザー？ -->

### `ctx.state.auth`

`ctx.state.auth`オブジェクトは、認証に関連する情報にアクセスを提供し、以下のパラメータを含みます：

| パラメータ                     | 説明                                                                                  | 型       |
| ------------------------------| --------------------------------------------------------------------------------------| -------- |
| `ctx.state.auth.strategy`     | 現在使用されている認証戦略に関する情報 ([Users & Permissions plugin](/dev-docs/plugins/users-permissions) または [API tokens](/dev-docs/configurations/api-tokens)) | `Object` |
| `ctx.state.auth.strategy.name`| 現在使用されている戦略の名前                                                          | `String` |
| `ctx.state.auth.credentials`  | ユーザーの資格情報                                                                      | `String` |
<!-- ? ctx.state.auth.strategyは認証と確認の関数を含んでいるようです。これらをどこかで文書化すべきですか？ -->
<!-- ? どの資格情報が何に使われているのかは確認していません -->

### `ctx.state.route`

`ctx.state.route`オブジェクトは、現在のルートに関連する情報にアクセスを提供し、以下のパラメータを含みます：

| パラメータ | 説明                                                                                  | タイプ     |
| ----------| -------------------------------------------------------------------------------------------- | -------- |
| `ctx.state.route.method`| 現在のルートにアクセスするために使用されるメソッド。 | `String` |
| `ctx.state.route.path`| 現在のルートのパス。 | `String` |
| `ctx.state.route.config`| 現在のルートに関する設定情報。 | `Object` |
| `ctx.state.route.handler`| 現在のルートのハンドラー（コントローラー）。 | `Object` |
| `ctx.state.route.info`| apiNameやAPIリクエストタイプなど、現在のルートに関する追加情報。 | `Object` |
| `ctx.state.route.info.apiName`| 使用されるAPIの名前。  | `String` |
| `ctx.state.route.info.type`| 使用されるAPIのタイプ。 | `String` |

## `ctx.response`

`ctx.response`オブジェクトは、サーバーが返すレスポンスに関連する情報にアクセスするためのもので、以下のパラメータを含みます：

| パラメータ | 説明                                                                                  | タイプ     |
| ----------| -------------------------------------------------------------------------------------------- | -------- |
| `ctx.response.body`| レスポンスの本文。 | `Any` |
| `ctx.response.status` | レスポンスのステータスコード。 | `Integer` |
| `ctx.response.message`| レスポンスのステータスメッセージ。<br/><br />デフォルトでは、`response.message`は`response.status`と関連付けられています。 | `String` |
| `ctx.response.header`<br />`ctx.response.headers`| レスポンスと共に送信されるヘッダー。 | `Object` |
| `ctx.response.length`| [`Content-Length`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length) ヘッダーの値を数値化したもの、または可能な場合は `ctx.body`から推測したもの；それ以外の場合は `undefined`を返します。 | `Integer` |
| `ctx.response.redirect`<br />`ctx.response.redirect(url, [alt])` | URLへの`302`リダイレクトを実行します。文字列の "back" は特別に処理されて、リファラーのサポートを提供します。リファラーが存在しない場合は、altまたは "/" が使用されます。<br /><br />例: `ctx.response.redirect('back', '/index.html');` | `Function` |
| `ctx.response.attachment`<br /><br />`ctx.response.attachment([filename], [options])` | [`Content-Disposition`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) ヘッダーを "attachment" に設定して、クライアントにダウンロードを促すように信号を送ります。ダウンロードのファイル名と一部の[オプション](https://github.com/jshttp/content-disposition#options)をオプションで指定できます。 | `Function` |
| `ctx.response.type`| ["charset"のようなパラメータを除いた [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) ヘッダー。 | `String` |
| `ctx.response.lastModified`| 存在する場合、[`Last-Modified`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified) ヘッダーをDateとして。 | `DateTime` |
| `ctx.response.etag`| レスポンスの [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) を設定します。これには "s" が包含されます。<br/>対応する `response.etag` getterはありません。 | `String` |

## どこからでもリクエストコンテキストにアクセスする

Strapiは、コードのどこからでも現在のリクエストコンテキストにアクセスする方法を提供しています（例：ライフサイクル関数）。

以下のようにリクエストにアクセスできます：

```js
const ctx = strapi.requestContext.get();
```

これはHTTPリクエストのコンテキストで呼び出される関数内でのみ使用するべきです。

```js
// 正しい

const service = {
  myFunction() {
    const ctx = strapi.requestContext.get();
    console.log(ctx.state.user);
  },
};

// 不正確
const ctx = strapi.requestContext.get();

const service = {
  myFunction() {
    console.log(ctx.state.user);
  },
};
```

**例：**

```js title="./api/test/content-types/article/lifecycles.js"

module.exports = {
  beforeUpdate() {
    const ctx = strapi.requestContext.get();

    console.log('User info in service: ', ctx.state.user);
  },
};

:::note
Strapiは、コンテキストをどこからでも利用できるようにするために、[AsyncLocalStorage](https://nodejs.org/docs/latest-v16.x/api/async_context.html#class-asynclocalstorage)というNode.jsの機能を使用しています。
:::

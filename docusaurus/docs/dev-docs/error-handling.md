---
title: エラーハンドリング
displayed_sidebar: devDocsSidebar
description: Strapiのエラーハンドリング機能を使用すると、アプリケーションでエラーを送受信するのが容易になります。
tags:
- ctx
- GraphQL API
- GraphQL errorsa
- policies
- middlewares
- REST API
- REST errors
- throw errors
- strapi-utils
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# エラーハンドリング

<NotV5 />

Strapiは、標準フォーマットでエラーをネイティブに処理します。

エラーハンドリングには2つの使用ケースがあります：

- [REST](/dev-docs/api/rest)または[GraphQL](/dev-docs/api/graphql) APIを通じてコンテンツをクエリする開発者として、リクエストの応答で[エラーを受け取る](#エラーの受信)可能性があります。
- Strapiアプリケーションのバックエンドをカスタマイズする開発者として、コントローラーやサービスを使用して[エラーをスローする](#エラーのスロー)ことができます。

## エラーの受信

エラーは`error`キーでレスポンスオブジェクトに含まれ、HTTPステータスコード、エラーの名前、追加情報などを含みます。

### RESTエラー

REST APIによってスローされたエラーは、次の形式を持つ[レスポンス](/dev-docs/api/rest#requests)に含まれます：

```json
{
  "data": null,
  "error": {
    "status": "", // HTTPステータス
    "name": "", // Strapiエラー名 ('ApplicationError'または'ValidationError')
    "message": "", // 人間が読めるエラーメッセージ
    "details": {
      // エラータイプに特有のエラー情報
    }
  }
}
```

### GraphQLエラー

GraphQL APIによってスローされたエラーは、次の形式を持つ[レスポンス](/dev-docs/api/graphql#unified-response-format)に含まれます：

```json
{ "errors": [
    {
      "message": "", // 人間が読めるエラーメッセージ
      "extensions": {
        "error": {
          "name": "", // Strapiエラー名 ('ApplicationError'または'ValidationError'),
          "message": "", // 人間が読めるエラーメッセージ（上記と同じ）;
          "details": {}, // エラータイプに特有のエラー情報
        },
        "code": "" // GraphQLエラーコード (例: BAD_USER_INPUT)
      }
    }
  ],
  "data": {
    "graphQLQueryName": null
  }
}
```

## エラーのスロー

### コントローラーとミドルウェア

Strapiでカスタムロジックを開発する際にエラーをスローする推奨方法は、[コントローラー](/dev-docs/backend-customization/controllers)または[ミドルウェア](/dev-docs/backend-customization/middlewares)が正しいステータスとボディで応答するようにすることです。

これは、コンテキスト（つまり、`ctx`）上のエラー関数を呼び出すことで行うことができます。使用可能なエラー関数は[http-errorsドキュメンテーション](https://github.com/jshttp/http-errors#list-of-all-constructors)にリストされていますが、Strapiで使用するには名前をローワーキャメルケースにする必要があります（例：`badRequest`）。

エラー関数は、APIをクエリする開発者が[受信](#エラーの受信)する`error.message`と`error.details`属性に対応する2つのパラメータを受け入れます：

- 関数の最初のパラメータはエラーの `message` です
- そして、二番目のものはレスポンスで `details` として設定されるオブジェクトです

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js
// パス: ./src/api/[api-name]/controllers/my-controller.js

module.exports = {
  renameDog: async (ctx, next) => {
    const newName = ctx.request.body.name;
    if (!newName) {
      return ctx.badRequest('名前が欠けています', { foo: 'bar' })
    }
    ctx.body = strapi.service('api::dog.dog').rename(newName);
  }
}

// パス: ./src/api/[api-name]/middlewares/my-middleware.js

module.exports = async (ctx, next) => {
  const newName = ctx.request.body.name;
  if (!newName) {
    return ctx.badRequest('名前が欠けています', { foo: 'bar' })
  }
  await next();
}
```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts
// パス: ./src/api/[api-name]/controllers/my-controller.ts

export default {
  renameDog: async (ctx, next) => {
    const newName = ctx.request.body.name;
    if (!newName) {
      return ctx.badRequest('名前が欠けています', { foo: 'bar' })
    }
    ctx.body = strapi.service('api::dog.dog').rename(newName);
  }
}

// パス: ./src/api/[api-name]/middlewares/my-middleware.ts

export default async (ctx, next) => {
  const newName = ctx.request.body.name;
  if (!newName) {
    return ctx.badRequest('名前が欠けています', { foo: 'bar' })
  }
  await next();
}
```

</TabItem>

</Tabs>

### サービスとモデルのライフサイクル

コントローラーやミドルウェアよりも深いレイヤーで作業している場合、エラーをスローするための専用のエラークラスがあります。これらのクラスは[Node `Error` class](https://nodejs.org/api/errors.html#errors_class_error)の拡張で、特定のユースケースに特化しています。

これらのエラークラスは `@strapi/utils` パッケージを通じてインポートされ、いくつかの異なるレイヤーから呼び出すことができます。以下の例ではサービスレイヤーを使用していますが、エラークラスはサービスやモデルのライフサイクルに限定されているわけではありません。モデルのライフサイクルレイヤーでエラーをスローする場合、管理パネルに適切なエラーメッセージが表示されるように、`ApplicationError` クラスを使用することを推奨します。

:::note
Strapiによって提供されるエラークラスの詳細については、[デフォルトのエラークラス](#default-error-classes)セクションを参照してください。
:::

<details>
<summary>例：サービスでエラーをスローする</summary>
この例では、[コアサービス](/dev-docs/backend-customization/services#extending-core-services)をラップし、`create`メソッドにカスタムバリデーションを行う方法を示しています：

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js title="path: ./src/api/restaurant/services/restaurant.js"

const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  async create(params) {
    let okay = false;

// レストランの作成を防ぐエラーをスローする
    if (!okay) {
      throw new ApplicationError('何か問題が発生しました', { foo: 'bar' });
    }
  
    const result = await super.create(params);

    return result;
  }
});

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts title="path: ./src/api/[api-name]/policies/my-policy.ts"

import { errors } from '@strapi/utils';
import { factories } from '@strapi/strapi';

const { ApplicationError } = errors;

export default factories.createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  async create(params) {
    let okay = false;

    // レストランの作成を防ぐエラーをスローする
    if (!okay) {
      throw new ApplicationError('何か問題が発生しました', { foo: 'bar' });
    }
  
    const result = await super.create(params);

    return result;
  }
}));

```

</TabItem>

</Tabs>


</details>

<details>
<summary>例：モデルライフサイクルでのエラースロー</summary>

この例は、[カスタムモデルライフサイクル](/dev-docs/backend-customization/models#lifecycle-hooks)の構築と、リクエストを停止し、管理パネルに正しいエラーメッセージを返すエラーをスローすることを示しています。一般的には、`beforeX`ライフサイクルでのみエラーをスローし、`afterX`ライフサイクルではエラーをスローしないようにすべきです。

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js title="path: ./src/api/[api-name]/content-types/[api-name]/lifecycles.js"

const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;

module.exports = {
  beforeCreate(event) {
    let okay = false;

    // エンティティの作成を防ぐエラーをスローする
    if (!okay) {
      throw new ApplicationError('何か問題が発生しました', { foo: 'bar' });
    }
  },
};

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts title="path: ./src/api/[api-name]/content-types/[api-name]/lifecycles.ts"

import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default {
  beforeCreate(event) {
    let okay = false;

    // エンティティの作成を防ぐエラーをスローする
    if (!okay) {
      throw new ApplicationError('何か問題が発生しました', { foo: 'bar' });
    }
  },
};
```

</TabItem>

</Tabs>

</details>

### ポリシー

[ポリシー](/dev-docs/backend-customization/policies)は、コントローラの前に実行される特殊なタイプのミドルウェアです。これらは、ユーザーがアクションを実行することを許可されているかどうかを確認するために使用されます。ユーザーがアクションを実行することが許可されておらず、`return false`が使用された場合、一般的なエラーがスローされます。代わりに、Strapiの`ForbiddenError`クラス、`ApplicationError`クラス（両クラスについては[デフォルトのエラークラス](#default-error-classes)を参照）、最後に[Node `Error`クラス](https://nodejs.org/api/errors.html#errors_class_error)からのネストされたクラス拡張を使用して、カスタムエラーメッセージをスローすることができます。

`PolicyError`クラスは`@strapi/utils`パッケージから利用可能で、2つのパラメータを受け取ります：

- 関数の最初のパラメータはエラー`message`です
- （オプション）二番目のパラメータは、受信したレスポンスで`details`として設定されるオブジェクトです。ベストプラクティスとして、エラーをスローしたポリシーの名前を`policy`キーに設定することが推奨されます。

<details>
<summary>例：カスタムポリシーでPolicyErrorをスローする</summary>

この例では、カスタムエラーメッセージをスローし、リクエストを停止する[カスタムポリシー](/dev-docs/backend-customization/policies)を作成する方法を示しています。

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js title="path: ./src/api/[api-name]/policies/my-policy.js"

const { errors } = require('@strapi/utils');
const { PolicyError } = errors;

module.exports = (policyContext, config, { strapi }) => {
  let isAllowed = false;

  if (isAllowed) {
    return true;
  } else {
    throw new PolicyError('You are not allowed to perform this action', {
      policy: 'my-policy',
      myCustomKey: 'myCustomValue',
    });
  }
}

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts title="path: ./src/api/[api-name]/policies/my-policy.ts"

import { errors } from '@strapi/utils';
const { PolicyError } = errors;

export default (policyContext, config, { strapi }) => {
  let isAllowed = false;

  if (isAllowed) {
    return true;
  } else {
    throw new PolicyError('You are not allowed to perform this action', {
      policy: 'my-policy',
      myCustomKey: 'myCustomValue',
    });
  }
};
```

</TabItem>

</Tabs>

</details>

### デフォルトのエラークラス

デフォルトのエラークラスは`@strapi/utils`パッケージから利用可能で、コード内でインポートして使用できます。デフォルトのエラークラスのいずれかを拡張してカスタムエラークラスを作成できます。カスタムエラークラスは、コード内でエラーをスローするために使用できます。

<Tabs> 

<TabItem value="Application" label="Application">

`ApplicationError`クラスは、アプリケーションエラーのための一般的なエラークラスで、デフォルトのエラークラスとして推奨されています。このクラスは、管理パネルが読み取り、ユーザーに表示できる適切なエラーメッセージをスローするように特別に設計されています。以下のパラメータを受け取ります：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `An application error occured` |
| `details` | `object` | 追加の詳細を定義するオブジェクト | `{}` |

```js
throw new ApplicationError('Something went wrong', { foo: 'bar' });
```

</TabItem>

<!-- Strapiの内部使用ケースに非常に特化しているため、このタブを保持する価値があるかどうかは不確かです -->
<!-- ::: tab Validation -->

`ValidationError`および`YupValidationError`クラスは、組み込みの検証システムとともに使用するために設計された特定のエラークラスであり、特に[Yup](https://www.npmjs.com/package/yup)からのエラーを特定の形式で整形します。 `ValidationError`はパラメータを受け付けませんが、`YupValidationError`は以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | - |
| `details` | `object` | 追加の詳細を定義するオブジェクト | `{ yupErrors }` |

```js

```js
throw new PolicyError('何か問題が発生しました', { policy: 'my-policy' });
```

::: -->

<TabItem value="Pagination" label="Pagination">

`PaginationError`クラスは、特定のエラークラスで、通常は[REST](/dev-docs/api/rest/sort-pagination#pagination)、[GraphQL](/dev-docs/api/graphql#pagination)、または[Document Service](/dev-docs/api/document-service)からのページネーション情報を解析する際に使用されます。以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Invalid pagination` |

```js
throw new PaginationError('最大pageSize制限を超えました');
```

</TabItem>

<TabItem value="NotFound" label="NotFound">

`NotFoundError`クラスは、`404`ステータスコードエラーをスローするための一般的なエラークラスです。以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Entity not found` |

```js
throw new NotFoundError('これらはあなたが探しているドロイドではありません');
```

</TabItem>

<TabItem value="Forbidden" label="Forbidden">

`ForbiddenError`クラスは、ユーザーが認証資格を提供しないか、または正しい認証資格を提供しない場合に使用される特定のエラークラスです。以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Forbidden access` |

```js
throw new ForbiddenError('あああ、あなたは魔法の言葉を言いませんでした');
```

</TabItem>

<TabItem value="Unauthorized" label="Unauthorized">

`UnauthorizedError`クラスは、ユーザーが特定のアクションを実行するための適切なロールや権限を持っていないが、適切に認証されている場合に使用される特定のエラークラスです。以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Unauthorized` |

```js
throw new UnauthorizedError('あなたは通過してはならない！');
```

</TabItem>

<TabItem value="NotImplemented" label="NotImplemented">

`NotImplementedError`クラスは、着信リクエストが現在実装されていないか設定されていない機能を使用しようとしている場合に使用される特定のエラークラスです。以下のパラメータを受け付けます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `This feature isn't implemented` |

```js
throw new NotImplementedError('This isn\'t implemented', { feature: 'test', implemented: false });
```

</TabItem>

<TabItem value="PayloadTooLarge" label="PayloadTooLarge">

`PayloadTooLargeError`クラスは、着信リクエストボディや添付ファイルがサーバーの制限を超えた場合に使用される特定のエラークラスです。以下のパラメータを受け入れます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Entity too large` |

```js
throw new PayloadTooLargeError('Uh oh, the file too big!');
```

</TabItem>

<TabItem value="Policy" label="Policy">

`PolicyError`クラスは、[ルートポリシー](/dev-docs/backend-customization/policies)と共に使用するために設計された特定のエラーです。ベストプラクティスの推奨事項は、ポリシーの名前が`details`パラメータに渡されることを確認することです。以下のパラメータを受け入れます：

| パラメータ | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `message` | `string` | エラーメッセージ | `Policy Failed` |
| `details` | `object` | 追加の詳細を定義するオブジェクト | `{}` |

```js
throw new PolicyError('Something went wrong', { policy: 'my-policy' });
```

</TabItem>

</Tabs>

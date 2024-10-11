---
title: ポリシー
description: Strapiのポリシーは、コントローラーに到達する前に各リクエストで特定のロジックを実行する機能です。ポリシーはあなたのニーズに合わせてカスタマイズすることができます。
displayed_sidebar: devDocsSidebar
tags:
- バックエンドのカスタマイズ
- バックエンドサーバー
- コントローラー
- グローバルポリシー
- プラグインポリシー
- ミドルウェア
- ポリシー
- REST API 
- ルート
---

# ポリシー

ポリシーは、[コントローラー](/dev-docs/backend-customization/controllers)に到達する前に各リクエストで特定のロジックを実行する機能です。主にビジネスロジックのセキュリティを確保するために使用されます。

Strapiプロジェクトの各[ルート](/dev-docs/backend-customization/routes)は、ポリシーの配列に関連付けることができます。例えば、`is-admin`という名前のポリシーは、リクエストが管理ユーザーから送信されたことを確認し、重要なルートへのアクセスを制限することができます。

ポリシーはグローバルまたはスコープ指定のどちらかになります。[グローバルポリシー](#global-policies)はプロジェクト内の任意のルートに関連付けることができます。スコープ指定のポリシーは特定の[API](#api-policies)や[プラグイン](#plugin-policies)にのみ適用されます。

<figure style={{width: '100%', margin: '0'}}>
  <img src="/img/assets/backend-customization/diagram-routes.png" alt="ルートとポリシーが強調表示されたStrapiバックエンドの簡略化されたダイアグラム" />
  <em><figcaption style={{fontSize: '12px'}}>この図は、ポリシーとルートが強調表示されたStrapiバックエンドをどのようにリクエストが通過するかの簡略化されたバージョンを示しています。バックエンドカスタマイズの紹介ページには、完全な<a href="/dev-docs/backend-customization#interactive-diagram">インタラクティブなダイアグラム</a>が含まれています。</figcaption></em>
</figure>

## 実装

新しいポリシーは以下の方法で実装できます：

- [対話型CLIコマンド `strapi generate`](/dev-docs/cli#strapi-generate) を使う
- または、適切なフォルダにJavaScriptファイルを手動で作成する（[プロジェクト構造](/dev-docs/project-structure)を参照）：
  - `./src/policies/` はグローバルポリシー用
  - `./src/api/[api-name]/policies/` はAPIポリシー用
  - `./src/plugins/[plugin-name]/policies/` はプラグインポリシー用

<br/>

グローバルポリシーの実装例：

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/policies/is-authenticated.js"

module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user) { // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/policies/is-authenticated.ts"

export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user) { // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
```

</TabItem>
</Tabs>

`policyContext`は、[コントローラー](/dev-docs/backend-customization/controllers)のコンテキストをラップするものです。これにより、RESTとGraphQLの両方にポリシーを実装するためのロジックが追加されます。

<br/>

ポリシーは`config`オブジェクトを使用して設定することができます：

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title=".src/api/[api-name]/policies/my-policy.js"

module.exports = (policyContext, config, { strapi }) => {
    if (policyContext.state.user.role.code === config.role) { // ユーザーの役割が設定で説明されているものと同じである場合
      return true;
    }

    return false; // 何も返さない場合、Strapiはリクエストをブロックしたくないと考え、通過させます
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/[api-name]/policies/my-policy.ts"

export default (policyContext, config, { strapi }) => {
    if (policyContext.state.user.role.code === config.role) { // ユーザーの役割が設定で説明されているものと同じである場合
      return true;
    }

    return false; // 何も返さない場合、Strapiはリクエストをブロックしたくないと考え、通過させます
  };
```

</TabItem>
</Tabs>

## 使用方法

ポリシーをルートに適用するには、それらをその設定オブジェクトに追加します（[ルートのドキュメンテーション](/dev-docs/backend-customization/routes#policies)を参照）。

ポリシーは、その範囲によって異なる方法で呼び出されます：

- [グローバルポリシー](#global-policies)の場合は `global::policy-name` を使用します
- [APIポリシー](#api-policies)の場合は `api::api-name.policy-name` を使用します
- [プラグインポリシー](#plugin-policies)の場合は `plugin::plugin-name.policy-name` を使用します

:::tip
利用可能なすべてのポリシーをリストアップするには、`yarn strapi policies:list`を実行します。
:::

### グローバルポリシー

グローバルポリシーは、プロジェクト内の任意のルートに関連付けることができます。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          Restaurant.jsコントローラー内のfindアクションを実行する前に、
          グローバルの'is-authenticated'ポリシーを呼び出します。
          これは./src/policies/is-authenticated.jsで見つけることができます。
         */
        policies: ['global::is-authenticated']
      }
    }
  ]
}
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/restaurant/routes/custom-restaurant.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          Restaurant.jsコントローラー内のfindアクションを実行する前に、
          グローバルの'is-authenticated'ポリシーを呼び出します。
          これは./src/policies/is-authenticated.jsで見つけることができます。
         */
        policies: ['global::is-authenticated']
      }
    }
  ]
}
```

</TabItem>
</Tabs>

### プラグインポリシー

[プラグイン](/dev-docs/plugins)は、アプリケーションにポリシーを追加し、公開することができます。例えば、[ユーザー＆パーミッションプラグイン](/user-docs/users-roles-permissions)は、ユーザーが認証されているか、またはアクションを実行する権限があるかどうかを確認するポリシーを提供します：

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          `users-permissions`プラグインで提供される`isAuthenticated`ポリシーは、
          `Restaurant.js`コントローラーの`find`アクションの前に実行されます。
        */
        policies: ['plugin::users-permissions.isAuthenticated']
      }
    }
  ]
}
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/restaurant/routes/custom-restaurant.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          `users-permissions`プラグインで提供される`isAuthenticated`ポリシーは、
          `Restaurant.js`コントローラーの`find`アクションの前に実行されます。
        */
        policies: ['plugin::users-permissions.isAuthenticated']
      }
    }
  ]
}
```

</TabItem>
</Tabs>

### APIポリシー

APIポリシーは、それらが宣言されたAPIで定義されたルートに関連付けられています。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/restaurant/policies/is-admin.js."

module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Administrator') {
    // 次のポリシーに進むか、コントローラーのアクションに到達します。
    return true;
  }

  return false;
};
```

```js title="./src/api/restaurant/routes/custom-restaurant.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          `./src/api/restaurant/policies/is-admin.js`で見つかった`is-admin`ポリシーは、
          `Restaurant.js`コントローラーの`find`アクションの前に実行されます。
         */
        policies: ['is-admin']
      }
    }
  ]
}


```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/restaurant/policies/is-admin.ts"

export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Administrator') {
    // 次のポリシーに進むか、コントローラーのアクションに到達します。
    return true;
  }

  return false;
};

```

```ts title="./src/api/restaurant/routes/custom-restaurant.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          `./src/api/restaurant/policies/is-admin.js`に見つけられる`is-admin`ポリシーは、
          `Restaurant.ts`コントローラーの`find`アクションの前に実行されます。
         */
        policies: ['is-admin']
      }
    }
  ]
}

```

</TabItem>
</Tabs>

別のAPIでポリシーを使用するには、次の構文で参照します：`api::[apiName].[policyName]`：

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./src/api/category/routes/custom-category.js"

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'Category.find',
      config: {
        /**
          `./src/api/restaurant/policies/is-admin.js`に見つけられる`is-admin`ポリシーは、
          `Restaurant.js`コントローラーの`find`アクションの前に実行されます。
        */
        policies: ['api::restaurant.is-admin']
      }
    }
  ]
}
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./src/api/category/routes/custom-category.ts"

export default {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'Category.find',
      config: {
        /**
          `./src/api/restaurant/policies/is-admin.ts`に見つけられる`is-admin`ポリシーは、
          `Restaurant.js`コントローラーの`find`アクションの前に実行されます。
        */
        policies: ['api::restaurant.is-admin']
      }
    }
  ]
}
```

</TabItem>
</Tabs>

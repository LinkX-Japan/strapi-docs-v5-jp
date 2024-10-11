---
title: 管理パネルのカスタマイズ - URL、ホスト、パスの設定
description: Strapiの管理パネルにアクセスするためのURL、ホスト、パスの設定方法について学びましょう。
sidebar_label: URL、ホスト、ポートの設定
toc_max_heading_level: 4
tags:
- 管理パネル 
- 管理パネルのカスタマイズ

---

# 管理パネルのカスタマイズ: ホスト、ポート、パスの設定

デフォルトでは、Strapiの[管理パネル](/dev-docs/admin-panel-customization)は[http://localhost:1337/admin](http://localhost:1337/admin)で公開されています。セキュリティ上の理由から、ホスト、ポート、パスを更新することができます。

## 管理パネルのパスのみを更新する

Strapiのバックエンドサーバーと管理パネルサーバーを異なるサーバーにデプロイしない限り（[デプロイ](/dev-docs/admin-panel-customization/deployment)を参照）、デフォルトでは次のようになります。

- Strapiのバックエンドサーバーと管理パネルサーバーは同じホストとポートで動作しており、`http://localhost:1337/`でアクセスできます。
- 管理パネルは`/admin`パスでアクセスでき、バックエンドサーバーは`/api`パスでアクセスできます。

たとえば、管理パネルを`http://localhost:1337/dashboard`でアクセス可能にするには、[管理パネル設定ファイル](/dev-docs/configurations/admin-panel)で`url`プロパティを次のように定義または更新します。

```js title="/config/admin.js"
module.exports = ({ env }) => ({
  // 他の設定プロパティ
  url: "/dashboard",
});
```

デフォルトでは、バックエンドサーバーと管理パネルサーバーは同じホストとポートで動作しているため、[サーバー設定](/dev-docs/configurations/server)ファイルの`host`および`port`プロパティの値を変更せずに、`config/admin.[ts|js]`ファイルを更新するだけで動作します。サーバー設定ファイルは次のようになっているはずです。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="/config/server.js"
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="/config/server.ts"
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
});
```

</TabItem>
</Tabs>

## 管理パネルのホストとポートを更新する

管理パネルとStrapiのバックエンドサーバーが同じサーバーでホストされていない場合（[デプロイ](/dev-docs/admin-panel-customization/deployment)を参照）、管理パネルのホストとポートを更新する必要があります。

これは管理パネルの設定ファイルで行います。たとえば、管理パネルを`my-host.com:3000`でホストする場合、プロパティを次のように更新します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./config/admin.js"
module.exports = ({ env }) => ({
  host: "my-host.com",
  port: 3000,
  // デフォルトの /admin パスの代わりに別のパスを定義することもできます👇
  // url: '/dashboard' 
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./config/admin.ts"
export default ({ env }) => ({
  host: "my-host.com",
  port: 3000,
  // デフォルトの /admin パスの代わりに別のパスを定義することもできます👇
  // url: '/dashboard'
});
```

</TabItem>
</Tabs>

<br/>

:::strapi 他の管理パネル設定
`/config/admin.[ts|js]`ファイルは、他の多くの側面を設定するためにも使用できます。詳細については、[管理パネル設定](/dev-docs/configurations/admin-panel)ドキュメントを参照してください。
:::
---
title: 管理パネルのデプロイ
description: Strapiの管理パネルをさまざまなシナリオでデプロイする方法について学びましょう。
sidebar_label: デプロイ
toc_max_heading_level: 4
tags:
- 管理パネル 
- 管理パネルのカスタマイズ
- デプロイ
---

# 管理パネルのデプロイ

Strapiのフロントエンド部分は「管理パネル」と呼ばれます。管理パネルはグラフィカルユーザーインターフェイスを提供し、アプリケーションのフロントエンドでStrapiのContent APIを通じてアクセスできるコンテンツを構築・管理するのに役立ちます。

管理パネルはReactベースのシングルページアプリケーションで、Strapiアプリケーションのすべての機能とインストールされたプラグインをカプセル化しています。

Strapiの[バックエンドサーバー](/dev-docs/backend-customization)はContent APIを提供し、コンテンツにアクセスするためのエンドポイントを提供します。

デフォルトでは、バックエンドサーバーと管理パネルサーバーは同じサーバー上にデプロイされます。しかし、管理パネルとバックエンドサーバーは独立しており、異なるサーバーにデプロイすることも可能です。このため、次のような異なるシナリオが考えられます。

- プロジェクト全体を同じサーバーにデプロイする。
- 管理パネルをAPIサーバーとは異なるサーバー（AWS S3、Azureなど）にデプロイする。

ケースごとにビルド設定が異なります。

デプロイ前に、プロジェクトのルートディレクトリで次のコマンドを実行して管理パネルをビルドする必要があります。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```sh
yarn build
```

</TabItem>

<TabItem value="npm" label="npm">

```sh
npm run build
```

</TabItem>

</Tabs>

これにより、`./build`フォルダの内容が置き換えられます。[http://localhost:1337/admin](http://localhost:1337/admin)にアクセスして、カスタマイズが反映されているか確認してください。

## 同じサーバー

管理パネルとStrapiのバックエンド(API)を同じサーバーにデプロイすることはデフォルトの動作です。ビルド設定は自動的に行われます。サーバーは指定されたポートで起動し、管理パネルは`http://yourdomain.com:1337/admin`でアクセス可能になります。

:::tip
[管理パネルへのアクセスパスを変更](/dev-docs/admin-panel-customization/host-port-path)することも可能です。
:::

## 異なるサーバー

管理パネルとStrapiのバックエンド(API)を異なるサーバーにデプロイするには、次の設定を使用します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./config/server.js"
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://yourbackend.com",
});
```

```js title="./config/admin.js"
module.exports = ({ env }) => ({
  /**
   * 注意: 管理パネルはドメインのルートからアクセス可能です 
   * (例: http://yourfrontend.com/)
   */ 
  url: "/",
  serveAdminPanel: false, // http://yourbackend.com は管理パネルの静的ファイルを提供しません
});
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./config/server.ts"
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://yourbackend.com",
});
```

```js title="./config/admin.ts"
export default ({ env }) => ({
  /**
   * 注意: 管理パネルはドメインのルートからアクセス可能です 
   * (例: http://yourfrontend.com/)
   */ 
  url: "/",
  serveAdminPanel: false, // http://yourbackend.com は管理パネルの静的ファイルを提供しません
});
```

</TabItem>
</Tabs>

この設定で`yarn build`を実行すると、`build`フォルダが作成または上書きされます。このフォルダを使用して、別のサーバーから任意のドメイン（例: `http://yourfrontend.com`）で提供します。

管理パネルのURLは`http://yourfrontend.com`となり、パネルからのすべてのリクエストは`http://yourbackend.com`のバックエンドに送信されます。

:::note
`url`オプションにパスを追加しても、アプリケーションのプレフィックスにはなりません。これを実現するには、Nginxなどのプロキシサーバーを使用します（[オプションのソフトウェアデプロイガイド](/dev-docs/deployment#optional-software-guides)を参照してください）。
:::
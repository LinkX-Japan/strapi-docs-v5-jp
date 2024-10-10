---
title: デプロイメント
displayed_sidebar: devDocsSidebar
description: Strapiをローカルで開発し、さまざまなホスティングオプションでStrapiをデプロイする方法を学びます。
tags:
- データベースのデプロイ
- デプロイ
- プロジェクトの作成
- ホスティングプロバイダー
- ホスティングサーバー
---

import DatabaseRequire from '/docs/snippets/database-require.md'
import HardwareRequire from '/docs/snippets/hardware-require.md'
import OperatingSystemRequire from '/docs/snippets/operating-system-require.md'
import InstallPrereq from '/docs/snippets/installation-prerequisites.md'

# デプロイメント

Strapiは、プロジェクトやアプリケーションのための多くのデプロイメントオプションを提供しています。Strapiアプリケーションは、伝統的なホスティングサーバーやお選びのホスティングプロバイダーにデプロイすることができます。

以下のドキュメンテーションでは、いくつかの一般的なホスティングオプションでStrapiをデプロイするための準備方法の基本をカバーしています。

:::strapi Strapi Cloud
プロジェクトを迅速にデプロイしホストするために、[Strapi Cloud](/cloud/intro)を使用することができます。
:::

:::tip
すでにContent-Type Builderでデータ構造を作成し、Content Managerを通じてローカル（開発）Strapiインスタンスにいくつかのデータを追加した場合、[データ管理システム](/dev-docs/data-management)を活用して、Strapiインスタンスから別のインスタンスへデータを転送することができます。

別の可能なワークフローは、まずローカルでデータ構造を作成し、プロジェクトをgitベースのリポジトリにプッシュし、変更を本番環境にデプロイし、その後で本番インスタンスにコンテンツを追加することです。
:::

## 一般的なガイドライン

### ハードウェアとソフトウェアの要件

Strapiが最適な環境を提供するために、以下の要件が開発（ローカル）とステージング、本番ワークフローに適用されます。

<InstallPrereq />

- あなたのOSの標準的なビルドツール（ほとんどのDebianベースのシステムでは `build-essentials` パッケージ）
- サーバーのハードウェア仕様（CPU、RAM、ストレージ）:

  <HardwareRequire components={props.components} />

- サポートされているデータベースのバージョン:
<DatabaseRequire components={props.components} />

:::strapi データベースのデプロイ
Strapiと一緒にデータベースをデプロイする方法は、[データベースガイド](/dev-docs/configurations/database#databases-installation-guides)でカバーされています。
:::

- サポートされているオペレーティングシステム:

  <OperatingSystemRequire components={props.components} />

### アプリケーションの設定

#### 1. 設定

環境に基づいてアプリケーションを設定するために、環境変数の使用を推奨します。例えば：

```js title="/config/server.js"

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
});
```

次に、`.env` ファイルを作成するか、選択したデプロイメントプラットフォームで直接環境変数を設定できます：

```
HOST=10.0.0.1
PORT=1338
```

:::tip
設定の詳細については、[設定](/dev-docs/configurations)のドキュメンテーションを参照してください。
:::

#### 2. サーバーの起動

本番環境でサーバーを実行する前に、管理パネルを本番環境用にビルドする必要があります：

<Tabs groupId="yarn-npm-windows">

<TabItem value="yarn" label="yarn">

```bash
NODE_ENV=production yarn build
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
NODE_ENV=production npm run build
```

</TabItem>

<TabItem value="windows" label="windows">

```bash
npm install cross-env
```

その後、`package.json`のスクリプトセクションに以下を追加します：

```bash
"build:win": "cross-env NODE_ENV=production npm run build",
```

そして実行します：

```bash
npm run build:win
```

</TabItem>
</Tabs>

`production`設定でサーバーを実行します：

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
NODE_ENV=production yarn start
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
NODE_ENV=production npm run start
```

</TabItem>

<TabItem value="windows" label="windows">

```bash
npm install cross-env
```

その後、`package.json`のスクリプトセクションに以下を追加します：

```bash
"start:win": "cross-env NODE_ENV=production npm start",
```

そして実行します：

```bash
npm run start:win
```

</TabItem>

</Tabs>

:::caution
プロセスを管理するために、[pm2](https://github.com/Unitech/pm2/)の使用を強く推奨します。
:::

`node server.js`の代わりに`npm run start`を実行できるように`server.js`ファイルが必要な場合は、以下のように`./server.js`ファイルを作成します：

```js title="path: ./server.js"

const strapi = require('@strapi/strapi');
strapi.createStrapi(/* {...} */).start();
```

:::caution

`TypeScript`ベースのプロジェクトを開発している場合、サーバーを起動するために`distDir`オプションを提供する必要があります。詳細は[TypeScriptのドキュメンテーション](/dev-docs/typescript#use-the-strapi-factory)を参照してください。
:::

### 高度な設定

APIとは別のサーバーで管理画面をホストしたい場合は、[この専用セクションをご覧ください](/dev-docs/admin-panel-customization/deployment)。

## 追加のリソース

:::prerequisites
* Strapiプロジェクトが[作成](/dev-docs/installation)され、そのコードがGitHubにホストされています。
* [一般的なデプロイメントガイドライン](/dev-docs/deployment#general-guidelines)を読んでいます。
:::

Strapiウェブサイトの[統合ページ](https://strapi.io/integrations)には、以下のサードパーティプラットフォームにStrapiをデプロイする方法を含む、Strapiと多くのリソースを統合する方法に関する情報が含まれています：

<CustomDocCard emoji="🔗" small title="AWSにStrapiをデプロイする"  link="https://strapi.io/integrations/aws" />

<CustomDocCard emoji="🔗" small title="AzureにStrapiをデプロイする" link="https://strapi.io/integrations/azure" />

<CustomDocCard emoji="🔗" small title="DigitalOcean App PlatformにStrapiをデプロイする"  link="https://strapi.io/integrations/digital-ocean" />

<CustomDocCard emoji="🔗" small title="HerokuにStrapiをデプロイする" link="https://strapi.io/integrations/heroku" />

<br/>

さらに、[Strapiフォーラム](https://forum.strapi.io/c/community-guides/28)には、以下のガイドを含む追加のプロバイダーに関するコミュニティによって維持されているガイドがあります：

<CustomDocCard emoji="🔗" small title="Caddyを使用したプロキシ" link="https://forum.strapi.io/t/caddy-proxying-with-strapi/" />
<CustomDocCard emoji="🔗" small title="HAProxyを使用したプロキシ" link="https://forum.strapi.io/t/haproxy-proxying-with-strapi/" />
<CustomDocCard emoji="🔗" small title="NGinxを使用したプロキシ" link="https://forum.strapi.io/t/nginx-proxing-with-strapi/" />
<CustomDocCard emoji="🔗" small title="PM2プロセスマネージャの使用" link="https://forum.strapi.io/t/how-to-use-pm2-process-manager-with-strapi/" />

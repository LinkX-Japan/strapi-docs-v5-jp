---
title: プラグインの作成とセットアップ
description: Plugin SDKを使用してStrapiプラグインを構築し、公開する方法を学びます。
pagination_next: dev-docs/plugins/development/plugin-structure
tags:
  - ガイド
  - プラグイン
  - Plugin SDK
  - プラグイン開発
---

# プラグインの作成

Strapi 5 プラグインを作成する方法はいくつかありますが、最も迅速で推奨される方法はPlugin SDKを使用することです。

Plugin SDKは、ローカルプラグインとして使用したり、NPMに公開したり、Marketplaceに提出したりするためのプラグインを開発するためのコマンドセットです。

Plugin SDKを使用すると、プラグインを作成する前にStrapiプロジェクトを設定する必要はありません。

このガイドでは、ゼロからプラグインを作成し、既存のStrapiプロジェクトにリンクし、プラグインを公開するまでの手順を説明します。既にプラグインを持っている場合は、プラグインのセットアップをPlugin SDKコマンドに適応させることができます（利用可能なコマンドの完全なリストについては、[Plugin SDKのリファレンス](/dev-docs/plugins/development/plugin-sdk)を参照してください）。

:::note
このガイドは、Strapiプロジェクトとは別にプラグインを開発することを前提としています。ただし、既存のプロジェクト内でプラグインを開発する場合も手順はほぼ同じです。[モノレポ](#working-with-the-plugin-cli-in-a-monorepo-environment)を使用しない限り、手順は全く同じです。
:::

:::prerequisites
[yalc](https://www.npmjs.com/package/yalc) がグローバルにインストールされている必要があります（`npm install -g yalc` または `yarn global add yalc` を実行）。
:::

## Plugin SDKの使用を開始する

Plugin SDKは、プラグインの作成、既存のStrapiプロジェクトへのリンク、および公開のためのビルドを支援します。

コマンドとそのパラメーターの完全なリストは[Plugin SDKのリファレンス](/dev-docs/plugins/development/plugin-sdk)にあります。このページでは、主なコマンドの使用方法を説明します。

### プラグインの作成

プラグインを作成するには、作成先の親ディレクトリにいることを確認し、次のコマンドを実行します。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="Yarn">

```bash
yarn dlx @strapi/sdk-plugin init my-strapi-plugin
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
npx @strapi/sdk-plugin init my-strapi-plugin
```

</TabItem>

</Tabs>

`my-strapi-plugin`のパスは、プラグインに付けたい名前や、作成先のパス（例: `code/strapi-plugins/my-new-strapi-plugin`）に置き換えることができます。

一連のプロンプトが表示され、プラグインのセットアップが進められます。すべてのオプションに「はい」を選択すると、最終的な構造はデフォルトの[プラグイン構造](/dev-docs/plugins/development/plugin-structure)に似たものになります。

### プロジェクトへのプラグインのリンク

開発中のプラグインをテストするために、既存のStrapiプロジェクトにリンクすることが推奨されます。

プラグインをプロジェクトにリンクするには、`watch:link` コマンドを使用します。このコマンドは、プラグインをStrapiプロジェクトにリンクする方法についての説明を出力します。

新しいターミナルウィンドウで、次のコマンドを実行します。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="Yarn">

```bash
cd /path/to/strapi/project
yarn dlx yalc add --link my-strapi-plugin && yarn install
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
cd /path/to/strapi/project
npx yalc add --link my-strapi-plugin && npm install
```

</TabItem>

</Tabs>

:::note
上記の例では、プロジェクトにリンクする際にプラグイン名（`my-strapi-plugin`）を使用しています。これはフォルダ名ではなく、パッケージ名です。
:::

このプラグインは`node_modules`経由でインストールされるため、`plugins` [設定ファイル](/dev-docs/configurations/plugins)に明示的に追加する必要はありません。Strapiプロジェクトを開始するために[`develop`コマンド](../../cli.md#strapi-develop)を実行すると、自動的にプラグインが認識されます。

プラグインがプロジェクトにリンクされたら、`yarn develop` または `npm run develop` を実行してStrapiアプリケーションを開始します。

これで、プラグインを自由に開発できるようになります。サーバー側の変更を行う場合は、変更を適用するためにサーバーを再起動する必要があります。

### プラグインを公開するためのビルド

プラグインを公開する準備ができたら、ビルドを行う必要があります。次のコマンドを実行します。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="Yarn">

```bash
yarn build && yarn verify
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
npm run build && npm run verify
```

</TabItem>

</Tabs>

上記のコマンドは、プラグインをビルドするだけでなく、出力が有効であり、公開する準備ができていることを確認します。プラグインは、他のパッケージと同様にNPMに公開することができます。

## モノレポ環境でのPlugin SDKの使用

モノレポ環境でプラグインを開発している場合、`watch:link`コマンドを使用する必要はありません。モノレポワークスペースのセットアップがシンボリックリンクを処理します。その代わりに、`watch`コマンドを使用できます。

ただし、管理パネルのコードを記述している場合は、管理パネルのコンテキストでプラグインのソースコードを操作しやすくするために、プラグインのソースコードをターゲットにした`alias`を追加することができます。

```ts
import path from 'node:path';

export default (config, webpack) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    'my-strapi-plugin': path.resolve(
      __dirname,
      // プラグインがローカルにあると仮定しています。
      '../plugins/my-strapi-plugin/admin/src'
    ),
  };

  return config;
};
```

:::caution
サーバーはプラグインコードをインポートするために`server/src/index.ts|js`ファイルを参照します。そのため、`watch`コマンドを使用しないとコードがトランスパイルされず、サーバーがプラグインを見つけることができません。
:::

---
title: TypeScript開発
description: Strapi 5でのTypeScriptの使用方法について学びます
tags:
- strapi()ファクトリー
- strapi.compile()関数
- typescript
- プラグイン開発

---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# Strapiを使用したTypeScript開発

<NotV5/>

[TypeScript](/dev-docs/typescript)を使用したStrapiアプリケーション開発中に以下のことが可能です：

- [Strapiクラスの型定義](#use-strapi-typescript-typings)にアクセスしてオートコンプリート機能を使用する、
- プロジェクトのコンテンツタイプの[型を生成する](#generate-typings-for-content-types-schemas)、
- [プログラムでStrapiを起動する](#start-strapi-programmatically)、
- [プラグイン開発](#develop-a-plugin-using-typescript)に関するTypeScript特有の指示に従う。

## `Strapi` TypeScript型定義の使用

Strapiは、TypeScript開発の体験を向上させるために`Strapi`クラスの型定義を提供しています。これにより、開発中にオートコンプリート機能が利用可能です。

TypeScriptベースのオートコンプリートをStrapiアプリケーションの開発中に体験するには、次の手順を試してください。

1. コードエディタで `./src/index.ts` ファイルを開きます。
2. グローバルの `register` メソッド内で、`strapi` 引数を `Strapi` 型として宣言します。

    ```typescript title="./src/index.ts"
    import { Strapi } from '@strapi/strapi';

    export default {
      register({ strapi }: { strapi: Strapi }) {
        // ...
      },
    };
    ```

3. `register` メソッドの本文内で `strapi.` と入力し、キーボードの矢印キーで利用可能なプロパティを選択します。
4. リストから `runLifecyclesFunctions` を選択します。
5. `strapi.runLifecyclesFunctions` メソッドが追加されると、利用可能なライフサイクル（`register`、`bootstrap`、`destroy`）のリストがエディタに表示されます。矢印キーを使って1つ選択すると、コードが自動補完されます。

## コンテンツタイプスキーマの型を生成する

プロジェクトスキーマの型を生成するには、[`ts:generate-types` CLIコマンド](/dev-docs/cli#strapi-tsgenerate-types)を使用します。このコマンドはプロジェクトルートに`types`フォルダを作成し、プロジェクトの型を格納します。オプションの`--debug`フラグを使用すると、生成されたスキーマの詳細な表が表示されます。

次のコードをプロジェクトルートのターミナルで実行します。

<Tabs groupId="yarn-npm">
<TabItem value="npm">

```sh
npm run strapi ts:generate-types --debug #オプションフラグで追加のログを表示
```

</TabItem>

<TabItem value="yarn">

```sh
yarn strapi ts:generate-types --debug #オプションフラグで追加のログを表示
```

</TabItem>
</Tabs>

:::tip 自動的に型を生成する
サーバーの再起動時に型を自動生成するには、[`config/typescript.js|ts` 設定ファイル](/dev-docs/configurations/typescript#strapi-specific-configuration-for-typescript)に `autogenerate: true` を追加します。
:::

:::tip フロントエンドアプリケーションでの型の使用
Strapiの型をフロントエンドアプリケーションで使用するには、Strapiが公式の解決策を提供するまで、[こちらの回避策](https://github.com/strapi-community/strapi-typed-fronend)を使用できます。
:::

### 生成された型によるビルドの問題を修正する

生成された型を除外して、エンティティサービスがそれらを使用せず、実際のプロパティをチェックしない緩やかな型にフォールバックさせることができます。

そのためには、Strapiプロジェクトの`tsconfig.json`を編集し、`exclude`配列に`types/generated/**`を追加します。

```json title="./tsconfig.json"
// ...
"exclude": [
  "node_modules/",
  "build/",
  "dist/",
  ".cache/",
  ".tmp/",
  "src/admin/",
  "**/*.test.ts",
  "src/plugins/**",
  "types/generated/**"
]
// ...
```

ただし、生成された型をプロジェクトで使用しつつもStrapiには使用させたくない場合は、生成された型を`generated`ディレクトリの外にコピーし、型を再生成する際に上書きされないようにします。また、ファイルの下部にある`declare module '@strapi/types'`を削除します。

:::warning
型は必ず`@strapi/strapi`からインポートしてください。そうしないと、破壊的変更が発生する可能性があります。`@strapi/types`内の型は内部使用のみを目的としており、通知なしに変更されることがあります。
:::

## プログラムでStrapiを起動する

TypeScriptプロジェクトでプログラム的にStrapiを起動するには、Strapiインスタンスにコンパイル済みコードの場所を指定する必要があります。このセクションでは、コンパイル済みコードのディレクトリを設定する方法について説明します。

### `createStrapi()`ファクトリーの使用

Strapiは`strapi.createStrapi()`ファクトリーを使用してプログラム的に起動できます。TypeScriptプロジェクトのコードは特定のディレクトリにコンパイルされるため、コンパイルされたコードを読み取るディレクトリを示す`distDir`パラメーターをファクトリーに渡す必要があります。

```js title="./server.js"

const strapi = require('@strapi/strapi');
const app = strapi.createStrapi({ distDir: './dist' });
app.start(); 
```

### `strapi.compile()`関数の使用

`strapi.compile()`関数は、ツール開発時にStrapiインスタンスを起動し、プロジェクトにTypeScriptコードが含まれているかどうかを検出するために使用されます。`strapi.compile()`はプロジェクトの言語を自動検出します。プロジェクトコードにTypeScriptコードが含まれている場合、`strapi.compile()`はコードをコンパイルし、Strapiが必要とするディレクトリに関する特定の値を持つコンテキストを返します。

```js
const strapi = require('@strapi/strapi');

strapi.compile().then(appContext => strapi(appContext).start());
```

## TypeScriptを使用したプラグインの開発

新しいプラグインは[プラグイン開発ドキュメント](/dev-docs/plugins/developing-plugins)に従って生成できます。この際、CLIツールのプロンプトで「TypeScript」を選択します。

TypeScriptアプリケーションには2つの重要な違いがあります。

- プラグイン作成後に、プラグインディレクトリ`src/admin/plugins/[my-plugin-name]`で`yarn`または`npm install`を実行して、プラグインの依存関係をインストールします。
- プラグインディレクトリ`src/admin/plugins/[my-plugin-name]`で`yarn build`または`npm run build`を実行して、プラグインを含む管理パネルをビルドします。

:::note
初回インストール後は`yarn`または`npm install`コマンドを再実行する必要はありません。管理パネルに影響を与えるプラグイン開発を行った場合は、`yarn build`または`npm run build`コマンドを実行する必要があります。
:::

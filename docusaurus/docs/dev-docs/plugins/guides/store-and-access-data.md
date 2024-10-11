---
title: Strapiプラグインでデータを保存・アクセスする方法
description: Strapiプラグインでデータを保存・アクセスする方法を学びます。
sidebar_label: データの保存とアクセス
displayed_sidebar: devDocsSidebar
tags:
- コンテンツタイプ
- ガイド
- プラグイン
- プラグイン開発
- プラグイン開発ガイド
---

# Strapiプラグインでデータを保存・アクセスする方法

<NotV5/>

Strapiの[プラグイン](/dev-docs/plugins/developing-plugins)でデータを保存するには、プラグインのコンテンツタイプを使用します。プラグインのコンテンツタイプは、他の[コンテンツタイプ](/dev-docs/backend-customization/models)とまったく同じように機能します。コンテンツタイプを[作成](#create-a-content-type-for-your-plugin)したら、データとの[やり取りを開始](#interact-with-data-from-the-plugin)できます。

## プラグイン用のコンテンツタイプを作成する

CLIジェネレーターを使用してコンテンツタイプを作成するには、ターミナルで次のコマンドを実行します。

<Tabs groupId="yarn-npm">
<TabItem value="yarn" label="Yarn">

```bash
yarn strapi generate content-type
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
npm run strapi generate content-type
```

</TabItem>
</Tabs>

CLIジェネレーターは対話形式で、コンテンツタイプとその属性に関するいくつかの質問を行います。最初の質問に答えた後、`Where do you want to add this model?`という質問に対して、`Add model to existing plugin`オプションを選択し、関連するプラグインの名前を入力します。

<figure style={{width: '100%', margin: '0' }}>
  <img src="/img/assets/development/generate-plugin-content-type.png" alt="CLIを使ってプラグインコンテンツタイプを生成する" />
  <em><figcaption style={{fontSize: '12px'}}>CLIジェネレーターの<code>strapi generate content-type</code>コマンドを使ってプラグイン用の基本的なコンテンツタイプを作成します。</figcaption></em>
</figure>

<br />

CLIは、次のようなコードを含むプラグイン用のコンテンツタイプを使用するために必要なファイルを生成します。

- [コンテンツタイプスキーマ](/dev-docs/backend-customization/models#model-schema)
- 基本的な[コントローラー](/dev-docs/backend-customization/controllers)、[サービス](/dev-docs/backend-customization/services)、および[ルート](/dev-docs/backend-customization/routes)

:::tip
CLIジェネレーターを使用してシンプルなコンテンツタイプを最初に作成し、その後[コンテンツタイプビルダー](/user-docs/content-type-builder)を使用してコンテンツタイプを編集することをお勧めします。

もしコンテンツタイプが管理パネルに表示されない場合は、コンテンツタイプスキーマの`pluginOptions`オブジェクト内で`content-manager.visible`および`content-type-builder.visible`のパラメーターを`true`に設定する必要があるかもしれません。

<details>
<summary>プラグインコンテンツタイプを管理パネルに表示する:</summary>

次の例では、`schema.json`ファイルの特定の行を強調表示し、プラグインのコンテンツタイプをコンテンツタイプビルダーとコンテンツマネージャーで表示可能にする方法を示しています。

```json title="/server/content-types/my-plugin-content-type/schema.json" {13-20} showLineNumbers
{
  "kind": "collectionType",
  "collectionName": "my_plugin_content_types",
  "info": {
    "singularName": "my-plugin-content-type",
    "pluralName": "my-plugin-content-types",
    "displayName": "My Plugin Content-Type"
  },
  "options": {
    "draftAndPublish": false,
    "comment": ""
  },
  "pluginOptions": {
    "content-manager": {
      "visible": true
    },
    "content-type-builder": {
      "visible": true
    }
  },
  "attributes": {
    "name": {
      "type": "string"
    }
  }
}
```

</details>
:::

### プラグインのコンテンツタイプがインポートされているか確認する

CLIジェネレーターは、プラグインに関連するすべてのコンテンツタイプファイルをインポートしていない可能性があるため、`strapi generate content-type`コマンドの実行後に次の調整が必要になることがあります。

1. `/server/index.js` ファイルでコンテンツタイプをインポートします。

  ```js {7,22} showLineNumbers title="/server/index.js"
  'use strict';

  const register = require('./register');
  const bootstrap = require('./bootstrap');
  const destroy = require('./destroy');
  const config = require('./config');
  const contentTypes = require('./content-types');
  const controllers = require('./controllers');
  const routes = require('./routes');
  const middlewares = require('./middlewares');
  const policies = require('./policies');
  const services = require('./services');

  module.exports = {
    register,
    bootstrap,
    destroy,
    config,
    controllers,
    routes,
    services,
    contentTypes,
    policies,
    middlewares,
  };
  ```

2. `/server/content-types/index.js` ファイルでコンテンツタイプフォルダをインポートします。

  ```js title="/server/content-types/index.js"
  'use strict';

  module.exports = {
    // 以下の行では、my-plugin-content-typeを実際の名前とフォルダパスに置き換えます
    "my-plugin-content-type": require('./my-plugin-content-type'),
  };
  ```

3. `/server/content-types/[your-content-type-name]` フォルダに、CLIで生成された`schema.json`ファイルだけでなく、次のコードを含む`index.js`ファイルが存在することを確認します。

  ```js title="/server/content-types/my-plugin-content-type/index.js"
  'use strict';

  const schema = require('./schema');

  module.exports = {
    schema,
  };
  ```

## プラグインからデータとやり取りする

コンテンツタイプを作成したら、データの作成、読み取り、更新、削除が可能になります。

:::note
プラグインは`/server`フォルダからのみデータを操作できます。管理パネルからデータを更新する必要がある場合は、[サーバーから管理パネルへのデータ送信に関するガイド](/dev-docs/plugins/guides/pass-data-from-server-to-admin)を参照してください。
:::

データの作成、読み取り、更新、削除には、[エンティティサービスAPI](/dev-docs/api/entity-service)または[クエリエンジンAPI](/dev-docs/api/query-engine)を使用できます。特にコンポーネントやダイナミックゾーンにアクセスする必要がある場合はエンティティサービスAPIの使用が推奨されますが、基盤となるデータベースへの制限のないアクセスが必要な場合はクエリエンジンAPIが便利です。

エンティティサービスAPIやクエリエンジンAPIのクエリでは、コンテンツタイプ識別子として`plugin::your-plugin-slug.the-plugin-content-type-name`という構文を使用します。

**例:**

以下は、`my-plugin`というプラグイン用に作成された`my-plugin-content-type`コレクションタイプのすべてのエントリを取得する方法です。

```js
// エンティティサービスAPIを使用
let data = await strapi.entityService.findMany('plugin::my-plugin.my-plugin-content-type');

// クエリエンジンAPIを使用
let data = await strapi.db.query('plugin::my-plugin.my-plugin-content-type').findMany();
```

:::tip
データベースには、`middlewares`、`policies`、`controllers`、`services`、および`register`、`bootstrap`、`destroy`ライフサイクル関数からアクセスできます。
:::

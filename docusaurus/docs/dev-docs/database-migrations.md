---
title: データベースマイグレーション
description: Strapiのデータベースマイグレーションは、データベースを変更する方法です
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# データベースマイグレーション

<NotV5 />

データベースマイグレーションは、一度だけデータベースに対してクエリを実行し、通常はStrapiアプリケーションのアップグレード時にテーブル構造やデータを変更するために存在します。これらのマイグレーションは、アプリケーションの起動時に自動的に実行され、Strapiが起動時にも自動的に実行するスキーママイグレーションの前に実行されます。

:::callout 🚧  実験的な機能
データベースマイグレーションは実験的な機能です。この機能はまだ作業中であり、引き続き更新と改善が行われます。その間、[フォーラム](https://forum.strapi.io/)やコミュニティの[Discord](https://discord.strapi.io)での助けを求めることができます。
:::

## データベースマイグレーションファイルの理解

マイグレーションは、`./database/migrations`に保存されたJavaScriptのマイグレーションファイルを使用して実行されます。

Strapiは自動的にマイグレーションファイルを検出し、次の起動時に一度だけそれらをアルファベット順に実行します。新しいファイルは一度だけ実行されます。マイグレーションは、データベースのテーブルがコンテンツタイプのスキーマと同期される前に実行されます。

:::warning
* 現在、Strapiはダウンマイグレーションをサポートしていません。これは、マイグレーションを元に戻す必要がある場合、手動で行う必要があることを意味します。将来的にダウンマイグレーションを実装する予定ですが、現在のところタイムラインはありません。

* Strapiは警告なしに未知のテーブルを削除します。これは、データベースマイグレーションはStrapiのスキーマを変更する際にデータを保持するためにのみ使用できることを意味します。`forceMigration`と`runMigrations`の[データベース設定パラメータ](/dev-docs/configurations/database#settings-configuration-object)を使用して、データベースマイグレーションの挙動を微調整することができます。
:::

マイグレーションファイルは、アップグレード時（例えば、新しいテーブル`my_new_table`を追加する場合）に使用される関数`up()`をエクスポートする必要があります。

`up()`関数はデータベーストランザクション内で実行されるため、マイグレーション中にクエリが失敗すると、マイグレーション全体がキャンセルされ、データベースには変更が適用されません。マイグレーション関数内で別のトランザクションが作成された場合、それはネストしたトランザクションとして機能します。

:::note
データベースマイグレーションを手動で実行するCLIはありません。
:::

## マイグレーションファイルの作成

マイグレーションファイルを作成するには：

1. `./database/migrations`フォルダ内で、日付とマイグレーションの名前をつけた新しいファイルを作成します（例：`2022.05.10T00.00.00.name-of-my-migration.js`）。ファイル名がこの命名パターンに従っていることを確認してください。なぜなら、ファイルのアルファベット順がマイグレーションの実行順序を決定するからです。

2. 以下のテンプレートをコピーして、先ほど作成したファイルに貼り付けます：

```jsx
'use strict'

async function up(knex) {}

module.exports = { up };
```

3. `up()`関数内に実際の移行コードを追加してテンプレートを完成させます。
`up()`は[Knexインスタンス](https://knexjs.org/)を受け取り、すでにトランザクション状態でデータベースクエリを実行することができます。

<details>
<summary>移行ファイルの例</summary>

```jsx title="./database/migrations/2022.05.10T00.00.00.name-of-my-migration.js"

module.exports = {
  async up(knex) {
    // データベースへの接続がすでに初期化されたKnex.js APIを完全に利用できます

    // 例：テーブルの名前を変更する
    await knex.schema.renameTable('oldName', 'newName');

    // 例：カラムの名前を変更する
    await knex.schema.table('someTable', table => {
      table.renameColumn('oldName', 'newName');
    });

    // 例：データを更新する
    await knex.from('someTable').update({ columnName: 'newValue' }).where({ columnName: 'oldValue' });
  },
};
```

</details>

### 移行のためのStrapiインスタンスの使用

:::danger
ユーザーがKnexを直接使用せずに移行のためにStrapiインスタンスを利用することを選択した場合、移行コードを`strapi.db.transaction()`でラップすることが重要です。これを怠ると、エラーが発生した場合に移行がロールバックされない可能性があります。
:::

<details>
<summary>Strapiインスタンスを使用した移行ファイルの例</summary>

```jsx title="./database/migrations/2022.05.10T00.00.00.name-of-my-migration.js"
module.exports = {
  async up() {
    await strapi.db.transaction(async () => {
      // ここに移行コードを記述します

      // 例：新しいエントリを作成する
      await strapi.entityService.create('api::article.article', {
        data: {
          title: 'My Article',
        },
      });

      // 例：カスタムサービスメソッド
      await strapi.service('api::article.article').updateRelatedArticles();
    });
  },
};
```

</details>

フッター

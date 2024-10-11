---
title: データ転送
description: Strapi CLIを使用してデータを転送する方法
displayed_sidebar: devDocsSidebar
canonicalUrl: https://docs.strapi.io/dev-docs/data-management/transfer.html
tags:
- データ管理システム
- データ転送
- strapi transfer
- 環境
---
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# データ転送

<NotV5 />

`strapi transfer`コマンドは、あるStrapiインスタンスから別のStrapiインスタンスにデータをストリーミングするために使用されます。このコマンドでは、厳密なスキーマの一致が必要です。つまり、データ以外の点で両方のStrapiインスタンスは正確なコピーである必要があります。デフォルトの`transfer`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、およびスキーマを転送します。データ転送は次のいずれかで行われます:

- ローカルStrapiインスタンスからリモートStrapiインスタンスへ
- リモートStrapiインスタンスからローカルStrapiインスタンスへ

:::caution

* 送信先インスタンスでSQLiteデータベースを使用している場合、転送が実行されている間、他のデータベース接続がブロックされます。
* 管理者ユーザーおよびAPIトークンは転送されません。
* プロジェクトでWebSocketやSocket.ioを使用している場合、転送コマンドは失敗します。転送コマンドを使用するには、WebSocketやSocket.ioを一時的に無効にするか、別ポートで実行する必要があります。

:::

CLIコマンドには以下のオプションがあります:

| オプション          | 説明                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `--to`              | 送信先Strapiインスタンスの`/admin`エンドポイントの完全なURL<br />(例: `--to https://my-beautiful-strapi-website/admin`)               |
| `‑‑to‑token`        | 送信先Strapiインスタンスの転送トークン                                                                                               |
| `--from`            | データを取得するリモートStrapiインスタンスの`/admin`エンドポイントの完全なURL<br />(例: `--from https://my-beautiful-strapi-website/admin`) |
| `‑‑from‑token`      | ソースStrapiインスタンスの転送トークン                                                                                                |
| `--force`           | すべてのプロンプト（破壊的なリクエストを含む）に自動的に「yes」と答え、対話なしで実行します                                              |
| `--exclude`         | カンマ区切りで指定されたデータタイプを除外します。利用可能なタイプは`content`、`files`、`config`です                                    |
| `--only`            | 指定されたデータのみを含めます。利用可能なタイプは`content`、`files`、`config`です                                                    |
| `--throttle`        | 転送中に「チャンク」間に挿入される人工的な遅延時間をミリ秒単位で設定します                                                               |

:::caution
`--to`または`--from`のどちらかが必須です。
:::

:::tip Tips
* データ転送は、管理パネルから[転送トークン](/user-docs/settings/transfer-tokens)を使用して認証されます。管理パネルからは、トークンに対するロールベースの権限（表示、作成、読み取り、再生成、削除）を管理できます。
* 環境変数に転送トークンを保存して、コピーペーストを避けることが便利です。これらのトークンが公開リポジトリにプッシュされないよう注意してください。
:::

:::warning
nginxとリバースプロキシを使用してlocalhostにリクエストを転送するサーバーを使用する場合、問題が発生する可能性があります。これを防ぐため、すべてのヘッダーが正しく転送されるようにnginxの設定ファイル（`/etc/nginx/sites-available/yourdomain`）を変更します。

```
server {
    listen 80;
    server_name <yourdomain>;
    location / {
        proxy_pass http://localhost:1337;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        include proxy_params;
    }
}
```

:::

## 転送トークンを生成する

:::prerequisites
転送トークンは、[管理パネルの設定](/dev-docs/configurations/admin-panel)ファイルで定義する必要があります。
:::

`strapi transfer`コマンドを使用するには、送信先インスタンスで発行された転送トークンが必要です。管理パネルで転送トークンを生成するには、[ユーザーガイド](/user-docs/settings/transfer-tokens)の指示に従ってください。

## データ転送の設定と実行

データ転送の開始方法は、リモートインスタンスにデータをプッシュするか、リモートインスタンスからデータをプルするかによって異なります。

<Tabs>

<TabItem value="push" label="リモートにデータをプッシュ">

  1. 送信先インスタンスのStrapiサーバーを起動します。
  2. 新しいターミナルウィンドウで、ソースインスタンスのルートディレクトリに移動します。
  3. 次の最小限のコマンドを実行して転送を開始します。`destinationURL`は、管理パネルの完全なURLであることを確認してください（つまり、URLには`/admin`部分が含まれます）。

    <Tabs groupId="yarn-npm">

    <TabItem value="yarn" label="yarn">

    ```bash
    yarn strapi transfer --to destinationURL
    ```

    </TabItem>

    <TabItem value="npm" label="npm">

    ```bash
    npm run strapi transfer -- --to destinationURL
    ```

    </TabItem>

    </Tabs>
  
  4. 転送トークンを入力するように求められたら追加します。
  5. CLIプロンプト「この転送はリモートStrapiアセットとデータベースをすべて削除します。本当に続行しますか？」に対して**Yes**または**No**を答えます。

</TabItem>

<TabItem value="pull" label="リモートからデータをプル">

1. ソースインスタンスのStrapiサーバーを起動します。
2. 新しいターミナルウィンドウで、送信先インスタンスのルートディレクトリに移動します。
3. 次の最小限のコマンドを実行して転送を開始します。`remoteURL`は、管理パネルの完全なURLであることを確認してください（つまり、URLには`/admin`部分が含まれます）。

  <Tabs groupId="yarn-npm">

  <TabItem value="yarn" label="yarn">

  ```bash
  yarn strapi transfer --from remoteURL
  ```

  </TabItem>

  <TabItem value="npm" label="npm">

  ```bash
  npm run strapi transfer -- --from remoteURL
  ```

  </TabItem>

  </Tabs>

4. 転送トークンを入力するように求められたら追加します。
5. CLIプロンプト「この転送はローカルStrapiアセットとデータベースをすべて削除します。本当に続行しますか？」に対して**Yes**または**No**を答えます。

</TabItem>
</Tabs>

## `transfer`コマンドのすべてのプロンプトをバイパス

`strapi transfer`コマンドを使用する場合、転送が既存のデータベースコンテンツを削除することを確認するプロンプトが表示されます。`--force`フラグを使用すると、このプロンプトをスキップできます。このオプションは、`strapi transfer`をプログラムで実装する場合に便利です。`--force`オプションを使用する場合、転送トークン`--to-token`オプションを渡す必要があります。

:::caution
`--force`オプションは、コンテンツ削除に関するすべての警告をバイパスします。


:::

### 例: `--force`オプションを使用して`transfer`コマンドのプロンプトをバイパス

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi transfer --to https://example.com/admin --to-token my-transfer-token --force
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi transfer -- --to https://example.com/admin --to-token my-transfer-token --force
```

</TabItem>

</Tabs>

## 指定されたデータタイプのみを転送する

デフォルトの`strapi transfer`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、およびスキーマを転送します。`--only`オプションを使用すると、指定された項目のみを転送できます。項目はコンマで区切られた文字列で指定します。利用可能な値は`content`、`files`、および`config`です。スキーマは常に転送され、転送の際に一致を確認します。

### 例: ファイルのみを転送する

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi transfer --to https://example.com/admin --only files
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi transfer -- --to https://example.com/admin --only files
```

</TabItem>

</Tabs>

## 転送中にデータタイプを除外する

デフォルトの`strapi transfer`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、およびスキーマを転送します。`--exclude`オプションを使用すると、コンテンツ、ファイル、プロジェクト設定を除外できます。除外する項目はコンマで区切られた文字列で指定します。スキーマは転送の際に一致を確認するため、除外できません。

### 例: ファイルを除外して転送する

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi transfer --to https://example.com/admin --exclude files
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi transfer -- --to https://example.com/admin --exclude files
```

</TabItem>

</Tabs>

:::warning
転送から除外された項目は、送信先インスタンスで削除されます。たとえば、`config`を除外すると、送信先インスタンスのプロジェクト設定が削除されます。
:::

## 環境変数を使用してデータ転送を管理する

環境変数`STRAPI_DISABLE_REMOTE_DATA_TRANSFER`を使用して、リモートデータ転送を無効にすることができます。管理パネルの[RBAC権限](/user-docs/users-roles-permissions/configuring-administrator-roles#plugins-and-settings)に加えて、これによりStrapiアプリケーションをより安全に保つことができます。`STRAPI_DISABLE_REMOTE_DATA_TRANSFER`を使用するには、`.env`ファイルに追加するか、`start`スクリプトの前に指定します。次の例を参照してください:

```bash
STRAPI_DISABLE_REMOTE_DATA_TRANSFER=true yarn start
```

Strapiで環境変数を使用する詳細については、[環境構成ドキュメント](/dev-docs/configurations/environment)を参照してください。

## ローカルで`transfer`コマンドをテストする

`transfer`コマンドは、2つのローカルインスタンス間でデータを転送することを目的としていません。[`export`](/dev-docs/data-management/export)および[`import`](/dev-docs/data-management/import)コマンドは、この目的のために設計されています。ただし、リモートインスタンスで使用する前に、テストインスタンスで`transfer`をローカルでテストすることで、その機能をよりよく理解することができます。以下は、`transfer`プロセスの完全な例を示しています。

### 新しいStrapiプロジェクトの作成とクローン

1. インストールコマンドを使用して新しいStrapiプロジェクトを作成します:

   ```bash
   npx create-strapi-app@latest <project-name> --quickstart
   ```

2. プロジェクト内で少なくとも1つのコンテンツタイプを作成します。最初のコンテンツタイプの作成については、[クイックスタートガイド](/dev-docs/quick-start)を参照してください。

   :::caution
   この段階ではプロジェクトにデータを追加しないでください。
   :::

3. プロジェクトをgitリポジトリにコミットします:

   ```bash
   git init
   git add .
   git commit -m "first commit"
   ```

4. プロジェクトリポジトリをクローンします:

   ```bash
   cd .. # 親ディレクトリに移動
   git clone <作成したgitリポジトリのパス>.git/ <new-instance-name>
   ```

### 最初のStrapiインスタンスにデータを追加する

1. 最初のStrapiインスタンスに戻り、コンテンツタイプにデータを追加します。
2. 最初のインスタンスのサーバーを停止します。

### 転送トークンの作成

1. 2つ目のStrapiインスタンスに移動し、ルートディレクトリで`build`および`start`コマンドを実行します:

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn build && yarn start
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run build && npm run start
```

</TabItem>

</Tabs>

2. 管理者ユーザーを登録します。
3. [転送トークンを作成してコピーします](/user-docs/settings/transfer-tokens)。
4. サーバーを実行したままにします。

### データを転送する

1. 最初のStrapiインスタンスに戻ります。
2. ターミナルで`strapi transfer`コマンドを実行します:

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi transfer --to http://localhost:1337/admin
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi transfer -- --to http://localhost:1337/admin
```

</TabItem>

</Tabs>

3. プロンプトが表示されたら、転送トークンを適用します。
4. 転送が完了したら、2つ目のStrapiインスタンスに戻り、コンテンツが正常に転送されていることを確認します。

:::tip
場合によっては、`localhost`に対して接続拒否エラーが発生することがあります。[http://127.0.0.1:1337/admin](http://127.0.0.1:1337/admin)にアドレスを変更してみてください。
:::

<FeedbackPlaceholder />

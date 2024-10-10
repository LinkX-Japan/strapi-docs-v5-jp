---
title: プロバイダー
description: プロバイダーをインストールして使用して、利用可能なプラグインの機能を拡張します。
tags:
- 環境
- プロバイダー
- ローカルプロバイダー
- プライベートプロバイダー

---

# プロバイダー

特定の[プラグイン](../../../user-docs/plugins)は、追加の[プロバイダー](../../../user-docs/plugins#providers)のインストールと設定により拡張できます。

プロバイダーは、プラグインのコア機能を拡張します。例えば、メディアファイルをローカルサーバーではなくAWS S3にアップロードしたり、Sendmailの代わりにAmazon SESをメールに使用したりすることができます。

:::note
現在、[アップロード](/dev-docs/plugins/upload)と[メール](/dev-docs/plugins/email)のプラグインのみがプロバイダーと連携するように設計されています。
:::

関連するプラグインには、[マーケットプレイス](../../../user-docs/plugins/installing-plugins-via-marketplace)から見つけることができるStrapiによって維持されている公式のプロバイダーと、[npm](https://www.npmjs.com/)から利用できる多数のコミュニティによって維持されているプロバイダーがあります。

プロバイダーは、アセットURLが安全なアクセスのために署名されるように、[プライベート](#creating-private-providers)に設定することができます。

## プロバイダーのインストール

新しいプロバイダーは、以下の形式の`npm`または`yarn`を使用してインストールできます。`@strapi/provider-<plugin>-<provider> --save`。

例えば：

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
#アップロードプラグインのAWS S3プロバイダーをインストールします

yarn add @strapi/provider-upload-aws-s3

# メールプラグインのSendgridプロバイダーをインストールします
yarn add @strapi/provider-email-sendgrid --save

```

</TabItem>

<TabItem value="npm" label="npm">

```bash
#アップロードプラグインのAWS S3プロバイダーをインストールします

npm install @strapi/provider-upload-aws-s3 --save

# メールプラグインのSendgridプロバイダーをインストールします
npm install @strapi/provider-email-sendgrid --save

```

</TabItem>

</Tabs>

## プロバイダーの設定

新しくインストールされたプロバイダーは、`./config/plugins.js`ファイルで有効化され、設定されます。このファイルが存在しない場合は作成する必要があります。

各プロバイダーは、利用可能な設定が異なります。詳細は、そのプロバイダーの[マーケットプレイス](../../../user-docs/plugins/installing-plugins-via-marketplace)または[npm](https://www.npmjs.com/)のエントリを確認してください。

以下に、アップロードとメールのプラグインの設定例を示します。

<Tabs>

<TabItem value="Upload" title="Upload">

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js title="./config/plugins.js"```

module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CDN_URL'),
        rootPath: env('CDN_ROOT_PATH'),
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  // ...
});

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts title="./config/plugins.ts"

export default ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'aws-s3', // コミュニティプロバイダーの場合は、完全なパッケージ名を渡します (例: provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          ACL: env('AWS_ACL', 'public-read'), // アップロードしたファイルをプライベートにしたい場合は 'private'
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
  },
  // ...
});
```

</TabItem>

</Tabs>

:::note
Strapiにはデフォルトの[`security` ミドルウェア](/dev-docs/configurations/middlewares#security)があり、非常に厳格な `contentSecurityPolicy` が設定されており、画像やメディアの読み込みは `'self'` のみに限定されています。詳細は [provider page](https://www.npmjs.com/package/@strapi/provider-upload-aws-s3) または [middleware documentation](/dev-docs/configurations/middlewares#security) を参照してください。
:::

</TabItem>

<TabItem value="Email" title="Email">

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js title="./config/plugins.js"

module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid', // コミュニティプロバイダーの場合は、完全なパッケージ名を渡します (例: provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'juliasedefdjian@strapi.io',
        defaultReplyTo: 'juliasedefdjian@strapi.io',
        testAddress: 'juliasedefdjian@strapi.io',
      },
    },
  },
  // ...
});
```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts title="./config/plugins.ts"

デフォルトで ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid', // コミュニティプロバイダーの場合は、フルパッケージ名を指定します（例：provider: 'strapi-provider-email-mandrill'）
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'juliasedefdjian@strapi.io',
        defaultReplyTo: 'juliasedefdjian@strapi.io',
        testAddress: 'juliasedefdjian@strapi.io',
      },
    },
  },
  // ...
});

```

</TabItem>

</Tabs>

:::note

* 環境ごとに異なるプロバイダーを使用する場合は、 `./config/env/${yourEnvironment}/plugins.js` に正しい設定を指定します（[Environments](/dev-docs/configurations/environment)を参照）。
* 一度にアクティブになるメールプロバイダーは1つだけです。メールプロバイダーの設定がStrapiに反映されない場合は、 `plugins.js` ファイルが正しいフォルダにあることを確認してください。
* Strapiのセットアップ中に作成された2つのメールテンプレートで新しいメールプロバイダーをテストする場合、テンプレートの _shipper email_ はデフォルトで `no-reply@strapi.io` に設定されており、メールプロバイダーに応じて更新する必要があります。そうしないとテストに失敗します（[Configure templates locally](/user-docs/settings/configuring-users-permissions-plugin-settings#configuring-email-templates)を参照）。

:::

</TabItem>
</Tabs>

### 環境ごとの設定

プロバイダーを設定する際には、 `NODE_ENV` 環境変数に基づいて設定を変更するか、環境固有の資格情報を使用することがあります。

`./config/env/{env}/plugins.js` 設定ファイルに特定の設定を設定すると、デフォルトの設定を上書きするために使用されます。

## プロバイダーの作成

独自のカスタムプロバイダーを実装するには、[Node.jsモジュールを作成する](https://docs.npmjs.com/creating-node-js-modules)必要があります。

エクスポートする必要があるインターフェースは、プロバイダーを開発しているプラグインによります。以下に、アップロードとメールプラグインのテンプレートを示します：

<Tabs>
<TabItem value="Upload" title="Upload">

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js
module.exports = {
  init(providerOptions) {
    // 必要に応じてプロバイダーを初期化します

{
      upload(file) {
        // プロバイダーにファイルをアップロードする
        // `file.buffer`でファイルの内容にアクセスできます
      },
      uploadStream(file) {
        // プロバイダーにファイルをアップロードする
        // `file.stream`でファイルの内容にアクセスできます
      },
      delete(file) {
        // プロバイダーからファイルを削除する
      },
      checkFileSize(file, { sizeLimit }) {
        // （オプション）
        // 自分でファイルサイズの制限ロジックを実装する
      },
      getSignedUrl(file) {
        // （オプション）
        // 与えられたファイルの署名付きURLを生成する。
        // 署名付きURLはファイルへのセキュアなアクセスを可能にします。
        // コンテンツマネージャーの資産だけが署名されます。
        // オブジェクト {url: string}を返します。
      },
      isPrivate() {
        // （オプション）
        // プライベートであれば、ファイルのURLに署名が行われます
        // ブール値を返す
      },
    };
  },
};

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts
export default {
  init(providerOptions) {
    // 必要であればプロバイダーを初期化する

    return {
      upload(file) {
        // プロバイダーにファイルをアップロードする
        // `file.buffer`でファイルの内容にアクセスできます
      },
      uploadStream(file) {
        // プロバイダーにファイルをアップロードする
        // `file.stream`でファイルの内容にアクセスできます
      },
      delete(file) {
        // プロバイダーからファイルを削除する
      },
      checkFileSize(file, { sizeLimit }) {
        // （オプション）
        // 自分でファイルサイズの制限ロジックを実装する
      },
      getSignedUrl(file) {
        // （オプション）
        // 与えられたファイルの署名付きURLを生成する。
        // 署名付きURLはファイルへのセキュアなアクセスを可能にします。
        // コンテンツマネージャーの資産だけが署名されます。
        // オブジェクト {url: string}を返します。
      },
      isPrivate() {
        // （オプション）
        // プライベートであれば、ファイルのURLに署名が行われます
        // ブール値を返す
      },
    };
  },
};

```

</TabItem>

</Tabs>

</TabItem>

<TabItem value="Email" title="Email">

<Tabs groupId="js-ts">

<TabItem value="javascript" label="JavaScript">

```js
module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async options => {},
    };
  },
};

```

</TabItem>

<TabItem value="typescript" label="TypeScript">

```ts
export {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async options => {},
    };
  },
};

```

</TabItem>

</Tabs>

</TabItem>
</Tabs>

send関数では以下にアクセスできます：

* `plugins.js`に記述された設定を含む`providerOptions`
* `plugins.js`に記述された設定を含む`settings`
* emailプラグインサービスからsend関数を呼び出すときに送信するオプションを含む`options`

実装例として、[Strapiが維持しているプロバイダー](https://github.com/strapi/strapi/tree/master/packages/providers)を確認できます。

新しいプロバイダを作成した後、それを[npmに公開](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)してコミュニティと共有したり、プロジェクト専用に[ローカルで使用](#local-providers)することができます。

### ローカルプロバイダ

npmに公開せずに自分だけのプロバイダを作りたい場合は、以下の手順に従ってください:

1. アプリケーションに`providers`フォルダを作成します。
2. プロバイダを作成します（例：`./providers/strapi-provider-<plugin>-<provider>`）
3. 次に、`package.json`を更新して、新しいプロバイダの`strapi-provider-<plugin>-<provider>`(https://docs.npmjs.com/files/package.json#local-paths)依存関係を新しいプロバイダのローカルパスにリンクします。

```json
{
  ...
  "dependencies": {
    ...
    "strapi-provider-<plugin>-<provider>": "file:providers/strapi-provider-<plugin>-<provider>",
    ...
  }
}
```

4. `./config/plugins.js`ファイルを更新して、[プロバイダを設定](#configuring-providers)します。
5. 最後に、`yarn install`または`npm install`を実行して、新しいカスタムプロバイダをインストールします。

## プライベートプロバイダの作成

プライベートプロバイダを設定すると、コンテンツマネージャに表示されるすべてのアセットURLが安全なアクセスのために署名されます。

プライベートプロバイダを有効にするには、`isPrivate()`メソッドを実装し、`true`を返す必要があります。

バックエンドでは、Strapiはプロバイダで実装された`getSignedUrl(file)`メソッドを使用して、各アセットの署名付きURLを生成します。署名付きURLには、ユーザーがアセットにアクセスできるようにする暗号化された署名が含まれています（ただし、通常は限られた時間と特定の制限があります。プロバイダによります）。

セキュリティ上の理由から、コンテンツAPIは署名付きURLを提供しません。代わりに、APIを使用する開発者は自分でURLに署名する必要があります。

**例**

プライベートの`aws-s3`プロバイダを作成するには：

1. アプリケーションに`./providers/aws-s3`フォルダを作成します。詳細については、[ローカルプロバイダ](#local-providers)を参照してください。
2. `aws-s3`プロバイダの`isPrivate()`メソッドを実装し、`true`を返すようにします。
3. `aws-s3`プロバイダの`getSignedUrl(file)`メソッドを実装し、指定されたファイルの署名付きURLを生成します。

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./providers/aws-s3/index.js"
// aws-s3 provider

module.exports = {
  init: (config) => {
    const s3 = new AWS.S3(config);

    return {
      async upload(file) {
        // code to upload file to S3
      },

      async delete(file) {
        // code to delete file from S3
      },

      async isPrivate() {
        return true;
      },

      async getSignedUrl(file) {
        const params = {
          Bucket: config.params.Bucket,
          Key: file.path,
          Expires: 60, // URL expiration time in seconds
        };

        const signedUrl = await s3.getSignedUrlPromise("getObject", params);
        return { url: signedUrl };
      },
    };
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```ts title="./providers/aws-s3/index.ts"
// aws-s3 provider

エクスポート = {
  init: (config) => {
    const s3 = new AWS.S3(config);

    return {
      async upload(file) {
        // S3へのファイルのアップロードコード
      },

      async delete(file) {
        // S3からのファイルの削除コード
      },

      async isPrivate() {
        return true;
      },

      async getSignedUrl(file) {
        const params = {
          Bucket: config.params.Bucket,
          Key: file.path,
          Expires: 60, // URLの有効期限（秒）
        };

        const signedUrl = await s3.getSignedUrlPromise("getObject", params);
        return { url: signedUrl };
      },
    };
  },
};

```

</TabItem>

</Tabs>

<FeedbackPlaceholder />

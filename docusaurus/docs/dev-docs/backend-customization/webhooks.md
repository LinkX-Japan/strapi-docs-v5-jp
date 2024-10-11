---
title: Webhooks
displayed_sidebar: devDocsSidebar
description: StrapiのWebhooksは、アプリケーションが他のアプリケーションにイベントが発生したことを通知するために使用するユーザー定義のHTTPコールバックです。
tags:
- バックエンドのカスタマイズ
- バックエンドサーバー
- defaultHeaders
- ヘッダー
- ライフサイクルフック
- ペイロード
- REST API 
- webhooks
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# Webhooks

<NotV5 />

Webhookは、アプリケーションが他のアプリケーションにイベントが発生したことを通知するための構造です。より正確には、webhookはユーザー定義のHTTPコールバックです。Webhookを使用すると、サードパーティのプロバイダーに何らかの処理（CI、ビルド、デプロイなど）を開始するように通知することができます。

Webhookの動作方法は、HTTPリクエスト（通常はPOSTリクエスト）を通じて情報を受信アプリケーションに配信することによって行われます。

## ユーザーコンテンツタイプのWebhooks

誤ってユーザーの情報を他のアプリケーションに送信することを防ぐため、Webhooksはユーザーコンテンツタイプでは動作しません。
Usersコレクションの変更について他のアプリケーションに通知する必要がある場合は、`./src/index.js`の例を使用して[ライフサイクルフック](/dev-docs/backend-customization/models#lifecycle-hooks)を作成することができます。

## 利用可能な設定

Webhookの設定は、ファイル`./config/server`内で設定することができます。

- `webhooks`
  - `defaultHeaders`: Webhookリクエストに使用するデフォルトのヘッダーを設定できます。このオプションは、Webhook自体で設定されたヘッダーによって上書きされます。

**設定の例**

<Tabs groupId="js-ts">

<TabItem value="js" label="JavaScript">

```js title="./config/server.js"
module.exports = {
  webhooks: {
    defaultHeaders: {
      "Custom-Header": "my-custom-header",
    },
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./config/server.ts"
export default {
  webhooks: {
    defaultHeaders: {
      "Custom-Header": "my-custom-header",
    },
  },
};
```

</TabItem>
</Tabs>

## Webhooksのセキュリティ

ほとんどの場合、webhooksは公開URLにリクエストを行うため、誰かがそのURLを見つけて間違った情報を送信する可能性があります。

これを防ぐためには、認証トークンを含むヘッダーを送信することができます。管理パネルを使用して、各Webhookに対してこれを行う必要があります。
別の方法として、すべてのWebhookリクエストに追加するための`defaultHeaders`を定義することもできます。

これらのグローバルヘッダーは、`./config/server`のファイルを更新することで設定できます：

<Tabs>

<TabItem value="simple-token" label="シンプルなトークン">

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./config/server.js"
module.exports = {
  webhooks: {
    defaultHeaders: {
      Authorization: "Bearer my-very-secured-token",
    },
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./config.server.ts"
export default {
  webhooks: {
    defaultHeaders: {
      Authorization: "Bearer my-very-secured-token",
    },
  },
};
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="environment-variable" label="環境変数">

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./config/server.js"
module.exports = {
  webhooks: {
    defaultHeaders: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`,
    },
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./config/server.ts"
export default {
  webhooks: {
    defaultHeaders: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`,
    },
  },
};
```

</TabItem>
</Tabs>

</TabItem>

</Tabs>

もし自身でwebhookハンドラを開発しているなら、ヘッダーを読み込むことでトークンを検証できます。

<!--- ### 使用法

webhook設定パネルにアクセスするには、`Settings` > `Webhooks`に移動します。

![Webhooks home](/img/assets/concepts/webhooks/home.png)

#### webhookを作成する

`Add new webhook`をクリックしてフォームに入力します。

![create](/img/assets/concepts/webhooks/create.png)

#### webhookをトリガーする

テストイベント`trigger-test`でwebhookを試すことができます。トリガーしたいwebhookを開きます。

![Trigger ](/img/assets/concepts/webhooks/trigger_start.png)

`Trigger`ボタンをクリックします。

![Trigger pending](/img/assets/concepts/webhooks/trigger.png)

トリガーリクエストが表示され、結果を取得します。

![Trigger result](/img/assets/concepts/webhooks/trigger_result.png)

#### webhookを有効化または無効化する

リストビューから直接webhookを有効化または無効化できます。

![Disable webhook](/img/assets/concepts/webhooks/disable.png)

#### webhookを更新する

webhookリストビューの`pen`アイコンをクリックして任意のwebhookを編集できます。

![Update webhook](/img/assets/concepts/webhooks/list.png)

#### webhookを削除する

`trash`アイコンをクリックしてwebhookを削除できます。

![Delete webhook](/img/assets/concepts/webhooks/disable.png) --->

## 利用可能なイベント

デフォルトでは、Strapiのwebhooksは次のイベントによってトリガーされます：

| 名前              | 説明                                           |
| ----------------- | ----------------------------------------------------- |
| [`entry.create`](#entrycreate)   | コンテンツタイプのエントリが作成されたときにトリガーされます。       |
| [`entry.update`](#entryupdate)    | コンテンツタイプのエントリが更新されたときにトリガーされます。       |
| [`entry.delete`](#entrydelete)    | コンテンツタイプのエントリが削除されたときにトリガーされます。       |
| [`entry.publish`](#entrypublish)   | コンテンツタイプのエントリが公開されたときにトリガーされます。\*   |
| [`entry.unpublish`](#entryunpublish) | コンテンツタイプのエントリが非公開にされたときにトリガーされます。\* |
| [`media.create`](#mediacreate)    | メディアが作成されたときにトリガーされます。                    |
| [`media.update`](#mediaupdate)    | メディアが更新されたときにトリガーされます。                    |
| [`media.delete`](#mediadelete)    | メディアが削除されたときにトリガーされます。                    |
| [`review-workflows.updateEntryStage`](#review-workflowsupdateentrystage) | コンテンツがレビューステージ間で移動したときにトリガーされます（[レビューワークフロー](/user-docs/settings/review-workflows)を参照）。<br />このイベントは、Strapiの<EnterpriseBadge />エディションでのみ利用可能です。 |
| [`releases.publish`](#releasespublish-) | リリースが公開されたときにトリガーされます（[リリース](/user-docs/releases/introduction)を参照）。<br />このイベントは、Strapiの<EnterpriseBadge />エディションとStrapi Cloudの<CloudTeamBadge />プランでのみ利用可能です。 |

\*このコンテンツタイプで`draftAndPublish`が有効になっている場合のみ。

## ペイロード

:::tip ノート
プライベートフィールドとsはペイロードには含まれません。
:::

### ヘッダー

ペイロードがあなたのウェブフックのURLに配信されるとき、それは特定のヘッダーを含みます：

| ヘッダー           | 説明                                |
| ---------------- | ------------------------------------------ |
| `X-Strapi-Event` | トリガーされたイベントタイプの名前。 |

### `entry.create`

新しいエントリが作成されたときにこのイベントがトリガーされます。

**ペイロードの例**

```json
{
  "event": "entry.create",
  "createdAt": "2020-01-10T08:47:36.649Z",
  "model": "address",
  "entry": {
    "id": 1,
    "geolocation": {},
    "city": "Paris",
    "postal_code": null,
    "category": null,
    "full_name": "Paris",
    "createdAt": "2020-01-10T08:47:36.264Z",
    "updatedAt": "2020-01-10T08:47:36.264Z",
    "cover": null,
    "images": []
  }
}
```

### `entry.update`

エントリが更新されたときにこのイベントがトリガーされます。

**ペイロードの例**

```json
{
  "event": "entry.update",
  "createdAt": "2020-01-10T08:58:26.563Z",
  "model": "address",
  "entry": {
    "id": 1,
    "geolocation": {},
    "city": "Paris",
    "postal_code": null,
    "category": null,
    "full_name": "Paris",
    "createdAt": "2020-01-10T08:47:36.264Z",
    "updatedAt": "2020-01-10T08:58:26.210Z",
    "cover": null,
    "images": []
  }
}
```

### `entry.delete`

エントリが削除されたときにこのイベントがトリガーされます。

**ペイロードの例**

```json
{
  "event": "media.delete",
  "createdAt": "2020-01-10T10:58:41.115Z",
  "media": {
    "id": 1,
    "name": "image.png",
    "hash": "353fc98a19e44da9acf61d71b11895f9",
    "sha256": "huGUaFJhmcZRHLcxeQNKblh53vtSUXYaB16WSOe0Bdc",
    "ext": ".png",
    "mime": "image/png",
    "size": 228.19,
    "url": "/uploads/353fc98a19e44da9acf61d71b11895f9.png",
    "provider": "local",
    "provider_metadata": null,
    "createdAt": "2020-01-10T10:58:41.095Z",
    "updatedAt": "2020-01-10T10:58:41.095Z",
    "related": []
  }
}
```

### `entry.publish`

このイベントは、エントリーが公開されたときにトリガーされます。

**例のペイロード**

```json
{
  "event": "entry.publish",
  "createdAt": "2020-01-10T08:59:35.796Z",
  "model": "address",
  "entry": {
    "id": 1,
    "geolocation": {},
    "city": "Paris",
    "postal_code": null,
    "category": null,
    "full_name": "Paris",
    "createdAt": "2020-01-10T08:47:36.264Z",
    "updatedAt": "2020-01-10T08:58:26.210Z",
    "publishedAt": "2020-08-29T14:20:12.134Z",
    "cover": null,
    "images": []
  }
}
```

### `entry.unpublish`

このイベントは、エントリーの公開が取り消されたときにトリガーされます。

**例のペイロード**

```json
{
  "event": "entry.unpublish",
  "createdAt": "2020-01-10T08:59:35.796Z",
  "model": "address",
  "entry": {
    "id": 1,
    "geolocation": {},
    "city": "Paris",
    "postal_code": null,
    "category": null,
    "full_name": "Paris",
    "createdAt": "2020-01-10T08:47:36.264Z",
    "updatedAt": "2020-01-10T08:58:26.210Z",
    "publishedAt": null,
    "cover": null,
    "images": []
  }
}
```

### `media.create`

このイベントは、エントリー作成時またはメディアインターフェースを通じてファイルをアップロードするときにトリガーされます。

**例のペイロード**

```json
{
  "event": "media.create",
  "createdAt": "2020-01-10T10:58:41.115Z",
  "media": {
    "id": 1,
    "name": "image.png",
    "hash": "353fc98a19e44da9acf61d71b11895f9",
    "sha256": "huGUaFJhmcZRHLcxeQNKblh53vtSUXYaB16WSOe0Bdc",
    "ext": ".png",
    "mime": "image/png",
    "size": 228.19,
    "url": "/uploads/353fc98a19e44da9acf61d71b11895f9.png",
    "provider": "local",
    "provider_metadata": null,
    "createdAt": "2020-01-10T10:58:41.095Z",
    "updatedAt": "2020-01-10T10:58:41.095Z",
    "related": []
  }
}
```

### `media.update`

このイベントは、メディアを置換したり、メディアインターフェースを通じてメディアのメタデータを更新したときにトリガーされます。

**例のペイロード**

```json
{
  "event": "media.update",
  "createdAt": "2020-01-10T10:58:41.115Z",
  "media": {
    "id": 1,
    "name": "image.png",
    "hash": "353fc98a19e44da9acf61d71b11895f9",
    "sha256": "huGUaFJhmcZRHLcxeQNKblh53vtSUXYaB16WSOe0Bdc",
    "ext": ".png",
    "mime": "image/png",
    "size": 228.19,
    "url": "/uploads/353fc98a19e44da9acf61d71b11895f9.png",
    "provider": "local",
    "provider_metadata": null,
    "createdAt": "2020-01-10T10:58:41.095Z",
    "updatedAt": "2020-01-10T10:58:41.095Z",
    "related": []
  }
}
```

### `media.delete`

このイベントは、メディアインターフェースを通じてメディアを削除したときにのみトリガーされます。

**例のペイロード**

```json
{
  "event": "media.delete",
  "createdAt": "2020-01-10T11:02:46.232Z",
  "media": {
    "id": 11,
    "name": "photo.png",
    "hash": "43761478513a4c47a5fd4a03178cfccb",
    "sha256": "HrpDOKLFoSocilA6B0_icA9XXTSPR9heekt2SsHTZZE",
    "ext": ".png",
    "mime": "image/png",
    "size": 4947.76,
    "url": "/uploads/43761478513a4c47a5fd4a03178cfccb.png",
    "provider": "local",
    "provider_metadata": null,
    "createdAt": "2020-01-07T19:34:32.168Z",
    "updatedAt": "2020-01-07T19:34:32.168Z",
    "related": []
  }
}
```

### `review-workflows.updateEntryStage` <EnterpriseBadge/>

このイベントはStrapiの<EnterpriseBadge/>エディションでのみ利用可能です。<br />コンテンツが新たなレビューステージに移動したときにトリガーされるイベントです（[レビューワークフロー](/user-docs/settings/review-workflows)を参照）。

**例のペイロード**

```json
{
  "event": "review-workflows.updateEntryStage",
  "createdAt": "2023-06-26T15:46:35.664Z",
  "model": "model",
  "uid": "uid",
  "entity": {
    "id": 2
  },
  "workflow": {
    "id": 1,
    "stages": {
      "from": {
        "id": 1,
        "name": "Stage 1"
      },
      "to": {
        "id": 2,
        "name": "Stage 2"
      }
    }
  }
}
```

### `releases.publish` <EnterpriseBadge/><CloudTeamBadge/>

[リリース](/user-docs/releases/introduction)が公開されたときにトリガーされるイベントです。

**例のペイロード**

```json

{
  "event": "releases.publish",
  "createdAt": "2024-02-21T16:45:36.877Z",
  "isPublished": true,
  "release": {
    "id": 2,
    "name": "Fall Winter highlights",
    "releasedAt": "2024-02-21T16:45:36.873Z",
    "scheduledAt": null,
    "timezone": null,
    "createdAt": "2024-02-21T15:16:22.555Z",
    "updatedAt": "2024-02-21T16:45:36.875Z",
    "actions": {
      "count": 1
    }
  }
}

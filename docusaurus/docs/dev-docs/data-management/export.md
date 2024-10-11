---
title: データのエクスポート
description: Strapi CLIを使用してデータをエクスポートする方法
displayed_sidebar: devDocsSidebar
canonicalUrl: https://docs.strapi.io/dev-docs/data-management/export.html
tags:
- データの暗号化設定
- データ管理システム
- データのエクスポート
- データ圧縮の無効化
- 除外オプション
- metadata.json ファイル
- リレーション
- strapi export
- tar.gz.enc ファイル
---
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# データのエクスポート

<NotV5 />

`strapi export`コマンドは、ローカルのStrapiインスタンスからデータをエクスポートするために使用されます。デフォルトでは、`strapi export`コマンドは暗号化および圧縮された`tar.gz.enc`ファイルとしてデータをエクスポートし、以下を含みます:

- プロジェクト設定
- エンティティ: すべてのコンテンツ
- リンク: エンティティ間のリレーション
- アセット: アップロードフォルダに保存されたファイル
- スキーマ
- `metadata.json`ファイル

以下のドキュメントでは、データエクスポートをカスタマイズするためのオプションを説明します。エクスポートコマンドと利用可能なすべてのオプションは、[Strapi CLI](/dev-docs/cli#strapi-export)を使用して実行されます。

:::caution
* 管理ユーザーやAPIトークンはエクスポートされません。
* サードパーティのプロバイダー（例: CloudinaryやAWS S3）からのメディアは、アップロードフォルダにファイルが存在しないため、エクスポートに含まれません。
:::

## エクスポートファイルの命名

エクスポートされたデータは、`export_YYYYMMDDHHMMSS`形式の`.tar`ファイルに自動的に保存されます。`--file`または`-f`オプションを使用して、`strapi export`コマンドでエクスポートファイル名を指定することも可能です。ファイル拡張子は、指定したオプションに応じて自動的に設定されます。

### 例: カスタムファイル名でデータをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --file my-strapi-export
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --file my-strapi-export
```

</TabItem>

</Tabs>

## データ暗号化の設定

デフォルトの`strapi export`コマンドは、`aes-128-ecb`暗号化を使用してプロジェクトデータを暗号化し、ファイル拡張子`.enc`を追加します。暗号化を使用するには、`-k`または`--key`オプションで暗号化キーを渡すか、プロンプトで入力します。暗号化キーは文字数に制限がない`string`です。

:::tip 暗号化キー
強力な暗号化キーの使用が推奨されます。暗号化キーの生成には[OpenSSL](https://www.openssl.org/)などのリソースが役立ちます。以下は、ターミナルで暗号化キーを生成するための例です:

<Tabs>

<TabItem value="mac" label="Mac/Linux">

```bash
openssl rand -base64 48
```

</TabItem>

<TabItem value="windows" label="Windows">

```bash
node -p "require('crypto').randomBytes(48).toString('base64');"
```

</TabItem>

</Tabs>

:::

暗号化を無効にするには、`--no-encrypt`オプションを`strapi export`コマンドで使用します。

### 例: 暗号化なしでデータをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --no-encrypt
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --no-encrypt
```

</TabItem>

</Tabs>

### 例: `--key`オプションで暗号化キーを指定してデータをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --key my-encryption-key
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --key my-encryption-key
```

</TabItem>

</Tabs>

## データ圧縮の無効化

デフォルトの`strapi export`コマンドは、`gzip`圧縮を使用してプロジェクトデータを圧縮し、`.gz`ファイル拡張子を追加します。

圧縮を無効にするには、`--no-compress`オプションを`strapi export`コマンドで使用します。

### 例: 圧縮なしでデータをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --no-compress
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --no-compress
```

</TabItem>

</Tabs>

## 特定のデータタイプのみをエクスポートする

デフォルトの`strapi export`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、スキーマをエクスポートします。`--only`オプションを使用すると、コンマで区切られた文字列で指定された項目のみをエクスポートできます（スペースなし）。利用可能な値は、`content`、`files`、および`config`です。スキーマは常にエクスポートされます（`strapi import`ではスキーマの一致が使用されます）。

:::note
画像などのメディアは、ファイル（アセット）とデータベースのエンティティで構成されています。`--only`フラグを使用して`content`をエクスポートする場合、アセットのデータベースレコードは含まれますが、リンク切れが発生する可能性があります。
:::

### 例: エンティティとリレーションのみをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --only content
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --only content
```

</TabItem>

</Tabs>

## エクスポートから項目を除外する

デフォルトの`strapi export`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、スキーマをエクスポートします。`--exclude`オプションを使用すると、コンテンツ、ファイル、およびプロジェクト設定を除外できます。除外する項目をコンマで区切った文字列として渡します（スペースなし）。スキーマは除外できません（`strapi import`ではスキーマの一致が使用されます）。

:::note
画像などのメディアは、ファイル（アセット）とデータベースのエンティティで構成されています。アセットを除外するフラグを使用すると、データベースレコードは含まれますが、リンク切れが発生する可能性があります。
:::

### 例: アセット、エンティティ、リレーションを除外してデータをエクスポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi export --exclude files,content
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi export -- --exclude files,content
```

</TabItem>

</Tabs>

<FeedbackPlaceholder />

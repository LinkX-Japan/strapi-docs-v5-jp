---
title: データのインポート
description: Strapi CLIを使用してデータをインポートする方法
displayed_sidebar: devDocsSidebar
canonicalUrl: https://docs.strapi.io/dev-docs/data-management/import.html
tags:
- データ管理システム
- データのインポート
- 除外オプション
- forceオプション
- metadata.jsonファイル
- strapi import
- tar.gz.encファイル
---
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# データのインポート

<NotV5 />

`strapi import`コマンドは、ファイルからデータをインポートするために使用されます。デフォルトでは、`strapi import`コマンドは、暗号化および圧縮された`tar.gz.enc`ファイルからデータをインポートし、以下を含みます:

- プロジェクト設定
- エンティティ: すべてのコンテンツ
- リンク: エンティティ間のリレーション
- アセット: アップロードフォルダに保存されたファイル
- スキーマ
- `metadata.json`ファイル

以下のドキュメントでは、データインポートをカスタマイズするためのオプションを説明します。インポートコマンドと利用可能なすべてのオプションは、[Strapi CLI](/dev-docs/cli#strapi-import)を使用して実行されます。

:::warning
- `strapi import`は、インポートする前にすべての既存データ（データベースとアップロードディレクトリを含む）を削除します。
- `strapi import`を使用するには、ソースとターゲットのスキーマが一致している必要があります。すべてのコンテンツタイプが同一でなければなりません。
- 復元されたデータには`Admin users`テーブルは含まれないため、復元後のインスタンスでは`createdBy`や`updatedBy`フィールドが空になります。
:::

## インポートファイルの指定

Strapiインスタンスにデータをインポートするには、対象プロジェクトのルートディレクトリで`strapi import`コマンドを使用します。インポートするファイルは、`-f`または`--file`オプションを使用して指定します。ファイル名、拡張子、およびパスが必要です。ファイルが暗号化されている場合、インポートが開始される前に暗号化キーの入力を求められます。

### 例: Strapiプロジェクトルートにあるファイルから最小限のコマンドでデータをインポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi import -f /path/to/my/file/export_20221213105643.tar.gz.enc
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi import -- -f /path/to/my/file/export_20221213105643.tar.gz.enc
```

</TabItem>

</Tabs>

## 暗号化キーの提供

暗号化されたファイルからデータをインポートする場合、暗号化キーは`-k`または`--key`オプションで渡すことができます。

### 例: `strapi import`コマンドで暗号化キーを指定する

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi import -f /path/to/my/file/export_20221213105643.tar.gz.enc --key my-encryption-key
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi import -- -f /path/to/my/file/export_20221213105643.tar.gz.enc --key my-encryption-key
```

</TabItem>

</Tabs>

## コマンドラインプロンプトのバイパス

`strapi import`コマンドを使用する際には、インポートが既存のデータベースコンテンツを削除することを確認するプロンプトが表示されます。`--force`フラグを使用すると、このプロンプトをスキップできます。このオプションは、`strapi import`をプログラムで使用する場合に便利です。暗号化されたファイルをプログラムで使用する場合は、`--key`オプションも渡す必要があります。

### `--force`オプションの例

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi import -f /path/to/my/file/export_20221213105643.tar.gz.enc --force --key my-encryption-key
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm run strapi import -- -f /path/to/my/file/export_20221213105643.tar.gz.enc --force --key my-encryption-key
```

</TabItem>

</Tabs>

## インポート時にデータタイプを除外する

デフォルトの`strapi import`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、スキーマをインポートします。`--exclude`オプションを使用すると、コンテンツ、ファイル、プロジェクト設定を除外することができます。除外する項目はコンマで区切られた文字列で指定します（スペースなし）。スキーマはインポートする際に一致を確認するため、除外できません。

:::warning
インポートから除外された項目は、ターゲットインスタンスで削除されます。たとえば、`config`を除外すると、ターゲットインスタンスのプロジェクト設定が削除されます。
:::

:::note
画像などのメディアは、ファイル（アセット）とデータベースのエンティティで構成されています。`--exclude`フラグを使用してアセットを除外すると、データベースレコードは残りますが、リンク切れが発生する可能性があります。
:::

### 例: アセットを除外してインポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi import -f /path/to/my/file/export_20221213105643.tar.gz.enc --exclude files
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm strapi import -- -f /path/to/my/file/export_20221213105643.tar.gz.enc --exclude files
```

</TabItem>

</Tabs>

## インポート時に指定されたデータタイプのみを含める

デフォルトの`strapi import`コマンドは、コンテンツ（エンティティとリレーション）、ファイル（アセット）、プロジェクト設定、スキーマをインポートします。`--only`オプションを使用すると、指定された項目のみをインポートできます。項目はコンマで区切られた文字列で指定します。利用可能な値は`content`、`files`、および`config`です。スキーマは常にインポートされ、インポートの際に一致を確認します。

:::note
画像などのメディアは、ファイル（アセット）とデータベースのエンティティで構成されています。`--only`フラグを使用して`content`をインポートする場合、アセットのデータベースレコードは含まれますが、リンク切れが発生する可能性があります。
:::

### 例: プロジェクト設定のみをインポートする

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn strapi import -f /path/to/my/file/export_20221213105643.tar.gz.enc --only config
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm strapi import -- -f /path/to/my/file/export_20221213105643.tar.gz.enc --only config
```

</TabItem>

</Tabs>

<FeedbackPlaceholder />


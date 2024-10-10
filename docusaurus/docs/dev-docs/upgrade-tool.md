---
title: アップグレードツール
description: Strapiアップグレードツールは、新しいStrapiバージョンへの自動アップグレードを支援するCLIコマンドです。
displayed_sidebar: devDocsSidebar
pagination_next: dev-docs/migration/v4-to-v5/breaking-changes
sidebar_label: アップグレードツールリファレンス
tags:
- メジャーバージョン
- マイナーバージョン
- パッチバージョン
- セマンティックバージョニング
- アップグレードツール
- バージョンタイプ
---

# アップグレードツール

アップグレードツールは、StrapiユーザーがStrapiアプリケーションの依存関係とコードを特定のバージョンにアップグレードするのを支援します。

アップグレードツールを実行すると、アプリケーションの依存関係の更新、そのインストール、およびターゲットとなるバージョンまでに導入されたブレーキングチェンジに従ってアプリケーションのコードベースを自動的に編集する一連の**codemods** <Codemods/>の実行がトリガーされます。

アップグレードツールはStrapiパッケージであり、CLIから実行することができます。

## 範囲

アップグレードツールはアプリケーションとプラグインのアップグレードを支援しますが、それらのすべての側面をカバーするわけではありません。

:white_check_mark: アップグレードツールは以下をサポートします：
- プロジェクトの依存関係の更新
- 既存のファイルに対する自動コード変換の適用
- プロジェクトに適した依存関係のインストールまたは再インストール

:x: アップグレードツールは以下をサポートしていません：
- ファイルツリーの変更、つまりファイルやディレクトリの追加、削除、移動
- アプリケーションのデータの移行。これはStrapiデータベースの移行によって処理されます

:::warning
アップグレードツールが実行を完了した後、
アプリケーションやプラグインを再実行する前に、行われた変更を確認することを強く推奨します。
:::

## バージョンタイプ

Strapiのバージョン番号は、[セマンティックバージョニング](https://semver.org/)の規約を尊重しています：

<ThemedImage
  alt="バージョン番号の説明"
  sources={{
    light: '/img/assets/update-migration/version-numbers.png',
    dark: '/img/assets/update-migration/version-numbers_DARK.png',
  }}
/>

- 最初の数字は**メジャー**バージョン番号です。
- 2番目の数字は**マイナー**バージョン番号です。
- 3番目の数字は**パッチ**バージョン番号です。

アップグレードツールはメジャー、マイナー、パッチバージョンへのアップグレードを可能にします。

アップグレードツールが何をするかは、最新の既存バージョンと実行するコマンドによって異なります。

例えば、最新のStrapi v4バージョンがv4.25.9の場合：

| 現在の私のStrapiアプリケーションは… | 実行すると…                   | Strapiアプリケーションはアップグレードされます…                                                |
|----------------------------------------|-----------------------------|--------------------------------------------------------------------------------------------|
| v4.25.1                                | `npx @strapi/upgrade patch` | v4.25.9<br/><br/>(v4.25.9はv4.25のマイナーバージョンの最新のパッチバージョンです) |
| v4.14.1                                | `npx @strapi/upgrade minor` | v4.25.9                                                                                    |
| v4.14.1                                | `npx @strapi/upgrade major` | 何もありません。<br/><br/>まず、`npx @strapi/upgrade minor`を実行してv4.25.9にアップグレードする必要があります。   |
| v4.25.9                                | `npx @strapi/upgrade major` | v5.0.0                                                                                     |



## 新しいバージョンへのアップグレード

:::warning
アップグレードプロセスを実行する前に、コードベースとデータベースのバックアップを作成しておくことを確認してください。
:::

### メジャーバージョンへのアップグレード

`major`パラメータを使用してアップグレードツールを実行し、プロジェクトをStrapiの次のメジャーバージョンにアップグレードします：

```bash
npx @strapi/upgrade major
```

アップグレードプロセス中に、アプリケーションの依存関係が更新され、インストールされ、関連するcodemodsが実行されます。

:::note
アプリケーションが現在のメジャーバージョンの最新のマイナーとパッチバージョンをすでに実行していない場合、`major`アップグレードは防止され、まず現在のメジャーバージョンの最新の[minor.patch](#upgrade-to-a-minor-version)バージョンにアップグレードする必要があります。これは、最新のv4バージョンがv4.16.2であるため、v4.14.4からv5.0.0への移行は2ステップのプロセスとなります。
:::

### マイナーバージョンへのアップグレード

`minor`パラメータを使用してアップグレードツールを実行し、プロジェクトをStrapiの最新のマイナーとパッチバージョンにアップグレードします：

```bash
npx @strapi/upgrade minor
```

アップグレードプロセス中に、プロジェクトの依存関係が更新され、インストールされ、関連するcodemodsが実行されます（もしあれば）。

### パッチバージョンへのアップグレード

`patch`パラメータを使用してアップグレードツールを実行し、プロジェクトをStrapiの現在のマイナーとメジャーバージョンの最新のパッチバージョンにアップグレードします：

```bash
npx @strapi/upgrade patch
```

アップグレードプロセス中に、プロジェクトの依存関係が更新され、インストールされ、関連するcodemodsが実行されます（もしあれば）。

## codemodsのみを実行

`codemods`パラメータを使用してアップグレードツールを実行し、実行するcodemodsを選択するユーティリティを実行します。このコマンドを使用すると、codemodsのみが実行され、依存関係は更新されず、インストールされません。

利用可能なcodemodsのリストを表示するには、`ls`コマンドを使用します：

```bash
npx @strapi/upgrade codemods ls
```

利用可能なcodemodsのリストから選択して実行するには、`run`コマンドを使用します：

```bash
npx @strapi/upgrade codemods run
```

特定のcodemodのみを実行するには、`ls`コマンドから取得したUIDを続けて `run` を使用します：

```bash
npx @strapi/upgrade codemods run 5.0.0-strapi-codemod-uid
```

## オプション

`npx @strapi/upgrade [major|minor|patch]` コマンドは以下のオプションを受け入れることができます：

| オプション                                                                                  | 説明                                                                     | デフォルト  |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------|----------|
| [`-n, --dry`](#simulate-the-upgrade-without-updating-any-files-dry-run)                 | ファイルを更新せずにアップグレードを[シミュレート](#simulate-the-upgrade-without-updating-any-files-dry-run)する | false    |
| [`-d, --debug`](#get-detailed-debugging-information)                                    | デバッグモードで[より詳細なログ](#get-detailed-debugging-information)を取得する              | false    |
| [`-s, --silent`](#execute-the-upgrade-silently)                                         | [何もログを出力しない](#execute-the-upgrade-silently)                             | false    |
| [`-p, --project-path <project-path>`](#select-a-path-for-the-strapi-application-folder) | Strapiプロジェクトへの[パス](#select-a-path-for-the-strapi-application-folder)を選択する  | -        |
| [`-y, --yes`](#answer-yes-to-every-prompt)                                              | すべてのプロンプトに自動的に["yes"](#answer-yes-to-every-prompt)と回答する       | false    |

次のオプションは、`npx @strapi/upgrade` コマンドだけで実行することも、`npx @strapi/upgrade [major|minor|patch]` コマンドと一緒に実行することもできます：

| オプション                                                                   | 説明                                                      |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`-V, --version`](#get-the-current-version)                              | [バージョン番号](#get-the-current-version)を出力する            |
| [`-h, --help`](#get-help)                                                | コマンドラインオプションを[表示](#get-help)する                          |

### ファイルを更新せずにアップグレードをシミュレートする (dry run)

`-n` または `--dry` オプションを指定すると、codemodsはファイルを実際に編集せずに実行されます。package.jsonは変更されず、依存関係も再インストールされません。このオプションを使用すると、コードベースのアップグレードをシミュレートし、変更を適用せずに結果を確認することができます：

例：

```bash
npx @strapi/upgrade major --dry
npx @strapi/upgrade minor --dry
npx @strapi/upgrade patch --dry
```

### Strapiアプリケーションフォルダのパスを選択する

`-p` または `--project-path` オプションに有効なパスを続けて指定すると、Strapiアプリケーションがどのフォルダにあるかを指定できます。

例：

```bash
npx @strapi/upgrade major -p /path/to/the/Strapi/application/folder
```

### 現在のバージョンを取得する

`--version`オプション（またはその短縮形`-V`）を渡すと、アップグレードツールの現在のバージョンがログに記録されます。

例：

```sh
$ npx @strapi/upgrade -V
4.15.1
```

### 詳細なデバッグ情報を取得する

`--debug`オプション（またはその短縮形`-d`）を渡すと、アップグレードツールは実行中により詳細なログを提供します：

```bash
npx @strapi/upgrade --debug
```

### アップグレードを静かに実行する

`--silent`オプション（またはその短縮形`-s`）を渡すと、ツールはログを提供せずにアップグレードを実行します：

```bash
npx @strapi/upgrade --silent
```

### すべてのプロンプトに対して「はい」を回答する

`--yes`オプション（またはその短縮形`-y`）を渡すと、ツールは自動的にすべてのプロンプトに「はい」を回答します：

```bash
npx @strapi/upgrade --yes`
```

### ヘルプを取得する

`--help`オプション（またはその短縮形`-h`）を渡すと、利用可能なオプションを一覧表示するヘルプ情報が表示されます：

例：

<Tabs>
<TabItem value="upgrade" label="アップグレードツールの一般的なヘルプ">

```sh
$ npx @strapi/upgrade -h
Usage: upgrade <command> [options]

Options:
 -V, --version    output the version number
 -h, --help       Print command line options

Commands:
 major [options]  Upgrade to the next available major version of Strapi
 minor [options]  Upgrade to ...
 patch [options]  Upgrade to ...
 help [command]   Print options for a specific command

```

</TabItem>

<TabItem value="major" label="upgrade majorの具体的なヘルプ">

```sh
$ npx @strapi/upgrade major -h
Usage: upgrade major [options]

Upgrade to the next available major version of Strapi

Options:
  -p, --project-path <project-path>  Path to the Strapi project
  -n, --dry                          Simulate the upgrade without updating any files (default: false)
  -d, --debug                        Get more logs in debug mode (default: false)
  -s, --silent                       Don't log anything (default: false)
  -h, --help                         Display help for command
  -y, --yes                          Automatically answer yes to every prompt
```

</TabItem>
</Tabs>

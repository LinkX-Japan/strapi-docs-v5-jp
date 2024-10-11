---
title: コマンドラインインターフェース
displayed_sidebar: devDocsSidebar
description: Strapiには、プロジェクトを数秒でスキャフォールド化し、管理することができるフル機能のコマンドラインインターフェース（CLI）が付属しています。
tags:
  - コマンドラインインターフェース（CLI）
  - strapi develop
  - strapi start
  - strapi build
  - strapi export
  - strapi import
  - strapi transfer
  - strapi report
---

import NotV5 from '/docs/snippets/\_not-updated-to-v5.md'

# コマンドラインインターフェース（CLI）

<NotV5 />

Strapiには、プロジェクトを数秒でスキャフォールド化し、管理することができるフル機能のコマンドラインインターフェース（CLI）が付属しています。CLIは、`yarn`および`npm`パッケージマネージャーの両方で動作します。

:::caution
`strapi admin:create-user`のようなインタラクティブなコマンドは、`npm`ではプロンプトが表示されません。`npm`パッケージマネージャーの修正は2023年3月までに予定されています。それまでは、`yarn`パッケージマネージャーの使用を検討してください。
:::

:::note
Strapiのインストールは、ローカルのみを推奨します。これには、以下のすべての`strapi`コマンドにプロジェクトのセットアップに使用したパッケージマネージャーをプレフィックスとして付けることが必要です（例：`npm run strapi help`または`yarn strapi help`）または専用のノードパッケージエグゼキューター（例：`npx strapi help`）。

`npm`でオプションを渡すには、次の構文を使用します：`npm run strapi <command> -- --<option>`。

`yarn`でオプションを渡すには、次の構文を使用します：`yarn strapi <command> --<option>`
:::

<details>
<summary>ℹ️ Strapi 5で削除されたStrapi v4のCLIコマンド:</summary>

Strapi v4の`strapi install`、`strapi uninstall`、`strapi new`、`strapi watch-admin`コマンドはStrapi 5で削除されました：

| Strapi v4 コマンド         | Strapi 5 相当                                                                                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strapi install [plugin]` | プラグインに対応するnpxコマンドを使用します（マーケットプレイスで見つけることができます、詳細は[ユーザーガイド](/user-docs/plugins/installing-plugins-via-marketplace)を参照）                                                |
| `strapi new`              | 新しいStrapiプロジェクトを作成するための相当するyarnまたはnpxコマンドを使用します（詳細は[CLIインストールガイド](/dev-docs/installation/cli)を参照）                                                                   |
| `strapi watch-admin`      | `yarn develop`または`npm run develop`は常にStrapiサーバーを"watch-admin"モードで起動します。これをStrapi 5で無効にするには、`yarn develop --no-watch-admin`または`npm run develop --no-watch-admin`を実行します。 |

</details>

## strapi develop

**エイリアス**：`dev`

自動リロード機能を有効にした状態でStrapiアプリケーションを起動します。

Strapiはランタイムでファイルを変更/作成し、新しいファイルが作成されると再起動が必要です。これを実現するために、`strapi develop`はファイルウォッチャを追加し、必要に応じてアプリケーションを再起動します。

また、Strapiは管理パネルのHMR（Hot Module Replacement）をサポートするミドルウェアも追加します。これにより、アプリケーションを再起動したり別のサーバーを実行したりすることなく、管理パネルをカスタマイズすることができます。

```shell
strapi develop
options: [--no-build |--no-watch-admin |--browser |--debug |--silent]
```

- **strapi develop --open**<br/>
  自動リロードが有効になった状態でアプリケーションを起動し、デフォルトのブラウザで管理パネルを開きます。
- **strapi develop --no-watch-admin**<br/>
  管理パネルのコードに変更が加えられたときに、サーバーが自動リロードしないようにします。
- [非推奨] **strapi develop --no-build**<br/>
  自動リロードが有効になった状態でアプリケーションを起動し、管理パネルのビルドプロセスをスキップします。
- [非推奨] **strapi develop --watch-admin**<br/>
  自動リロードが有効になった状態でアプリケーションを起動し、フロントエンドの開発サーバーを起動します。これにより、管理パネルをカスタマイズすることができます。
- [非推奨] **strapi develop --watch-admin --browser 'google chrome'**<br/>
  自動リロードが有効になった状態でアプリケーションを起動し、フロントエンドの開発サーバーを起動します。これにより、管理パネルをカスタマイズすることができます。デフォルトのブラウザの代わりに使用するブラウザの名前を指定します。`false`はブラウザを開くのを停止することを意味します。

:::warning
このコマンドはStrapiアプリケーションを本番環境で実行するためには決して使用しないでください。
:::

## strapi start

自動リロードを無効にした状態でStrapiアプリケーションを起動します。

このコマンドは、再起動やファイル書き込みなしにStrapiアプリケーションを実行するためのもので、主に本番環境での使用を想定しています。
Content-type Builderのような一部の機能は、`strapi start`モードでは無効になっています。これは、これらの機能がアプリケーションの再起動を必要とするためです。`start`コマンドは、アプリケーションの起動をカスタマイズするために[環境変数](/dev-docs/configurations/environment.md#strapi-s-environment-variables)を先行させることができます。

## strapi build

管理パネルをビルドします。

```bash
strapi build
```

| オプション              | タイプ | 説明                                              |
| ------------------- | :--: | -------------------------------------------------------- |
| `-d, --debug`       |  -   | 詳細なログを出力するデバッグモードを有効にします (デフォルト: false) |
| `--minify`          |  -   | 出力を最小化します (デフォルト: true)                        |
| `--no-optimization` |  -   | [非推奨]: 代わりにminifyを使用してください                         |
| `--silent`          |  -   | 何もログを出力しません (デフォルト: false)                      |
| `--sourcemaps`      |  -   | ソースマップを生成します (デフォルト: false)                      |
| `--stats`           |  -   | ビルド統計をコンソールに出力します (デフォルト: false)   |

## strapi login

Strapi Cloudにログインします（[Cloud CLI](/cloud/cli/cloud-cli#strapi-login)のドキュメンテーションを参照してください）。

## strapi logout

Strapi Cloudからログアウトします（[Cloud CLI](/cloud/cli/cloud-cli#strapi-logout) のドキュメンテーションを参照）。

## strapi deploy

Strapi Cloudにデプロイします（[Cloud CLI](/cloud/cli/cloud-cli#strapi-deploy) のドキュメンテーションを参照）。

## strapi export

[プロジェクトのデータをエクスポート](/dev-docs/data-management)します。デフォルトの設定では、`.tar`ファイルを作成し、`gzip`で圧縮し、`aes-128-ecb`で暗号化します。

```bash
strapi export
```

エクスポートされたファイルは、現在の日付とタイムスタンプを使用して自動的に`export_YYYYMMDDHHMMSS`という形式で名前が付けられます。また、`-f`または`--file`フラグを使用してファイル名を指定することもできます。以下の表は、コマンドラインフラグとして利用可能なすべてのオプションを提供します：

| オプション              |  タイプ  | 説明                                                                                                                |
| ------------------- | :----: | -------------------------------------------------------------------------------------------------------------------------- |
| `‑‑no‑encrypt`      |   -    | ファイルの暗号化を無効にし、`key`オプションも無効にします。                                                                    |
| `‑‑no‑compress`     |   -    | ファイルの圧縮を無効にします。                                                                                                 |
| `-k`, <br/>`--key`  | string | 暗号化キーを`export`コマンドの一部として渡します。<br/> `--key`オプションは`--no-encrypt`と一緒に使用することはできません。 |
| `-f`, <br/>`--file` | string | エクスポートするファイル名を指定します。ファイル拡張子は含めないでください。                                                            |
| `--exclude`         | string | カンマ区切りのデータタイプを使用してデータを除外します。利用可能なタイプは次のとおりです：`content`、`files`、`config`。                  |
| `--only`            | string | これらのデータのみを含めます。利用可能なタイプは次のとおりです：`content`、`files`、`config`。                                        |
| `-h`, <br/>`--help` |   -    | `strapi export`コマンドのヘルプを表示します。                                                                             |

**例**

```bash title="strapi exportの例:"
# デフォルトのオプションとファイル名myDataでデータをエクスポートします。結果としてmyData.tar.gz.encというファイル名になります。
strapi export -f myData

# 暗号化せずにデータをエクスポートします。
strapi export --no-encrypt
```

## strapi import

[データをインポート](/dev-docs/data-management)します。インポートされるデータは、別のStrapiアプリケーションから来る必要があります。インポートアクションのファイル名と場所を指定するために、`--file`オプションを渡す必要があります。

```bash
strapi import
```

| オプション         | タイプ   | 説明                                                               |
| -------------- | ------ | ------------------------------------------------------------------------- |
| `-k,` `--key`  | 文字列 | コマンドの代わりに後続のプロンプトで暗号化キーを提供します。 |
| `-f`, `--file` | 文字列 | インポートするデータのパスとファイル名（拡張子付き）。             |
| `-h`, `--help` | -      | `strapi import`のヘルプコマンドを表示します。                                |

**例**

```bash title="strapi importの例:"

# デフォルトのパラメーターでデータをインポートし、暗号化キーを渡します：
strapi import -f あなたのファイルパスとファイル名 --key my-key
```

## strapi transfer

[データを転送](/dev-docs/data-management/transfer)します。このコマンドは主にローカルインスタンスとリモートインスタンス、または2つのリモートインスタンス間で使用することを目的としています。`transfer`コマンドはTransferトークンが必要で、これは目的のインスタンスの管理パネルで生成されます。Transferトークンの作成に関する詳細なドキュメンテーションについては、[ユーザーガイド](/user-docs/settings/transfer-tokens)をご覧ください。

:::caution
目的地のStrapiインスタンスは`start`コマンドで、`develop`コマンドではなく実行する必要があります。
:::

| オプション                       | 説明                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--to [destinationURL]`      | 宛先Strapiインスタンスの`/admin`エンドポイントのフルURL<br />(例： `--to https://my-beautiful-strapi-website/admin`)                 |
| `--to-token [transferToken]` | リモートのStrapi宛先の転送トークン                                                                                                  |
| `--from [sourceURL]`         | データを取得するリモートStrapiインスタンスの`/admin`エンドポイントのフルURL<br />(例： `--from https://my-beautiful-strapi-website/admin`) |
| `‑‑from‑token`               | Strapiソースインスタンスからの転送トークン。                                                                                                   |
| `--force`                    | すべてのプロンプトに自動的に「はい」を答え、破壊的なリクエストも含めて、対話的に実行しない。                                 |
| `--exclude`                  | コンマで区切られたデータタイプを使用してデータを除外します。利用可能なタイプは：`content`、`files`、`config`。                                         |
| `--only`                     | これらのデータのみを含めます。利用可能なタイプは：`content`、`files`、`config`。                                                               |
| `-h`, `--help`               | `strapi transfer`のコマンドを表示します。                                                                                                      |

:::caution
`--to`または`--from`のいずれかが必要ですが、現在は両方またはどちらも入力することは許可されていません。
:::

**例**

```bash
strapi transfer --to http://example.com/admin --to-token my-transfer-token
```

## strapi report

デバッグに役立つ情報を出力し、問題を報告する際に必要とされます。

| オプション                 | 説明                   |
| ---------------------- | ----------------------------- |
| `-u`, `--uuid`         | プロジェクトのUUIDを含めます     |
| `-d`, `--dependencies` | プロジェクトの依存関係を含めます |
| `--all`                | すべてのデータをログに記録します             |

**例**

プロジェクトのUUIDと依存関係を出力に含めるには：

```bash
strapi report --uuid --dependencies
```

すべてをログに記録するには、`--all`オプションを使用します：

```bash
strapi report --all
```

## strapi configuration:dump

**エイリアス**: `config:dump`

プロダクションへの移行を支援するために、設定をファイルまたはstdoutにダンプします。

ダンプ形式はJSON配列になります。

```bash title="strapi configuration:dump"

オプション：
  -f, --file <file>  出力ファイル。デフォルトの出力はstdoutです。
  -p, --pretty       出力JSONをインデントと改行でフォーマットする（デフォルト：false）
```

**例**

- `strapi configuration:dump -f dump.json`
- `strapi config:dump --file dump.json`
- `strapi config:dump > dump.json`

これらの例はすべて同等です。

:::caution
アプリケーションを設定する際には、しばしば第三者サービス（例えば認証プロバイダ）の資格情報を入力します。これらの資格情報もこのコマンドの出力にダンプされることに注意してください。
疑問がある場合は、ダンプファイルをバージョニングシステムにコミットすることを避けるべきです。以下にいくつかの方法を探ることができます：

- ファイルを直接希望の環境にコピーし、そこでリストアコマンドを実行します。
- ファイルを安全な場所に置き、適切な資格情報でデプロイ時にダウンロードします。
- コミット前にファイルを暗号化し、リストアコマンドを実行するときに復号化します。

:::

## strapi configuration:restore

**エイリアス**：`config:restore`

設定ダンプをアプリケーションに復元します。

入力フォーマットはJSON配列でなければなりません。

```bash
strapi configuration:restore

Options:
  -f, --file <file>          入力ファイル。デフォルトの入力はstdinです。
  -s, --strategy <strategy>  戦略名。"replace"、"merge"、"keep"のいずれか。デフォルトは："replace"
```

**例**

- `strapi configuration:restore -f dump.json`
- `strapi config:restore --file dump.json -s replace`
- `cat dump.json | strapi config:restore`
- `strapi config:restore < dump.json`

これらの例はすべて同等です。

**戦略**

リストアコマンドを実行する際には、以下の3つの異なる戦略から選択することができます：

- **replace**：存在しないキーを作成し、既存のものを置換します。
- **merge**：存在しないキーを作成し、既存のキーを新しい値とマージします。
- **keep**：存在しないキーを作成し、既存のキーをそのまま保持します。

## strapi admin:create-user

**エイリアス** `admin:create`

管理者を作成します。
管理者の名前、姓、メール、パスワードは次のように設定できます：

- オプションとして渡す
- または、任意のオプションを渡さずにコマンドを呼び出すと対話的に設定できます。

**例**

```bash

strapi admin:create-user --firstname=Kai --lastname=Doe --email=chef@strapi.io --password=Gourmet1234
```

**オプション**

| オプション        | タイプ   | 説明                            | 必須 |
| --------------- | ------ | ---------------------------------- | -------- |
| -f, --firstname | string | 管理者の名前                        | はい      |
| -l, --lastname  | string | 管理者の姓                          | いいえ       |
| -e, --email     | string | 管理者のメール                      | はい      |
| -p, --password  | string | 管理者の新しいパスワード              | いいえ       |
| -h, --help      |        | コマンドのヘルプを表示                 |          |

## strapi admin:reset-user-password

**エイリアス** `admin:reset-password`

管理者ユーザーのパスワードをリセットします。
メールと新しいパスワードをオプションとして渡すか、オプションを渡さずにコマンドを呼び出すと対話的に設定できます。

**例**

```bash
strapi admin:reset-user-password --email=chef@strapi.io --password=Gourmet1234
```

**オプション**

| オプション       | タイプ   | 説明                     |
| -------------- | ------ | ------------------------- |
| -e, --email    | string | ユーザーのメールアドレス   |
| -p, --password | string | ユーザーの新しいパスワード |
| -h, --help     |        | コマンドのヘルプを表示する |

## strapi generate

API、[コントローラー](/dev-docs/backend-customization/controllers.md)、[コンテンツタイプ](/dev-docs/backend-customization/models.md)、[プラグイン](/dev-docs/plugins/developing-plugins.md#create-a-plugin)、[ポリシー](/dev-docs/backend-customization/policies.md)、[ミドルウェア](/dev-docs/backend-customization/middlewares.md)、[サービス](/dev-docs/backend-customization/services.md)、[マイグレーション](/dev-docs/database-migrations)を生成するための完全に対話的なCLIを実行します。

```bash
strapi generate
```

## strapi templates:generate

現在のStrapiプロジェクトからテンプレートを作成します。

```bash
strapi templates:generate <path>
```

- **strapi templates:generate &#60;path&#62;**<br/>
  `<path>`にStrapiテンプレートを生成します。

  例：`strapi templates:generate ../strapi-template-name`は必要なファイルとフォルダを`../strapi-template-name`内の`template`ディレクトリにコピーします。

## strapi ts:generate-types

プロジェクトのスキーマのための[TypeScript](/dev-docs/typescript.md)の型を生成します。

```bash
strapi ts:generate-types
```

- **strapi ts:generate-types --debug**<br />
  デバッグモードを有効にして型を生成し、生成されたスキーマの詳細なテーブルを表示します。
- **strapi ts:generate-types --silent**または**strapi ts:generate-types -s**<br/>
  サイレントモードを有効にして型を生成し、ターミナルのすべてのログを完全に削除します。`debug`と組み合わせて使用することはできません。
- **strapi ts:generate-types --out-dir &#60;path&#62;**または**strapi ts:generate-types -o &#60;path&#62;**<br/>
  ファイルが作成される出力ディレクトリを指定して型を生成します。

:::caution
Strapiでは、プロジェクトの型を`types`ディレクトリに生成する必要があります。`--out-dir`オプションはほとんどのケースで使用しないでください。ただし、コンテンツ構造を変更した後に、既存の型と更新された型の差分を比較するための2つ目のコピーを生成するなどのケースでは便利です。
:::

## strapi routes:list

利用可能なすべての[routes](/dev-docs/backend-customization/routes.md)のリストを表示します。

```bash
strapi routes:list
```

## strapi policies:list

登録されているすべての[policies](/dev-docs/backend-customization/policies.md)のリストを表示します。

```bash
strapi policies:list
```

## strapi middlewares:list

登録されているすべての[middlewares](/dev-docs/backend-customization/middlewares.md)のリストを表示します。

```bash
strapi middlewares:list
```

## strapi content-types:list

すべての既存の[コンテンツタイプ](/dev-docs/backend-customization/models.md)のリストを表示します。

```bash
strapi content-types:list
```

## strapi hooks:list

利用可能なすべてのフックのリストを表示します。

```bash
strapi hooks:list
```

## strapi controllers:list

登録されたすべての[コントローラー](/dev-docs/backend-customization/controllers.md)のリストを表示します。

```bash
strapi controllers:list
```

## strapi services:list

登録されたすべての[サービス](/dev-docs/backend-customization/services.md)のリストを表示します。

```bash
strapi services:list
```

## strapi telemetry:disable

プロジェクトのデータ収集を無効にします（[使用情報](/dev-docs/usage-information.md)を参照）。

```bash
strapi telemetry:disable
```

## strapi telemetry:enable

無効になった後のプロジェクトのデータ収集を再度有効にします（[使用情報](/dev-docs/usage-information.md)を参照）。

```bash
strapi telemetry:enable
```

## strapi console

サーバーを起動し、リアルタイムでアプリケーション内のコマンドを評価します。

```bash
strapi console
```

## strapi version

現在インストールされているStrapiのバージョンを表示します。
このコマンドがグローバルにインストールされている場合、現在グローバルにインストールされているバージョンを出力します。また、Strapiプロジェクトを含む特定のフォルダからコマンドが実行される場合、そのフォルダ内のStrapiの現在のバージョンを出力します。

```bash
strapi version
```

## strapi help

CLIコマンドのリストを表示します。

```bash
strapi help
```

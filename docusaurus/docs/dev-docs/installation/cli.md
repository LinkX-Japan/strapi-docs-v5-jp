---
title: CLIでのインストール
displayed_sidebar: devDocsSidebar
description: 1分以内でStrapiをローカル環境で動作させるためのインストールガイドです。
tags:
- インストール
- コマンドラインインターフェース (CLI)
- データベース
- MySQL
- PostgreSQL
---

# CLIでのインストール

StrapiのCLI（コマンドラインインターフェース）を使用したインストールスクリプトは、ローカルでStrapiをすばやく動作させるための最も高速な方法です。以下のガイドは、Strapiで最も推奨されるインストールオプションを説明します。

## インストールの準備

<InstallPrerequisites components={props.components} />

また、すべてのStrapiプロジェクトにはサポートされているデータベースが必要です。

| データベース   | 推奨バージョン | 最低バージョン |
| ------------- | -------------- | -------------- |
| MySQL         | 8.0            | 8.0            |
| MariaDB       | 10.6           | 10.5           |
| PostgreSQL    | 14.0           | 12.0           |
| SQLite        | 3              | 3              |

:::caution
StrapiはMongoDBをサポートしていません。
:::

## Strapiプロジェクトの作成

以下の手順に従って、新しいStrapiプロジェクトを作成します。インストールしたパッケージマネージャーに応じて適切なコマンドを使用してください。

1. ターミナルで次のコマンドを実行します。

    <Tabs groupId="yarn-npm">

    <TabItem value="npm" label="NPM">

    ```bash
    npx create-strapi@latest
    ```

    <details>
    <summary>コマンドの詳細説明:</summary>

    * `npx` はnpmパッケージからコマンドを実行するためのものです。
    * `create-strapi` はStrapiのパッケージです。
    * `@latest` は最新バージョンのStrapiを使用することを示します。

    <br/>

    `npx`の代わりに、従来のnpmコマンド`npm create strapi@latest`も使用できます。

    `npx create-strapi`と`npm create strapi`では`create-strapi`の間にダッシュがあることに注意してください。
    </details>

    </TabItem>

    <TabItem value="yarn" label="Yarn">

    ```bash
    yarn create strapi
    ```

    :::note
    Yarnは`@latest`のようなバージョンタグを渡すことをサポートしていません。Yarnで最新バージョンのStrapiがインストールされない場合は、[`yarn cache clean`コマンド](https://yarnpkg.com/cli/cache/clean)を実行してYarnキャッシュをクリアする必要があります。
    :::

    </TabItem>

    <TabItem value="pnpm" label="pnpm">

    ```bash
    pnpm create strapi
    ```

    </TabItem>

    </Tabs>

2. ターミナルは、Strapi Cloudに`ログイン/サインアップ`するか（無料の14日間トライアルプロジェクトを開始）、このステップを`スキップ`するか尋ねます。矢印キーで選択し、`Enter`キーを押して選択します。スキップを選択した場合、[自分でプロジェクトをホストする](#skipping-the-strapi-cloud-login-step)必要があります。

3. ターミナルはさらにいくつか質問します。何も入力せずに`Enter`を押すと、デフォルトの回答（通常は「Yes」）が使用されます。

   ![インストール時のターミナルプロンプト](/img/assets/installation/prompts.png)

   :::tip
   これらの質問をスキップするために、インストールコマンドにオプションを渡すことができます。使用可能なオプションの全リストは、[こちらの表](#cli-installation-options)を参照してください。
   :::

4. _(任意)_ SQLiteのデフォルトデータベースに対して`n`（いいえ）を選択した場合、CLIは追加の質問を行います。

    * 矢印キーを使用してデータベースの種類を選択し、`Enter`を押します。
    * データベース名、データベースホストアドレス、ポート、データベース管理者のユーザー名とパスワード、SSL接続の使用有無を定義します。どの質問でも、何も入力せずに`Enter`を押すと、ターミナル出力内に表示されているデフォルト値が使用されます。

質問にすべて答えると、スクリプトがStrapiプロジェクトの作成を開始します。

### CLIインストールオプション

上記のインストールガイドは、CLIを使用した基本的なインストールオプションのみをカバーしていますが、新しいStrapiプロジェクトを作成する際に使用できる他のオプションもあります。

| オプション          | 説明                                                |
|--------------------|---------------------------------------------------|
| `--no-run`         | アプリケーションの作成後に自動的に起動しない           |
| `--ts`<br/>`--typescript` | TypeScriptでプロジェクトを初期化（デフォルト）     |
| `--js`<br/>`--javascript` | JavaScriptでプロジェクトを初期化               |
| `--use-npm`        | npmをプロジェクトのパッケージマネージャーとして使用する   |
| `--use-yarn`       | yarnをプロジェクトのパッケージマネージャーとして使用する |
| `--use-pnpm`       | pnpmをプロジェクトのパッケージマネージャーとして使用する |
| `--install`        | 依存関係をインストールし、関連するCLIプロンプトをスキップする |
| `--no-install`     | 依存関係をインストールしない                           |
| `--git-init`       | gitリポジトリを初期化し、関連するCLIプロンプトをスキップする |
| `--no-git-init`    | gitリポジトリを初期化しない                           |
| `--example`        | サンプルデータを追加し、関連するCLIプロンプトをスキップする |
| `--no-example`     | サンプルデータを追加しない                             |
| `--skip-cloud`     | [Strapi Cloudログインおよびプロジェクト作成ステップ](#skipping-the-strapi-cloud-login-step)をスキップする |
| `--skip-db`        | データベースに関するすべてのプロンプトをスキップし、デフォルトのSQLiteデータベースでプロジェクトを作成する |
| `--template <template-name-or-url>` | 特定のテンプレートに基づいてアプリケーションを作成する。テンプレートに関する追加オプションについては、[テンプレートドキュメント](/dev-docs/templates)を参照してください。 |
| `--dbclient <dbclient>` | 使用するデータベースクライアントを定義する。値には次のいずれかを指定します。<ul><li>`sql` SQLiteデータベース（デフォルト）</li><li>`postgres` PostgreSQLデータベース</li><li>`mysql` MySQLデータベース</li></ul> |
| `--dbhost <dbhost>` | 使用するデータベースホストを定義する                 |
| `--dbport <dbport>` | 使用するデータベースポートを定義する                 |
| `--dbname <dbname>` | 使用するデータベース名を定義する                    |
| `--dbusername <dbusername>` | 使用するデータベースユーザー名を定義する       |
| `--dbpassword <dbpassword>` | 使用するデータベースパスワードを定義する       |
| `--dbssl <dbssl>` | データベースにSSLを使用するかを定義する（デフォルトではSSLなし） |
| `--dbfile <dbfile>` | SQLiteデータベースの場合、使用するデータベースファイルパスを定義する |
| `--quickstart`     | (**Strapi 5では非推奨**) <br/>クイックスタートモードでプロジェクトを直接作成

する |

:::note
* `--use-yarn|npm|pnpm`オプションを指定しない場合、インストールスクリプトは作成コマンドに使用されたパッケージマネージャーを使用してすべての依存関係をインストールします（例: `npm create strapi`はすべての依存関係をnpmでインストールします）。
* データベース構成に関する追加情報は、[データベース構成ドキュメント](/dev-docs/configurations/database#configuration-structure)を参照してください。
* Strapiの実験的バージョンは毎週火曜日から土曜日の午前0時（GMT）にリリースされます。`npx create-strapi@experimental`を使用して、最新の実験的リリースに基づいて新しいStrapiアプリケーションを作成できます。これらの実験的ビルドは自己責任で使用してください。本番環境での使用は推奨されていません。
:::

### Strapi Cloudログインステップをスキップする

インストールスクリプトを実行すると、ターミナルは最初にログイン/サインアップを希望するかどうかを尋ねます。`Login/signup`を選択すると、[Quick Start Guide](/dev-docs/quick-start)で説明されているように、無料の14日間トライアルの[Strapi Cloud](/cloud/intro#what-is-strapi-cloud)プロジェクトが作成されます。

Strapi Cloudログイン部分をスキップしたい場合は、矢印キーで`Skip`を選択してください。スクリプトはローカルプロジェクトを作成し、再開します。このプロジェクトをオンラインでホストするためには、後で次のいずれかの方法を選択できます。

- プロジェクトのコードをリポジトリにプッシュし（例: GitHubにプッシュ）、[デプロイガイド](/dev-docs/deployment)に従ってホストする。
- または、[Cloud CLI](/cloud/cli/cloud-cli#)コマンドを使用してStrapi Cloudにログインし、プロジェクトをそこにデプロイする。

GitHubに不慣れな場合は、以下の手順が役立ちます👇。

<details>
<summary>StrapiプロジェクトコードをGitHubにプッシュするための手順:</summary>

1. ターミナルで、作成したStrapiプロジェクトが存在するフォルダにいることを確認します。
2. `git init` コマンドを実行して、このフォルダ用にgitを初期化します。
3. `git add .` コマンドを実行して、すべての変更されたファイルをgitインデックスに追加します。
4. `git commit -m "Initial commit"` コマンドを実行して、追加された変更を含むコミットを作成します。
5. GitHubにログインし、[新しいリポジトリを作成](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)します。新しいリポジトリに名前を付けます（例: `my-first-strapi-project`）。この名前を覚えておきます。
6. ターミナルに戻り、ローカルリポジトリをGitHubにプッシュします。

  a. 次のようなコマンドを実行します: `git remote add origin git@github.com:yourname/my-first-strapi-project.git`。`yourname`を自分のGitHubプロフィール名に、`my-first-strapi-project`を手順4で使用した名前に置き換えます。

  b. `git push --set-upstream origin main` コマンドを実行して、コミットをGitHubリポジトリにプッシュします。

コマンドラインインターフェースを使用したgitの使用方法に関する追加情報は、[公式GitHubドキュメント](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git)を参照してください。

</details>

## Strapiの実行

Strapiアプリケーションを開始するには、プロジェクトフォルダで次のコマンドを実行します。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="Yarn">

```bash
yarn develop
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
npm run develop
```

</TabItem>

</Tabs>

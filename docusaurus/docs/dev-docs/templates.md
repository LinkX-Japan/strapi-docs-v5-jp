---
title: テンプレート
description: 特定のユースケースに対応した既製のStrapiアプリケーションを使用し、作成します。
displayed_sidebar: devDocsSidebar
tags:
- インストール
- テンプレート
- CLI
---

# テンプレート

Strapi 5のテンプレートは、特定のユースケースに対応した独立した既製のStrapiアプリケーションです。

Strapi 5のテンプレートは、典型的なStrapiアプリケーションに見つけることができる全てのファイルとフォルダを含むフォルダです（[プロジェクト構造](/dev-docs/project-structure)を参照）。

## テンプレートの使用

テンプレートに基づいた新しいStrapiプロジェクトを作成するには、以下のコマンドを実行します：

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="Yarn">

```sh
yarn create strapi-app my-project --template <template-name-or-url>
```

</TabItem>

<TabItem value="npm" label="NPM">

```sh
npx create-strapi-app@latest my-project --template <template-name-or-url>
```

</TabItem>

</Tabs>

必須の `--template` パラメータに加えて、オプションの `--template-path` と `--template-branch` オプションを渡して、使用するテンプレートをより正確に定義することができます。

以下の表は、使用するテンプレートを定義するための全ての可能な方法をリストしています：

| 構文 | 説明 |
|--------|-------------|
| `--template website` | [Strapiがメンテナンスしているテンプレート](https://github.com/strapi/strapi/tree/develop/templates)の一つを、その（フォルダ）名前で呼び出す。 |
| `--template strapi/strapi` | テンプレートのGitHubリポジトリの短縮形を使用します。<br/>これはデフォルトのリポジトリブランチを使用します。 |
| `--template strapi/strapi/some/sub/path` | テンプレートのGitHubリポジトリの短縮形を使用し、サブパスを指定します。<br/>これはデフォルトのリポジトリブランチを使用します。 |
| `--template strapi/strapi`<br/>`--template-branch=xxx`<br/>`--template-path=some/sub/path` | 最も詳細な方法で、テンプレートのブランチとサブパスを明示的に定義します。 |
| `--template https://github.com/owner/some-template-repo` | フルのリポジトリURLを使用します。<br/>これはデフォルトのリポジトリブランチを使用します。 |
| `--template https://github.com/owner/some-template-repo --template-branch=xxx --template-path=sub/path` | フルのリポジトリURLを使用し、テンプレートのブランチとサブパスの両方を指定します。 |
| `--template https://github.com/strapi/strapi/tree/branch/sub/path` | リポジトリ、ブランチ、サブパスを直接使用します。<br/><br/>⚠️ _警告: これはブランチ名に `/` が含まれている場合には動作しません。そのような場合、 `--template-branch` と `--template-path` を明示的に定義するのが最善です。_ |

## テンプレートの作成

Strapi 5のテンプレートを作成することは、Strapiアプリケーションを作成するのと同じくらい簡単です。アプリケーションを作成します（[CLIインストール](/dev-docs/installation/cli)を参照）と、生成されたフォルダにはStrapi 5アプリケーションが含まれ、これがテンプレートとして機能します。新しいStrapi 5アプリケーションを作成する際に、それを `--template` フラグに渡してテンプレートとして使用することができます。

テンプレートがどのように見えるかの例は、[Strapiがメンテナンスしている `website` テンプレート](https://github.com/strapi/strapi/tree/develop/templates/website)です。

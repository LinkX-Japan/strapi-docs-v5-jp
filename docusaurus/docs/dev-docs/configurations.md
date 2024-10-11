---
title: 設定
description: Strapiアプリケーションの設定を管理し、カスタマイズする方法を学びましょう。
displayed_sidebar: devDocsConfigSidebar
pagination_prev: dev-docs/installation
pagination_next: dev-docs/setup-deployment
tags:
- イントロダクション
- 設定
- 基本設定 
- 追加設定 
---

import ProjectStructureConfigFiles from '@site/src/components/ProjectStructureConfigFiles'

# 設定

Strapiプロジェクトの設定は `/config` フォルダに格納されています:

<ProjectStructureConfigFiles />

<em style={{fontSize: '12px'}}>上記のブロックはプロジェクト構造の一部抜粋です。紫色のファイル名をクリックすると、対応するドキュメンテーションを読むことができます。<a href="/dev-docs/project-structure">プロジェクト構造ページ</a>を訪れて完全版をご覧ください。</em>

## 基本設定

`/config` フォルダから、以下の基本設定を見つけて定義することができます:

| 設定トピック | ファイルパス | 必須またはオプション |
|-----|----|----|
| [データベース](/dev-docs/configurations/database) | `config/database` | 必須 |
| [サーバー](/dev-docs/configurations/server) | `config/server` | 必須 |
| [管理パネル](/dev-docs/configurations/admin-panel) | `config/admin` | 必須 |
| [ミドルウェア](/dev-docs/configurations/middlewares) | `config/middlewares` | 必須 |
| [APIコール](/dev-docs/configurations/api) | `config/api` | オプション、レスポンスとその他のREST関連パラメータの一般設定を定義するために使用されます。 |

## 特定の機能に対する追加設定

特定の機能には追加の設定が必要です:

| 機能 | 場所 | 必須またはオプション |
|---------|------|------|
| [プラグイン](/dev-docs/configurations/plugins) | `config/plugins` ファイル内 | <ul><li>デフォルトのプリセットで組み込みプラグインのみを使用する場合はオプション。</li><li>プラグインを有効化、設定、または無効化するために必要。</li></ul>メディアライブラリ機能を処理するアップロードプラグインとGraphQLを設定するためにも使用できます。 |
| [TypeScript](/dev-docs/configurations/typescript) | <ul><li>一般的な [TypeScript関連の設定](/dev-docs/configurations/typescript#project-structure-and-typescript-specific-configuration-files) のための `tsconfig.json` 内</li><li>Strapi特有の [専用のTypeScript機能](/dev-docs/configurations/typescript#strapi-specific-configuration-for-typescript) のための `config/typescript` ファイル内</li></ul> | TypeScriptを効率的に使用するために必要 |
| [APIトークン](/dev-docs/configurations/api-tokens) | `config/admin` ファイル内 | [ユーザー＆権限プラグイン](/dev-docs/plugins/users-permissions) の代わりにAPIトークンを認証に使用する場合に必要 |
| [ライフサイクル関数](/dev-docs/configurations/functions) | `/src/index` ファイル内 | サーバーのライフサイクル中に発生するさまざまなアクションを実行するためにオプションで使用されます。`register`、`bootstrap`、および `destroy` 関数を含みます。 |
| [Cronジョブ](/dev-docs/configurations/cron) | <ul><li>機能を有効化するための `/config/server` ファイル内</li><li>ジョブを宣言するために使用できる専用のオプションの `cron-tasks` ファイル内</li></ul> | サーバーのCRONジョブを設定するために必要。 |
| [環境変数](/dev-docs/configurations/environment) | 環境用の専用ファイルとフォルダ内 (例：`config/env/production/server`) | 異なる環境とその変数を定義するためにオプションで使用されます。 |
| [シングルサインオン (SSO)](/dev-docs/configurations/sso) <EnterpriseBadge /> | `config/admin` ファイル内 | あなたのプロジェクトで有効にされている場合、エンタープライズ専用のSSO機能を使用するために必要。 |
| [フィーチャーフラグ](/dev-docs/configurations/features) | `config/features` ファイル内 | 典型的で安定したStrapiアプリケーションにはオプション。<br/>[未来のフラグ](/dev-docs/configurations/features)を有効にするために必要。|

## ガイド

以下のガイドは、Strapiの設定に関連する特定のユースケースを対処するのに役立ちます：

<CustomDocCard small title="ロールベースのアクセス制御（RBAC）のカスタム条件を作成する方法" link="/dev-docs/configurations/guides/rbac" />

<CustomDocCard small title="公開アセットを使用する方法" link="/dev-docs/configurations/guides/public-assets" />

<CustomDocCard small title="環境変数にアクセスし、キャストする方法" link="/dev-docs/configurations/guides/access-cast-environment-variables" />

<CustomDocCard small title="コードから設定値にアクセスする方法" link="/dev-docs/configurations/guides/access-configuration-values" />

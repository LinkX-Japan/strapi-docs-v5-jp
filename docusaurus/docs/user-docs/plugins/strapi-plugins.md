---
title: Strapi プラグイン
sidebar_position: 3
tags:
- Content Manager
- Internationalization (i18n)
- plugins
- provider
- marketplace
- upload plugin
- Users, Roles & Permissions
- Sentry
- Strapi plugin
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# Strapi プラグインの一覧

Strapi は、コアアプリケーションの機能を拡張するためのプラグインをビルドおよび管理しています。このセクションでは、Strapi の標準プラグインおよび [マーケットプレイス](/user-docs/plugins/installing-plugins-via-marketplace/)で提供されている追加プラグインについて説明します。各プラグインの概要や管理パネルでの設定方法、プラグインのインストール後の変更点についての簡単な説明を提供しています。

:::note

- 一部の Strapi スターターやテンプレートでは、ここに記載されている標準プラグイン以外のプラグインがインストールされている場合があります。
- プラグインのオプションが [Enterprise エディションライセンス](https://strapi.io/pricing-self-hosted) のみで利用可能な場合は、このリファレンスガイドで <EnterpriseBadge /> マークが表示されます。
- すべてのプラグインのインストール状況は、管理パネルの ![Cog icon](/img/assets/icons/v5/Cog.svg) *Settings > Plugins* で確認できます。

:::

## 標準インストールされているプラグイン

### <img width="28" src="/img/assets/plugins/icon_i18n-plugin.png" /> Internationalization プラグイン

Internationalization プラグインは、すべての v5 Strapi アプリケーションにデフォルトでインストールされていますが、無効化することが可能です。

このプラグインを使用すると、異なる言語（ロケール）でのコンテンツ管理が可能になります。以下の機能を提供しています:

- 使用可能なロケールの定義
- コンテンツタイプやフィールドごとの翻訳設定
- 各ロケールごとのコンテンツの翻訳と管理

プラグインがインストールされると、以下の管理パネルのセクションに追加オプションや設定が表示されます。

| 影響を受けるセクション | 追加されるオプションと設定 |
|-------------------------|---------------------------|
| 設定                    | <ul><li>「Internationalization」設定セクションが追加され、ロケールの追加、編集、削除が可能（[ロケールの設定](/user-docs/settings/internationalization)を参照）。<br/>👉 パス: ![Settings icon](/img/assets/icons/v5/Cog.svg) *Settings > Global Settings > Internationalization*</li><li>管理者ロールに新しい権限設定の追加: コンテンツタイプへのアクセス、およびアクションがロケールに応じて定義可能（[権限設定](/user-docs/users-roles-permissions/configuring-administrator-roles)参照）。<br/>👉 パス: ![Settings icon](/img/assets/icons/v5/Cog.svg) *Settings > Administration panel*</li></ul> |
| コンテンツタイプビルダー | <ul><li>コンテンツタイプおよびフィールドレベルでのロケール対応設定の追加（[新しいコンテンツタイプの作成](/user-docs/content-type-builder/creating-new-content-type)参照）。</li></ul> |
| コンテンツマネージャー  | <ul><li>コレクションタイプの一覧ビューに「Locales」フィルターが追加され、ロケールごとの管理が可能（[コンテンツマネージャーの概要](/user-docs/content-manager)参照）。</li></ul> |

### <img width="28" src="/img/assets/plugins/icon_up-plugin.png" /> Users & Permissions プラグイン

Users & Permissions プラグインもデフォルトでインストールされていますが、無効化することが可能です。

このプラグインは、フロントエンドアプリケーション（例: ウェブサイト、モバイルアプリ、接続されたデバイスなど）でコンテンツを利用するエンドユーザーの管理を行います。主な機能は以下の通りです:

- エンドユーザーアカウントの管理（デフォルトの「User」コレクションタイプを使用）
- エンドユーザーロールとその権限の定義
- ログインプロバイダーの設定
- パスワードリセットやメールアドレス確認のテンプレート設定

プラグインがインストールされると、以下の管理パネルのセクションに追加オプションや設定が表示されます。

| 影響を受けるセクション | 追加されるオプションと設定 |
|-------------------------|---------------------------|
| 設定                    | <ul><li>「Users & Permissions プラグイン」設定セクションが追加され、「Roles」「Providers」「Email Templates」「Advanced Settings」の4つのサブセクションが表示されます（[設定の詳細](/user-docs/settings/configuring-users-permissions-plugin-settings)を参照）。<br/>👉 パス: ![Settings icon](/img/assets/icons/v5/Cog.svg) *Settings > Users & Permissions plugin*</li></ul> |
| コンテンツタイプビルダー | <ul>デフォルトの「User」コレクションタイプが作成され、エンドユーザーアカウントとそのロール・権限の管理が可能になります。このコレクションタイプは削除できず、フィールドの編集も不可ですが、新しいフィールドの追加は可能です。</ul> |
| コンテンツマネージャー  | <ul>エンドユーザーアカウント管理用の「User」コレクションタイプが表示され、デフォルトフィールド（Username、Email、Password など）が含まれています。</ul> |

## 追加プラグイン

### <img width="28" src="/img/assets/plugins/Documentation-swagger.png" /> Documentation プラグイン

Documentation プラグインは、Strapi アプリケーションの API ドキュメントを Open API 仕様 3.0.1 を使用して自動生成します。インストール後、管理パネルの「Plugins」セクションに表示され、API ドキュメントの表示、リフレッシュ、アクセス制限を設定することができます。

詳細は [Strapi Market](https://market.strapi.io/plugins/@strapi-plugin-documentation) で確認できます。

### <img width="28" src="/img/assets/plugins/seo-logo.png" /> SEO プラグイン

SEO プラグインは、Strapi アプリケーションの SEO を改善するために設計されています。インストール後、コンテンツタイプビルダーに「MetaSocial」と「Seo」の 2 つのコンポーネントが追加され、SEO メタタグやソーシャルメディアタグの管理が可能になります。

### <img width="28" src="/img/assets/plugins/sentry.png" /> Sentry プラグイン

Sentry プラグインは、Strapi アプリケーションのエラーを Sentry に送信し、エラーを追跡するために使用されます。Sentry インスタンスの初期化、エラー送信、デバッグ用メタデータの付加などの機能があります。

詳細は [Strapi Market](https://market.strapi.io/plugins/@strapi-plugin-sentry) で確認できます。

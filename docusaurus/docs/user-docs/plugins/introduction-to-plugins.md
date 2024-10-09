---
sidebar_position: 1
slug: /user-docs/plugins
tags:
- Content Manager
- Content-type Builder
- introduction
- plugins
- provider
- media library
- upload plugin
pagination_next: user-docs/plugins/installing-plugins-via-marketplace
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# プラグインの概要

Strapiは、さまざまなタイプのプラグインを基盤としています。すべてのStrapiアプリケーションには、次のプラグインが事前にインストールされています。

- Content Manager（[コンテンツマネージャーの概要](/user-docs/content-manager)を参照）
- Content Type Builder（[コンテンツタイプビルダーの概要](/user-docs/content-type-builder/)を参照）
- Email
- メディアライブラリ（[アップロードプラグイン](/dev-docs/plugins/upload/)を介して実装）
- Internationalization（多言語対応）
- Roles and Permissions（ロールと権限管理）

これらのプラグインは、Strapiアプリケーションの動作に不可欠であり、アンインストールすることはできません。

追加のプラグインは、Strapiアプリケーションを拡張およびカスタマイズするために[マーケットプレイス](../plugins/installing-plugins-via-marketplace.md)から利用可能です。このセクションでは、これらの追加プラグインのインストール方法と管理方法に焦点を当てています。

管理者は、管理パネルから以下の操作が可能です。

- ![Marketplace icon](/img/assets/icons/v5/ShoppingCart.svg) _Marketplace_ で追加プラグインや[プロバイダー](#providers)を検索（[マーケットプレイスプラグインの管理](./installing-plugins-via-marketplace.md)を参照）
- ![Cog icon](/img/assets/icons/v5/Cog.svg) _Settings > Plugins_ で現在インストールされているプラグインや[プロバイダー](#providers)を確認

<ThemedImage
  alt="設定セクションでのプラグイン"
  sources={{
    light: '/img/assets/plugins/plugins-settings.png',
    dark: '/img/assets/plugins/plugins-settings_DARK.png',
  }}
/>

## プロバイダー

一部のプラグインは、_プロバイダー_ の設定を通じてさらに拡張できます。プロバイダーは、既存のプラグインに特定の機能を追加するためのパッケージです。たとえば、AWS S3プロバイダーを使用してメディアライブラリプラグインを拡張し、ファイルをサーバーのローカルではなく、S3バケットに保存することができます。

現在、プロバイダーが機能するように設計されているプラグインは次のとおりです:

- [Emailプラグイン](/dev-docs/plugins/email/)
- メディアライブラリプラグイン（[アップロードプラグイン](/dev-docs/plugins/upload/)を介して実装）

## カスタムフィールド

一部のプラグインは、Strapiにカスタムフィールドを追加することができます（カスタムフィールドプラグインの作成については、[開発者ドキュメント](/dev-docs/custom-fields)を参照）。カスタムフィールドは、コンテンツタイプやコンポーネントに新しい種類のフィールドを追加することで、Strapiの機能を拡張する方法です。

カスタムフィールドがStrapiに追加されると（[マーケットプレイス](./installing-plugins-via-marketplace.md)を参照）、[コンテンツタイプビルダー](/user-docs/content-type-builder/configuring-fields-content-type#custom-fields)で作成され、[コンテンツマネージャー](/user-docs/content-manager/writing-content/)で使用できます。

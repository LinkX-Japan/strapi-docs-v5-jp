---
title: Marketplaceからプラグインをインストールする
displayed_sidebar: userDocsSidebar
sidebar_position: 2
tags:
- プラグイン
- プロバイダー
- マーケットプレイス
- アップロードプラグイン
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# マーケットプレイスの使用

<NotV5/>

マーケットプレイスでは、ユーザーがStrapiアプリケーションをカスタマイズするための追加プラグインや、プラグインを拡張するための追加[プロバイダー](/user-docs/plugins#providers/)を見つけることができます。マーケットプレイスは、管理パネル内の ![Marketplace icon](/img/assets/icons/v5/ShoppingCart.svg) _Marketplace_ からアクセスできます。マーケットプレイスでは、プラグインやプロバイダーを閲覧したり検索したり、各詳細ページへのリンクを辿ったり、新しいプラグインやプロバイダーを提出したりできます。

:::note strapi アプリ内マーケットプレイス vs. マーケットウェブサイト
管理パネルのマーケットプレイスでは、Strapiのバージョンに関係なく、すべての既存のプラグインが表示されます。すべてのプラグインは[Strapi Market](https://market.strapi.io)ウェブサイトでも確認できます。

ただし、v4とv5のプラグインは互換性がありませんが、プロバイダーはv4およびv5のプラグインの両方で互換性があります。
:::

<ThemedImage
  alt="マーケットプレイスのインターフェース"
  sources={{
    light: '/img/assets/plugins/marketplace-plugins.png',
    dark: '/img/assets/plugins/marketplace-plugins_DARK.png',
  }}
/>

「プラグイン」と「プロバイダー」タブには、以下の情報が記載された個別のカードにそれぞれ表示されます:

- 名前、時には次のいずれかのバッジが付いています:
  - ![Strapi公式バッジ](/img/assets/icons/v5/official-market.svg) Strapiが開発したことを示します。
  - ![Strapi認証バッジ](/img/assets/icons/v5/verified-marketplace.svg) Strapiによって検証されたことを示します。
- GitHubでのスター数とダウンロード回数
- 説明
- **More** ![外部リンクアイコン](/img/assets/icons/v5/ExternalLink.svg) ボタンをクリックすると、マーケットウェブサイトにリダイレクトされ、詳細情報が表示されます（対応するStrapiのバージョンや実装手順も含まれます）。

マーケットプレイスの右上隅には、**プラグインを提出する** ボタンがあり、ここからStrapi Marketにアクセスして独自のプラグインやプロバイダーを提出できます。

:::tip TIPS

- 検索バーでは、プラグインやプロバイダーの名前や説明に基づいてインクリメンタル検索結果が表示されます。
- 「並べ替え」ボタンやフィルターを使用して、プラグインを簡単に見つけることができます。

:::

## マーケットプレイスのプラグインとプロバイダーのインストール

:::note
マーケットプレイスのプラグインとプロバイダーは、ユーザーのターミナルからインストールおよび削除します（[開発者ドキュメント](/dev-docs/installation/cli/)を参照）。
:::

マーケットプレイスを介して新しいプラグインやプロバイダーをインストールするには:

1. ![Marketplace icon](/img/assets/icons/v5/ShoppingCart.svg) *Marketplace* にアクセスします。
2. **Plugins** タブで利用可能なプラグインを閲覧するか、**Providers** タブで利用可能なプロバイダーを閲覧します。
3. 利用可能なプラグインまたはプロバイダーを選択し、**More** ![ExternalLink icon](/img/assets/icons/v5/ExternalLink.svg) ボタンをクリックします。
4. Strapi Marketウェブサイトにリダイレクトされたら、プラグインまたはプロバイダー固有の実装手順に従います。

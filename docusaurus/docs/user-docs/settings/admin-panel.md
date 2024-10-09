---
sidebar_position: 3
title: 概要 & カスタムロゴ
tags:
- 管理パネル
- 会社ロゴ
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# ロゴのカスタマイズ

Strapiアプリケーションのメインナビゲーションや認証ページに表示されるデフォルトのStrapiロゴは、![設定アイコン](/img/assets/icons/v5/Cog.svg) *設定 > グローバル設定 > 概要* から変更できます。

:::note
両方のロゴは、Strapiアプリケーションの設定ファイルを通じてプログラム的にカスタマイズすることも可能です（詳細は[開発者ドキュメント](/dev-docs/admin-panel-customization#logos)を参照）。ただし、管理パネル経由でアップロードされたロゴは、設定ファイルで指定されたロゴよりも優先されます。
:::

<ThemedImage
  alt="カスタムロゴの設定"
  sources={{
    light: '/img/assets/settings/settings_custom-logo.png',
    dark: '/img/assets/settings/settings_custom-logo_DARK.png',
  }}
/>

ロゴをカスタマイズする手順は以下の通りです：

1. 設定画面の *グローバル設定 > 概要* サブセクションに移動します。
2. アップロードエリアをクリックします。
3. ファイルを選択してアップロードするか、ファイルをドラッグ＆ドロップするか、URLを使用して希望のロゴをアップロードします。ロゴのサイズは750x750px以下にしてください。
4. アップロードウィンドウで **ロゴをアップロード** ボタンをクリックします。
5. 右上の **保存** ボタンをクリックします。

:::tip
ロゴをアップロードした後、![追加アイコン](/img/assets/icons/v5/Plus.svg) 新しいロゴと置き換えたり、![リセットアイコン](/img/assets/icons/v5/ArrowClockwise.svg) デフォルトのStrapiロゴまたは設定ファイルで指定されたロゴにリセットすることができます。
:::

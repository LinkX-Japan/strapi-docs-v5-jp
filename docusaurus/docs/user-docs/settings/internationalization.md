---
sidebar_position: 3
title: 国際化
tags:
- 管理パネル
- 国際化 (i18n)
- プラグイン
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# 国際化ロケールの設定

[国際化プラグイン](/user-docs/plugins/strapi-plugins.md#-internationalization-plugin)を使用すると、異なる言語（「ロケール」）でコンテンツを管理できます。Strapiアプリケーションに国際化プラグインがインストールされると（[マーケットプレイス経由でプラグインをインストールする](/user-docs/plugins/installing-plugins-via-marketplace.md)を参照）、管理者は ![設定アイコン](/img/assets/icons/v5/Cog.svg) *設定 > グローバル設定 > 国際化* からロケールを管理できます。

<ThemedImage
  alt="i18n設定画面"
  sources={{
    light: '/img/assets/settings/settings-i18n.png',
    dark: '/img/assets/settings/settings-i18n_DARK.png',
  }}
/>

*国際化* 設定サブセクションには、Strapiアプリケーションで使用可能なすべてのロケールがリスト表示されます。デフォルトでは、英語のみが設定され、デフォルトのロケールとして設定されています。

各ロケールには、デフォルトのISOコード、任意の表示名、そしてそのロケールがデフォルトであるかどうかが表示されます。また、管理者は以下の操作を行うことができます：

- ![編集アイコン](/img/assets/icons/v5/Pencil.svg) ボタンをクリックしてロケールを編集
- ![削除アイコン](/img/assets/icons/v5/Trash.svg) ボタンをクリックしてロケールを削除

## 新しいロケールの追加

管理者は、好きなだけロケールを追加して管理できます。ただし、Strapiアプリケーション全体でデフォルトとして設定できるロケールは1つだけです。

:::note
カスタムロケールを作成することはできません。ロケールは、Strapiによって設定された[500以上の事前作成されたロケールリスト](https://github.com/strapi/strapi/blob/v4.0.0/packages/plugins/i18n/server/constants/iso-locales.json)に基づいて作成されます。
:::

新しいロケールを追加するには：

1. **新しいロケールを追加** ボタンをクリックします。
2. ロケール追加ウィンドウで、*ロケール* ドロップダウンリストから新しいロケールを選択します。このリストには、追加可能なすべてのロケールがISOコードとしてアルファベット順に表示されます。
3. （任意）*ロケール表示名* テキストボックスに、新しいロケールの表示名を入力します。
4. （任意）詳細設定タブで、*デフォルトロケールとして設定* オプションをオンにして、Strapiアプリケーションのデフォルトロケールに設定します。
5. **保存** ボタンをクリックして、新しいロケールの追加を確定します。

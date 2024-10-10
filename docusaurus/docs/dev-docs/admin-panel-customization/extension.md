---
title: 管理パネルの拡張
description: Strapiの管理パネルを拡張する方法について学びましょう。
sidebar_label: 拡張
toc_max_heading_level: 4
tags:
- 管理パネル
- 管理パネルのカスタマイズ

---

import HotReloading from '/docs/snippets/hot-reloading-admin-panel.md'

# 管理パネルの拡張

Strapiの管理パネルは、Strapiアプリケーションのすべての機能とインストールされたプラグインをカプセル化した、Reactベースのシングルページアプリケーションです。Strapiが提供する[カスタマイズオプション](/dev-docs/admin-panel-customization/options)がニーズに合わない場合、管理パネルを拡張する必要があります。

管理パネルの拡張とは、Reactの基盤を活用してインターフェースや機能をプロジェクトの特定の要件に応じて適応・強化することを意味します。これには、新しいコンポーネントの作成や新しいタイプのフィールドの追加が含まれる場合があります。

管理パネルを拡張したいケースは2つあります。

- **Strapiプラグイン開発者**として、Strapiアプリケーションにインストールされるたびに管理パネルを拡張するプラグインを開発したい場合。

  👉 これは、[プラグイン用管理パネルAPI](/dev-docs/plugins/admin-panel-api)を利用することで実現できます。

- **Strapi開発者**として、特定のStrapiアプリケーションインスタンスだけを拡張するユニークなソリューションを開発したい場合。

  👉 これは、`/src/admin/app.[tsx|js]`ファイルを直接更新し、`/src/admin/extensions`に配置された任意のファイルをインポートすることで実現できます。

:::strapi 追加リソース
* デフォルトのWYSIWYGエディタを置き換える方法を探している場合は、[該当ページ](/dev-docs/admin-panel-customization/wysiwyg-editor)を参照してください。
* [Strapiデザインシステムのドキュメント](https://design-system.strapi.io/?path=/docs/getting-started-welcome--docs)では、管理パネル開発に関する追加情報も提供しています。
:::

<HotReloading />
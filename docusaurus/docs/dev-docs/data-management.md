---
title: データ管理システム
description: Strapi CLIを使用してデータをインポート、エクスポート、転送
displayed_sidebar: devDocsSidebar
keywords: 
  - DEITS
tags:
- データ管理システム
- イントロダクション
- strapiエクスポート
- strapiインポート
- strapi転送
---

# データ管理システム

たまに、Strapiインスタンスからデータを移動させるか、またはその中にデータを移動させる必要があります。これはCLIベースのコマンドを使用するデータ管理システムで可能です：

- [`strapi export`](/dev-docs/data-management/export) を使用してデータバックアップを作成し、アーカイブ用途または別のインスタンスにインポートするため。
- [`strapi import`](/dev-docs/data-management/import) を使用してバックアップからデータを復元します。
- [`strapi transfer`](/dev-docs/data-management/transfer) を使用して、ローカルおよび/またはリモートインスタンス間でデータを転送します。

以下のドキュメンテーションでは、エクスポート、インポート、および転送コマンドの説明と例を提供しています。また、[CLIリファレンスドキュメンテーション](/dev-docs/cli#strapi-export)では、すべての利用可能なフラグを簡潔な形式でリストしています。

:::caution
インタラクティブCLIコマンドは現在、`npm`パッケージマネージャーで動作しません。`strapi export`と`strapi import`については、これは暗号化キープロンプトがCLIに表示されないことを意味します。その間、`yarn`パッケージマネージャーの使用を検討してください。
:::

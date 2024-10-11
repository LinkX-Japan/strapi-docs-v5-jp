---
title: バックエンドカスタマイズ例の料理本
description: FoodAdvisorデプロイメントのStrapiのコアバックエンド機能の使い方を学びます
displayed_sidebar: devDocsSidebar
pagination_prev: dev-docs/backend-customization
pagination_next: dev-docs/backend-customization/examples/authentication
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# バックエンドカスタマイズ：FoodAdvisorを使用した例の料理本

<NotV5/>

このドキュメンテーションのセクションは、Strapiのバックエンドカスタマイズの可能性をより深く理解したい開発者向けです。

このセクションは、Strapiのバックエンドサーバーのコアコンポーネントが実際のプロジェクトでどのように使用されるかを示す例の集まりです。バックエンドと対話するフロントエンドのコードも一部の例に含まれる場合がありますが、フロントエンドのコード例はこの料理本の主要な焦点ではないため、デフォルトでは折りたたまれたブロックに表示されます。

例は、公式のStrapiデモアプリケーションである[FoodAdvisor](https://github.com/strapi/foodadvisor)の機能を拡張することを目的としています。FoodAdvisorは、Strapiバックエンド（`/api`フォルダに含まれる）で動作するレストランディレクトリを構築し、[Next.js](https://nextjs.org/)で動作するフロントエンドウェブサイト（`/client`フォルダに含まれる）をレンダリングします。

:::prerequisites
- 👀 [クイックスタートガイド](/dev-docs/quick-start)を読んだか、またはStrapiが[Content-Type Builder](/user-docs/content-type-builder)でデータ構造を作成し、[Content Manager](/user-docs/content-manager)を通じてコンテンツを追加し、APIを通じてコンテンツを公開する**ヘッドレスCMS**<Annotation>ヘッドレスCMSは、プレゼンテーション層（つまり、コンテンツが表示されるフロントエンド）とバックエンド（コンテンツが管理される場所）を分離するコンテンツ管理システムです。<br /><br/>Strapiは、以下を提供するヘッドレスCMSです：<ul><li>コンテンツのAPIを公開するバックエンドサーバー、</li><li>コンテンツを管理するためのグラフィカルなユーザーインターフェース、通称管理パネル。</li></ul>プレゼンテーション層は、別のフレームワークによって管理されるべきで、Strapiによっては管理されません。</Annotation>であることを理解しています。
- 👀 Strapiのルート、ポリシー、ミドルウェア、コントローラー、サービスが何であるかを一般的に理解するために、[バックエンドカスタマイズの導入](/dev-docs/backend-customization)を読んでいます。
- 👷 自分でコード例をテストして試す場合は、[FoodAdvisor](https://github.com/strapi/foodadvisor)リポジトリをクローンし、プロジェクトをセットアップし、フロントエンドとバックエンドのサーバーを両方起動していることを確認してください。Strapi管理パネルは[`localhost:1337/admin`](http://localhost:1337/admin)からアクセス可能で、Next.jsベースのFoodAdvisorフロントエンドウェブサイトは[`localhost:3000`](http://localhost:3000)で稼働しているはずです。
:::

このセクションは最初から最後まで読むこともできますし、Strapiのバックエンドの特定のコアエレメントが実際のユースケースの例を解決するためにどのように使用できるかを理解するために、直接特定のページにジャンプすることもできます：

| 理解したいこと… | 専用ページ |
|------------|---------------|
| クエリの認証方法 | [JWTを用いた認証フロー](/dev-docs/backend-customization/examples/authentication) |
| カスタムコントローラとサービスを<br />いつ、どのように使用するか | [カスタムコントローラとサービスの例](/dev-docs/backend-customization/examples/services-and-controllers) |
| カスタムポリシーの使用方法と<br />カスタムエラーの送信方法 | [カスタムポリシーの例](/dev-docs/backend-customization/examples/policies) |
| カスタムルートの設定と使用方法 | [カスタムルートの例](/dev-docs/backend-customization/examples/routes) |
| カスタムグローバルミドルウェアを<br />いつ、どのように使用するか | [カスタムミドルウェアの例](/dev-docs/backend-customization/examples/middlewares) |

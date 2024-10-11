---
tags:
- 下書き＆公開
- ドキュメント
- Document Service API
- REST API
- GraphQL API 
- アップグレードツール
- コンテンツ履歴
- 破壊的変更
---
# Strapi 5のドキュメントに何が新しくなったのか？

Strapi 5は多くの新機能と改善をもたらし、このページでは最も重要なドキュメントの変更点を簡単にハイライトしています。

🧑‍🎨 **[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)**機能が完全に見直されました。下書き＆公開が有効化されている場合、コンテンツマネージャーの編集ビューには下書き版と公開版の2つの異なるタブが表示され、それぞれが異なるコンテンツを扱うことができます。

🧙‍♀️ 新たに追加された**[コンテンツ履歴](/user-docs/content-manager/working-with-content-history)**機能を使用すると、コンテンツマネージャーから過去のコンテンツのバージョンを表示し、復元することができます。

🧑‍🏫 Strapi 5では、**[ドキュメント](/dev-docs/api/document)**を使用し、新たな**[Document Service API](/dev-docs/api/document-service)**を導入してv4のEntity Service APIを置き換えています。これにより、新しい下書き＆公開システムを活用し、今後の新機能の道を開きます。

🕵️ **[REST API](/dev-docs/api/rest)**と**[GraphQL API](/dev-docs/api/graphql)**が更新され、両者ともにシンプル化されたレスポンスデータ形式と、GraphQLのRelayスタイルクエリの部分的なサポートが提供されています。

👩‍🚀 **[Plugin SDK](/dev-docs/plugins/development/plugin-sdk)**は、Strapiプラグインの開発と公開を支援する新しいCLIツールです。

🦾 もう一つの新しいCLI **[アップグレードツール](/dev-docs/upgrade-tool)**は、Strapiの任意のパッチ、マイナーバージョン、メジャーバージョンへの移行を支援し、共通のタスクの大部分をcodemodsを通じて自動化します。

👷 また、**[Strapi 5へのアップグレード](/dev-docs/migration/v4-to-v5/introduction-and-faq)**を支援するためのリソースが用意されています。これには、[ステップバイステップガイド](/dev-docs/migration/v4-to-v5/step-by-step)、[破壊的変更](/dev-docs/migration/v4-to-v5/breaking-changes)のリスト、Strapi 5へのアップグレードを検討する際に読むべき[特別なリソース](/dev-docs/migration/v4-to-v5/additional-resources/introduction)が含まれています。

👀 さらに多くのコンテンツ更新があります：新規または更新されたページは、目次で<ThemedImage alt="new badge" sources={{light:'/img/assets/new-badge.png', dark:'/img/assets/new-badge_DARK.png'}} />または<ThemedImage alt="updated badge" sources={{light:'/img/assets/updated-badge.png', dark:'/img/assets/updated-badge_DARK.png'}} />のバッジで識別されます。

🏷️ 新たな**タグシステム**を導入し、情報アーキテクチャの別の層を提供します。タグは各ページの下部に表示されます。タグをクリックすると、同じタグが付けられたすべてのページをリストアップしたインデックスページに移動します。すべての利用可能なタグのリストは、[/tags](/tags)ページを訪れることで表示されます。

➕ また、近々**公式ガイド**や**外部リソース**（コントリビューターのドキュメント、デザインシステムのドキュメント、ブログ記事）への参照がドキュメントページ全体に増える予定です。

🤖 また、最後になりますが、お気づきかもしれませんが、上部ナビゲーションバーの検索バーは現在2つのボタンを組み合わせています：左のボタン、**🔎 検索**は通常の検索をトリガーし、右部分は新しいAIベースのチャットボットです！**AIに尋ねる**をクリックして質問してください。チャットボットは以前の回答の文脈を保持しているため、チャットボットのウィンドウを閉じない限り、フォローアップの質問をすることができます。

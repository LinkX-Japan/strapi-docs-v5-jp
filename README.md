<p align="center">
  <a href="https://strapi.io">
    <img src="./docusaurus/static/img/logo.png" width="314px" alt="Strapi logo" />
  </a>
</p>
<h3 align="center">APIの作成を簡単、セキュア、そして高速に。</h3>
<p align="center">最も進化したオープンソースのヘッドレスCMSで、手間をかけずに強力なAPIを構築。</p>
<br />

---

Strapiのコードをお探しの場合は、[Strapi Monorepo](https://github.com/strapi/strapi)をご覧ください。このリポジトリは、[docs.strapi.io](https://docs.strapi.io)でホストされている公式Strapiドキュメント専用です。[strapi.io/blog](https://strapi.io/blog)でホストされているブログ記事や[コミュニティコンテンツ](https://github.com/strapi/community-content)は、このリポジトリの対象ではありません。

---

Strapiは、どこにでもコンテンツを提供できる無料でオープンソースのヘッドレスCMSです。

- **データを完全に管理**。Strapiを使用すると、データの保存場所を把握し、常に完全な管理権を維持できます。
- **セルフホスト型**。Strapiプロジェクトは、必要に応じて任意のホスティングプラットフォームでホストおよびスケーリングできます。AWS、Netlify、Heroku、VPS、専用サーバーなど、お好みのホスティングプラットフォームを選択可能。成長に合わせて100%独立してスケーリング可能です。
- **データベースに依存しない設計**。PostgreSQL、MySQL、MariaDB、SQLiteなど、好みのSQLデータベースを選択できます。
- **カスタマイズ可能**。API、ルート、プラグインを完全にカスタマイズして、ニーズにぴったりのロジックを素早く構築できます。

## ドキュメントサイト

公式Strapiドキュメントサイトは[docs.strapi.io](https://docs.strapi.io)にホストされています。

他の公式Strapiドキュメントサイトも異なるコンテンツをカバーしています:

- Strapiの旧バージョン4のドキュメントは[docs-v4.strapi.io](https://docs-v4.strapi.io)でホストされており、`v4`ブランチにあります。このブランチはStrapiドキュメントチームによって積極的にメンテナンスされていませんが、コミュニティの貢献は大歓迎です！
- 新しい実験的なドキュメントは[docs-next.strapi.io](https://docs-next.strapi.io)でホストされています。2024年秋/冬から、このサイトには全く新しいドキュメントが含まれる予定です—詳細は後日公開！
- サポートされていない旧バージョン3のドキュメントは[docs-v3.strapi.io](https://docs-v3.strapi.io)でホストされています。
- Strapiに積極的に貢献する開発者向けに、より詳細で実験的なコンテンツを提供するドキュメントは[contributor.strapi.io](https://contributor.strapi.io)でホストされています。この実験的なドキュメントはStrapiのエンジニアによってメンテナンスされており、問題がある場合は[`strapi/strapi`](https://github.com/strapi/strapi/issues/new/choose)リポジトリに報告してください。
- Strapiデザインシステムのドキュメントは[design-system.strapi.io](https://design-system.strapi.io/)にホストされ、Strapiのフロントエンドエンジニアによって[専用リポジトリ](https://github.com/strapi/design-system/)でメンテナンスされています。

## コントリビューションの要件

ドキュメントにプルリクエストを送信する際は、以下が必要です:

- NodeJS >=16.14 <=18.x.x
- NPM >= 6.x
- Yarn >= 1.22.x

👉 詳細については、[コントリビューションガイド](./CONTRIBUTING.md)をお読みください。

## Issues

問題の報告は、ドキュメントの改善に役立ちます。スクリーンショット、手順、コード例が誤っている場合や、ウェブサイトのUX/UIにバグがある場合は、[ドキュメント問題](https://github.com/strapi/documentation/issues/new?template=BUG_REPORT.yml)テンプレートを使用して報告してください。問題を報告するには:

1. 問題がStrapiドキュメントのウェブサイトに限定されていることを確認してください。製品関連の問題、機能の欠落、ドキュメントに直接関連しない問題は、メインの[strapi/strapi](https://github.com/strapi/strapi)リポジトリに報告してください。[strapi.io/blog](https://strapi.io/blog)のブログ記事に関する更新も本リポジトリの範囲外です。ブログ投稿に関する質問がある場合は、投稿者に直接連絡するか、Strapiの企業ウェブサイトの[問い合わせフォーム](https://strapi.io/contact)を使用してください。
2. Issueテンプレートに従い、できるだけ多くの情報を記入してください。
  
技術的な質問は、以下のリソースを使用して尋ねてください:

- [公式フォーラム](https://forum.strapi.io)でQ&Aスレッドを開く。
- [コミュニティDiscordサーバー](https://discord.strapi.io)で他のコミュニティメンバーと交流する。

## リクエスト

新しいドキュメントのリクエストは大歓迎です。これには新しい追加だけでなく、既存のドキュメントに関する変更や情報の追加も含まれます。ぜひ[ドキュメントリクエスト](https://github.com/strapi/documentation/issues/new?template=DOC_REQUEST.md&title%5B%5D=REQUEST)テンプレートを使用してください。これらのリクエストはStrapiドキュメントチームによって確認され、その後GitHub外の内部ツールに転送され、優先順位付けおよび対応が行われます。

## リリース

継続的インテグレーション/継続的デリバリーワークフローのおかげで、Strapiドキュメントは1日に数回更新されることがあります。最新のリリース以降の変更リストは、毎週水曜日にスナップショット[リリース](https://github.com/strapi/documentation/releases)に含まれます。

## コミュニティサポート

Strapiの一般的な使用に関するヘルプについては、[公式Strapiドキュメント](https://strapi.io/documentation/)を参照してください。追加のヘルプが必要な場合は、次のチャネルを使用して質問できます:

- [Discord](http://discord.strapi.io)（コミュニティやStrapiチームとのライブディスカッション）
- [GitHub](https://github.com/strapi/strapi)（バグ報告、コントリビューション）
- [コミュニティフォーラム](https://forum.strapi.io)（質問やディスカッション）
- [Canny](https://strapi.canny.io/)（ロードマップ、機能リクエスト）
- [Twitter](https://twitter.com/strapijs)（最新情報の取得）
- [Facebook](https://www.facebook.com/Strapi-616063331867161)
- [YouTubeチャンネル](https://www.youtube.com/strapi)（ビデオチュートリアルで学ぶ）

## ライセンス

ライセンス情報については、[LICENSE](./LICENSE)ファイルを参照してください。

## 行動規範

このプロジェクトおよびその参加者全員は、[Strapi行動規範](CODE_OF_CONDUCT.md)に準拠しています。参加することで、この規範を遵守することが求められます。

## パッケージバージョン

Strapi 5以降、strapi/documentationとstrapi/strapiのパッケージバージョンは同期されなくなりました。Strapi Docsは独自のプロダクトとして扱われ、独自のバージョン番号システムに従います。

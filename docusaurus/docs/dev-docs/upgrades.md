---
title: アップグレード
description: Strapi 5のアップグレードプロセスについて詳しく学びましょう
displayed_sidebar: devDocsSidebar
pagination_prev: dev-docs/plugins
pagination_next: dev-docs/upgrade-tool
tags:
- 移行
- アップグレード
- アップグレードツール
- Strapiバージョン 
---

import InstallCommand from '/docs/snippets/install-npm-yarn.md'
import BuildCommand from '/docs/snippets/build-npm-yarn.md'
import DevelopCommand from '/docs/snippets/develop-npm-yarn.md'

# アップグレード

Strapiは定期的に新しいバージョンをリリースし、コードの改善を行います。新しいStrapiのバージョンは、ターミナルと管理パネルの両方で発表され、[GitHubのリリースノート](https://github.com/strapi/strapi/releases)には、新しいバージョンごとの新機能がリストアップされています。

Strapiの最新バージョン番号は、Strapiコアチームがリリースしたもので、[npm](https://www.npmjs.com/package/@strapi/strapi)または[GitHub](https://github.com/strapi/strapi/releases)で確認できます。

新しいバージョンのStrapiがリリースされると、アップグレードしたくなるかもしれません。このページは、アップグレードに関する情報のエントリーポイントとして提供されています。

<details>
<summary>現在のStrapiバージョン番号はどこで確認できますか？</summary>

Strapiアプリケーションの現在のバージョン番号は次の方法で確認できます：

- 管理パネルで、_設定 > グローバル設定 > 概要_に移動し、詳細セクションに表示されているStrapiバージョン番号を確認します：

  <ThemedImage
    alt="管理パネルでStrapiバージョン番号を確認する方法"
    sources={{
      light: '/img/assets/migration/strapi-version-number.png',
      dark: '/img/assets/migration/strapi-version-number_DARK.png'
    }}
  />

- または、Strapiプロジェクトが格納されているフォルダから、ターミナルで`yarn strapi version`または`npm run strapi version`を実行します。

</details>

以下の2つのカードのうち、あなたのユースケースに合ったものをクリックしてください：

<CustomDocCard emoji="4️⃣" title="私はStrapi v4を使用しており、Strapi 5にアップグレードしたい。" description="Strapi 5、Strapiの最新メジャーバージョンにアップグレードするために知っておくべきすべてのこと。" link="/dev-docs/migration/v4-to-v5/introduction-and-faq" />
<CustomDocCard emoji="5️⃣" title="私はすでにStrapi 5を使用しており、最新バージョンにアップグレードしたい。" description="Strapi v4からStrapi 5に、または既存のStrapi 5.x.xバージョンからより新しいバージョンにアップグレードするための自動アップグレードツールを使用するために知っておくべきすべてのこと。" link="/dev-docs/upgrade-tool" />

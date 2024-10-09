---
title: リリースノート
description: 各バージョンのStrapi 5ドキュメントの変更点を確認し、詳細についてはGitHubのプルリクエストへのリンクをご覧ください。
custom_edit_url: null
---

<div className="release-notes-page">

このページには、すべてのStrapiドキュメントのバージョン番号とそれに対応する更新内容が記載されています。

<details>
<summary>🧐 Strapiドキュメントのバージョン番号の説明：</summary>

[docs.strapi.io](https://docs.strapi.io) にあるStrapi Documentation（Strapi Docs）は、常に最新のStrapi（CMSおよびCloud）製品をドキュメント化しています。

Strapi Docsバージョン5.0.0以降、**ドキュメントのバージョン番号はStrapi製品のバージョンとは独立しています**。したがって、[`strapi/documentation`](https://github.com/strapi/documentation) と [`strapi/strapi`](https://github.com/strapi/strapi) のバージョン番号は異なる場合があります。

Strapi Docsは、**[セマンティックバージョニング](https://semver.org/)**の哲学に従っていますが、ドキュメントに適応しています：

- **メジャーバージョン**（6.0.0、7.0.0…）：ドキュメントの**大幅な書き直し**（内容またはフレームワーク）。これにより、ユーザーエクスペリエンスに影響を与え、サイトのデザインを再構築したり、古いリンクが切れる可能性があります（リダイレクションは処理されますが、リンク切れは[報告](https://github.com/strapi/documentation/issues/new/choose)することができます）。
- **マイナーバージョン**（5.1.0、5.2.0…）：ドキュメントの**新しいStrapi機能や改善**（例：新しいコンポーネントやツールの追加）。
- **パッチバージョン**（5.1.1、5.1.2…）：**コンテンツの更新**（既存ページの改善や拡張、コード例の修正、誤字脱字の修正など）。

新しいバージョン（マイナーまたはパッチ）は、一般的に毎週水曜日にリリースされます。

</details>

## 5.1.0

### ✨ 新しいコンテンツ

#### クラウドドキュメント

* [マルチ環境](https://github.com/strapi/documentation/pull/2229)

### 🖌 更新されたコンテンツ

#### ユーザーガイド

* [リリースのブロックステータスについて言及](https://github.com/strapi/documentation/pull/2235)

#### 開発者ドキュメント

* [helper-plugin移行ガイドの明確化](https://github.com/strapi/documentation/pull/2230)

### 🧹 雑務、修正、誤字脱字、その他の改善

#### 開発者ドキュメント

* [カスタムプロバイダー作成例の修正](https://github.com/strapi/documentation/pull/2237)
* [カテゴリの最初のページのpagination_nextを修正](https://github.com/strapi/documentation/pull/2234)
* [SEOの問題修正](https://github.com/strapi/documentation/pull/2233)
* [Strapiのコードベースへのリンク修正](https://github.com/strapi/documentation/pull/2226)
* [一般的なデプロイメントガイドラインでのコード例の修正](https://github.com/strapi/documentation/pull/2231)
* [TypeScript開発ドキュメントの文法修正](https://github.com/strapi/documentation/pull/2232)

***

このリリースは、次のコントリビューターのおかげで実現しました。ありがとうございます！ 🫶

<div>

<a href="https://github.com/ChristopheCVB" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/946345?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="ChristopheCVB"/>
</a>
<a href="https://github.com/imcarlosguerrero" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/173419460?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="imcarlosguerrero"/>
</a>
<a href="https://github.com/stefanhuber" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/5379359?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="stefanhuber"/>
</a>
<a href="https://github.com/butcherZ" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/8189028?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="butcherZ"/>
</a>
<a href="https://github.com/jhoward1994" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/48524071?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="jhoward1994"/>
</a>
<a href="https://github.com/meganelacheny" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/19183360?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="meganelacheny"/>
</a>
<a href="https://github.com/pwizla" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/4233866?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="pwizla"/>
</a>

</div>

<br/>
<br/>

## 5.0.0

_以下は、Strapi 5ドキュメントの作業開始以降にマージされたすべてのプルリクエストの詳細なリストです。クイックツアーについては、[新着ページ](/dev-docs/whats-new)をご覧ください。_

### ✨ 新しいコンテンツ

#### 開発者ドキュメント

* [データベース列に関する互換性のない変更](https://github.com/strapi/documentation/pull/2221)
* [コンテンツマネージャーAPI](https://github.com/strapi/documentation/pull/2220)
* [コンポーネント＆ダイナミックゾーンに対する「共有ポピュレーション戦略」の削除に関する互換性のない変更](https://github.com/strapi/documentation/pull/2204)
* [テンプレート](https://github.com/strapi/documentation/pull/2192)
* [アップグレードセクションの刷新](https://github.com/strapi/documentation/pull/2153)
* [カスタムU&Pプロバイダー](https://github.com/strapi/documentation/pull/2138)
* [server.proxy設定の互換性のない変更](https://github.com/strapi/documentation/pull/2131)
* [Strapi 5向けに「アップグレード」セクションを新設（更新＆移行セクションに代わるもの）](https://github.com/strapi/documentation/pull/2126)
* [新しいプロキシ設定機能](https://github.com/strapi/documentation/pull/2124)
* [lockIcon → licenseOnlyの互換性のない変更](https://github.com/strapi/documentation/pull/2123)
* [デフォルト入力バリデーションの互換性のない変更](https://github.com/strapi/documentation/pull/2096)
* [エンティティサービス → ドキュメントサービス：互換性のない変更および移行の参照](https://github.com/strapi/documentation/pull/2093)
* [プラグイン移行の概要](https://github.com/strapi/documentation/pull/2089)
* [better-sqlite3に対する互換性のない変更](https://github.com/strapi/documentation/pull/2083)
* [Admin RBACの更新に関する互換性のない変更](https://github.com/strapi/documentation/pull/2082)
* [モデル設定パスでuidを使用する互換性のない変更](https

://github.com/strapi/documentation/pull/2055)
* [apollo v3からapollo v4へのアップグレードの互換性のない変更](https://github.com/strapi/documentation/pull/2053)
* [「localizations」フィールドの削除に関する互換性のない変更](https://github.com/strapi/documentation/pull/2050)
* [serverログレベル設定に関する互換性のない変更](https://github.com/strapi/documentation/pull/2049)
* [webpackエイリアスの削除に関する互換性のない変更](https://github.com/strapi/documentation/pull/2047)
* [設定ファイル名に対する厳格な要件に関する互換性のない変更](https://github.com/strapi/documentation/pull/2009)
* [いくつかのenv専用オプションのサポート削除に関する互換性のない変更](https://github.com/strapi/documentation/pull/2007)
* [Document Service APIのfindPage()メソッドの廃止に関する互換性のない変更](https://github.com/strapi/documentation/pull/2006)
* [idでのソートに関する互換性のない変更](https://github.com/strapi/documentation/pull/1999)
* [Viteをデフォルトのバンドラーにする互換性のない変更](https://github.com/strapi/documentation/pull/1998)
* [U&P register.allowedFieldsに対する互換性のない変更](https://github.com/strapi/documentation/pull/1997)
* [CM reduxストアに対する互換性のない変更](https://github.com/strapi/documentation/pull/1995)
* [strapi.containerに対する互換性のない変更](https://github.com/strapi/documentation/pull/1994)
* [i18n CMロケールパラメーターに対する互換性のない変更](https://github.com/strapi/documentation/pull/1991)
* [Strapiエクスポートに関する互換性のない変更](https://github.com/strapi/documentation/pull/1989)
* [isSupportedImageの削除に関する互換性のない変更](https://github.com/strapi/documentation/pull/1988)
* [react-router-dom 6に関する互換性のない変更](https://github.com/strapi/documentation/pull/1987)
* [アップグレードツール](https://github.com/strapi/documentation/pull/1945)
* [ドキュメントサービス](https://github.com/strapi/documentation/pull/1935)
* [fetchに関する互換性のない変更](https://github.com/strapi/documentation/pull/1915)
* [MySQL v5サポートの廃止に関する互換性のない変更](https://github.com/strapi/documentation/pull/1892)
* [Strapi v4→v5移行の互換性のない変更ページの初期化](https://github.com/strapi/documentation/pull/1896)
* [新しいv5開発者ドキュメント構造](https://github.com/strapi/documentation/pull/1811)

#### ユーザーガイド

* [ユーザーガイドのスクリーンショットと最新の更新内容](https://github.com/strapi/documentation/pull/2207)
* [リリース設定](https://github.com/strapi/documentation/pull/2120)

#### クラウドドキュメント

* [v4ウェブサイトからv5ウェブサイトへの既存クラウドドキュメントの移行](https://github.com/strapi/documentation/pull/2154) 
* [パンくずリストでメインカテゴリをクリック可能にする](https://github.com/strapi/documentation/pull/2198)

#### グローバル

* [AIウィジェット](https://github.com/strapi/documentation/pull/1898) 
* [タグシステム](https://github.com/strapi/documentation/pull/2076)
* [新しいホームページ](https://github.com/strapi/documentation/pull/2087) 

### 🖌 更新されたコンテンツ

#### 開発者ドキュメント

* [ダイナミックゾーンの共有ポピュレーション戦略を削除](https://github.com/strapi/documentation/pull/2222)
* [デフォルトサーバーレベルログの互換性のない変更の更新](https://github.com/strapi/documentation/pull/2216)
* [予約済み属性とコンテンツタイプ名に関する互換性のない変更の更新](https://github.com/strapi/documentation/pull/2215)
* [is-supported-imageの互換性のない変更の更新](https://github.com/strapi/documentation/pull/2214)
* [codemodsリストの更新](https://github.com/strapi/documentation/pull/2212)
* [v5移行およびプラグインSDKドキュメントの一部更新](https://github.com/strapi/documentation/pull/2210)
* [helper plugin移行ドキュメントにさらに多くの例を追加](https://github.com/strapi/documentation/pull/2209)
* [プラグイン移行の更新](https://github.com/strapi/documentation/pull/2208)
* [クイックスタートガイドのCloud CLIと新しいCLIプロンプトに関する更新](https://github.com/strapi/documentation/pull/2203)
* [sdk-plugin initの新オプションによる更新](https://github.com/strapi/documentation/pull/2202)
* [helper plugin移行ドキュメントの更新](https://github.com/strapi/documentation/pull/2200)
* [バックエンドカスタマイズ例をDocument Service APIに更新](https://github.com/strapi/documentation/pull/2196)
* [アップグレードツールガイドにスコープと警告の詳細を追加](https://github.com/strapi/documentation/pull/2195)
* [Document Service API向けのミドルウェアコンテキストにさらに例を追加](https://github.com/strapi/documentation/pull/2189)
* [統合ガイドの廃止](https://github.com/strapi/documentation/pull/2173)
* [デプロイメントガイドの外部リソースへの転送](https://github.com/strapi/documentation/pull/2172)
* [データベースライフサイクルとDocument Serviceミドルウェアの違い](https://github.com/strapi/documentation/pull/2170)
* [管理パネルカスタマイズセクションの再構築](https://github.com/strapi/documentation/pull/2162)
* [REST APIの追加リソースに新しいリンクと執筆依頼を追加](https://github.com/strapi/documentation/pull/2148)
* [CLIインストールガイドの更新](https://github.com/strapi/documentation/pull/2121)
* ['Cannot find module @strapi/XXX' ビルドエラーに関するFAQセクション](https://github.com/strapi/documentation/pull/2116)
* [codemods更新によるアップグレードツールドキュメントの更新](https://github.com/strapi/documentation/pull/2112)
* [@strapi/sdk-pluginパッケージ用のプラグインCLIの更新](https://github.com/strapi/documentation/pull/2109)
* [APIドキュメントでのリレーションに関する更新](https://github.com/strapi/documentation/pull/2100)
* [Document Service APIに一致するようにバックエンドカスタマイズ例を更新](https://github.com/strapi/documentation/pull/2074)
* [GraphQLの更新](https://github.com/strapi/documentation/pull/2051)
* [REST APIの更新（i18nおよび互換性のない変更を含む）](https://github.com/strapi/documentation/pull/2038)
* [(no-)watch-adminおよびバンドラーの更新](https://github.com/strapi/documentation/pull/2037)
* [TypeScriptページをセクションに変更](https://github.com/strapi/documentation/pull/1913)
* [新しい開発者ドキュメントの導入](https://github.com/strapi/documentation/pull/1911)
* [サポートされているデータベースの更新](https://github.com/strapi/documentation/pull/1887)

#### ユーザーガイド

* [パンくずリストでメインカテゴリをクリック可能にする](https://github.com/str

api/documentation/pull/2197)
* [ユーザーガイドのコンテンツ全体を更新](https://github.com/strapi/documentation/pull/2193)
* [ドラフト＆パブリッシュの更新](https://github.com/strapi/documentation/pull/2027)

#### クラウドドキュメント

* [パンくずリストでメインカテゴリをクリック可能にする](https://github.com/strapi/documentation/pull/2198)

### 🧹 雑務、修正、誤字脱字、その他の改善

* [AIボットの改善](https://github.com/strapi/documentation/pull/2142)

***

このリリースは、次のコントリビューターのおかげで実現しました。ありがとうございます！ 🫶

<div>
<a href="https://github.com/derrickmehaffy" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/8593673?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="derrickmehaffy"/>
</a>
<a href="https://github.com/pwizla" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/4233866?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="pwizla"/>
</a>
<a href="https://github.com/MbonuJennifer" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/94189270?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="MbonuJennifer"/>
</a>
<a href="https://github.com/innerdvations" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/999278?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="innerdvations"/>
</a>
<a href="https://github.com/alexandrebodin" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/6065744?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="alexandrebodin"/>
</a>
<a href="https://github.com/Convly" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/25851739?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="Convly"/>
</a>
<a href="https://github.com/meganelacheny" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/19183360?v=4" width="40" height="40" style={{borderRadius: '50%'}} alt="meganelacheny"/>
</a>
<a href="https://github.com/Bassel17" target="_blank">
    <img className="no-zoom" src="https://avatars.githubusercontent.com/u/70578187" width="40" height="40" style={{borderRadius: '50%'}} alt="Bassel17"/>
</a>
</div>

</div>
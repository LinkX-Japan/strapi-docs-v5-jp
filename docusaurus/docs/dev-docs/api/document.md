---
title: ドキュメント
description: Strapi v5におけるドキュメントとは何かを学びましょう
displayed_sidebar: devDocsSidebar
pagination_prev: dev-docs/api/content-api
tags:
- API
- 概念
- Content API
- Document Service API
- 下書き & 公開
- 国際化（i18n）
- はじめに
---

<div className="document-concept-page custom-mermaid-layout">

Strapi 5における**ドキュメント**はAPIのみの概念です。ドキュメントは、コンテンツタイプの特定のエントリーに対するコンテンツのさまざまなバリエーションを表します。

単一のタイプは一意のドキュメントを含み、コレクションタイプは複数のドキュメントを含むことができます。

管理パネルを使用するとき、ドキュメントの概念は決して言及されず、エンドユーザーにとっては必要ありません。ユーザーは[Content Manager](/user-docs/content-manager)で**エントリー**を作成および編集します。例えば、ユーザーとしては、特定のロケールのエントリーをリストしたり、特定のロケールの特定のエントリーの下書きバージョンを編集します。

しかし、APIレベルでは、エントリーのフィールドの値は実際には以下を持つことができます。

- 英語とフランス語のロケールで異なるコンテンツ、
- そして、それぞれのロケールで下書きと公開バージョンの異なるコンテンツ。

すべての下書きと公開バージョンのコンテンツを含むバケットはドキュメントです。

[Document Service API](/dev-docs/api/document-service)を使ってドキュメントを操作すると、ドキュメントを作成、取得、更新、削除したり、その中の特定のデータのサブセットを操作したりするのに役立ちます。

次の図は、コンテンツタイプに対してどの機能が有効化されているかによって、コンテンツの可能なバリエーションを全て表しています。例えば、[国際化（i18n）](/user-docs/content-manager/translating-content)や[下書き＆公開](/user-docs/content-manager/saving-and-publishing-content)などの機能が有効になっている場合：

<Tabs>
<TabItem value="document-only" label="i18nもDraft & Publishも無効">

```mermaid
flowchart LR
stX("Single type X <br>(例：ホームページ)")
docX("Document X<br>(例：ホームページ)")
docA(Document A)
docB(Document B)
docC("Document C<br>(例：レストラン、<br/>'Biscotte Restaurant')")
ctA(Collection type A)
ctB("Collection type B<br>(例：レストラン)")
fieldA(Field A)
fieldB(Field B)
fieldC("Field C<br>(例：'name')")

content --- stX --- docX
content --- ctA
content --- ctB

ctB --- docA
ctB --- docB
ctB --- docC

docC --- fieldA
docC --- fieldB
docC --- fieldC

classDef notHighlighted fill:transparent,stroke:none
classDef highlighted fill:transparent,stroke:#8D5AF3,stroke-width:2px
class content,stX,docX,docA,docB,ctA,ctB,docLocA,docLocB,docLocC,draftA,draftB,draftC,pubA,pubB,pubC,fieldA,fieldB,fieldC notHighlighted
linkStyle default stroke:#8D5AF3
class docC highlighted
```

</TabItem>

<TabItem value="dandp-only" label="Draft & Publishのみ有効">

```mermaid
flowchart LR
stX("Single type X <br>(例：ホームページ)")
docX("Document X<br>(例：ホームページ)")
docA(Document A)
docB(Document B)
docC("Document C<br>(例：レストラン、<br/>'Biscotte Restaurant')")
draftC(Draft Version)
pubC(Published Version)
ctA(Collection type A)
ctB("Collection type B<br>(例：レストラン)")
fieldA(Field A)
fieldB(Field B)
fieldC("Field C<br>(例：'name')")

content --- stX --- docX
content --- ctA
content --- ctB

ctB --- docA
ctB --- docB
ctB --- docC

docC --- draftC
docC --- pubC

pubC --- fieldA
pubC --- fieldB
pubC --- fieldC

classDef notHighlighted fill:transparent,stroke:none
classDef highlighted fill:transparent,stroke:#8D5AF3,stroke-width:2px
class content,stX,docX,docA,docB,ctA,ctB,docLocA,docLocB,docLocC,draftA,draftB,draftC,pubA,pubB,pubC,fieldA,fieldB,fieldC notHighlighted
linkStyle default stroke:#8D5AF3
class docC highlighted
```

</TabItem>

<TabItem value="i18n-only" label="i18nのみ有効">

```mermaid
flowchart LR
stX("シングルタイプX <br>(例：ホームページ)")
docX("ドキュメントX<br>(例：ホームページ)")
docA(ドキュメントA)
docB(ドキュメントB)
docC("ドキュメントC<br>(例：レストラン,<br/>'ビスコットレストラン')")
docLocA("ドキュメントロケールA<br>(例：'en')")
docLocB("ドキュメントロケールB<br><br>")
docLocC(ドキュメントロケールC)
ctA(コレクションタイプA)
ctB("コレクションタイプB<br>(例：レストラン)")
fieldA(フィールドA)
fieldB(フィールドB)
fieldC("フィールドC<br>(例：'名前')")

content --- stX --- docX
content --- ctA
content --- ctB

ctB --- docA
ctB --- docB
ctB --- docC

docC --- docLocA
docC --- docLocB
docC --- docLocC

docLocC --- fieldA
docLocC --- fieldB
docLocC --- fieldC

classDef notHighlighted fill:transparent,stroke:none
classDef highlighted fill:transparent,stroke:#8D5AF3,stroke-width:2px
class content,stX,docX,docA,docB,ctA,ctB,docLocA,docLocB,docLocC,fieldA,fieldB,fieldC notHighlighted
linkStyle default stroke:#8D5AF3
class docC highlighted
```

</TabItem>

<TabItem value="i18n-and-dandp" label="i18n + 下書き＆公開が有効" default>

```mermaid
flowchart LR
stX("シングルタイプX <br>(例：ホームページ)")
docX("ドキュメントX<br>(例：ホームページ)")
docA(ドキュメントA)
docB(ドキュメントB)
docC("ドキュメントC<br>(例：レストラン,<br/>'ビスコットレストラン')")
docLocA("ドキュメントロケールA<br>(例：'en')")
docLocB(ドキュメントロケールB)
docLocC(ドキュメントロケールC)
draftA(ドラフトバージョン)
draftB(ドラフトバージョン)
draftC(ドラフトバージョン)
pubA(公開バージョン)
pubC(公開バージョン)
ctA(コレクションタイプA)
ctB("コレクションタイプB<br>(例：レストラン)")
fieldA(フィールドA)
fieldB(フィールドB)
fieldC("フィールドC<br>(例：'名前')")

content --- stX --- docX
content --- ctA
content --- ctB

ctB --- docA
ctB --- docB
ctB --- docC

docC --- docLocA
docC --- docLocB --- draftB
docC --- docLocC

docLocA --- draftA
docLocA --- pubA

docLocC --- draftC
docLocC --- pubC

pubC --- fieldA
pubC --- fieldB
pubC --- fieldC

classDef notHighlighted fill:transparent,stroke:none
classDef highlighted fill:transparent,stroke:#8D5AF3,stroke-width:2px
class content,stX,docX,docA,docB,ctA,ctB,docLocA,docLocB,docLocC,draftA,draftB,draftC,pubA,pubB,pubC,fieldA,fieldB,fieldC notHighlighted
linkStyle default stroke:#8D5AF3
class docC highlighted
```

</TabItem>
</Tabs>

- 国際化（i18n）機能が有効化されている場合
コンテンツタイプで有効化されている場合、ドキュメントは複数の**ドキュメントロケール**を持つことができます。
- 下書き＆公開機能がコンテンツタイプで有効化されている場合、ドキュメントは**公開版**と**下書き版**を持つことができます。

:::strapi ドキュメントデータを問い合わせるAPI
ドキュメントやそれらが表現するデータとやり取りするには：

  - バックエンドサーバーから（例えば、コントローラー、サービス、プラグインのバックエンド部分から）[Document Service API](/dev-docs/api/document-service)を使用します。
  - アプリケーションのフロントエンド部分から、データを[REST API](/dev-docs/api/rest)または[GraphQL API](/dev-docs/api/graphql)を使用して問い合わせます。

APIに関する追加情報については、[Content API introduction](/dev-docs/api/content-api)を参照してください。
:::

:::info 返される結果のデフォルトバージョン
バックエンドAPIとフロントエンドAPIの重要な違いは、パラメータが渡されない場合に返されるデフォルトのバージョンに関するものです：
- Document Service APIはデフォルトで下書きバージョンを返します,
- 一方、RESTとGraphQLのAPIはデフォルトで公開バージョンを返します。
:::

</div>
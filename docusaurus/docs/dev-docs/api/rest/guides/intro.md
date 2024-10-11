---
title: REST APIガイド
description: 具体的なREST APIトピックについて深く掘り下げたガイドを用いて、いくつかのユースケースを詳しく説明したり、手順を追った指導を行います。
displayed_sidebar: restApiSidebar
sidebar_label: ガイド
pagination_prev: dev-docs/api/rest
pagination_next: dev-docs/api/rest/guides/understanding-populate
tags:
- API
- Content API
- ガイド
- REST API
- REST APIガイド

---

# REST APIガイド

[REST APIリファレンス](/dev-docs/api/rest)ドキュメンテーションは、利用可能なすべてのエンドポイントとパラメーターについての素早い参照を提供することを目指しています。

## ガイド

以下のガイドは、Strapiドキュメンテーションチームが公式にメンテナンスしており、専門的なトピックをカバーし、詳細な説明（🧠で示されるガイド）や一部のユースケースの手順に従った指導（🛠️で示されるガイド）を提供します：

<CustomDocCard emoji="🧠" title="populateの理解" description="populateが何を意味し、REST APIクエリにpopulateパラメータを使用してレスポンスに追加フィールドを追加する方法を学びます。" link="/dev-docs/api/rest/guides/understanding-populate" />
<CustomDocCard emoji="🛠️" title="作成者フィールドのpopulate方法" description="populateパラメータを利用して'createdBy'と'updatedBy'のデータをクエリレスポンスに追加するカスタムコントローラを構築する方法についての手順を読みます。" link="/dev-docs/api/rest/guides/populate-creator-fields" />

## 追加のリソース

:::strapi 他のユーザーを助けたいですか？
このセクションに記載されている追加リソースの一部はStrapi v4向けに作成されており、Strapi 5では完全には動作しないかもしれません。Strapi 5向けに以下の記事のいずれかを更新したい場合は、ぜひ[記事の提案](https://strapi.io/write-for-the-community)をCommunity programにお願いします。
:::

以下のブログ投稿に追加のチュートリアルとガイドがあります：

<CustomDocCard emoji="➕" title="REST APIでのリクエスト認証" description="JSON Web TokensとAPIトークンを用いてREST APIクエリを認証する方法を学びます。" link="https://strapi.io/blog/guide-on-authenticating-requests-with-the-rest-api" />

<CustomDocCard emoji="➕" title="StrapiのContent APIでFetchを使用する" description="Fetch APIのfetch()メソッドを使用してStrapiのContent APIとやり取りする方法を探ります。" link="https://strapi.io/blog/mastering-api-requests-using-fetch-with-strapi-content-api" />

<CustomDocCard emoji="➕" title="Content Delivery Network (CDN)経由でStrapiのREST APIをリクエストする" description="大量のメディアアセットをリクエストする際のネットワーク遅延問題を解決するために、StrapiのREST APIとCDNの使用を活用する方法を学びます。" link="https://strapi.io/blog/request-strapi-s-rest-api-behind-a-content-delivery-network-cdn" />

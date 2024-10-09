---
title: メディアライブラリの概要
slug: /user-docs/media-library
sidebar_position: 1
description: アプリケーションにアップロードされたすべてのアセットを表示および管理できるメディアライブラリの概要。
tags:
- 管理パネル
- コンテンツタイプビルダー
- フィルター
- 概要
- メディアライブラリ
pagination_next: user-docs/media-library/adding-assets
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ScreenshotNumberReference from '/src/components/ScreenshotNumberReference.jsx';

# メディアライブラリの概要

メディアライブラリは、Strapiのプラグインで、デフォルトで常に有効化されています。これは無効化することはできず、アプリケーションが開発環境と本番環境のどちらにある場合でもアクセス可能です。

管理者は、管理パネルのメインナビゲーションにある ![ML icon](/img/assets/icons/v5/Images.svg) _Media Library_ からメディアライブラリにアクセスできます。

<ThemedImage
  alt="メディアライブラリの概要"
  sources={{
    light: '/img/assets/media-library/media-library_overview.png',
    dark: '/img/assets/media-library/media-library_overview_DARK.png',
  }}
/>

メディアライブラリには、メディアライブラリ自体や、メディアフィールドを管理する際に[コンテンツマネージャー](/user-docs/content-manager/writing-content#filling-up-fields)からアップロードされたアセットがすべて表示されます。メディアライブラリにアップロードされたアセットは、[コンテンツマネージャー](/user-docs/content-manager/writing-content#filling-up-fields)を使用してコンテンツタイプに挿入できます。

メディアライブラリからは、次の操作が可能です:

- 新しいアセットをアップロードする（[アセットの追加](/user-docs/media-library/adding-assets)を参照）または新しいフォルダを作成する（[フォルダでアセットを整理する](/user-docs/media-library/organizing-assets-with-folders)を参照） <ScreenshotNumberReference number="1" />、
- アセットやフォルダを並べ替えたりフィルターを設定することで、アセットやフォルダを簡単に見つける <ScreenshotNumberReference number="2" />、
- アセットのリストビュー ![List icon](/img/assets/icons/v5/List.svg) とグリッドビュー ![Grid icon](/img/assets/icons/v5/GridFour.svg) を切り替えて表示し、設定 ![設定アイコン](/img/assets/icons/v5/Cog.svg) にアクセスして[ビューを設定](#ビューの設定)したり、テキスト検索 ![検索アイコン](/img/assets/icons/v5/Search.svg) で特定のアセットやフォルダを検索する <ScreenshotNumberReference number="3" />、
- フォルダを表示して移動したり、管理する <ScreenshotNumberReference number="4" />。

:::tip
インターフェースの右側にある検索アイコン ![検索アイコン](/img/assets/icons/v5/Search.svg) をクリックすると、テキスト検索を使用してアセットやフォルダをすばやく見つけることができます！
:::

## アセットのフィルタリング

フォルダとアセットのリストの上部左側に、![フィルターアイコン](/img/assets/icons/v5/Filter.svg) **フィルター** ボタンが表示されます。これにより、1つ以上の条件に基づくフィルターを設定できます。フィルターは条件ごとに追加され、複数の条件を設定した場合、すべての条件に一致するアセットのみが表示されます。

<ThemedImage
  alt="フィルター"
  sources={{
    light: '/img/assets/media-library/media-library_filters.png',
    dark: '/img/assets/media-library/media-library_filters_DARK.png',
  }}
/>

新しいフィルターを設定するには:

1. ![フィルターアイコン](/img/assets/icons/v5/Filter.svg) **フィルター** ボタンをクリックします。
2. 最初のドロップダウンリストをクリックして、条件を適用するフィールドを選択します。
3. 2番目のドロップダウンリストをクリックして、適用する条件の種類を選択します。
4. アセットの種類に基づく条件の場合、3番目のドロップダウンリストをクリックして、含めるまたは除外するファイルタイプを選択します。作成日や更新日などの日付と時刻に基づく条件の場合は、左側のフィールドをクリックして日付を選択し、右側のフィールドをクリックして時間を選択します。
5. **フィルターを追加** ボタンをクリックします。

:::note
フィルターが有効になると、フィルターアイコンの隣に表示されます。フィルターを削除するには、削除アイコン ![クリアアイコン](/img/assets/icons/v5/Cross.svg) をクリックします。
:::

## アセットの並べ替え

<ThemedImage
  alt="並べ替え"
  sources={{
    light: '/img/assets/media-library/media-library_sort.png',
    dark: '/img/assets/media-library/media-library_sort_DARK.png',
  }}
/>

フォルダとアセットのリストの上部、**フィルター** ボタンの隣には、ドロップダウンボタンが表示されます。これにより、アセットをアップロード日、アルファベット順、または更新日で並べ替えることができます。ドロップダウンボタンをクリックし、リスト内のオプションを選択すると、アセットが自動的に並べ替えられて表示されます。

## ビューの設定

フォルダとアセットのリストの上部右側には、3つのボタンが表示されています。![設定アイコン](/img/assets/icons/v5/Cog.svg) をクリックして、メディアライブラリのデフォルトビューを設定します。

<ThemedImage
  alt="ビューの設定"
  sources={{
    light: '/img/assets/media-library/media-library_configure-the-view.png',
    dark: '/img/assets/media-library/media-library_configure-the-view_DARK.png',
  }}
/>

ここから次のことができます:

- **1ページあたりのエントリ数** のドロップダウンを使用して、デフォルトで表示されるアセットの数を定義します。
- **デフォルトの並べ替え順** のドロップダウンを使用して、アセットが表示されるデフォルトの順序を定義します。この設定は、メディアライブラリ内でアセットを[並べ替える](#アセットの並べ替え)ときに上書きされることがあります。

これらの設定は、メディアライブラリおよび[コンテンツマネージャーのメディアアップロードモーダル](/user-docs/content-manager/writing-content#filling-up-fields)全体で使用されるグローバル設定です。

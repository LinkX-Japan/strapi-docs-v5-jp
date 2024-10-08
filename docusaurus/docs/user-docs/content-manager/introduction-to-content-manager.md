---
title: コンテンツマネージャーの概要
sidebar_position: 1
displayed_sidebar: userDocsSidebar
slug: /user-docs/content-manager
description: コレクションタイプとシングルタイプに対してコンテンツを作成できるコンテンツマネージャーの概要。
pagination_next: user-docs/content-manager/configuring-view-of-content-type
tags:
- コンテンツマネージャー
- コンテンツタイプビルダー
- コレクションタイプ
- シングルタイプ
- 概要
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ScreenshotNumberReference from '/src/components/ScreenshotNumberReference.jsx';

# コンテンツマネージャーの概要

コンテンツマネージャーはStrapiのコア機能です。デフォルトで常に有効であり、無効にすることはできません。開発環境と本番環境の両方でアクセス可能です。

コンテンツマネージャーはメインナビゲーションの![Content icon](/img/assets/icons/v5/Feather.svg) *Content Manager*からアクセスでき、サブナビゲーションに「_コレクションタイプ_」と「_シングルタイプ_」の2つのカテゴリが表示されます。各カテゴリには、事前に[コンテンツタイプビルダー](/user-docs/content-type-builder/introduction-to-content-types-builder.md)を使用して作成されたコレクションおよびシングルコンテンツタイプが含まれています。この2つのカテゴリから、管理者はコンテンツを作成、管理、公開できます。

:::tip
サブナビゲーションの検索アイコン ![Search icon](/img/assets/icons/v5/Search.svg) をクリックして、コンテンツタイプを素早く検索できます。
:::

## コレクションタイプ

コンテンツマネージャーの「_コレクションタイプ_」カテゴリには、利用可能なコレクションタイプのリストが表示されます。これらはサブナビゲーションの![Content icon](/img/assets/icons/v5/Feather.svg) *Content Manager*からアクセスできます。

各コレクションタイプには複数のエントリを作成できるため、コレクションタイプは「リストビュー」と「編集ビュー」の2つのインターフェースに分かれています（[コンテンツの作成](writing-content.md)を参照）。

コレクションタイプのリストビューには、そのコレクションタイプで作成されたすべてのエントリが表示されます。

<ThemedImage
  alt="コンテンツマネージャー内のコレクションタイプのリストビュー"
  sources={{
    light: '/img/assets/content-manager/content-manager_list-view.png',
    dark: '/img/assets/content-manager/content-manager_list-view_DARK.png',
  }}
/>

リストビューでは以下の操作が可能です:

- 新しいエントリを作成する <ScreenshotNumberReference number="1" />,
- テキスト検索 <ScreenshotNumberReference number="2" /> やフィルター設定 <ScreenshotNumberReference number="3" /> を使用して特定のエントリを検索する,
- [国際化 (i18n)](/user-docs/plugins/strapi-plugins#-internationalization-plugin) が有効な場合、選択したロケールで[翻訳された](/user-docs/content-manager/translating-content)エントリのみを表示するためにロケールでフィルターする <ScreenshotNumberReference number="4" />,
- リストビューのテーブルに表示されるフィールドを設定する <ScreenshotNumberReference number="5" />,
- [ドラフト & 公開](/user-docs/content-manager/saving-and-publishing-content) が有効な場合、各エントリのステータスを確認する <ScreenshotNumberReference number="6" />,
- 行の最後にある![More icon](/img/assets/icons/v5/More.svg)をクリックして特定のエントリに対してアクションを実行する <ScreenshotNumberReference number="7" />:
  - 編集 ![Edit icon](/img/assets/icons/v5/Pencil.svg)（[コンテンツの作成](writing-content.md)を参照）、複製 ![Duplicate icon](/img/assets/icons/v5/Duplicate.svg)、または削除 ![Delete icon](/img/assets/icons/v5/Trash.svg)（[コンテンツの削除](saving-and-publishing-content.md#deleting-content)を参照）、
  - [ドラフト & 公開](/user-docs/content-manager/saving-and-publishing-content) が有効な場合、エントリを![Unpublish icon](/img/assets/icons/v5/CrossCircle.svg)非公開にする、または変更を破棄する,
  - [国際化 (i18n)](/user-docs/plugins/strapi-plugins#-internationalization-plugin) が有効な場合、指定したロケールを![Delete locale icon](/img/assets/icons/v5/delete-locale.svg)削除する,
- 複数のエントリを同時に選択して[公開、非公開](/user-docs/content-manager/saving-and-publishing-content#bulk-publish-and-unpublish-)、または[削除](/user-docs/content-manager/saving-and-publishing-content.md#deleting-content)を行う。

:::tip
リストビューのテーブルに表示されているほとんどのフィールドでは、ソートを有効にできます（[コンテンツタイプのビュー構成](../content-manager/configuring-view-of-content-type.md)を参照）。フィールド名をクリックすると、そのフィールドでソートできます。
:::

### エントリのフィルタリング

リストビューテーブルの上部、インターフェースの左側には、![Filters icon](/img/assets/icons/v5/Filter.svg) **フィルター**ボタンがあります。これにより、1つまたは複数の条件ベースのフィルターを設定でき、複数の条件を設定した場合は、それらすべての条件に一致するエントリのみが表示されます。

<ThemedImage
  alt="コンテンツマネージャー内のフィルター"
  sources={{
    light: '/img/assets/content-manager/content-manager_filters2.png',
    dark: '/img/assets/content-manager/content-manager_filters2_DARK.png',
  }}
/>

新しいフィルターを設定するには:

1. ![Filters icon](/img/assets/icons/v5/Filter.svg) **フィルター**ボタンをクリックします。
2. 1つ目のドロップダウンリストから条件を適用するフィールドを選択します。
3. 2つ目のドロップダウンリストから適用する条件の種類を選択します。
4. 残りのテキストボックスに条件の値を入力します。
5. **フィルターを追加**ボタンをクリックします。

:::note
フィルターが有効になると、![Filters icon](/img/assets/icons/v5/Filter.svg) **フィルター**ボタンの横に表示されます。フィルターは削除アイコン ![Clear icon](/img/assets/icons/v5/Cross.svg) をクリックすることで削除できます。
:::

### 新しいエントリの作成

リストビューインターフェースの右上には、**新しいエントリを作成**ボタンがあります。これにより、コレクションタイプの新しいエントリを作成できます。

新しいエントリボタンをクリックすると編集ビューにリダイレクトされ、新しいエントリのコンテンツを作成できます（[コンテンツの作成](writing-content.md)を参照）。

:::note
新しいエントリは、コンテンツが作成されて一度保存されるまで、正式に作成されたとはみなされません。その後初めて、リストビューにエントリが表示されます。
:::

### テーブルフィールドの設定

リストビューテーブルの右上には、設定ボタン ![Cog icon](/img/assets/icons/v5/Cog.svg) があります。これにより、表示するフィールドを一時的に選択したり、永続的なビュー設定にアクセスしたりできます。

:::note
以下で説明する方法でリストビューテーブルに表示するフィールドを設定するのは一時的です。設定はページが更新されるか、コンテンツマネージャーの外に移動するとリセットされます。永続的な設定については、設定ボタン ![Cog icon](/img/assets/icons/v5/Cog.svg) をクリックし、![List + icon](/img/assets/icons/v5/ListPlus.svg) **ビューを構成**ボタンをクリックしてリストビュー構成インターフェースにアクセスしてください（[コンテンツタイプのビュー構成](../content-manager/configuring-view-of-content-type.md)を参照）。
:::

<

ThemedImage
  alt="コンテンツマネージャーのリストビュー設定で表示されるフィールド"
  sources={{
    light: '/img/assets/content-manager/content-manager_displayed-fields.png',
    dark: '/img/assets/content-manager/content-manager_displayed-fields_DARK.png',
  }}
/>

テーブルに表示されるフィールドを一時的に設定するには:

1. 設定ボタン ![Cog icon](/img/assets/icons/v5/Cog.svg) をクリックします。
2. テーブルに表示したいフィールドに対応するチェックボックスにチェックを入れます。
3. 表示したくないフィールドのチェックボックスのチェックを外します。

:::tip
リレーショナルフィールドもリストビューに表示できます。特有の設定については、[コンテンツタイプのビュー構成](../content-manager/configuring-view-of-content-type.md)を参照してください。
:::

## シングルタイプ

コンテンツマネージャーの「_シングルタイプ_」カテゴリには、利用可能なシングルタイプのリストが表示されます。これらはサブナビゲーションの![Content icon](/img/assets/icons/v5/Feather.svg) *Content Manager*からアクセスできます。

コレクションタイプとは異なり、シングルタイプは複数のエントリを作成するものではありません。つまり、利用可能なシングルタイプごとにデフォルトエントリは1つだけです。そのため、シングルタイプカテゴリにはリストビューがありません。

シングルタイプをクリックすると、直接編集ビューにリダイレクトされ、そのシングルタイプのコンテンツを作成できます（[コンテンツの作成](writing-content.md)を参照）。

<ThemedImage
  alt="コンテンツマネージャー内のシングルタイプ"
  sources={{
    light: '/img/assets/content-manager/content-manager_single-type.png',
    dark: '/img/assets/content-manager/content-manager_single-type_DARK.png',
  }}
/>
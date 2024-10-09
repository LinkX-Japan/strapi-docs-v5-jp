---
title: コンテンツタイプの管理
description: Strapi 5でコンテンツタイプを管理する方法を学びます。
tags:
- コレクションタイプ
- コンポーネント
- コンテンツタイプ
- コンテンツタイプビルダー
- シングルタイプ
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ScreenshotNumberReference from '/src/components/ScreenshotNumberReference.jsx';

# コンテンツタイプの管理

:::note 開発環境のみ
コンテンツタイプビルダーは、Strapiアプリケーションが開発環境にある場合のみ、コンテンツタイプの作成および更新にアクセスできます。他の環境では読み取り専用モードになります。
:::

コンテンツタイプビルダーを使用して、既存のコンテンツタイプやコンポーネントを管理できます。これらはコンテンツマネージャーで既に使用されている場合でも管理可能です。ただし、1つのコンテンツタイプまたはコンポーネントしか同時に管理できません。

コンテンツタイプまたはコンポーネントを管理するには、コレクションタイプ、シングルタイプ、またはコンポーネントのカテゴリでその名前をクリックします。

## コンテンツタイプの編集

コンテンツタイプやコンポーネントの管理には、全般設定やフィールドの編集、コンテンツタイプやコンポーネント全体の削除が含まれます。選択されたコンテンツタイプやコンポーネントの右側には、利用可能な編集オプションが表示されます。

<ThemedImage
  alt="コンテンツタイプビルダーの編集インターフェース"
  sources={{
    light: '/img/assets/content-type-builder/content-types-builder_edition.png',
    dark: '/img/assets/content-type-builder/content-types-builder_edition_DARK.png',
  }}
/>

- コンテンツタイプやコンポーネントの名前および説明の横にある ![編集アイコン](/img/assets/icons/v5/Pencil.svg) **編集** ボタン <ScreenshotNumberReference number="1" /> をクリックすると、そのコンテンツタイプやコンポーネントの[基本設定](#コンテンツタイプやコンポーネントの設定を編集する)にアクセスできます。
- 画面右上には次のボタンがあります:
  - **新しいフィールドを追加** と **保存** ボタン <ScreenshotNumberReference number="2" /> を使って、コンテンツタイプまたはコンポーネントにフィールドを追加したり、現在の変更を保存したりできます（[コンテンツタイプのフィールド設定](/user-docs/content-type-builder/configuring-fields-content-type)を参照）。
  - **表示設定を構成** ボタンで、編集ビューの設定画面にアクセスできます（[編集ビューの設定](/user-docs/content-manager/configuring-view-of-content-type#configuring-the-edit-view)を参照）。
- さらに、設定オプションの下には、作成済みのフィールドが一覧表示されたテーブル <ScreenshotNumberReference number="3" /> があります。ここでは次の操作が可能です:
  - ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックしてフィールドを編集。
  - ![削除アイコン](/img/assets/icons/v5/Trash.svg) をクリックしてフィールドを削除。

:::caution
フィールドの名前を変更することは可能ですが、データベースに関しては、フィールド名を変更することは、新しいフィールドを作成し、以前のフィールドを削除することを意味します。データベースからは削除されませんが、以前のフィールド名に関連付けられたデータは、管理パネルからアクセスできなくなります。
:::

### コンテンツタイプやコンポーネントの設定を編集する

コンテンツタイプやコンポーネントの設定は、コンテンツタイプビルダーから編集できます。設定には、**基本設定** と **高度な設定** の2つのタブがあります。

#### 基本設定

**基本設定** タブでは、以下のプロパティを編集できます:

<ThemedImage
  alt="コンテンツタイプビルダーの基本設定"
  sources={{
    light: '/img/assets/content-type-builder/basic-settings.png',
    dark: '/img/assets/content-type-builder/basic-settings_DARK.png',
  }}
/>

* **表示名**: 管理パネルに表示されるコンテンツタイプやコンポーネントの名前。
* **API ID（単数形）**: APIで使用されるコンテンツタイプやコンポーネントの名前。表示名から自動的に生成されますが、編集可能です。
* **API ID（複数形）**: APIで使用されるコンテンツタイプやコンポーネントの複数形の名前。表示名から自動的に生成されますが、編集可能です。
* **タイプ**: コンテンツタイプやコンポーネントのタイプ。**コレクションタイプ** または **シングルタイプ** を選択できます。

#### 高度な設定

**高度な設定** タブでは、以下のプロパティを編集できます:

<ThemedImage
  alt="コンテンツタイプビルダーの高度な設定"
  sources={{
    light: '/img/assets/content-type-builder/advanced-settings.png',
    dark: '/img/assets/content-type-builder/advanced-settings_DARK.png',
  }}
/>

* **ドラフト&公開**: コンテンツタイプやコンポーネントの[ドラフト&公開](/user-docs/content-manager/saving-and-publishing-content)機能を有効にします。デフォルトでは無効です。
* **国際化**: コンテンツタイプやコンポーネントの[国際化](/user-docs/content-manager/translating-content)機能を有効にします。デフォルトでは無効です。

<!--
* **レビューワークフロー**: <EnterpriseBadge /> コンテンツタイプの[レビューワークフロー](/user-docs/settings/review-workflows)機能を有効にします。デフォルトでは無効です。
-->

## コンテンツタイプの削除

コンテンツタイプやコンポーネントは、コンテンツタイプビルダーから削除できます。コンテンツタイプを削除すると、それに基づいて作成されたコンテンツマネージャーのすべてのエントリも自動的に削除されます。同様に、コンポーネントを削除すると、それを使用しているすべてのコンテンツタイプやエントリから自動的に削除されます。

コンテンツタイプやコンポーネントを削除するには:

1. コンテンツタイプビルダーのサブナビゲーションで、削除するコンテンツタイプやコンポーネントの名前をクリックします。
2. 選択したコンテンツタイプやコンポーネントの編集インターフェースで、**編集** ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックします。
3. 編集ウィンドウで、**削除** ボタンをクリックします。
4. 確認ウィンドウで削除を確認します。

:::caution
コンテンツタイプを削除すると、コンテンツタイプビルダーから作成および利用できるものが削除されますが、Strapiアプリケーションの管理パネルからは削除されません。ただし、そのコンテンツタイプに基づいて作成されたデータはデータベースに保持されます。詳細は、関連する[GitHub issue](https://github.com/strapi/strapi/issues/1114)を参照してください。
:::

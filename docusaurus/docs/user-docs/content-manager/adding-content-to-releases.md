---
title: リリースにコンテンツを含める
description: リリースにコンテンツを含めるための手順
displayed_sidebar: userDocsSidebar
tags:
- 管理パネル
- エンタープライズ機能
- リリース機能
- Strapi Cloud
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# リリースにコンテンツを含める  <EnterpriseBadge /> <CloudTeamBadge />

[リリース](/user-docs/releases/introduction)機能を使用すると、複数のエントリをグループ化して一度に公開することができます。エントリをリリースに追加する作業は、コンテンツマネージャーから行います。エントリを更新する際にリリースからエントリを削除することも可能です。

:::prerequisites
- エントリをリリースに追加する前に、[リリース](/user-docs/releases/creating-a-release)ページからリリースを作成しておく必要があります。
- コンテンツをリリースに追加するには、Content-Releasesプラグインに対する適切な権限が必要です（[管理者ロールの設定](/user-docs/users-roles-permissions/configuring-administrator-roles#plugins-and-settings)を参照）。
:::

## 複数のエントリをリリースに追加する

複数のエントリは、コンテンツマネージャーのリストビューから[リリース](/user-docs/releases/introduction)に追加できます。

エントリをリリースに追加する手順：

1. コンテンツマネージャーのリストビューから、追加したいエントリを選択し、エントリの記録の左側にあるボックスをチェックします。
2. テーブルのヘッダー上部にある **リリースに追加** ボタンをクリックします。
3. モーダルで、これらのエントリを追加するリリースを選択します。
4. リリースが公開されたときにこれらのエントリを公開するか、非公開にするかを決定するために、**公開** または **非公開** ボタンをクリックし、**続行** をクリックします。

<ThemedImage
  alt="リリースにコンテンツを含める"
  sources={{
    light: '/img/assets/releases/releases-cm-list-view.png',
    dark: '/img/assets/releases/releases-cm-list-view_DARK.png',
  }}
/>

## エントリをリリースに追加する

エントリは、コンテンツマネージャーの編集ビューから編集中に[リリース](/user-docs/releases/introduction)に追加できます。

エントリをリリースに追加する手順：

1. インターフェースの右側にある _エントリ_ エリアで、![その他アイコン](/img/assets/icons/v5/More.svg) をクリックします。
2. リストの中から、![リリースアイコン](/img/assets/icons/v5/PaperPlane.svg) **リリースに追加** ボタンをクリックします。
2. このエントリを追加するリリースを選択します。
3. リリース自体が公開されるときにエントリを公開するか、非公開にするかを決定するために、**公開** または **非公開** ボタンをクリックし、**続行** をクリックします。

右側の *リリース* ボックスには、そのエントリが含まれているリリースが表示されます。

:::info
[リリーススケジューリング](/user-docs/releases/managing-a-release#scheduling-a-release-) が有効になっている場合、エントリがスケジュールされたリリースに追加されると、リリースの日時も表示されます。
:::

## エントリをリリースから削除する

エントリは、コンテンツマネージャーの編集ビューから編集中に[リリース](/user-docs/releases/introduction)から削除できます。

エントリをリリースから削除する手順：

1. 右サイドバーの *リリース* ボックスで、リリース名の下にある ![その他アイコン](/img/assets/icons/v5/More.svg) をクリックします。
2. **リリースから削除** ボタンをクリックします。

<!-- TODO: 実装されたら再追加 -->
<!-- :::tip
複数のエントリをリリースページから直接削除することもできます（[リリースの管理](/user-docs/releases/managing-a-release)を参照）。
::: -->

<!-- TODO: スクリーンショットを追加 -->

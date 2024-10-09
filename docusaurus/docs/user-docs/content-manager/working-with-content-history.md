---
title: コンテンツ履歴の閲覧
description: Strapi 5のコンテンツ履歴機能を使用して、コンテンツマネージャーでドキュメントの以前のバージョンを閲覧および復元する方法について説明します。
displayed_sidebar: userDocsSidebar
tags:
 - コンテンツマネージャー
 - コンテンツ履歴
---

# コンテンツ履歴 <BetaBadge/> <EnterpriseBadge/> <CloudProBadge/> <CloudTeamBadge/>

コンテンツマネージャーのコンテンツ履歴機能を使用すると、コンテンツマネージャーで作成したドキュメントの以前のバージョンを閲覧したり、復元したりできます。

<ThemedImage
alt="ドキュメントのコンテンツ履歴にアクセスする"
sources={{
  light:'/img/assets/content-manager/accessing-content-history.png',
  dark:'/img/assets/content-manager/accessing-content-history_DARK.png',
}}
/>

## コンテンツ履歴の閲覧

コンテンツ履歴は、コンテンツマネージャーで作成された任意のドキュメントの編集ビューからアクセスできます。

コンテンツ履歴を閲覧するには、コンテンツマネージャーでドキュメントを編集している間に、インターフェースの右上にある![More icon](/img/assets/icons/v5/More.svg)をクリックし、![ClockCounterClockwise icon](/img/assets/icons/v5/ClockCounterClockwise.svg) **コンテンツ履歴**ボタンをクリックします。すると、コンテンツ履歴ビューが表示されます。

- 右側のサイドバーには利用可能なバージョンの合計数が表示され、各バージョンの作成日時、作成したユーザー、およびステータス（下書き、変更済み、公開済み）が表示されます（ドキュメントのステータスの詳細については、[ドラフト & 公開](/user-docs/content-manager/saving-and-publishing-content#saving--publishing-content)を参照してください）。
- 左側のメインビューには、右側のサイドバーで選択されたバージョンのフィールドとその内容が表示されます。

<ThemedImage
alt="ドキュメントのコンテンツ履歴を閲覧する"
sources={{
  light:'/img/assets/content-manager/browsing-content-history.png',
  dark:'/img/assets/content-manager/browsing-content-history_DARK.png',
}}
/>

:::note
コンテンツ履歴のメインビューでは、他のバージョンで存在しなかった、削除された、または名前が変更されたフィールドが明確に表示されます。選択したバージョンに不明なフィールドがある場合、それらは他のフィールドの下に_不明なフィールド_という見出しの下に表示されます。
:::

## 以前のバージョンの復元

ドキュメントの以前のバージョンを復元することができます。バージョンを復元すると、そのバージョンのコンテンツが現在の下書きバージョンに上書きされます。ドキュメントは「変更済み」ステータスに切り替わり、いつでもコンテンツを[公開](/user-docs/content-manager/saving-and-publishing-content#publishing-and-unpublishing)できるようになります。

バージョンを復元するには:

1. コンテンツマネージャーでドキュメントを編集している間に、インターフェースの右上にある![More icon](/img/assets/icons/v5/More.svg)をクリックし、![ClockCounterClockwise icon](/img/assets/icons/v5/ClockCounterClockwise.svg) **コンテンツ履歴**ボタンをクリックします。
2. コンテンツ履歴を閲覧し、右側のサイドバーでバージョンを選択します。
3. **復元**ボタンをクリックします。
4. _確認_ウィンドウで、**復元**をクリックします。

:::note
コンテンツタイプに[国際化(i18n)](/user-docs/content-manager/translating-content)機能が有効になっている場合、一意のフィールド（すべてのロケールで同じ内容を持つフィールド）を含むバージョンを復元すると、そのフィールドの内容がすべてのロケールで復元されます。
:::

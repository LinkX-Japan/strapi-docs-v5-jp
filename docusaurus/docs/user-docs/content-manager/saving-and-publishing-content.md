---
title: コンテンツの保存、公開、および削除
description: 下書きから不要なコンテンツの削除まで、コンテンツのライフサイクル全体を管理するための手順。
toc_max_heading_level: 4
tags:
- コンテンツタイプビルダー
- コンテンツの削除
- ドラフト & 公開
- 下書きの公開
- コンテンツの非公開
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# コンテンツの保存、公開、および削除

Strapiでは、コンテンツのライフサイクル全体、つまり下書きの段階から公開準備、さらには不要になったコンテンツの削除まで管理することができます。

## コンテンツの保存と公開

:::caution
コンテンツの下書きを管理できるのは、ドラフト & 公開機能が有効な場合です。この機能はデフォルトで有効ですが、コンテンツタイプビルダーから任意のコンテンツタイプに対して無効化することができます（[コンテンツタイプの詳細設定](/user-docs/content-type-builder/managing-content-types#advanced-settings)を参照）。この機能を無効にすると、コンテンツを保存すると同時に公開もされます。
:::

コンテンツには3つのステータスがあります:

| ステータス名 | 説明 |
|------------|--------------|
| <span style={{color:"#5cb176"}}>公開済み</span> | コンテンツが公開されています。<br/>下書きの変更は保存されていません。 |
| <span style={{color:"#ac73e6"}}>変更済み</span> | コンテンツが以前公開されており、<br/>下書きのバージョンに変更を加えたが、まだ公開されていません。 |
| <span style={{color:"#7b79ff"}}>下書き</span> | コンテンツがまだ公開されていません。 |

コンテンツマネージャーの編集ビュー（エントリを編集する際に表示されるビュー）では、エントリの現在のステータスがインターフェース上部、エントリタイトルの下に表示されます。

<ThemedImage
  alt="下書きバージョンの編集"
  sources={{
    light: '/img/assets/content-manager/editing_draft_version3.png',
    dark: '/img/assets/content-manager/editing_draft_version3_DARK.png',
  }}
/>

### 下書きの作成

ドキュメントを編集している際、2つのタブが表示されます:

- _下書き_ タブ: コンテンツを編集できる場所です。
- _公開済み_ タブ: 全フィールドの編集が無効化されている読み取り専用タブで、公開バージョンのコンテンツを表示します。

デフォルトでは、新しく作成されたコンテンツはすべて下書きです。下書きは、公開準備が整うまで**保存**ボタンを使用して自由に修正および保存できます。保存ボタンはインターフェースの右側にある_エントリ_ボックスにあります。

下書きに変更を加えたら、次の3つのオプションがあります。すべて_エントリ_ボックスで選択できます:
- ドキュメントを**公開**する（[下書きの公開](#publishing-a-draft)を参照）、
- 後で取り出せるように**下書きを保存**する、
- もしくは変更を破棄するには、![More icon](/img/assets/icons/v5/More.svg) をクリックし、![Discard changes icon](/img/assets/icons/v5/CrossCircle.svg) **変更を破棄**を選択します。

### 公開と非公開

ドキュメントを編集している間に、下書きを公開するか、以前に公開したコンテンツを非公開にすることができます。

#### 下書きの公開

下書きを公開するには、インターフェース右側の_エントリ_ボックスにある**公開**ボタンをクリックします。

下書きが公開されると:

- _下書き_タブと_公開済み_タブのコンテンツは同一になります（ただし、_公開済み_タブは読み取り専用のままです）。
- ドキュメントのタイトル下のステータスが「公開済み」に切り替わります。

:::caution
下書きを公開する前に、公開されていない他のコンテンツとの関連がないことを確認してください。そうでないと、一部のコンテンツがAPI経由で利用できなくなる可能性があります。
:::

ドキュメントに下書きと公開バージョンの両方がある場合、公開バージョンは_公開済み_タブに表示されます。下書きバージョンしかない場合、_公開済み_タブをクリックすることはできません。

<ThemedImage
  alt="公開バージョンの編集"
  sources={{
    light: '/img/assets/content-manager/editing_published_version3.png',
    dark: '/img/assets/content-manager/editing_published_version3_DARK.png',
  }}
/>

:::tip
公開をスケジュールする、つまり特定の日付と時間に下書きを公開エントリに変換するには、そのエントリを[リリースに追加](/user-docs/content-manager/adding-content-to-releases)し、リリースの[公開をスケジュール](/user-docs/releases/creating-a-release)します。
:::

#### コンテンツの非公開

以前に公開されたコンテンツは非公開にすることができます。

コンテンツを非公開にするには、_下書き_タブから、インターフェース右側の_エントリ_ボックスにある![More icon](/img/assets/icons/v5/More.svg)をクリックし、**非公開**ボタンを選択します。

ドキュメントの下書きバージョンに公開バージョンと異なるコンテンツが含まれている場合、非公開にする際に次の選択が可能です:

1. _下書き_タブから、インターフェース右側の_エントリ_ボックスにある![More icon](/img/assets/icons/v5/More.svg)をクリックし、**非公開**ボタンを選択します。
2. 表示される確認ダイアログで、次のいずれかを選択します:
    - **非公開にして最後の下書きを保持**: 現在_下書き_タブにあるすべてのコンテンツが保存されますが、_公開済み_タブのコンテンツは完全に削除されます。
    - **非公開にして最後の下書きを置き換える**: _下書き_タブにある既存のコンテンツを破棄し、_公開済み_タブのすべてのフィールドのコンテンツに置き換えます。
3. **確認**をクリックすると、_下書き_タブと_公開済み_タブの両方に希望する変更が適用され、エントリの新しいステータスもエントリタイトルの下に反映されます。

<ThemedImage
  alt="ドキュメントの非公開"
  sources={{
    light: '/img/assets/content-manager/content-manager_unpublish.png',
    dark: '/img/assets/content-manager/content-manager_unpublish_DARK.png',
  }}
/>

### 一括公開および非公開

コンテンツマネージャーのリストビューで複数のエントリを選択すると、複数のエントリを同時に公開または非公開にする追加のボタンが表示されます。これを「一括公開/非公開」と呼びます。

:::caution
[国際化プラグイン](/user-docs/plugins/strapi-plugins.md#-internationalization-plugin)がインストールされている場合、一括公開/非公開のアクションは現在選択されているロケールにのみ適用されます。
:::

<ThemedImage
  alt="一括公開"
  sources={{
    light: '/img/assets/content-manager/bulk-publish.png',
    dark: '/img/assets/content-manager/bulk-publish_DARK.png',
  }}
/>

#### 下書きの一括公開

複数のエントリを同時に公開するには:

1. コンテンツマネージャーのリストビューから、公開するエントリを左側のチェックボックスにチェックを入れて選択します。
2. テーブルのヘッダー上にある**公開**ボタンをクリックします。
3. _エントリの公開_ダ

イアログで、選択したエントリとそのステータスを確認します:

   - ![Success icon](/img/assets/icons/v5/CheckCircle.svg) 公開準備完了: エントリを公開できます。
   - ![Fail icon](/img/assets/icons/v5/CrossCircle2.svg) 「[フィールド名]が必要です」、「[フィールド名]が短すぎます」、「[フィールド名]が長すぎます」: 赤い警告メッセージに表示された問題のため、エントリを公開できません。

4. （任意）一部のエントリに![Edit icon](/img/assets/icons/v5/CrossCircle2.svg)ステータスがある場合、![Edit icon](/img/assets/icons/v5/Pencil.svg)編集ボタンをクリックして問題を修正し、すべてのエントリが![Success icon](/img/assets/icons/v5/CheckCircle.svg)公開準備完了のステータスになるようにします。各エントリの問題を修正するたびに、**更新**ボタンをクリックして_エントリの公開_ダイアログを更新する必要があります。
5. **公開**ボタンをクリックします。
6. 確認ダイアログで、再度**公開**ボタンをクリックして選択を確認します。

#### コンテンツの一括非公開

複数のエントリを同時に非公開にするには:

1. コンテンツマネージャーのリストビューから、非公開にするエントリを左側のチェックボックスにチェックを入れて選択します。
2. テーブルのヘッダー上にある**非公開**ボタンをクリックします。
3. 確認ダイアログで再度**非公開**ボタンをクリックして選択を確認します。

## コンテンツの削除

コンテンツタイプのエントリを削除することで、コンテンツを削除できます（コレクションタイプのエントリまたはシングルタイプのデフォルトエントリ）。

1. 編集ビューで、インターフェース右上の![More icon](/img/assets/icons/v5/More.svg)をクリックし、**ドキュメントを削除**ボタンをクリックします。<br/>国際化がコンテンツタイプに対して有効になっている場合、**ロケールを削除**ボタンをクリックすると、現在選択されているロケールのみを削除することもできます。
2. 表示されるウィンドウで**確認**ボタンをクリックして削除を確定します。

:::tip
コレクションタイプのリストビューからエントリを削除するには、テーブルのエントリの記録の右側にある![More icon](/img/assets/icons/v5/More.svg)をクリックし、![Delete icon](/img/assets/icons/v5/Trash.svg) **ドキュメントを削除**ボタンを選択します。<br/>国際化がコンテンツタイプに対して有効になっている場合、**ドキュメントを削除**はすべてのロケールを削除し、**ロケールを削除**は現在リストされているロケールのみを削除します。
:::

<!-- TODO: Commented out since it's not currently testable and only planned for stable release -->
<!-- You also have the possibility to delete multiple entries at the same time. To do so, select your entries to delete by ticking the box on the left side of the entries' record. Then, click on the **Delete** button located above the header of the table. If [Internationalization (i18n)](/user-docs/plugins/strapi-plugins#-internationalization-plugin) is enabled for the content-type, the confirmation dialog box asks whether you want to delete only the current locales for the document, or the whole documents including all their locales. -->

<!-- :::caution
If the [Internationalization plugin](/user-docs/plugins/strapi-plugins.md#-internationalization-plugin) is installed, entries can only be deleted one locale at the time.
::: -->

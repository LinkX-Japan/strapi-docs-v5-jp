---
title: 個別アセットの管理
description: メディアライブラリにアップロードされたアセットを管理する方法（編集、移動、削除、画像のトリミングなど）
tags:
- 管理パネル
- コンテンツマネージャー
- コンテンツタイプビルダー
- 画像
- メディアライブラリ
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'
import ScreenshotNumberReference from '/src/components/ScreenshotNumberReference.jsx';

# 個別アセットの管理

メディアライブラリでは、アセットのファイル詳細や場所の変更、アセットのダウンロードやリンクのコピー、アセットの削除などを管理できます。画像ファイルはトリミングも可能です。アセットを管理するには、そのアセットの編集ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックします。

## アセットの編集

アセットの編集ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックすると、「詳細」ウィンドウが開き、利用可能なオプションが表示されます。

<ThemedImage
  alt="アセットの詳細ウィンドウ"
  sources={{
    light: '/img/assets/media-library/media-library_asset-details.png',
    dark: '/img/assets/media-library/media-library_asset-details_DARK.png',
  }}
/>

- 左側にはアセットのプレビューが表示され、その上にあるコントロールボタン <ScreenshotNumberReference number="1" /> で様々な操作が可能です:
  - 削除ボタン ![削除アイコン](/img/assets/icons/v5/Trash.svg) をクリックしてアセットを削除する。
  - ダウンロードボタン ![ダウンロードアイコン](/img/assets/icons/v5/Download.svg) をクリックしてアセットをダウンロードする。
  - リンクコピーアイコン ![リンクコピーアイコン](/img/assets/icons/v5/Link.svg) をクリックして、アセットのリンクをクリップボードにコピーする。
  - 画像をトリミングしたい場合は、トリミングボタン ![トリミングアイコン](/img/assets/icons/v5/Crop.svg) をクリックしてトリミングモードに入る（[画像のトリミング](#画像のトリミング)を参照）。
- 右側には、アセットのメタデータが表示され <ScreenshotNumberReference number="2" />、_ファイル名_、_代替テキスト_、_キャプション_、_場所_ を更新するためのフィールドが表示されます <ScreenshotNumberReference number="3" />（[フォルダでアセットを整理する](/user-docs/media-library/organizing-assets-with-folders.md)を参照）。
- 下部には、**メディアを置換** ボタン <ScreenshotNumberReference number="4" /> を使用してアセットファイルを置換できます。他の編集可能なフィールドの既存の内容は保持されます。**終了** ボタンでフィールドの更新を確定します。

## アセットの移動

アセットの詳細を編集するときに、個別のアセットをフォルダに移動できます。

アセットを移動するには:

1. 移動するアセットの編集ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックします。
2. 表示されるウィンドウで、_場所_ フィールドをクリックし、ドロップダウンリストから別のフォルダを選択します。
3. **保存** をクリックして確定します。

:::note
メインのメディアライブラリビューからもアセットを他のフォルダに移動できます（[フォルダでアセットを整理する](/user-docs/media-library/organizing-assets-with-folders.md#moving-assets-to-a-folder)を参照）。複数のアセットを同時に移動することも可能です。
:::

## 画像のトリミング

アセットの詳細を編集するときに、画像をトリミングできます。

画像をトリミングするには:

1. トリミングしたいアセットの編集ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックします。
2. 表示されるウィンドウで、トリミングボタン ![トリミングアイコン](/img/assets/icons/v5/Crop.svg) をクリックしてトリミングモードに入ります。
3. 四隅のハンドルを使用してフレームのサイズを変更し、フレーム全体をドラッグ＆ドロップで移動させることもできます。
4. トリミングを確認するには、トリミングボタン ![完了アイコン](/img/assets/icons/v5/Check.svg) をクリックし、**元のアセットをトリミング** するか、**複製してトリミング** するか（元のアセットを保持しながら新しい寸法のコピーを作成）を選択します。または、トリミングをキャンセルするには、トリミング停止ボタン ![キャンセルアイコン](/img/assets/icons/v5/Cross.svg) をクリックします。
5. **終了** をクリックしてファイルへの変更を保存します。

## アセットの削除

アセットの詳細を編集するときに、個別のアセットを削除できます。

アセットを削除するには:

1. 削除するアセットの編集ボタン ![編集アイコン](/img/assets/icons/v5/Pencil.svg) をクリックします。
2. 表示されるウィンドウで、アセットのプレビュー上部にある削除ボタン ![削除アイコン](/img/assets/icons/v5/Trash.svg) をクリックします。
3. **確認** をクリックします。

:::tip
メインのメディアライブラリビューからも、個別または複数のアセットを削除できます。アセットの左上にあるチェックボックスをクリックして選択し、フィルターや並べ替えオプションの下に表示される削除アイコン ![削除アイコン](/img/assets/icons/v5/Trash.svg) をクリックします。
:::

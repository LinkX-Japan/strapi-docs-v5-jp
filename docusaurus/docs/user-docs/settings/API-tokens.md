---
sidebar_position: 3
title: APIトークン
tags:
- APIトークン
- REST API
- GraphQL API
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# APIトークンの管理

:::prerequisites
* 管理者は、適切な権限が付与されている場合のみ、APIトークンの作成、読み取り、更新、または削除が可能です（[管理者ロールの設定](/user-docs/users-roles-permissions/configuring-administrator-roles#plugins-and-settings)を参照）。
* 管理パネルの *グローバル設定 > APIトークン* サブセクションは、_APIトークン > 読み取り_ 権限が付与されている場合にのみアクセス可能です。
:::

APIトークンは、RESTおよびGraphQL APIクエリの認証を行うために使用されます（[開発者ドキュメント](/dev-docs/configurations/api-tokens)を参照）。管理者は、![設定アイコン](/img/assets/icons/v5/Cog.svg) *設定 > グローバル設定 > APIトークン* からAPIトークンを管理できます。

<ThemedImage
  alt="APIトークン"
  sources={{
    light: '/img/assets/settings/settings_api-token.png',
    dark: '/img/assets/settings/settings_api-token_DARK.png',
  }}
/>

*APIトークン* 設定サブセクションでは、作成されたすべてのAPIトークンがリスト表示されます。

このテーブルには、各APIトークンの名前、説明、作成日、および最終使用日が表示されます。また、管理者は以下の操作が可能です：

- ![編集ボタン](/img/assets/icons/v5/Pencil.svg) をクリックして、APIトークンの名前、説明、タイプ、期間を編集したり、[トークンを再生成](#regenerating-an-api-token)する。
- ![削除ボタン](/img/assets/icons/v5/Trash.svg) をクリックしてAPIトークンを削除する。

## 新しいAPIトークンの作成

新しいAPIトークンを作成するには：

1. **新しいAPIトークンを作成** ボタンをクリックします。
2. APIトークンの編集画面で、新しいAPIトークンを設定します：

    | 設定名           | 手順                                                                       |
    | ---------------- | ------------------------------------------------------------------------ |
    | 名前             | APIトークンの名前を入力します。                                           |
    | 説明             | （任意）APIトークンの説明を入力します。                                   |
    | トークンの期間   | *7日間*、*30日間*、*90日間*、または *無制限* の期間を選択します。          |
    | トークンのタイプ | *読み取り専用*、*フルアクセス*、または *カスタム* のタイプを選択します。    |

3. （任意）*カスタム* トークンタイプの場合、コンテンツタイプ名をクリックしてチェックボックスを使用し、APIエンドポイントの特定の権限を定義します。
4. **保存** ボタンをクリックします。新しいAPIトークンがインターフェースの上部に表示され、コピー用ボタン ![コピーアイコン](/img/assets/icons/v5/Duplicate.svg) が表示されます。

<ThemedImage
  alt="カスタムAPIトークン"
  sources={{
    light: '/img/assets/settings/settings_api-token-custom.png',
    dark: '/img/assets/settings/settings_api-token-custom_DARK.png',
  }}
/>

:::caution
セキュリティ上の理由から、APIトークンは作成直後にのみ表示されます。ページをリフレッシュしたり、管理パネル内の別の場所に移動すると、新しく作成されたAPIトークンは非表示となり、再表示されません。
:::

## APIトークンの再生成

APIトークンを再生成するには：

1. APIトークンの編集ボタンをクリックします。
2. **再生成** ボタンをクリックします。
3. ダイアログで **再生成** ボタンをクリックして確認します。
4. インターフェースの上部に表示された新しいAPIトークンをコピーします。

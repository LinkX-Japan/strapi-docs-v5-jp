---
title: 監査ログの確認
description: Strapiで監査ログを確認する方法
sidebar_position: 2
tags:
- 監査ログ
- 管理パネル
- エンタープライズ機能
- ペイロード
- Strapi Cloud
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# 監査ログ <EnterpriseBadge withLinkIcon link="https://strapi.io/pricing-self-hosted" /> <CloudTeamBadge/>

**監査ログ** セクションでは、Strapiアプリケーションのユーザーによって行われたすべてのアクティビティを検索およびフィルタできる表示を提供します。

監査ログは、デフォルトで**Super Admin**ロールを持つユーザーのみがアクセス可能です。監査ログは、**設定**パネル内の**管理パネル**セクションにあります。

<ThemedImage
  alt="監査ログパネル"
  sources={{
    light: '/img/assets/settings/settings_audit-logs.png',
    dark: '/img/assets/settings/settings_audit-logs_DARK.png',
  }}
/>

## ログされるイベント

次のイベントが記録されます：

| イベント | アクション |
| --- | --- |
| コンテンツタイプ | `作成`、`更新`、`削除` |
| エントリー（下書き/公開） | `作成`、`更新`、`削除`、`公開`、`非公開` |
| メディア | `作成`、`更新`、`削除` |
| ログイン/ログアウト | `成功`、`失敗` |
| ロール/権限 | `作成`、`更新`、`削除` |
| ユーザー | `作成`、`更新`、`削除` |

各ログアイテムには次の情報が表示されます：

* **アクション**: ユーザーによって実行されたアクションのタイプ。例えば `作成` または `更新`。
* **日時**: アクションが行われた日時。
* **ユーザー**: アクションを実行したユーザー。
* **詳細**: アクションに関する詳細を表示するモーダル。例えばユーザーのIPアドレス、リクエストボディ、レスポンスボディなど。

## ログのフィルタリング

**監査ログ** ページでは、すべてのログがデフォルトで逆時系列に表示されます。次の条件でログをフィルタリングできます：

* **アクション**: アクションタイプでフィルタリングします。例えば `作成` または `更新`。
* **ユーザー**: ユーザーでフィルタリングします。
* **日時**: 日付（範囲）や時間でフィルタリングします。

<ThemedImage
  alt="監査ログのフィルタ"
  sources={{
    light: '/img/assets/settings/settings_audit-logs-filters.png',
    dark: '/img/assets/settings/settings_audit-logs-filters_DARK.png',
  }}
/>

## ログの詳細

任意のログアイテムについて、![表示アイコン](/img/assets/icons/v5/Eye.svg) アイコンをクリックすると、そのアクションの詳細を表示するモーダルが開きます。

<ThemedImage
  alt="ログ詳細モーダル"
  sources={{
    light: '/img/assets/settings/settings_log-details.png',
    dark: '/img/assets/settings/settings_log-details_DARK.png',
  }}
/>

**ペイロード**の詳細はインタラクティブなJSON形式で表示され、JSONオブジェクトを展開または折りたたむことができます。

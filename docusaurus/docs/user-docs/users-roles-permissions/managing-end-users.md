---
title: エンドユーザーアカウントの管理
description: Users & Permissionsプラグインを使用して、Strapiアプリケーションで作成および管理されたコンテンツをフロントエンドアプリケーションで利用するエンドユーザーを管理できます。
displayed_sidebar: userDocsSidebar
sidebar_position: 5
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# エンドユーザーアカウントの管理

エンドユーザーとは、Strapiアプリケーションで作成および管理されたコンテンツを利用し、フロントエンドアプリケーション（例: ウェブサイト、モバイルアプリ、接続デバイスなど）で表示されるユーザーを指します。管理者とは異なり、エンドユーザーは管理パネルにアクセスできません。

[Users & Permissionsプラグイン](../plugins/strapi-plugins.md#users-permissions-plugin)が有効化されていると、エンドユーザーを管理することができます。このプラグインの設定は、管理パネル内の1つの場所で完全に管理されるわけではなく、エンドユーザーロールと権限は![設定アイコン](/img/assets/icons/v5/Cog.svg) _設定_ インターフェースで管理され（[エンドユーザーロールの設定](../users-roles-permissions/configuring-end-users-roles.md)を参照）、エンドユーザーアカウントは![コンテンツアイコン](/img/assets/icons/v5/Feather.svg) _コンテンツマネージャー_ で管理されます。

Users & Permissionsプラグインを使用すると、エンドユーザーおよびそのアカウント情報はコンテンツタイプとして管理されます。このプラグインがStrapiアプリケーションにインストールされると、3つのコレクションタイプが自動的に作成されます（[Users & Permissionsプラグイン](../plugins/strapi-plugins.md#users-permissions-plugin)を参照）。その中で、「ユーザー」はコンテンツマネージャーで直接利用できる唯一のコレクションタイプです。

<ThemedImage
  alt="コンテンツマネージャーを介してエンドユーザーを管理"
  sources={{
    light: '/img/assets/users-permissions/end-user_content-manager.png',
    dark: '/img/assets/users-permissions/end-user_content-manager_DARK.png',
  }}
/>

Users & Permissionsプラグインを使用して、フロントエンドアプリケーションで新しいエンドユーザーを登録するには、ユーザーコレクションタイプに新しいエントリを追加することが必要です（コンテンツマネージャーに関する詳細は[コンテンツマネージャーの概要](/user-docs/content-manager)を参照してください）。

:::note
エンドユーザーがフロントエンドアプリケーションで自分自身を登録できる場合（[Users & Permissionsプラグインの設定を管理](../settings/configuring-users-permissions-plugin-settings.md)を参照）、新しいエントリが自動的に作成され、そのエントリのフィールドにはエンドユーザーが入力した情報が自動的に反映されます。ただし、すべてのフィールドはStrapiアプリケーションの管理者が編集できます。
:::

## 新しいエンドユーザーアカウントの作成

1. コンテンツマネージャー内のユーザーコレクションタイプに移動します。
2. 右上にある **新しいエントリを作成** ボタンをクリックします。
3. エントリのデフォルトフィールドを入力します。Strapiアプリケーションに特別に追加されたフィールドも表示される場合があります。

| フィールド    | 手順                                                                 |
| ------------ | ------------------------------------------------------------------ |
| ユーザー名    | エンドユーザーのユーザー名を入力します。                                    |
| メールアドレス | エンドユーザーの完全なメールアドレスをテキストボックスに入力します。                    |
| パスワード    | （任意）新しいパスワードをテキストボックスに入力します。パスワードを表示するには、![目のアイコン](/img/assets/icons/v5/Eye.svg) アイコンをクリックできます。 |
| 確認済み     | （任意）エンドユーザーアカウントを確認するには **ON** をクリックします。                  |
| ブロック      | （任意）エンドユーザーのアカウントをブロックして、コンテンツへのアクセスを防ぐには **ON** をクリックします。 |
| ロール       | （任意）新しいエンドユーザーに付与するロールを指定します。このフィールドに入力されていない場合は、エンドユーザーにはデフォルトのロールが付与されます（[Users & Permissionsプラグインの設定を管理](../settings/configuring-users-permissions-plugin-settings.md)を参照）。 |

4. **保存** ボタンをクリックします。

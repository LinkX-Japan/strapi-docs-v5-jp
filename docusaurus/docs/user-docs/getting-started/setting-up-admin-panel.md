---
title: 管理パネルの設定
displayed_sidebar: userDocsSidebar
description: Strapi管理パネルの設定方法について
tags:
- 管理パネル
- 管理者
- パスワード
---

# 管理パネルの設定

個々の機能について説明する前に、管理パネルを正しく設定・構成するための手順をおすすめします。設定が完了すると、指定されたURLから管理パネルにアクセスできるようになります。

## 管理パネルへのアクセス

管理パネルは、Strapiアプリケーションのバックオフィスです。管理パネルから、コンテンツタイプを管理し、その実際のコンテンツを作成することができます。また、管理パネルでは、管理者やアプリケーションのエンドユーザーの管理も行います。

:::caution
管理パネルにアクセスするには、Strapiアプリケーションが起動しており、管理パネルへのURL（例: `api.example.com/admin`）を知っている必要があります。
:::

<ThemedImage
alt="ログインページ"
sources={{
    light: '/img/assets/getting-started/login-page-sso.png',
    dark: '/img/assets/getting-started/login-page_DARK.png',
  }}
/>

管理パネルにアクセスするには:

1. Strapiアプリケーションの管理パネルのURLに移動します。
2. ログイン情報を入力します。
3. **ログイン** ボタンをクリックします。管理パネルのホームページにリダイレクトされます。

### SSOによる認証 <EnterpriseBadge />

StrapiアプリケーションがSSO（シングルサインオン）認証を許可するように構成されている場合は、通常の管理者アカウントではなく、特定のプロバイダーを使用して管理パネルにアクセスできます（[シングルサインオンの設定](/user-docs/settings/single-sign-on)を参照）。

ログインページで、利用可能なプロバイダーをクリックするだけで、該当するプロバイダーのログインページにリダイレクトされ、認証を行うことができます。プロバイダーが表示されない場合は、![More icon](/img/assets/icons/v5/More.svg) ボタンをクリックして、すべての利用可能なプロバイダーのリストを確認できます。

## 管理者プロフィールの設定

新しい管理者の場合は、Strapiアプリケーションの使用を始める前に、プロフィールを設定しておくことをお勧めします。管理者プロフィールからは、名前、ユーザー名、メールアドレス、パスワードなどの情報を変更できます。また、Strapiアプリケーションのインターフェース言語も選択可能です。

<ThemedImage
alt="管理パネルのホームページ"
sources={{
    light: '/img/assets/getting-started/user-information-profile.png',
    dark: '/img/assets/getting-started/user-information-profile_DARK.png',
  }}
/>

ユーザー情報を変更するには:

1. Strapiアプリケーションのメインナビゲーションの左下にあるアカウント名またはイニシャルをクリックします。
2. ドロップダウンメニューで**プロフィール**をクリックします。
3. 必要な情報を変更します:

| プロフィール & 経験 | 説明                                                                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 名                 | テキストボックスに名前を入力します。                                                                                                                                                                            |
| 姓                 | テキストボックスに苗字を入力します。                                                                                                                                                                            |
| メール             | 完全なメールアドレスをテキストボックスに入力します。                                                                                                                                                           |
| ユーザー名         | （オプション）ユーザー名をテキストボックスに入力します。                                                                                                                                                        |
| インターフェース言語 | ドロップダウンリストから、Strapiアプリケーションのインターフェース言語を選択します。                                                                                                                           |
| インターフェースモード | ドロップダウンリストから、Strapiアプリケーションのインターフェースモード（「ライトモード」または「ダークモード」）を選択します。デフォルトでは、選択されたモードはブラウザのモードに基づいています。 |

4. **保存** ボタンをクリックします。

### パスワードの変更

アカウントのパスワードを変更するには:

1. 管理者プロフィールに移動します。
2. パスワード関連のオプションを入力します:

| パスワード変更     | 説明                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 現在のパスワード   | 現在のパスワードをテキストボックスに入力します。 <br/> 💡 パスワードを表示するには、![目のアイコン](/img/assets/icons/v5/Eye.svg) アイコンをクリックできます。 |
| 新しいパスワード   | 新しいパスワードをテキストボックスに入力します。 <br/> 💡 パスワードを表示するには、![目のアイコン](/img/assets/icons/v5/Eye.svg) アイコンをクリックできます。 |
| パスワード確認     | 新しいパスワードをもう一度入力します。 <br/> 💡 パスワードを表示するには、![目のアイコン](/img/assets/icons/v5/Eye.svg) アイコンをクリックできます。         |

3. **保存** ボタンをクリックします。

---

おめでとうございます！これで新しいStrapiユーザーとしての準備が整いました。Strapiが提供するすべての機能とオプションをぜひ探索してみてください！

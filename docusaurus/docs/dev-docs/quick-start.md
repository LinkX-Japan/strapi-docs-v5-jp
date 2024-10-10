---
sidebar_label: 'クイックスタートガイド'
displayed_sidebar: devDocsSidebar
sidebar_position: 2
title: クイックスタートガイド - Strapi開発者ドキュメント
description: あなたのお気に入りのオープンソースヘッドレスCMS、Strapiを3分以内にセットアップしてみましょう。
tags:
 - ガイド
 - Content-type Builder
 - コレクションタイプ
 - Content Manager
 - Strapi Cloud
---

import InstallPrerequisites from '/docs/snippets/installation-prerequisites.md'
const detailsStyle = {backgroundColor: 'transparent', border: 'solid 1px #4945ff' }
const summaryStyle = {fontSize: '18px'}

# クイックスタートガイド

Strapiは非常に柔軟性が高いです。最終結果を素早く確認したい方でも、製品に深く潜り込みたい方でも、どちらでも対応可能です。このチュートリアルでは、DIYアプローチを採用し、プロジェクトとデータ構造をゼロから構築し、そのプロジェクトをStrapi Cloudにデプロイして、そこからデータを追加します。

*推定完了時間：5〜10分*

:::prerequisites
<InstallPrerequisites components={props.components} />

また、プロジェクトをStrapi Cloudにデプロイするためには、[`git`をインストール](https://github.com/git-guides/install-git)し、[GitHub](https://github.com)のアカウントが必要です。
:::

## 🚀 パートA：Strapiで新しいプロジェクトを作成する

まず、ターミナルでコマンドを実行してマシン上に新しいStrapiプロジェクトを作成し、最初のローカル管理者ユーザーを登録します。

以下の手順に従って、詳しい説明を読むために切り替え可能なコンテンツをクリックしてください。

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ1：インストールスクリプトを実行し、Strapi Cloudアカウントを作成する</summary>

### ステップ1：インストールスクリプトを実行し、Strapi Cloudアカウントを作成する

1. ターミナルで以下のコマンドを実行します：

    <TabItem value="npm" label="NPM">

    ```bash
    npx create-strapi@latest my-strapi-project
    ```

    </TabItem>

2. ターミナルがStrapi Cloudアカウントを作成し、無料の14日間の試用期間を開始するように促します。ターミナルで`Login/Sign up`が選択されていることを確認するか、矢印キーを使用して選択し、Enterを押します。

3. 新しく開かれたブラウザタブで、確認コードがターミナルと同じであることを確認し、**Confirm**をクリックします。

4. そのままブラウザタブで、**Continue with GitHub**をクリックします。現在のブラウザセッションでGitHubにすでにログインしていない場合、GitHubのログインページにリダイレクトされる可能性があります。

5. ログインしたら、ブラウザに「おめでとうございます、すべての設定が完了しました！」と表示されます。その後、ブラウザタブを安全に閉じてターミナルに戻ることができます。

    <ThemedImage
      alt="ログインGIF"
      sources={{
        light: '/img/assets/quick-start-guide/qsg-cloud-login.gif',
        dark: '/img/assets/quick-start-guide/qsg-cloud-login.gif',
      }}
    />

6. ターミナルでは、いくつかの質問が表示されます。すべての質問に対してデフォルトの答えを受け入れるには、`Enter`を押します。

    ![ターミナルからの質問と回答](/img/assets/quick-start-guide/qsg-questions-answers-terminal.png)

ターミナルで見るとおり、あなたのプロジェクトは現在ローカルでビルド中です。

:::info
* プロジェクトのフォルダには、ローカルのStrapiプロジェクトをStrapi Cloudプロジェクトにリンクするための `.strapi-cloud.json` ファイルが含まれます。
* インストールオプションは他にも多数あります。詳細は[インストールドキュメンテーション](/dev-docs/installation)をご参照ください。
:::

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ2: 最初のローカル管理者ユーザーの登録</summary>

### ステップ2: 最初のローカル管理者ユーザーの登録

インストールが完了したら、サーバーを起動する必要があります。ターミナルで `cd my-strapi-project && yarn develop` と入力すると、ブラウザが自動的に新しいタブを開きます。

:::tip
`my-strapi-project` フォルダ内にいる限り、Strapiサーバーを再起動するたびに `yarn develop` を実行するだけで済みます。
:::

フォームを完成させることで、自分自身のアカウントを作成します。それが完了すると、あなたはこのStrapiアプリケーションの最初の管理者ユーザーとなります。ようこそ、指揮官！

これで [管理パネル](http://localhost:1337/admin) にアクセスできるようになりました：

<ThemedImage
alt="管理パネルのスクリーンショット: ダッシュボード"
sources={{
    light: '/img/assets/quick-start-guide/qsg-handson-part1-01-admin_panel-v5.png',
    dark: '/img/assets/quick-start-guide/qsg-handson-part1-01-admin_panel-v5_DARK.png',
}}
/> 

</details>

:::callout 🥳 おめでとうございます！
新しいStrapiプロジェクトを作成しました！あなたはStrapiを使って遊び始めることができ、私たちの[ユーザーガイド](/user-docs/intro)を使って製品を自分で発見するか、以下のパートBに進むことができます。
:::

## 🛠 パートB: Content-type Builderでデータ構造を構築する

インストールスクリプトは空のプロジェクトを作成しました。ここでは、私たちの[FoodAdvisor](https://github.com/strapi/foodadvisor)の例に触発されたレストランディレクトリを作成する手順をご案内します。

ローカルのStrapiプロジェクトの管理パネルは [http://localhost:1337/admin](http://localhost:1337/admin) で動作します。ここでほとんどの時間を過ごし、コンテンツの作成と更新を行います。

まず、コンテンツのデータ構造を構築します。これは開発モードでのみ行うことができ、これはローカルで作成されたプロジェクトのデフォルトモードです。

:::tip ヒント
サーバーがまだ起動していない場合は、ターミナルで `my-strapi-project` フォルダに `cd` して `npm run develop` （または `yarn develop`）を実行して起動します。
:::

Content-Type Builderはデータ構造の作成を支援します。Strapiで空のプロジェクトを作成した場合、ここから始めることになります！

<details style={detailsStyle}>

<summary style={summaryStyle}>ステップ1: "Restaurant" コレクションタイプの作成</summary>

### ステップ1: "Restaurant" コレクションタイプの作成

あなたのレストランディレクトリには最終的に多くのレストランが含まれることになるので、"Restaurant" コレクションタイプを作成する必要があります。その後、新しいレストランエントリを追加する際に表示するフィールドを記述できます：

1. **最初のコンテンツタイプを作成**ボタンをクリックします。<br />表示されない場合は、メインナビゲーションの![Content-type Builder icon](//img/assets/icons/v5/Layout.svg) [Content-Type Builder](http://localhost:1337/admin/plugins/content-type-builder)に移動してください。
2. **新しいコレクションタイプを作成**をクリックします。
3. _表示名_に`Restaurant`と入力し、**続ける**をクリックします。  
4. テキストフィールドをクリックします。
5. _名前_フィールドに`Name`と入力します。
6. _詳細設定_タブに切り替え、**必須フィールド**と**ユニークフィールド**の設定をチェックします。
7. **別のフィールドを追加**をクリックします。
8. リストからリッチテキスト（ブロック）フィールドを選択します。
9. _名前_フィールドに`Description`と入力し、**完了**をクリックします。
10. 最後に、**保存**をクリックし、Strapiが再起動するのを待ちます。

<ThemedImage
alt="GIF: Create Restaurant collection type in Content-type Builder"
sources={{
    light: '/img/assets/quick-start-guide/qsg-handson-restaurant-v5.gif',
    dark: '/img/assets/quick-start-guide/qsg-handson-restaurant-v5_DARK.gif',
}}
/>

Strapiが再起動したら、"Restaurant"がナビゲーションの![Content Manager icon](/img/assets/icons/v5/Feather.svg) _Content Manager > Collection types_にリストされます。素晴らしい、あなたは初めてのコンテンツタイプを作成しました！それはとてもクールだった - さあ、すぐにもう一つ作ってみましょう。

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ2：「Category」コレクションタイプの作成</summary>

### ステップ2：「Category」コレクションタイプの作成

レストランのディレクトリにカテゴリがあると、少し整理されるでしょう。それでは、「Category」コレクションタイプを作成してみましょう：

1. メインナビゲーションの![Content-type Builder icon](/img/assets/icons/v5/Layout.svg) [Content-type Builder](http://localhost:1337/admin/plugins/content-type-builder)に移動します。
2. **新しいコレクションタイプを作成**をクリックします。
3. _表示名_に`Category`と入力し、**続ける**をクリックします。
4. テキストフィールドをクリックします。
5. _名前_フィールドに`Name`と入力します。
6. _詳細設定_タブに切り替え、**必須フィールド**と**ユニークフィールド**の設定をチェックします。
7. **別のフィールドを追加**をクリックします。
8. 関連フィールドを選択します。
9. 中央で、"多対多"を表すアイコンを選択します![icon many-to-many](/img/assets/icons/v5/ctb_relation_manytomany.svg)。テキストは`Categories has and belongs to many Restaurants`と表示されるはずです。

<ThemedImage
alt="Admin Panel screenshot: relations"
sources={{
  light: '/img/assets/quick-start-guide/qsg-handson-part2-02-collection_ct-v5.png',
  dark: '/img/assets/quick-start-guide/qsg-handson-part2-02-collection_ct-v5_DARK.png',
}}
/>

11. 最後に、**完了**をクリックし、**保存**ボタンをクリックし、Strapiが再起動するのを待ちます。

</details>

:::callout 🥳 おめでとうございます！
あなたはStrapiプロジェクトのための基本的なデータ構造を作成しました！ [Content-Type Builder](/user-docs/content-type-builder)で遊び続けるか、以下のCとDの部分に進んでStrapi Cloudを発見し、実際のコンテンツをプロジェクトに追加することができます。
:::

## ☁️ パートC: Strapi Cloudへのデプロイ

あなたの美しい最初のStrapiプロジェクトがローカルで動作しているのであれば、世界に公開する時が来ました！プロジェクトをホストする最も簡単な方法はStrapi Cloudを使用することです：プロジェクトをStrapi Cloudにデプロイするのは一つのコマンドで完了します！🚀

Strapi Cloudにプロジェクトをデプロイするには、ターミナルで以下の手順を実行します：

1. ローカルのStrapiプロジェクトのサーバーが稼働している場合（これまでのチュートリアルに従っていればそうなるはずです）、`Ctrl-C`を押してサーバーを停止します。
2. Strapiプロジェクトのフォルダ内にいることを確認します（必要であれば、例えば`cd my-strapi-project`を実行してこのフォルダに移動します）、そして次のコマンドを実行します：

    <Tabs groupId="yarn-npm">

    <TabItem value="yarn" label="Yarn">

      ```sh
      yarn strapi deploy
      ```

    </TabItem>

    <TabItem value="npm" label="NPM">

      ```sh
      npm run strapi deploy
      ```

    </TabItem>

    </Tabs>

3. ターミナルで質問に答え、プロジェクトに名前を付け（デフォルトの名前を保持するためにEnterを押すこともできます）、推奨されるNodeJSバージョンを選択し、現在の場所に最も近い地域を選択します：

    ![Strapi Cloud terminal questions and answers](/img/assets/quick-start-guide/qsg-strapi-cloud-terminal-questions.png)

数瞬で、あなたのローカルプロジェクトはStrapi Cloudにホストされます。🚀 

完了したら、ターミナルは`https://cloud.strapi.io/projects`で始まるクリック可能なリンクを提供します。リンクをクリックするか、ブラウザのアドレスバーにコピー＆ペーストしてページを訪れます。

私たちが作成したばかりのStrapi Cloudプロジェクト、`my-strapi-project`がStrapi Cloudダッシュボードに表示されます。デプロイしたStrapiプロジェクトにアクセスするには、右上の**Visit app**ボタンをクリックします。

<ThemedImage
alt="Visit Strapi Cloud App GIF"
sources={{
  light: '/img/assets/quick-start-guide/qsg-visit-cloud-app.gif',
  dark: '/img/assets/quick-start-guide/qsg-visit-cloud-app_DARK.gif',
}}
/>

:::callout 🥳 おめでとうございます！  
あなたのプロジェクトはStrapi Cloudにホストされ、オンラインでアクセス可能になりました。14日間の無料Strapi Cloudトライアルをお楽しみください！Strapi Cloudについては、[専用のドキュメンテーション](/cloud/intro)を読むか、パートDに進んでオンラインのStrapiプロジェクトにログインし、そこから初めてのデータを追加することを学ぶことができます。
:::

:::tip
Content-Type Builderでさらに遊んで、コンテンツタイプにさらにフィールドを追加したり、新しいコンテンツタイプを作成したりすることができます。そのような変更をいつでも行うと、適切な`deploy`コマンドを実行して再度Strapi Cloudにデプロイし、ホストされたプロジェクトが数分以内に更新されるのを見ることができます。魔法のようでしょ？🪄
:::

## 📝 パートD: Content Managerを使用してStrapi Cloudプロジェクトにコンテンツを追加する

基本的なデータ構造を2つのコレクションタイプ、「Restaurant」と「Category」で作成し、プロジェクトをStrapi Cloudにデプロイしたので、今度はCloudを実際に使用して新しいエントリを作成し、コンテンツを追加してみましょう。

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ1：新しいStrapi Cloudプロジェクトの管理パネルにログインする</summary>

### ステップ1：新しいStrapi Cloudプロジェクトの管理パネルにログインする

Strapi Cloudプロジェクトが作成されたので、プロジェクトにログインしてみましょう：

1. [Strapi Cloudダッシュボード](https://cloud.strapi.io/projects)から、`my-strapi-project`プロジェクトをクリックします。
3. **Visit app**ボタンをクリックします。
4. 新しく開かれたページで、このStrapi Cloudプロジェクトの最初の管理者ユーザーを作成するためのフォームを完成させます。

最初のStrapi Cloudプロジェクトにログインしたら、そこからデータを追加します。

<ThemedImage
alt=""
sources={{
  light: '/img/assets/quick-start-guide/qsg-first-login-cloud.gif',
  dark: '/img/assets/quick-start-guide/qsg-first-login-cloud_DARK.gif'
}}
/>

<details>
<summary>ℹ️ ユーザーやStrapi Cloudプロジェクトに関する追加情報とヒント：</summary>

:::note 注意: ローカルユーザーとStrapi Cloudユーザーは異なります
Strapi Cloudプロジェクトとローカルプロジェクトのデータベースは異なります。これは、データが自動的にローカルプロジェクトからStrapi Cloudに転送されないことを意味します。これには、以前にローカルで作成したユーザーも含まれます。そのため、Strapi Cloudプロジェクトに初めてログインする際に新しい管理者アカウントの作成を求められます。
:::

:::tip ヒント: Strapi Cloudプロジェクトの管理パネルに直接アクセスする
Strapi Cloudでホストされている任意のプロジェクトは、その独自のURLからアクセス可能です。例えば、`https://my-strapi-project-name.strapiapp.com`のような形式です。オンラインプロジェクトの管理パネルにアクセスするには、URLに`/admin`を追加するだけです。例えば、`https://my-strapi-project-name.strapiapp.com/admin`のようにします。URLはStrapi Cloudダッシュボードで見つけることができ、プロジェクトの名前をクリックしてから**Visit app**ボタンをクリックすることで、直接Strapi Cloudプロジェクトにアクセスすることもできます。
:::

</details>

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ2：「Restaurant」コレクションタイプにエントリを作成する</summary>


### ステップ2：「Restaurant」コレクションタイプにエントリを作成する

1. ナビゲーションで ![Content Manager icon](/img/assets/icons/v5/Feather.svg) _Content Manager > Collection types - Restaurant_ に移動します。
2. **Create new entry**をクリックします。
3. _Name_フィールドに、お気に入りの地元のレストランの名前を入力します。例えば、`Biscotte Restaurant`とします。
4. _Description_フィールドに、そのレストランについての短い説明を書きます。もし、何を書くべきか思いつかない場合は、`Welcome to Biscotte restaurant! Restaurant Biscotte offers a cuisine based on fresh, quality products, often local, organic when possible, and always produced by passionate producers.`という文を使用しても構いません。
5. **Save**をクリックします。

<ThemedImage
alt="スクリーンショット: コンテンツマネージャーのビスコットレストラン"
sources={{
  light: '/img/assets/quick-start-guide/qsg-handson-part2-03-restaurant-v5.png',
  dark: '/img/assets/quick-start-guide/qsg-handson-part2-03-restaurant-v5_DARK.png',
}}
/>

レストランは今、![Content Manager icon](/img/assets/icons/v5/Feather.svg) _コンテンツマネージャー_ の _コレクションタイプ - レストラン_ビューにリストされています。

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ3: カテゴリーを追加する</summary>

#### ステップ3: カテゴリーを追加する

![Content Manager icon](/img/assets/icons/v5/Feather.svg) _コンテンツマネージャー > コレクションタイプ - カテゴリー_に移動し、2つのカテゴリーを作成しましょう：

1. **新しいエントリーを作成**をクリックします。
2. _名前_フィールドに`フレンチフード`と入力します。
3. **保存**をクリックします。
4. _コレクションタイプ - カテゴリー_に戻り、再度**新しいエントリーを作成**をクリックします。  
5. _名前_フィールドに`ブランチ`と入力し、**保存**をクリックします。

<ThemedImage
alt="GIF: カテゴリーを追加する"
sources={{
  light: '/img/assets/quick-start-guide/qsg-handson-categories-v5.gif',
  dark: '/img/assets/quick-start-guide/qsg-handson-categories-v5_DARK.gif',
}}/>

"フレンチフード"と"ブランチ"のカテゴリーは、今や![Content Manager icon](/img/assets/icons/v5/Feather.svg) _コンテンツマネージャー_の_コレクションタイプ - カテゴリー_ビューにリストされています。

次に、レストランにカテゴリーを追加します：

1. ![Content Manager icon](/img/assets/icons/v5/Feather.svg) _コンテンツマネージャー > コレクションタイプ - レストラン_に移動し、"Biscotte Restaurant"をクリックします。
2. ページの下部にある**カテゴリー**のドロップダウンリストから"フレンチフード"を選択します。ページの上部にスクロールし戻り、**保存**をクリックします。

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ4: 役割と権限を設定する</summary>

### ステップ4: 役割と権限を設定する

私たちはただ今、レストランと2つのカテゴリーを追加しました。これでコンテンツを消費するための十分な内容が揃いました（ジョークです）。しかしまず、APIを通じてコンテンツが公開アクセス可能であることを確認する必要があります：

1. メインナビゲーションの下部にある _![Settings icon](/img/assets/icons/v5/Cog.svg) 設定_ をクリックします。
2. _ユーザー & 権限プラグイン_ の下で _役割_ を選択します。
3. **パブリック**の役割をクリックします。
4. _権限_の下にスクロールします。
5. _権限_タブで _レストラン_を見つけてクリックします。
6. **find**と**findOne**の隣にあるチェックボックスをクリックします。
7. _カテゴリー_についても同様に、**find**と**findOne**の隣にあるチェックボックスをクリックします。
8. 最後に、**保存**をクリックします。

<ThemedImage
alt="スクリーンショット: ユーザー & 権限プラグインのパブリック役割"
sources={{
  light: '/img/assets/quick-start-guide/qsg-handson-part2-04-roles-v5.png',
  dark: '/img/assets/quick-start-guide/qsg-handson-part2-04-roles-v5_DARK.png'
}}/>

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ5: コンテンツを公開する</summary>

### ステップ5: コンテンツを公開する

デフォルトでは、作成したコンテンツはすべて下書きとして保存されます。カテゴリーとレストランを公開しましょう。

まず、![Content Manager icon](/img/assets/icons/v5/Feather.svg) _Content Manager > Collection types - Category_ に移動します。そこから：

1. "Brunch"エントリをクリックします。
2. 次の画面で、**Publish**をクリックします。
3. _Confirmation_ウィンドウで、**Yes, publish**をクリックします。

次に、カテゴリーリストに戻り、"French Food"カテゴリーに対しても同様の操作を行います。

最後に、あなたのお気に入りのレストランを公開するために、![Content Manager icon](/img/assets/icons/v5/Feather.svg) _Content Manager > Collection types - Restaurant_ に移動し、"Biscotte Restaurant"エントリをクリックして、それを**Publish**します。

<ThemedImage
alt="GIF: Publish content"
sources={{
  light: '/img/assets/quick-start-guide/qsg-handson-publish-v5.gif',
  dark: '/img/assets/quick-start-guide/qsg-handson-publish-v5_DARK.gif'
}}
/>

</details>

<details style={detailsStyle}>
<summary style={summaryStyle}>ステップ6: APIの使用</summary>

### ステップ6: APIの使用

さて、グルメの皆さん、私たちはちょうどコンテンツの作成とAPIを通じたアクセス可能性の確保を終えました。自分自身を褒めてあげましょう - しかし、あなたの一生懸命の努力の最終結果をまだ見ていません。

ここにあります：レストランのリストは、あなたのStrapi CloudプロジェクトURLの`/api/restaurants`パスを訪れることでアクセス可能になるはずです（例：`https://beautiful-first-strapi-project.strapiapp.com/api/restaurants`）。

今すぐ試してみてください！結果は以下の例のレスポンスに似ているはずです👇。

<details>
<summary>APIレスポンスの例を見るにはクリックしてください：</summary>

```json
{
  "data": [
    {
      "id": 3,
      "documentId": "wf7m1n3g8g22yr5k50hsryhk",
      "Name": "Biscotte Restaurant",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "Welcome to Biscotte restaurant! Restaurant Biscotte offers a cuisine based on fresh, quality products, often local, organic when possible, and always produced by passionate producers."
            }
          ]
        }
      ],
      "createdAt": "2024-09-10T12:49:32.350Z",
      "updatedAt": "2024-09-10T13:14:18.275Z",
      "publishedAt": "2024-09-10T13:14:18.280Z",
      "locale": null
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

</details>

</details>

:::callout 🥳 おめでとうございます！  
これであなたのコンテンツが作成され、公開され、APIを通じてそれをリクエストする権限があります。
すばらしいコンテンツを作り続けてください！
:::

:::tip ヒント: ローカルとStrapi Cloudプロジェクト間でデータを転送する
あなたのStrapi Cloudプロジェクトとローカルプロジェクトのデータベースは異なります。これは、Strapi Cloudとローカルプロジェクト間でデータが自動的に同期されないことを意味します。プロジェクト間でデータを転送するために、[データ管理システム](/dev-docs/data-management)を使用することができます。
:::

## ⏩ 次に何をすべきですか？

あなたがStrapiを使ってコンテンツの作成と公開の基本を理解した今、私たちはあなたにStrapiのいくつかの機能を探求し、より深く掘り下げることをお勧めします：

- 👉 Strapiの[REST](/dev-docs/api/rest) APIを使ってコンテンツをクエリする方法を学びましょう。
- 👉 [ユーザーガイド](/user-docs/intro)を閲覧して、Strapiの機能について詳しく学びましょう。
- 👉 [クラウドドキュメンテーション](/cloud/intro)を読んで、Strapi Cloudプロジェクトについて詳しく学びましょう。
- 👉 そして、高度なユースケースのために、Strapiのバックエンドと[管理パネル](/dev-docs/admin-panel-customization)を[カスタマイズ](/dev-docs/backend-customization)する方法を学びましょう。

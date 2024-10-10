---
title: 管理パネルのカスタマイズオプション
description: Strapiの管理パネルの動作や見た目を設定し、あなたのアイデンティティを反映させる方法について学びましょう。
sidebar_label: カスタマイズオプション
toc_max_heading_level: 4
tags:
- 管理パネル
- 管理パネルのカスタマイズ

---

import HotReloading from '/docs/snippets/hot-reloading-admin-panel.md'

Strapiの[管理パネル](/dev-docs/admin-panel-customization)の多くの部分は、管理パネルの`/src/admin/app.[tsx|js]`エントリーポイントファイルを使用してコードを通じてカスタマイズできます（[プロジェクト構造](/dev-docs/project-structure)を参照してください）。

:::prerequisites
管理パネルのカスタマイズオプションを設定するコードを更新する前に：

- デフォルトの`app.example.[tsx|js]`ファイルを`app.[ts|js]`にリネームします。
- `/src/admin/`に新しい`extensions`フォルダを作成します。
- 開発中に変更がすぐに反映されるように、管理パネルサーバーが実行されていることを確認してください（デフォルトの[ホスト、ポート、パス](/dev-docs/admin-panel-customization/host-port-path)を変更していない場合、`yarn develop`や`npm run develop`コマンドで通常実行されます）。
:::

:::note メモ: 管理パネルの拡張とプラグインの拡張
デフォルトでStrapiプロジェクトには`/src`フォルダ内に別の`extensions`フォルダがありますが、これはプラグイン拡張用です（[プラグイン拡張](/dev-docs/plugins-extension)を参照してください）。
:::

`/src/admin/app.[ts|js]`内の`config`オブジェクトは、管理パネルの設定を格納しています。

`config`オブジェクトで使用されるファイル（カスタムロゴなど）は、`/src/admin/extensions/`フォルダに配置し、`/src/admin/app.js`内でインポートする必要があります。

<HotReloading />

## 利用可能な設定オプション

`/src/admin/app.[tsx|js]`の`config`オブジェクトは、以下のパラメータを受け付けます。

| パラメータ                     | タイプ           | 説明                                                                                               |
| ------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------- |
| `auth`                         | オブジェクト     | ログイン画面のデフォルトのStrapi [ロゴ](#ロゴ)を置き換えるための`logo`キーを受け付けます            |
| `head`                         | オブジェクト     | デフォルトのStrapi [favicon](#favicon)を置き換えるための`favicon`キーを受け付けます                 |
| `locales`                      | 文字列配列       | 使用可能なロケールを定義します（[ロケールの更新](#ロケール)を参照）                                |
| `translations`                 | オブジェクト     | [翻訳を拡張](#翻訳の拡張)します                                                                     |
| `menu`                         | オブジェクト     | メインナビゲーションの[ロゴ](#ロゴ)を変更するための`logo`キーを受け付けます                         |
| `theme.light` および `theme.dark` | オブジェクト     | ライトおよびダークモードの[テーマプロパティを上書き](#テーマの拡張)します                          |
| `tutorials`                    | ブール値         | [ビデオチュートリアルの表示](#ビデオチュートリアル)を切り替えます                                 |
| `notifications`                | オブジェクト     | 新しいリリースに関する通知を表示するかどうかを切り替える`releases`キー（ブール値）を受け付けます    |

<details>
<summary>管理パネルのカスタム設定例:</summary>

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```jsx title="/src/admin/app.js"
import AuthLogo from "./extensions/my-logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/favicon.png";

export default {
  config: {
    // 認証（ログイン）画面でStrapiロゴを置き換える
    auth: {
      logo: AuthLogo,
    },
    // Faviconを置き換える
    head: {
      favicon: favicon,
    },
    // 'en'以外の新しいロケールを追加する
    locales: ["fr", "de"],
    // メインナビゲーションでStrapiロゴを置き換える
    menu: {
      logo: MenuLogo,
    },
    // テーマを上書きまたは拡張する
    theme: {
      // ライトテーマのプロパティを上書きする
      light: {
        colors: {
          primary100: "#f6ecfc",
          primary200: "#e0c1f4",
          primary500: "#ac73e6",
          primary600: "#9736e8",
          primary700: "#8312d1",
          danger700: "#b72b1a",
        },
      },

      // ダークテーマのプロパティを上書きする
      dark: {
        // ...
      },
    },
    // 翻訳を拡張する
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        Users: "Utilisateurs",
        City: "CITY (FRENCH)",
        // コンテンツマネージャーテーブルのラベルをカスタマイズする
        Id: "ID french",
      },
    },
    // ビデオチュートリアルを無効化する
    tutorials: false,
    // Strapiの新しいリリースに関する通知を無効化する
    notifications: { releases: false },
  },

  bootstrap() {},
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```jsx title="/src/admin/app.ts"
import AuthLogo from "./extensions/my-logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/favicon.png";

export default {
  config: {
    // 認証（ログイン）画面でStrapiロゴを置き換える
    auth: {
      logo: AuthLogo,
    },
    // Faviconを置き換える
    head: {
      favicon: favicon,
    },
    // 'en'以外の新しいロケールを追加する
    locales: ["fr", "de"],
    // メインナビゲーションでStrapiロゴを置き換える
    menu: {
      logo: MenuLogo,
    },
    // テーマを上書きまたは拡張する
    theme: {
      colors: {
        primary100: "#f6ecfc",
        primary200: "#e0c1f4",
        primary500: "#ac73e6",
        primary600: "#9736e8",
        primary700: "#8312d1",
        danger700: "#b72b1a",
      },
    },
    // 翻訳を拡張する
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        Users: "Utilisateurs",
        City: "CITY (FRENCH)",
        // コンテンツマネージャーテーブルのラベルをカスタマイズする
        Id: "ID french",
      },
    },
    // ビデオチュートリアルを無効化する
    tutorials: false,
    // Strapiの新しいリリースに関する通知を無効化する
    notifications: { releases: false },
  },

  bootstrap() {},
};
```

</TabItem>
</Tabs>

</details>

## ロケール

管理パネルで使用可能なロケールのリストを更新するには、`config.locales`配列を使用します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```jsx title="./my-app/src/admin/app.js"
export default {
  config: {
    locales: ["ru", "zh"],
  },
  bootstrap() {},
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```jsx title="./my-app/src/admin/app.ts"
export default {
  config: {
    locales: ["ru", "zh"],
  },
  bootstrap() {},
};
```

</TabItem>
</Tabs>

:::note メモ
- `en`ロケールはビルドから削除できません。これはフォールバック（翻訳がロケールで見つからない場合に`en`が使用される）であり、デフォルトのロケール（ユーザーが初めて管理パネル

を開いたときに使用される）だからです。
- 利用可能なロケールの完全なリストは、[StrapiのGithubリポジトリ](https://github.com/strapi/strapi/blob/v4.0.0/packages/plugins/i18n/server/constants/iso-locales.json)で確認できます。
:::

### 翻訳の拡張

翻訳のキーと値のペアは、`@strapi/admin/admin/src/translations/[language-name].json`ファイルに宣言されています。これらのキーは`config.translations`キーを通じて拡張できます。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./my-app/src/admin/app.js"
export default {
  config: {
    locales: ["fr"],
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        Users: "Utilisateurs",
        City: "CITY (FRENCH)",
        // コンテンツマネージャーテーブルのラベルをカスタマイズする
        Id: "ID french",
      },
    },
  },
  bootstrap() {},
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./my-app/src/admin/app.ts"
export default {
  config: {
    locales: ["fr"],
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        Users: "Utilisateurs",
        City: "CITY (FRENCH)",
        // コンテンツマネージャーテーブルのラベルをカスタマイズする
        Id: "ID french",
      },
    },
  },
  bootstrap() {},
};
```

</TabItem>
</Tabs>

プラグインのキーと値のペアは、それぞれのプラグインのファイルで`./admin/src/translations/[language-name].json`に宣言されています。これらのキーと値のペアも、`config.translations`キーを使用して`[プラグイン名].[キー]: '値'`という形式で拡張できます。次の例を参照してください。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="./my-app/src/admin/app.js"
export default {
  config: {
    locales: ["fr"],
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        // プラグインのキーと値のペアを翻訳するには、プラグイン名を接頭辞として追加します
        // この場合、「content-type-builder」プラグインの「plugin.name」キーを翻訳します
        "content-type-builder.plugin.name": "Constructeur de Type-Contenu",
      },
    },
  },
  bootstrap() {},
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="./my-app/src/admin/app.ts"
export default {
  config: {
    locales: ["fr"],
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        // プラグインのキーと値のペアを翻訳するには、プラグイン名を接頭辞として追加します
        // この場合、「content-type-builder」プラグインの「plugin.name」キーを翻訳します
        "content-type-builder.plugin.name": "Constructeur de Type-Contenu",
      },
    },
  },
  bootstrap() {},
};
```

</TabItem>
</Tabs>

追加の翻訳ファイルが必要な場合は、`./src/admin/extensions/translations`フォルダに配置します。

## ロゴ

Strapi管理パネルには、2つの異なる場所にロゴが表示され、それぞれのキーが[管理パネルの設定](#利用可能な設定オプション)に対応しています。

| UIの場所                     | 更新する設定キー     |
| ----------------------------- | ------------------- |
| ログインページ               | `config.auth.logo`  |
| メインナビゲーション          | `config.menu.logo`  |

:::note
両方のロゴは、管理パネルから直接カスタマイズすることも可能です（[ユーザーガイド](/user-docs/settings/admin-panel.md)を参照してください）。
管理パネルからアップロードされたロゴは、設定ファイルで指定されたロゴよりも優先されます。
:::

### 管理パネルのロゴの場所

<!--TODO: update screenshot #2 -->

`config.auth.logo`で管理されているロゴは、ログイン画面でのみ表示されます。

![認証ロゴの位置](/img/assets/development/config-auth-logo.png)

`config.menu.logo`で管理されているロゴは、管理パネルのメインナビゲーションの左上隅に表示されます。

![メニューロゴの位置](/img/assets/development/config-menu-logo.png)

### ロゴの更新

ロゴを更新するには、画像ファイルを`/src/admin/extensions`フォルダに配置し、これらのファイルを`src/admin/app.[tsx|js]`でインポートし、次のように対応するキーを更新します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```jsx title="/src/admin/app.js"
import AuthLogo from "./extensions/my-auth-logo.png";
import MenuLogo from "./extensions/my-menu-logo.png";

export default {
  config: {
    // 他の設定プロパティ
    auth: { // 認証（ログイン）画面でStrapiロゴを置き換える
      logo: AuthLogo,
    },
    menu: { // メインナビゲーションでStrapiロゴを置き換える
      logo: MenuLogo,
    },
    // 他の設定プロパティ
  },

  bootstrap() {},
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```jsx title="/src/admin/app.ts"
import AuthLogo from "./extensions/my-auth-logo.png";
import MenuLogo from "./extensions/my-menu-logo.png";

export default {
  config: {
    // 他の設定プロパティ
    auth: { // 認証（ログイン）画面でStrapiロゴを置き換える
      logo: AuthLogo,
    },
    menu: { // メインナビゲーションでStrapiロゴを置き換える
      logo: MenuLogo,
    },
    // 他の設定プロパティ
  },

  bootstrap() {},
};
```

</TabItem>
</Tabs>

:::note
設定ファイルを通じて設定された画像ファイルのサイズには制限はありません。
:::

## Favicon

Faviconを置き換えるには、次の手順に従います。

1. `/src/admin/extensions/`フォルダが存在しない場合は作成します。
2. カスタムfaviconを`/src/admin/extensions/`にアップロードします。
3. Strapiアプリケーションルートにある既存の**favicon.png|ico**ファイルを、カスタムの`favicon.png|ico`ファイルに置き換えます。
4. `/src/admin/app.[tsx|js]`を次のように更新します。

   ```js title="./src/admin/app.js"
   import favicon from "./extensions/favicon.png";

   export default {
     config: {
       // カスタムアイコンでfaviconを置き換える
       head: {
         favicon: favicon,
       },
     },
   };
   ```

5. ターミナルで`yarn build && yarn develop`コマンドを実行し、Strapiアプリを再構築、起動、再度アクセスします。

:::tip
この手順は、ログインロゴ（`AuthLogo`）やメニューロゴ（`MenuLogo`）を置き換える場合にも同様に使用できます（[ロゴカスタマイズのドキュメント](#ロゴ)を参照）。
:::

:::caution
キャッシュされたfaviconがクリアされていることを確認してください。これは、ウェブブラウザやCloudflareのCDNなどのドメイン管理ツールにキャッシュされる可能性があります。
:::

## ビデオチュートリアル

ビデオチュートリアルを含む情報ボックスを無効化するには、`src/admin/app.[tsx|js]`ファイルの`config.tutorials`キーを`false`に設定します。

## リリース通知

新しいStrapiリリースに関する通知を無効化するには、`src/admin/app.[tsx|js]`ファイルの`config.notifications.releases`キーを`false`に設定します。

## テーマの拡張

Strapiアプリケーションはライトモードとダークモードで表示できます（[ユーザーガイドの管理者プロフィール設定](https://docs.strapi.io/user-docs/getting-started/setting-up-admin-panel#setting-up-your-administrator-profile)を参照）。どちらもカスタムテーマ設定を通じて拡張できます。

テーマを拡張するには、次のいずれかを使用します。

- ライトモードの場合は`config.theme.light`キー
- ダークモードの場合は

`config.theme.dark`キー

:::strapi Strapiデザインシステム
デフォルトの[Strapiテーマ](https://github.com/strapi/design-system/tree/main/packages/design-system/src/themes)では、影、色などのさまざまなテーマ関連のキーが定義されており、`./admin/src/app.js`の`config.theme.light`および`config.theme.dark`キーを通じて更新できます。[Strapiデザインシステム](https://design-system.strapi.io/)は完全にカスタマイズ可能で、専用の[StoryBook](https://design-system-git-main-strapijs.vercel.app)ドキュメントもあります。
:::

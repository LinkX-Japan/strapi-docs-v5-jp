---
title: 既存のStrapiプロジェクトにTypeScriptサポートを追加する
description: 既存のStrapiプロジェクトにTypeScriptサポートを追加する方法を学びます。
pagination_previous: dev-docs/typescript/development
tags:
- allowJsフラグ
- typescript
- tsconfig.jsonファイル
- プロジェクト構造
---

# 既存のStrapiプロジェクトにTypeScriptサポートを追加する

既存プロジェクトにTypeScriptサポートを追加するには、2つの`tsconfig.json`ファイルを追加し、管理パネルを再構築する必要があります。また、`eslintrc`および`eslintignore`ファイルをオプションで削除することもできます。

既存のJavaScriptプロジェクトに段階的にTypeScriptファイルを追加するためには、ルートの`tsconfig.json`ファイルでTypeScriptフラグの`allowJs`を`true`に設定する必要があります。`allowJs`フラグを使用すると、`.ts`および`.tsx`ファイルがJavaScriptファイルと共存できます。

次の手順で既存のStrapiプロジェクトにTypeScriptサポートを追加できます。

1. プロジェクトのルートに`tsconfig.json`ファイルを追加し、以下のコードを`allowJs`フラグと共にコピーします。

  ```json title="./tsconfig.json"

  {
    "extends": "@strapi/typescript-utils/tsconfigs/server",
    "compilerOptions": {
      "outDir": "dist",
      "rootDir": ".",
      "allowJs": true // .tsファイルなしでビルドを有効にする
    },
    "include": [
      "./",
      "src/**/*.json"
    ],
    "exclude": [
      "node_modules/",
      "build/",
      "dist/",
      ".cache/",
      ".tmp/",
      "src/admin/",
      "**/*.test.ts",
      "src/plugins/**"
    ]
  }
  ```

2. `./src/admin/`ディレクトリに`tsconfig.json`ファイルを追加し、以下のコードをコピーします。

  ```json title="./src/admin/tsconfig.json"

  {
    "extends": "@strapi/typescript-utils/tsconfigs/admin",
    "include": [
      "../plugins/**/admin/src/**/*",
      "./"
    ],
    "exclude": [
      "node_modules/",
      "build/",
      "dist/",
      "**/*.test.ts"
    ]
  }
  ```

3. _(任意)_ プロジェクトルートから`.eslintrc`および`.eslintignore`ファイルを削除します。
4. `database.ts`設定ファイルの`filename`プロパティに追加の`'..'`を追加します（SQLiteデータベースの場合にのみ必要です）。

  ```js title="./config/database.ts"

  const path = require('path');

  module.exports = ({ env }) => ({
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  });
  ```

5. 管理パネルを再構築し、開発サーバーを開始します。

  <Tabs groupId="yarn-npm">

  <TabItem value='yarn' label="Yarn">

    ```sh
    yarn build
    yarn develop
    ```

  </TabItem>

  <TabItem value='npm' label="NPM">

    ```sh
    npm run build
    npm run develop
    ```

  </TabItem>

  </Tabs>

プロジェクトルートに`dist`ディレクトリが追加され、プロジェクトは新しいTypeScript対応のStrapiプロジェクトと同じTypeScript機能にアクセスできるようになります。

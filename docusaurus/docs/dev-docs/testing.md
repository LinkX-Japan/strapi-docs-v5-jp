---
title: テスト
displayed_sidebar: devDocsSidebar
description: Strapiアプリケーションのテスト方法を学びます。
unlisted: true
tags:
- auth endpoint controller
- environment
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# ユニットテスト

<NotV5 />

:::strapi
Strapiブログには、[JestとSupertestを用いたAPIテストの実装](https://strapi.io/blog/automated-testing-for-strapi-api-with-jest-and-supertest)や[Strapiプラグインにユニットテストを追加する方法](https://strapi.io/blog/how-to-add-unit-tests-to-your-strapi-plugin)についてのチュートリアルがあります。
:::

このガイドでは、テストフレームワークを使用してStrapiアプリケーションの基本的なユニットテストを実行する方法を見ていきます。

この例では、シンプルさに重点を置いた[Jest](https://jestjs.io/)テストフレームワークと、フルエントAPIを使用してnode.jsのHTTPサーバーをテストするためのライブラリである[Supertest](https://github.com/visionmedia/supertest)を使用します。

:::caution
WindowsでSQLiteデータベースを使用している場合、WindowsがSQLiteファイルをロックする方法により、このガイドは機能しないことに注意してください。
:::

## テストツールのインストール

`Jest`には、テストケースの作成と設計に使用されるガイドラインやルールのセットが含まれています - テスターがより効率的にテストできるように設計された実践とツールの組み合わせです。

`Supertest`を使用すると、すべての`api`ルートを[http.Server](https://nodejs.org/api/http.md#http_class_http_server)のインスタンスとしてテストできます。

`sqlite3`は、テスト間で作成および削除されるディスク上のデータベースを作成するために使用されます。

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```bash
yarn add --dev jest supertest sqlite3
```

</TabItem>

<TabItem value="npm" label="npm">

```bash
npm install jest supertest sqlite3 --save-dev
```

</TabItem>

</Tabs>

これが完了したら、`package.json`ファイルに以下を追加します。

`scripts`セクションに`test`コマンドを追加します。

```json
  "scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build",
    "strapi": "strapi",
    "test": "jest --forceExit --detectOpenHandles"
  },
```

そして、ファイルの最後に以下の行を追加します。

```json
  "jest": {
    "testPathIgnorePatterns": [
      "/node_modules/",
      ".tmp",
      ".cache"
    ],
    "testEnvironment": "node"
  }
```

これらは、`Jest`に対して、テストを探すべきでないフォルダ内でテストを探さないように指示します。

## テスト環境のセットアップ

テストフレームワークは、有効なテストを実行し、現在のデータベースに干渉しないために、クリーンで空の環境を持つ必要があります。

一度 `jest` が実行されると、`test` [環境](/dev-docs/configurations/environment) ( `NODE_ENV` を `test` に切り替え)を使用するため、この目的のための特別な環境設定を作成する必要があります。
テスト環境用の新しい設定 `./config/env/test/database.js` を作成し、次の値 `"filename": ".tmp/test.db"` を追加してください。これはテスト用に独立したsqliteデータベースを持ちたいからです。そのため、テストは実際のデータに影響を与えません。
このファイルは一時的なもので、テストが終了するたびにそのファイルを削除し、テストは常にクリーンなデータベースで実行されます。
全体のファイルは以下のようになります：

```js title="path: ./config/env/test/database.js"

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/test.db'),
    },
    useNullAsDefault: true,
    debug: false
  },
});
```

## Strapiインスタンスの作成

テストするためには、テスト環境で動作するStrapiインスタンスが必要です。
基本的には、[プロセスマネージャー](https://forum.strapi.io/t/how-to-use-pm2-process-manager-with-strapi/)のインスタンスを作成するのと同様に、Strapiアプリのインスタンスをオブジェクトとして取得したいと思います。

これらのタスクではいくつかのファイルを追加する必要があります - すべてのテストを置く `tests` フォルダを作成し、その中に主要なStrapiヘルパーが入ったファイルstrapi.jsを持つ `helpers` フォルダを作成しましょう。

```js title="path: ./tests/helpers/strapi.js"
const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;
    
    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");

  //close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database before deletion
  await strapi.db.connection.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi };
```

## Strapiインスタンスのテスト

私たちはテストのメインエントリーファイルが必要です、それはまた私たちのヘルパーファイルをテストします。

```js title="path: ./tests/app.test.js"
const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
```

実際には、これが単体テストを書くために必要なすべてです。 `yarn test` を実行して、最初のテストの結果を確認してください。

```bash
yarn run v1.13.0
$ jest
 PASS  tests/app.test.js
  ✓ strapi is defined (2 ms)

テストスイート: 1が通過し、全1
テスト:       1が通過し、全1
スナップショット:   全0
時間:        4.187秒
全てのテストスイートを実行しました。
✨  5.73秒で完了しました。
```

:::tip
Jestでタイムアウトエラーが発生した場合、`app.test.js`ファイルの`beforeAll`メソッドの前に以下の行を追加してください: `jest.setTimeout(15000)` そしてミリ秒の値を必要に応じて調整してください。
:::

## 基本的なエンドポイントコントローラーをテストする

:::tip
この例では、[controllers](/dev-docs/backend-customization/controllers)セクションから`Hello world` `/hello`エンドポイントを使用します。
<!-- 下のリンクはcheck-linksプラグインによってハッシュが欠落していると報告されていますが、全て問題ありません 🤷 -->
:::

APIテストはユニットテストではなく、限定的な統合テストであると言う人もいますが、名前に関係なく、最初のエンドポイントのテストを続けましょう。

私たちはエンドポイントが適切に動作し、ルート`/hello`が`Hello World`を返すかどうかをテストします。

`supertest`を使用してエンドポイントが期待通りに動作するかどうかを確認するための別のテストファイルを作成しましょう。

```js title="path: ./tests/hello/index.js"

const request = require('supertest');

it("should return hello world", async () => {
  await request(strapi.server.httpServer)
    .get("/api/hello")
    .expect(200) // HTTPコード200を期待
    .then((data) => {
      expect(data.text).toBe("Hello World!"); // レスポンステキストを期待
    });
});

```

その後、このコードを`./tests/app.test.js`のファイルの最後に含めます。

```js
require('./hello');
```

そして`yarn test`を実行すると、以下のように表示されます。

```bash
➜  my-project yarn test
yarn run v1.13.0
$ jest --detectOpenHandles
 PASS  tests/app.test.js (5.742 s)
  ✓ strapi is defined (4 ms)
  ✓ should return hello world (208 ms)

[2020-05-22T14:37:38.018Z] debug GET /hello (58 ms) 200
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        6.635 s, estimated 7 s
Ran all test suites.
✨  Done in 9.09s.
```

:::tip
もしエラー`Jest has detected the following 1 open handles potentially keeping Jest from exiting`が表示された場合は、`jest`のバージョンを確認してみてください。`26.6.3`なら問題なく動作します。
:::

## `auth`エンドポイントコントローラーをテストする

このシナリオでは、認証ログインエンドポイントを2つのテストでテストします。

1. ユーザーをログインし、`jwt`トークンを返すはずの`/auth/local`をテストします。
2. `Authorization`ヘッダーに基づいてユーザーデータを返すはずの`/users/me`をテストします。

```js title="path: ./tests/user/index.js"
const request = require('supertest');

// ユーザーモックデータ
const mockUserData = {
  username: "tester",
  email: "tester@strapi.com",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: null,
};

it("should login user and return jwt token", async () => {
  /** Creates a new user and save it to the database */
  await strapi.plugins["users-permissions"].services.user.add({
    ...mockUserData,
  });

await request(strapi.server.httpServer) // app serverはClass: http.Serverのインスタンスです
    .post("/api/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
});

it('認証済みのユーザーのデータを返すべきです', async () => {
  /** デフォルトのユーザーロールを取得します */
  const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;

  /** 新しいユーザーを作成し、データベースにプッシュします */
  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...mockUserData,
    username: 'tester2',
    email: 'tester2@strapi.com',
    role,
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server.httpServer) // app serverはClass: http.Serverのインスタンスです
    .get('/api/users/me')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + jwt)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});
```

その後、このコードを`./tests/app.test.js`のファイルの最下部に含めます

```js
require('./user');
```

上記のすべてのテストは、以下のようなコンソール出力を返すはずです

```bash
➜  my-project git:(master) yarn test

yarn run v1.13.0
$ jest --forceExit --detectOpenHandles
[2020-05-27T08:30:30.811Z] debug GET /hello (10 ms) 200
[2020-05-27T08:30:31.864Z] debug POST /auth/local (891 ms) 200
 PASS  tests/app.test.js (6.811 s)
  ✓ strapiは定義されています (3 ms)
  ✓ ハローワールドを返すべきです (54 ms)
  ✓ ユーザーをログインさせ、jwtトークンを返すべきです (1049 ms)
  ✓ 認証済みのユーザーのデータを返すべきです (163 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        6.874 s, estimated 9 s
Ran all test suites.
✨  Done in 8.40s.
```

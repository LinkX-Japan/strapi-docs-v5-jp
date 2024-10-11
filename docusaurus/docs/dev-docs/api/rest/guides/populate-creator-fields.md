---
title: 作成者フィールドの入力方法
description: populateパラメータを活用したカスタムコントローラを作成することで、createdByやupdatedByなどの作成者フィールドを入力する方法を学びます。
tags:
- API
- Content API
- createdBy
- guides
- populate
- populateCreatorFields
- REST API
- REST API guides
- updatedBy
---

import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# 🛠️ `createdBy`や`updatedBy`などの作成者フィールドの入力方法

<NotV5/>

作成者フィールド`createdBy`および`updatedBy`は、デフォルトでは[REST API](/dev-docs/api/rest)のレスポンスから削除されます。これら2つのフィールドは、コンテンツタイプレベルで`populateCreatorFields`パラメータをアクティブにすることでREST APIに戻すことができます。

:::note

`populateCreatorFields`プロパティはGraphQL APIでは利用できません。

以下のフィールドのみが入力されます：`id`、`firstname`、`lastname`、`username`、`preferedLanguage`、`createdAt`、および`updatedAt`。
:::

APIレスポンスに`createdBy`と`updatedBy`を追加するには：

1. コンテンツタイプの`schema.json`ファイルを開きます。
2. `options`オブジェクトに`"populateCreatorFields": true`を追加します：

  ```json
  "options": {
      "draftAndPublish": true,
      "populateCreatorFields": true
    },
  ```

3. `schema.json`を保存します。
4. [generate CLI](/dev-docs/cli.md)を使用するか、`./src/api/[content-type-name]/middlewares/[your-middleware-name].js`に新しいファイルを手動で作成することで新しいルートミドルウェアを作成します。
5. 以下のコードを追加します。この例をあなたのニーズに合わせて変更することができます：

  ```js title="./src/api/test/middlewares/defaultTestPopulate.js"
  "use strict";

  module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      if (!ctx.query.populate) {
        ctx.query.populate = ["createdBy", "updatedBy"];
      }

      await next();
    };
  };
  ```

6. この入力を適用する特定のルートでこのミドルウェアを有効にするために、デフォルトのルートファクトリを変更し、コンテンツタイプ/ミドルウェア名をあなたのものに置き換えます：

  ```js title="./src/api/test/routes/test.js"
  "use strict";

  const { createCoreRouter } = require("@strapi/strapi").factories;

  module.exports = createCoreRouter("api::test.test", {
    config: {
      find: {
        middlewares: ["api::test.default-test-populate"],
      },
      findOne: {
        middlewares: ["api::test.default-test-populate"],
      },
    },
  });
  ```

`populate`パラメータがないREST APIリクエストには、デフォルトで`createdBy`または`updatedBy`フィールドが含まれます。

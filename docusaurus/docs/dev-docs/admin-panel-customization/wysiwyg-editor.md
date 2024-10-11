---
title: WYSIWYGエディタのカスタマイズ
description: Strapiの管理パネルでWYSIWYGエディタをカスタマイズするためのさまざまな戦略について学びましょう。
sidebar_label: WYSIWYGエディタ
tags:
- 管理パネル
- 管理パネルのカスタマイズ
- WYSIWYGエディタ

---

# デフォルトのWYSIWYGエディタを変更する

Strapiの管理パネルで提供されているデフォルトのWYSIWYGエディタを変更するには、いくつかのオプションがあります。

- [Strapiマーケットプレイス](https://market.strapi.io/)でCKEditorなどのサードパーティプラグインをインストールできます。
- [カスタムフィールドのドキュメント](/dev-docs/custom-fields)を参照し、完全にカスタムなWYSIWYGフィールドを作成して登録するプラグインを作成できます。
- Strapiの管理パネル[拡張](/dev-docs/admin-panel-customization/extension)システムと管理パネルの[bootstrapライフサイクル関数](/dev-docs/plugins/admin-panel-api#bootstrap)を活用することができます。

拡張システムを使用する場合は、`/src/admin/extensions`フォルダにWYSIWYGコンポーネントを作成し、管理パネルの`/src/admin/app.[tsx|js]`エントリーポイントファイルにインポートしてから、`app.addFields()`関数で新しいフィールドを宣言します。以下のように設定します。

<Tabs groupId="js-ts">
<TabItem value="js" label="JavaScript">

```js title="/src/admin/app.js"
// 次のファイルには新しいWYSIWYGエディタのロジックが含まれています👇
import MyNewWYSIWYG from "./extensions/components/MyNewWYSIGWYG";

export default {
  bootstrap(app) {
    app.addFields({ type: "wysiwyg", Component: MyNewWYSIWYG });
  },
};
```

</TabItem>

<TabItem value="ts" label="TypeScript">

```js title="/src/admin/app.tsx"
// 次のファイルには新しいWYSIWYGエディタのロジックが含まれています👇
import MyNewWYSIWYG from "./extensions/components/MyNewWYSIGWYG";

export default {
  bootstrap(app) {
    app.addFields({ type: "wysiwyg", Component: MyNewWYSIWYG });
  },
};
```

</TabItem>
</Tabs>
---
title: カスタムフィールド
description: Strapiのカスタムフィールドを使用してコンテンツタイプの機能を拡張する方法を学びます。
displayed_sidebar: devDocsSidebar
canonicalUrl: https://docs.strapi.io/dev-docs/development/custom-fields.html
tags:
- 管理パネル
- コンポーネント
- コンテンツタイプビルダー
- コンテンツマネージャー
- カスタムフィールド
- register関数
---

import CustomFieldRequiresPlugin from '/docs/snippets/custom-field-requires-plugin.md'
import NotV5 from '/docs/snippets/_not-updated-to-v5.md'

# カスタムフィールド

<NotV5 />

カスタムフィールドは、コンテンツタイプやコンポーネントに新しいフィールドタイプを追加することで、Strapiの機能を拡張します。作成またはプラグイン経由でStrapiに追加されたカスタムフィールドは、標準のフィールドと同様にコンテンツタイプビルダーやコンテンツマネージャーで使用できます。

このドキュメントは、カスタムフィールドの作成者向けです。新しいカスタムフィールドを作成するために開発者が使用するAPIや関数について説明します。Strapiの管理パネルからカスタムフィールドを追加して使用する方法については、[ユーザーガイド](/user-docs/plugins/introduction-to-plugins.md#custom-fields)を参照してください。

カスタムフィールドには、専用の[プラグイン](/dev-docs/plugins/developing-plugins)を開発することを推奨します。カスタムフィールドプラグインには、サーバー部分と管理パネル部分の両方が含まれており、両方で登録されて初めてStrapiの管理パネルで使用できるようになります。

カスタムフィールドが作成され使用されると、他の属性と同様にモデルのスキーマに定義されます。カスタムフィールドを使用する属性は、`customField` として型が定義されます（例: `type: 'customField'`）。使用されるカスタムフィールドによっては、属性の定義に追加のプロパティが含まれる場合もあります（[モデルのドキュメント](/dev-docs/backend-customization#custom-fields)を参照してください）。

:::note 注意

- カスタムフィールドを追加する推奨方法はプラグインを作成することですが、アプリ固有のカスタムフィールドは `src/index.js` や `src/admin/app/js` ファイルにあるグローバルな `register` [関数](/dev-docs/configurations/functions)内で登録することも可能です。
- カスタムフィールドはプラグインを使用してのみ共有できます。
:::

## サーバー側でカスタムフィールドを登録する

:::prerequisites
<CustomFieldRequiresPlugin components={props.components} />
:::

カスタムフィールドを使用する属性が有効であることを確認するために、Strapiのサーバーはすべてのカスタムフィールドを認識する必要があります。

`strapi.customFields` オブジェクトは、`Strapi` インスタンスで `register()` メソッドを公開しています。このメソッドは、プラグインのサーバー[登録ライフサイクル](/dev-docs/plugins/server-api#register)中に、サーバー側でカスタムフィールドを登録するために使用されます。

`strapi.customFields.register()` は、次のパラメーターを含むオブジェクト（またはオブジェクトの配列）を渡すことで、サーバー側で1つまたは複数のカスタムフィールドを登録します:

| パラメーター                      | 説明                                                                                                                                                          | 型        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `name`                           | カスタムフィールドの名前                                                                                                                                       | `String`  |
| `plugin`<br/><br/>(_任意_)       | カスタムフィールドを作成するプラグインの名前<br/><br/>❗️ 定義されている場合、管理パネルの登録時の `pluginId` 値も同じでなければなりません。 | `String`  |
| `type`                           | カスタムフィールドが使用するデータ型                                                                                                                          | `String`  |
| `inputSize`<br/><br/>(_任意_)    | 管理パネルでカスタムフィールドの入力幅を定義するためのパラメーター                                                                                              | `Object`  |

オプションの `inputSize` オブジェクトを指定する場合、次のすべてのパラメーターを含める必要があります:

| パラメーター    | 説明                                                                                                                                                                   | 型        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `default`       | 管理パネルの12列グリッドで入力フィールドが占めるデフォルトの列サイズです。<br/>値は `4`、`6`、`8`、または `12` のいずれかです。                                      | `Integer` |
| `isResizable`   | 入力フィールドがリサイズ可能かどうか                                                                                                                                     | `Boolean` |

:::note 現在の制限
現在のところ:
* カスタムフィールドはStrapiに新しいデータ型を追加することはできず、既存のStrapiの[データ型](/dev-docs/backend-customization#model-attributes)を使用する必要があります。
* 既存のデータ型を変更することもできません。
* リレーション、メディア、コンポーネント、ダイナミックゾーンなどのStrapi独自のデータ型は、カスタムフィールドで使用できません。
:::

<details>
<summary>例: サーバー側で"color"カスタムフィールドを登録する例</summary>

以下の例では、`color-picker` プラグインがCLIジェネレーターを使用して作成されています（[プラグイン開発](/dev-docs/plugins/developing-plugins)を参照してください）:

```js title="./src/plugins/color-picker/server/register.js"
"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "color",
    plugin: "color-picker",
    type: "string",
    inputSize: {
      // オプション
      default: 4,
      isResizable: true,
    },
  });
};
```

プラグインのコードがCLIジェネレーターで自動生成されていない場合、`strapi-server.js` ファイル内に直接カスタムフィールドを宣言することもできます:

```js title="./src/plugins/color-picker/strapi-server.js"
module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: "color",
      plugin: "color-picker",
      type: "text",
      inputSize: {
        // オプション
        default: 4,
        isResizable: true,
      },
    });
  },
};
```

</details>

## 管理パネルでカスタムフィールドを登録する

:::prerequisites
<CustomFieldRequiresPlugin components={props.components} />
:::

カスタムフィールドをコンテンツタイプビルダーやコンテンツマネージャーで使用できるようにするためには、管理パネルでカスタムフィールドを登録する必要があります。

`app.customFields` オブジェクトは、`StrapiApp` インスタンスで `register()` メソッドを公開しています。このメソッドは、プラグインの管理パネル[登録ライフサイクル](/dev-docs/plugins/admin-panel-api#register)中にカスタムフィールドを登録するために使用されます。

`app.customFields.register()` は、次のパラメーターを含むオブジェクト（またはオブジェクトの配列）を渡すことで、管理パネルで1つまたは複数のカスタムフィールドを登録します:

| パラメーター                      | 説明                                                                                                                                   | 型                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `name`                           | カスタムフィールドの名前                                                                                                              | `String`                                           |
| `pluginId`<br/><br/>(_任意_)     | カスタムフィールドを作成するプラグインの名前<br/><br/>❗️ 定義されている場合、サーバー登録時の `plugin` 値と同じでなければなりません。 | `String`                                           |
| `type`                           | カスタムフィールドが使用する既存のStrapiデータ型<br/><br/>❗️ リレーション、メディア、コンポーネント、またはダイナミックゾーンは使用できません

。 | `String`                                           |
| `icon`<br/><br/>(_任意_)         | カスタムフィールドのアイコン                                                                                                          | `React.ComponentType`                              |
| `intlLabel`                      | 名前の翻訳                                                                                                                            | [`IntlObject`](https://formatjs.io/docs/react-intl/) |
| `intlDescription`                | 説明の翻訳                                                                                                                            | [`IntlObject`](https://formatjs.io/docs/react-intl/) |
| `components`                     | コンテンツマネージャーでカスタムフィールドを表示するために必要なコンポーネント（[コンポーネント](#components)を参照）                  |                                                    |
| `options`<br/><br/>(_任意_)      | コンテンツタイプビルダーで使用するオプション（[オプション](#options)を参照）                                                          | `Object`                                           |

<details>
<summary>例: 管理パネルで"color"カスタムフィールドを登録する例</summary>

以下の例では、`color-picker` プラグインがCLIジェネレーターを使用して作成されています（[プラグイン開発](/dev-docs/plugins/developing-plugins.md)を参照してください）:

```jsx title="./src/plugins/color-picker/admin/src/index.js"
import ColorPickerIcon from "./components/ColorPicker/ColorPickerIcon";

export default {
  register(app) {
    // ... app.addMenuLink() などのコードがここに入ります
    // ... app.registerPlugin() などのコードがここに入ります

    app.customFields.register({
      name: "color",
      pluginId: "color-picker", // このカスタムフィールドはcolor-pickerプラグインによって作成されます
      type: "string", // colorは文字列として保存されます
      intlLabel: {
        id: "color-picker.color.label",
        defaultMessage: "Color",
      },
      intlDescription: {
        id: "color-picker.color.description",
        defaultMessage: "任意の色を選択してください",
      },
      icon: ColorPickerIcon, // アイコンコンポーネントを作成・インポートすることを忘れないでください
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
      options: {
        // オプションをここで宣言します
      },
    });
  },

  // ... bootstrap() などのコードがここに入ります
};
```

</details>

### コンポーネント

`app.customFields.register()` は、コンテンツマネージャーの編集ビューで使用する `Input` Reactコンポーネントを含む `components` オブジェクトを渡す必要があります。

<details>
<summary>例: Inputコンポーネントを登録する</summary>

以下の例では、`color-picker` プラグインがCLIジェネレーターを使用して作成されています（[プラグイン開発](/dev-docs/plugins/developing-plugins.md)を参照してください）:

```jsx title="./src/plugins/color-picker/admin/src/index.js"
export default {
  register(app) {
    app.customFields.register({
      // …
      components: {
        Input: async () =>
          import(/* webpackChunkName: "input-component" */ "./Input"),
      },
      // …
    });
  },
};
```

</details>

カスタムフィールドのInputコンポーネントは、次のpropsを受け取ります:

| Prop             | 説明                                                                                                                                                              | 型                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `attribute`      | カスタムフィールドの基礎となるStrapiの型とオプションを含む属性オブジェクト                                                                                           | `{ type: String, customField: String }`                              |
| `description`    | [ビューを設定する](/user-docs/content-manager/configuring-view-of-content-type#configuring-the-edit-view) で設定されたフィールド説明                                 | [`IntlObject`](https://formatjs.io/docs/react-intl/)                 |
| `placeholder`    | [ビューを設定する](/user-docs/content-manager/configuring-view-of-content-type#configuring-the-edit-view) で設定されたフィールドプレースホルダー                     | [`IntlObject`](https://formatjs.io/docs/react-intl/)                 |
| `hint`           | [ビューを設定する](/user-docs/content-manager/configuring-view-of-content-type#configuring-the-edit-view) で設定されたフィールド説明と、最小/最大の[バリデーション要件](/dev-docs/backend-customization/models#validations) | `String`                                                             |
| `name`           | コンテンツタイプビルダーで設定されたフィールド名                                                                                                                    | `String`                                                             |
| `intlLabel`      | コンテンツタイプビルダーまたはビュー設定で設定されたフィールド名                                                                                                    | [`IntlObject`](https://formatjs.io/docs/react-intl/)                 |
| `onChange`       | 入力変更イベントのハンドラ。`name` 引数はフィールド名を参照し、`type` 引数はStrapiの基礎となる型を参照します                                                       | `({ target: { name: String value: unknown type: String } }) => void` |
| `contentTypeUID` | フィールドが属するコンテンツタイプ                                                                                                                                  | `String`                                                             |
| `type`           | カスタムフィールドのuid、例: `plugin::color-picker.color`                                                                                                           | `String`                                                             |
| `value`          | 基礎となるStrapi型が期待する入力値                                                                                                                                  | `unknown`                                                            |
| `required`       | フィールドが必須かどうか                                                                                                                                           | `boolean`                                                            |
| `error`          | バリデーション後に受け取るエラー                                                                                                                                    | [`IntlObject`](https://formatjs.io/docs/react-intl/)                 |
| `disabled`       | 入力が無効化されているかどうか                                                                                                                                     | `boolean`                                                            |

Strapi v4.13.0以降、コンテンツマネージャー内のフィールドは、`URLSearchParam` の `field` を使用して自動的にフォーカスすることができます。入力コンポーネントはReactの[`forwardRef`](https://react.dev/reference/react/forwardRef)メソッドでラップすることを推奨します。対応する `ref` を `input` 要素に渡す必要があります。

<details>
<summary>例: カスタムテキスト入力</summary>

以下の例では、コントロールされたカスタムテキスト入力を提供しています。すべての入力はコントロールされたものでなければなりません。そうでないと、データが保存されない可能性があります。

```jsx title="./src/plugins/<plugin-name>/admin/src/components/Input.js"
import * as React from "react";

import { useIntl } from "react-intl";

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // これらはコンテンツマネージャーから渡されるpropsの一部です

  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  return (
    <label>
      {formatMessage(intlLabel)}
      <input
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
    </label>
  );
});

export default Input;
```

</details>

:::tip
カスタムフィールドに提供されるpropsの詳細とその使用方法については、Strapiのコードベースにある [`ColorPickerInput` ファイル](https://github.com/strapi/strapi/blob/main/packages/plugins/color-picker/admin/src/components/ColorPickerInput.tsx#L80-L95) を参照してください。
:::

### オプション

`app.customFields.register()` は、次のパラメーターを含む `options` オブジェクトを渡すことができます:

| オプションパラメーター | 説明                                                                                                  | 型                             |
| --------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------ |
| `base`                | コンテンツタイプビルダーの _ベース設定_ タブで利用可能な設定項目                                        | `Object` または `Objectの配列` |
| `advanced`            | コンテンツタイプビルダーの _高度な設定_ タブで利用可能な設定項目                                      | `Object` または `Objectの配列` |
| `validator`           | 入力をサニタイズするために使用するバリデータ関数。[`yup` のスキーマオブジェクト](https://github.com/jquense/yup/tree/pre-v1) を使用します | `Function`                     |

`base` および `advanced` 設定には、オブジェクトまたはオ

ブジェクトの配列を渡すことができ、それぞれのオブジェクトが設定セクションとなります。各設定セクションには以下の項目を含めることができます:

- セクションタイトルを[`IntlObject`](https://formatjs.io/docs/react-intl/) として宣言する `sectionTitle`
- `items` のリストとしてオブジェクトの配列

`items` 配列内の各オブジェクトには、次のパラメーターを含めることができます:

| 項目パラメーター | 説明                                                                | 型                                                 |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| `name`          | 入力のラベル。<br/>`options.settingName` 形式を使用する必要があります | `String`                                           |
| `description`   | コンテンツタイプビルダーで使用する入力の説明                       | `String`                                           |
| `intlLabel`     | 入力ラベルの翻訳                                                    | [`IntlObject`](https://formatjs.io/docs/react-intl/) |
| `type`          | 入力のタイプ（例: `select`, `checkbox`）                           | `String`                                           |

<details>
<summary>例: "color"カスタムフィールドのオプション宣言</summary>

以下の例では、`color-picker` プラグインがCLIジェネレーターを使用して作成されています（[プラグイン開発](/dev-docs/plugins/developing-plugins.md)を参照してください）:

```jsx title="./src/plugins/color-picker/admin/src/index.js"
// インポートするもの（ColorPickerIcon、pluginId、yup パッケージなど）

export default {
  register(app) {
    // ... app.addMenuLink() などのコードがここに入ります
    // ... app.registerPlugin() などのコードがここに入ります
    app.customFields.register({
      // …
      options: {
        base: [
          /*
            コンテンツタイプビルダーの"ベース設定"セクションに追加する設定を宣言
          */
          {
            sectionTitle: {
              // "フォーマット" 設定セクションを追加
              id: "color-picker.color.section.format",
              defaultMessage: "フォーマット",
            },
            items: [
              // セクションに設定項目を追加
              {
                /*
                  "カラーフォーマット" ドロップダウンを追加
                  カラー値のフォーマットを選択: 16進数またはRGBA
                */
                intlLabel: {
                  id: "color-picker.color.format.label",
                  defaultMessage: "カラーフォーマット",
                },
                name: "options.format",
                type: "select",
                value: "hex", // デフォルトで選択されるオプション
                options: [
                  // 利用可能な "カラーフォーマット" オプションをすべてリストアップ
                  {
                    key: "hex",
                    defaultValue: "hex",
                    value: "hex",
                    metadatas: {
                      intlLabel: {
                        id: "color-picker.color.format.hex",
                        defaultMessage: "16進数",
                      },
                    },
                  },
                  {
                    key: "rgba",
                    value: "rgba",
                    metadatas: {
                      intlLabel: {
                        id: "color-picker.color.format.rgba",
                        defaultMessage: "RGBA",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        advanced: [
          /*
            コンテンツタイプビルダーの"高度な設定"セクションに追加する設定を宣言
          */
        ],
        validator: (args) => ({
          format: yup.string().required({
            id: "options.color-picker.format.error",
            defaultMessage: "カラーフォーマットは必須です",
          }),
        }),
      },
    });
  },
};
```

</details>

:::tip
オプションのすべての形状とパラメーターについての詳細は、Strapiのコードベースの例を参照してください: `base` 設定は [`baseForm.ts`](https://github.com/strapi/strapi/blob/main/packages/core/content-type-builder/admin/src/components/FormModal/attributes/baseForm.ts) ファイルに、`advanced` 設定は [`advancedForm.ts`](https://github.com/strapi/strapi/blob/main/packages/core/content-type-builder/admin/src/components/FormModal/attributes/advancedForm.ts) ファイルにリストされています。
:::

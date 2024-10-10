---
title: TypeScript
sidebar_label: はじめに
description: StrapiアプリケーションでTypeScriptを使用するためのガイド
pagination_next: dev-docs/typescript/development
tags:
- はじめに
- typescript
---

# TypeScript 

[TypeScript](https://www.typescriptlang.org/)はJavaScriptの上に追加の型システムレイヤーを追加することで、有効なJavaScriptコードはすべて有効なTypeScriptコードでもあります。Strapi開発の文脈では、TypeScriptはアプリケーションのコードベースをより型安全にするとともに、自動型生成と自動補完のためのツールセットを提供します。

## StrapiでのTypeScriptの始め方

:::prerequisites 前提条件
Strapiのバージョン4.3.0以上を実行していること。
:::

StrapiでTypeScriptを始める方法は2つあります：

- ターミナルで次のコマンドを実行して、新しいTypeScriptプロジェクトをStrapiで作成します（詳細は [CLIのインストール](/dev-docs/installation/cli)のドキュメンテーションを参照してください）：

  <Tabs groupId="yarn-npm">

  <TabItem value="yarn" label="Yarn">

  ```bash
  yarn create strapi-app my-project --typescript
  ```
  
  </TabItem>

  <TabItem value="npm" label="NPM">

  ```bash
  npx create-strapi-app@latest my-project --typescript
  ```
  
  </TabItem>

  </Tabs>

- 既存のStrapiプロジェクトにTypeScriptのサポートを追加します。方法は提供されている[変換](/dev-docs/typescript/adding-support-to-existing-project)手順を使用します。

<br />

:::strapi 次に何をすべきか？
- TypeScriptベースのStrapiプロジェクトの[構造](/dev-docs/project-structure)を理解する
- TypeScriptに関連する[設定オプション](/dev-docs/configurations/typescript)について学ぶ
- TypeScript関連の開発[オプションと機能](/dev-docs/typescript/development)について深く学ぶ
:::

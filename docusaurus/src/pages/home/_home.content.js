import React from 'react';

export default {
  page: {
    title: 'Strapi 5 ドキュメンテーション',
    description: '数週間ではなく数時間でプロジェクトを構築できるように、数分で設定を行いましょう。',
  },
  carousel: [
    {
      title: 'Strapi 5 の新機能を学ぶ',
      description: (
        <>
          {'Strapi 5 ドキュメンテーションにおける新機能と更新された機能を簡単にツアーしましょう！'}
        </>
      ),
      button: {
        label: '新機能は？',
        decorative: '✨',
        to: '/dev-docs/whats-new',
      },
    },
    {
      title: 'すぐに Strapi を使いたいですか？',
      description: (
        <>
          {'Strapi の概要を '}
          <a href="https://docs.strapi.io/dev-docs/quick-start" target="_blank">クイックスタートガイド</a>
          {' で学ぶか、 '}
          <a href="https://strapi.io/demo" target="_blank">ライブデモをリクエスト</a>
          {' してください！'}
        </>
      ),
      button: {
        label: 'クイックスタート',
        decorative: '🚀',
        to: '/dev-docs/quick-start',
      },
    },
    {
      backgroundImgSrc: require('@site/static/img/assets/home/carousel-background--cloud.png').default,
      variant: 'cloud',
      title: 'Strapi Cloud CLI',
      description: (
        <>
          {'CLI から直接 '}
          <a href="https://strapi.io/cloud" target="_blank">Strapi Cloud</a>
          {' にプロジェクトをデプロイする方法を学びましょう！'}
        </>
      ),
      button: {
        label: 'Cloud CLI ドキュメント',
        decorative: '☁️',
        to: '/cloud/getting-started/deployment-cli',
      },
    },
  ],
  categories: [
    {
      cardLink: '/user-docs/intro',
      cardTitle: 'ユーザーガイド',
      cardDescription: '管理パネルを最大限に活用するためのユーザーガイド',
      cardImgSrc: require('@site/static/img/assets/home/preview--user-guides.jpg').default,
      linksIconSrc: require('@site/static/img/assets/icons/feather.svg').default,
      linksIconColor: 'blue',
      links: [
        {
          label: 'コンテンツタイプビルダー',
          to: '/user-docs/content-type-builder/creating-new-content-type',
        },
        {
          label: 'コンテンツマネージャー',
          to: '/user-docs/content-manager/writing-content',
        },
        {
          label: '下書きと公開',
          to: '/user-docs/content-manager/saving-and-publishing-content',
        },
        {
          label: 'リリース',
          to: '/user-docs/releases/introduction',
        },
        {
          label: '設定',
          to: '/user-docs/settings/introduction',
        },
      ],
    },
    {
      cardLink: '/dev-docs/intro',
      cardTitle: '開発者向けドキュメント',
      cardDescription: 'プロジェクトを立ち上げ、Strapi のエキスパートになるために必要なすべて',
      cardImgSrc: require('@site/static/img/assets/home/preview--dev-docs.jpg').default,
      linksIconSrc: require('@site/static/img/assets/icons/code.svg').default,
      linksIconColor: 'green',
      links: [
        {
          label: 'REST API',
          to: '/dev-docs/api/rest',
        },
        {
          label: 'GraphQL API',
          to: '/dev-docs/api/graphql',
        },
        {
          label: 'ドキュメントサービス API',
          to: '/dev-docs/api/document-service',
        },
        {
          label: 'プラグイン SDK',
          to: '/dev-docs/plugins/development/create-a-plugin',
        },
        {
          label: 'Strapi 5 へのアップグレード',
          to: '/dev-docs/migration/v4-to-v5/introduction-and-faq',
        },
      ],
    },
    {
      cardLink: '/cloud/intro',
      cardTitle: 'クラウドドキュメンテーション',
      cardDescription: 'Strapi Cloud でのプロジェクトのデプロイと管理方法を学ぶ',
      cardImgSrc: require('@site/static/img/assets/home/preview--cloud-docs.png').default,
      linksIconSrc: require('@site/static/img/assets/icons/cloud.svg').default,
      linksIconColor: 'purple',
      links: [
        {
          label: 'プロジェクト作成',
          to: '/cloud/getting-started/deployment',
        },
        {
          label: '利用状況と請求',
          to: '/cloud/getting-started/usage-billing',
        },
        {
          label: 'プロジェクト設定',
          to: '/cloud/projects/settings',
        },
        {
          label: 'デプロイ管理',
          to: '/cloud/projects/deploys',
        },
        {
          label: 'プロフィール設定',
          to: '/cloud/account/account-settings',
        },
      ],
    },
  ],

  /** ドキュメンテーションを改善するためのご協力 */
  huitd: {
    label: 'ドキュメンテーション改善にご協力ください',
    href: 'https://github.com/strapi/documentation',
  },
};

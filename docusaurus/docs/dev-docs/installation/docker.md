---
title: DockerでStrapiを実行する
displayed_sidebar: devDocsSidebar
description: ローカルプロジェクトからDockerコンテナを迅速に作成する方法を学びます。
tags:
- インストール
- 環境
- MySQL
---

# DockerコンテナでStrapiを実行する

:::caution
Strapiは公式のコンテナイメージを提供していません。以下の手順はコミュニティへの参考情報として提供されています。質問があれば[Discord](https://discord.strapi.io)でお問い合わせください。
:::

:::danger
Strapiアプリケーションは、Strapiが作成していない既存のデータベースやStrapi v3のデータベースに接続することを意図していません。そのような試みはサポートされず、データの消失（テーブルの削除など）が発生する可能性が非常に高いです。
:::

このドキュメントでは、既存のStrapiプロジェクトを使用してカスタム[Docker](https://www.docker.com/)コンテナを構築する方法を説明します。

Dockerは、ライブラリや依存関係など、アプリケーションが機能するために必要なすべての要素を含むコンテナを使用して、開発、配布、実行を可能にするオープンプラットフォームです。コンテナは互いに隔離されており、独自のソフトウェア、ライブラリ、設定ファイルをバンドルしますが、定義済みのチャネルを通じて通信できます。

:::prerequisites
- [Docker](https://www.docker.com/)がインストールされていること
- [Node.jsのサポートバージョン](./cli.md#step-1-make-sure-requirements-are-met)がインストールされていること
- **既存のStrapi 5プロジェクト**、または[Quick Startガイド](/dev-docs/quick-start.md)で作成された新しいプロジェクト
- (_オプション_) [Yarn](https://yarnpkg.com/)がインストールされていること
- (_オプション_) [Docker Compose](https://docs.docker.com/compose/)がインストールされていること
:::

## 開発環境およびステージング環境

ローカルでStrapiを実行する場合、[Dockerfile](https://docs.docker.com/engine/reference/builder/)を使用して開発用のDockerイメージを作成できます。必要に応じて、[docker-compose.yml](https://docs.docker.com/compose/compose-file/)を使用してデータベースコンテナを起動することもできます。

いずれの方法も、既存のStrapiプロジェクト、または[Quick Startガイド](/dev-docs/quick-start.md)を参照して作成した新しいプロジェクトが必要です。

### 開発用Dockerfile

次の`Dockerfile`は、Strapiプロジェクト用の非本番環境用Dockerイメージを作成するために使用できます。

:::note
`docker-compose`を使用している場合、環境変数は`docker-compose.yml`または`.env`ファイルで設定されるため、手動で設定する必要はありません。
:::

<DockerEnvTable components={props.components} />

`Dockerfile`とそのコマンドに関する詳細は、[Docker公式ドキュメント](https://docs.docker.com/engine/reference/commandline/cli/)を参照してください。

サンプルの`Dockerfile`:

<Tabs groupId="yarn-npm">

<TabItem value="yarn" label="yarn">

```dockerfile title="./Dockerfile"
FROM node:18-alpine3.18
# sharpライブラリの互換性のためlibvips-devをインストール
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "develop"]
```

</TabItem>

<TabItem value="npm" label="npm">

```dockerfile title="./Dockerfile"
FROM node:18-alpine3.18
# sharpライブラリの互換性のためlibvips-devをインストール
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
```

</TabItem>

</Tabs>

### （オプション）Docker Compose

次の`docker-compose.yml`を使用して、データベースコンテナとStrapiコンテナを起動し、両者間で通信するための共有ネットワークを作成できます。

:::note
Docker Composeおよびそのコマンドの詳細については、[Docker Composeドキュメント](https://docs.docker.com/compose/)を参照してください。
:::

サンプルの`docker-compose.yml`:

<Tabs groupId="databases">

<TabItem value="mysql" label="MySQL">

```yml title="./docker-compose.yml"
version: "3"
services:
  strapi:
    container_name: strapi
    build: .
    image: strapi:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: ${DATABASE_CLIENT}
      DATABASE_HOST: strapiDB
      DATABASE_PORT: ${DATABASE_PORT}
      DATABASE_NAME: ${DATABASE_NAME}
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
      NODE_ENV: ${NODE_ENV}
    volumes:
      - ./config:/opt/app/config
      - ./src:/opt/app/src
      - ./package.json:/opt/package.json
      - ./yarn.lock:/opt/yarn.lock
      - ./.env:/opt/app/.env
      - ./public/uploads:/opt/app/public/uploads
    ports:
      - "1337:1337"
    networks:
      - strapi
    depends_on:
      - strapiDB

  strapiDB:
    container_name: strapiDB
    platform: linux/amd64 # Apple M1チップのプラットフォームエラー対策
    restart: unless-stopped
    env_file: .env
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_USER: ${DATABASE_USERNAME}
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_DATABASE: ${DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/mysql
      #- ./data:/var/lib/mysql # バインドフォルダを使用する場合
    ports:
      - "3306:3306"
    networks:
      - strapi

volumes:
  strapi-data:

networks:
  strapi:
    name: Strapi
    driver: bridge
```

</TabItem>

<TabItem value="mariadb" label="MariaDB">

```yml title="./docker-compose.yml"
version: "3"
services:
  strapi:
    container_name: strapi
    build: .
    image: strapi:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: ${DATABASE_CLIENT}
      DATABASE_HOST: strapiDB
      DATABASE_PORT: ${DATABASE_PORT}
      DATABASE_NAME: ${DATABASE_NAME}
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
      NODE_ENV: ${NODE_ENV}
    volumes:
      - ./config:/opt/app/config
      - ./src:/opt/app/src
      - ./package.json:/opt/package.json
      - ./yarn.lock:/opt/yarn.lock
      - ./.env:/opt/app/.env
      - ./public/uploads:/opt/app/public/uploads
    ports:
      - "1337:1337"
    networks:
      - strapi
    depends_on:
      - strapiDB

 

 strapiDB:
    container_name: strapiDB
    platform: linux/amd64 # Apple M1チップのプラットフォームエラー対策
    restart: unless-stopped
    env_file: .env
    image: mariadb:latest
    environment:
      MYSQL_USER: ${DATABASE_USERNAME}
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_DATABASE: ${DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/mysql
      #- ./data:/var/lib/mysql # バインドフォルダを使用する場合
    ports:
      - "3306:3306"
    networks:
      - strapi

volumes:
  strapi-data:

networks:
  strapi:
    name: Strapi
    driver: bridge
```

</TabItem>

<TabItem value="postgresql" label="PostgreSQL">

```yml title="./docker-compose.yml"
version: "3"
services:
  strapi:
    container_name: strapi
    build: .
    image: strapi:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: ${DATABASE_CLIENT}
      DATABASE_HOST: strapiDB
      DATABASE_PORT: ${DATABASE_PORT}
      DATABASE_NAME: ${DATABASE_NAME}
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
      NODE_ENV: ${NODE_ENV}
    volumes:
      - ./config:/opt/app/config
      - ./src:/opt/app/src
      - ./package.json:/opt/package.json
      - ./yarn.lock:/opt/yarn.lock
      - ./.env:/opt/app/.env
      - ./public/uploads:/opt/app/public/uploads
    ports:
      - "1337:1337"
    networks:
      - strapi
    depends_on:
      - strapiDB

  strapiDB:
    container_name: strapiDB
    platform: linux/amd64 # Apple M1チップのプラットフォームエラー対策
    restart: unless-stopped
    env_file: .env
    image: postgres:12.0-alpine
    environment:
      POSTGRES_USER: ${DATABASE_USERNAME}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
      POSTGRES_DB: ${DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/postgresql/data/ # ボリューム使用
      #- ./data:/var/lib/postgresql/data/ # バインドフォルダを使用する場合
    ports:
      - "5432:5432"
    networks:
      - strapi

volumes:
  strapi-data:

networks:
  strapi:
    name: Strapi
    driver: bridge
```

</TabItem>

</Tabs>

## 本番環境

本番環境で使用されるDockerイメージは、開発環境/ステージング環境とは異なります。これは、管理パネルのビルドプロセスとアプリケーションを実行するためのコマンドの違いによるものです。本番環境では、通常、リバースプロキシを使用してアプリケーションと管理パネルを提供します。Dockerイメージは、管理パネルの本番ビルドで作成され、アプリケーションを実行するために`strapi start`コマンドが使用されます。

`Dockerfile`が作成された後、[本番用コンテナ](#building-the-production-container)を構築できます。

## 本番用Dockerイメージのビルド

Strapiプロジェクト用の本番用Dockerイメージをビルドするには、以下のコマンドを実行します:

```bash
docker build \
  --build-arg NODE_ENV=production \
  # --build-arg STRAPI_URL=https://api.example.com \ # StrapiサーバーURLを設定する場合はコメント解除
  -t mystrapiapp:latest \ # イメージ名を置き換え
  -f Dockerfile.prod .
```

## （オプション）コンテナをレジストリに公開

Strapiプロジェクト用の本番Dockerイメージをビルドした後、Dockerレジストリに公開できます。セキュリティ上の理由から、本番環境で使用する際はプライベートレジストリを使用することが推奨されます。

ホスティングプロバイダに応じて、イメージを公開するために異なるコマンドが必要な場合があります。詳細は、[Dockerのドキュメント](https://docs.docker.com/engine/reference/commandline/push/)を参照してください。

### 人気のあるホスティングプロバイダ:
- [AWS ECR](https://aws.amazon.com/ecr/)
- [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)
- [GCP Container Registry](https://cloud.google.com/container-registry)
- [Digital Ocean Container Registry](https://www.digitalocean.com/products/container-registry/)
- [IBM Cloud Container Registry](https://www.ibm.com/cloud/container-registry)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Gitlab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/)

## コミュニティツール

Strapiをさまざまなクラウドプロバイダにデプロイしたり、Docker環境を開発または本番環境で設定する際に役立つコミュニティツールがいくつかあります。

### @strapi-community/dockerize

`@strapi-community/dockerize`パッケージは、Strapiプロジェクト用の`Dockerfile`と`docker-compose.yml`ファイルを生成するCLIツールです。

開始するには、既存のStrapiプロジェクトフォルダ内で`npx @strapi-community/dockerize@latest`を実行し、CLIプロンプトに従ってください。

詳細は[GitHubリポジトリ](https://github.com/strapi-community/strapi-tool-dockerize)または[npmパッケージ](https://www.npmjs.com/package/@strapi-community/dockerize)を参照してください。

### @strapi-community/deployify

`@strapi-community/deployify`パッケージは、さまざまなクラウドプロバイダやホスティングサービスにアプリケーションをデプロイするためのCLIツールです。多くのプロバイダが、StrapiプロジェクトをDockerコンテナでデプロイする機能をサポートしており、必要に応じて`@strapi-community/dockerize`パッケージを呼び出して必要なファイルを生成します。

開始するには、既存のStrapiプロジェクトフォルダ内で`npx @strapi-community/deployify@latest`を実行し、CLIプロンプトに従ってください。

詳細は[GitHubリポジトリ](https://github.com/strapi-community/strapi-tool-deployify)または[npmパッケージ](https://www.npmjs.com/package/@strapi-community/deployify)を参照してください。

## Docker FAQ

### Strapiが公式のDockerイメージを提供していない理由は何ですか？

Strapiは、さまざまな種類のアプリケーションを構築できるフレームワークです。そのため、すべてのユースケースで使用できる単一のDockerイメージを提供することは不可能です。

### なぜ開発用と本番用のDockerfileが異なるのですか？

管理パネルのビルド方法が主な理由です。管理パネルはReactで構築され、ビルドプロセス中にStrapiアプリケーションにバンドルされます。このため、Strapiのバックエンドは管理パネルを提供するWebサーバーとして機能し、特定の環境変数が管理パネルに静的にコンパイルされます。

開発環境はパフォーマンス最適化が行われておらず、公開インターネットに露出することを意図していないため、開発環境と本番環境で異なるDockerイメージをビルドすることが一般的に推奨されます。

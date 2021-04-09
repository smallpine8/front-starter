# front-starter

## 開発環境について

- Node.js 12.18.2
- npm 6.14.5
- MACOS Catalina

## プロジェクトのセットアップ

依存モジュールのインストール

```shell
npm i
```

## ディレクトリ構造

```
.
├── README.md
├── _dist
├── _public
├── _src
├── patches
├── .babelrc
├── .browserslistrc
├── .eslintrc.json
├── .git
├── .gitignore
├── .prettierrc
├── .stylelintrc.json
├── bs-config.js
├── gulpfile.js
├── imagemin.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── webpack.config.common.js
├── webpack.config.development.js
└── webpack.config.production.js
```

|ディレクトリもしくはファイル名|説明|
|---|---|
|_dist|本番ビルド用のファイルを格納するディレクトリ|
|_public|開発時中間生成物のドキュメントルートとなるディレクトリ|
|_src|ビルド前のソースコードを格納しているディレクトリ|
|patches|prettier-stylelint@0.4.2の[issue](https://github.com/prettier/prettier/issues/7999#issue-597265101)に対する修正パッチを当てているファイル<br>[patch-package](https://www.npmjs.com/package/patch-package)を使用|
|.babelrc|[babel](https://babeljs.io/docs/en/babel-preset-env)が実行するトランスパイルの設定ファイル|
|.browserslistrc|[browserlist](https://github.com/browserslist/browserslist)の設定ファイル|
|.eslintrc.json|[ESLint](https://eslint.org/)の設定ファイル、TypeScriptのルール設定に使用|
|.gitignore|git管理しないファイル/ディレクトリを記載するファイル|
|.prettierrc|コードフォーマッター[prettier](https://prettier.io/docs/en/index.html)の設定ファイル|
|.stylelintrc.json|[stylelint](https://stylelint.io/)の設定ファイル、scssのルール設定に使用|
|bs-config.js|開発用HTTPサーバーを立ち上げている[browsersync](https://browsersync.io/)の設定ファイル|
|gulpfile.js|タスクランナー[Gulp](https://gulpjs.com/)の設定ファイル<br>テンプレートエンジン[EJS](https://ejs.co/#about)のコンパイルに使用|
|imagemin.js|画像圧縮パッケージの[imagemin](https://github.com/imagemin/imagemin#readme)の設定ファイル|
|package-lock.json|package.jsonの情報をもとに自動生成されるファイル<br>開発者間が同一の依存関係をインストールするために必要|
|package.json|npmでインストールした[パッケージ情報や開発時に使用するnpm scriptsを管理しているファイル](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)|
|tsconfig.json|[TypeScriptコンパイラ](https://www.typescriptlang.org/ja/tsconfig)の設定ファイル|
|webpack.config.common.js|webpackの開発・本番ビルドに使用する共通の設定ファイル|
|webpack.config.development.js|webpackの開発ビルド用設定ファイル|
|webpack.config.production.js|webpackの本番ビルド用設定ファイル|


## 開発用スクリプト

開発で使用するタスクを[npm scripts](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#scripts)に定義

### 開発時に実行

```shell
npm start
```


### 本番ビルド

```shell
npm run build
```


### コードのフォーマット

[prettierのオプションに沿って](https://prettier.io/docs/en/options.html)`.scss`、`.ts`ファイルをフォーマット

```shell
npm run format
```

## browserlistについて

対応するブラウザ要件に応じて、プロジェクトセットアップ時に応じて設定を変更してください。  
[browserlistドキュメント](https://github.com/browserslist/browserslist)

### コードの静的チェック

[ESLint](https://eslint.org/)、[stylelint](https://stylelint.io/)を使用して`.scss`、`.ts`を設定ファイルのルールに沿っているかチェック

```shell
npm run lint
```

## HTMLについて

テンプレートエンジン[EJS](https://ejs.co/#about)を使用しています  
`pages`配下にページとしてコンパイルされる`.ejs`ファイルを作成してコーディングします

ex)_src/html/pages/配下に、index.ejs、foo/index.ejsを作成

```
_src/html/pages/
├── foo
│   └── index.ejs
└── index.ejs
↓にコンパイル
_public/
├── foo
│   └── index.html
└── index.html
```

## パーシャル

パーシャル（ビューの共通化）を行う際は、`partials`ディレクトリに`.ejs`ファイルを作成することで、ルート相対パスのようにパーシャルをコールできます

ex) _src/html/pages/index.ejsで、_src/html/patials/header.ejsを使用する

```javascript
  <%- include('/header')%>
```

## CSSについて

[FLOCSS](https://github.com/hiloki/flocss)準拠のコーディングをします  
`_src/css/common.scss`、`_src/css/object/project/`配下の`.scss`ファイルがエントリーポイントとして`css`にコンパイルされます

ex) _src/css/common.scss、_src/css/object/project/style.scssがある場合

```
_src/css/
├── common.scss
└── object
    ├── component
    └── project
        └── style.scss
↓
_public/css/
├── common.css
└── style.css
```

`common.css`はリセットや全体で使用するコンポーネントのスタイルについて使用する想定のファイルです。  
`foundation`、`layout`、`component`レイヤーのファイルをすべて`import`することで、共通のファイルとして管理します  
必ずすべての`html`に読み込ませてください  
`common.css`は後述するページ固有のスタイルより先に読み込ませてください  
ページ固有のスタイルは、`_src/css/object/project`配下に作成する`html`と対応するディレクトリを作成し、その中に`style.scss`というファイル名で記載しページ固有のスタイルを記述します

例）/hoge/foo/index.ejsを作成

```
ディレクトリが対応していないのでNG
_src
└──  css
     └── object
         ├── component
         └── project
             └── style.scss
```

```
ディレクトリが対応しているのでOK
_src
└── css
    └── object
        ├── component
        └── project
            └── hoge
                └─ foo
                  └─ style.scss
```

## JSについて

[TypeScript](https://www.typescriptlang.org/ja/)を使用して開発します

`common.ts`はページ全体の共通処理について記載されているファイルなので、必ず`html`に読み込ませてください  
ページ固有の処理が必要な場合は、`_src/js`配下に、作成する`html`と対応するディレクトリを作成し、その中に`index.ts`を作成して記述してください

例）/hoge/foo/index.htmlを作成

```
ディレクトリ名が対応していないのでNG
_src_
└── js
    ├── common.js
    └── hoge
         └── index.js
```

```
ディレクトリ名が対応しているのでOK
_src_
└── js
    ├── common.js
    └── hoge
        └── foo
            └── index.js
```


### JavaScriptライブラリの使用について

型定義ファイルがないパッケージを使用したい場合は、`DefinitelyTyped`に型定義ファイルがあるかどうか確認し、合わせてインストールします  
[こちらから検索](https://www.typescriptlang.org/dt/search?search=)

ex) jQueryを使用したい

```shell
npm i jquery
npm i -D @types/jquery
```

## CSS・JS以外の静的アセットについて

### 画像について

`_src/assets/images`に画像を格納します  
`imagemin`を使用して'_src/assets/images/**/*.{jpg,jpeg,png,svg,ico,gif}'が圧縮してコピーされます  
開発時は、`_public/assets/images/`  
本番ビルド時、`_dist/assets/images/`にコピーされます

CSS、JS同様ページ固有の画像を使用する場合は、`_src/assets/images/`配下に作成する`html`と対応したディレクトリを作成して画像を格納していってください  
複数ページで使用することが想定される画像に関しては、抽象化したディレクトリ名を切って格納していくことが望ましいです

ex) 全ページで使用するlogo.pngの格納先

```
_src/assets/images/
└── logo
    └── header_logo.png
```

### 画像以外のアセットについて

`_src/assets/`配下にディレクトリを切って格納することで、コピーされます。  
開発時は、`_public/assets/`  
本番ビルド時、`_dist/assets/`にコピーされます
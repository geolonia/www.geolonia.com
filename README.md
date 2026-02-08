# www.geolonia.com

株式会社Geoloniaのコーポレートサイト

## 技術スタック

- [Astro](https://astro.build/) - 静的サイトジェネレーター
- Markdown/MDX - コンテンツ管理
- Cucumber + Playwright - E2Eテスト

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（ポート8080）
npm start
```

開発サーバーは http://localhost:8080 で起動し、ブラウザが自動的に開きます。

## コンテンツの編集

すべてのページコンテンツは `src/content/pages/` ディレクトリ内のMarkdownファイルで管理されています。

```
src/content/pages/
├── company/
│   ├── index.md          # 会社概要
│   └── recruit.md        # 採用情報
├── products.md           # プロダクト
├── developer.md          # 開発者向け
└── ...
```

Markdownファイルを編集すると、自動的にページに反映されます。

**📖 詳しい記述方法は [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) を参照してください。**

- フロントマターの設定方法
- マークダウン記法
- OGP設定
- ページ追加方法
- ベストプラクティス

## テスト

E2Eテストは[Cucumber](https://cucumber.io/)と[Playwright](https://playwright.dev/)を使用しています。

### テストの実行

```bash
# 開発サーバーが起動していることを確認（別ターミナルで npm start）

# テストの実行
npm test

# CI用（JSON形式のレポート出力）
npm run test:ci
```

### テストの構成

```
features/
├── navigation.feature         # ナビゲーションテスト
├── header-styles.feature      # ヘッダースタイルテスト
├── content.feature            # コンテンツ表示テスト
├── responsive.feature         # レスポンシブデザインテスト
├── hamburger-menu.feature     # ハンバーガーメニューテスト
├── common-components.feature  # 共通コンポーネントテスト
├── step_definitions/          # ステップ定義
└── support/                   # テストサポートファイル
```

### テストシナリオ

- **ナビゲーション**: 全メニューページへのアクセス、サブメニューの動作
- **ヘッダースタイル**: ホームページと子ページでのヘッダースタイルの違い
- **コンテンツ**: Markdownコンテンツの正しいレンダリング、リンクの動作
- **レスポンシブ**: デスクトップとモバイルでの表示
- **ハンバーガーメニュー**: モバイルメニューの開閉、サブメニュー展開
- **共通コンポーネント**: ヘッダー・フッターの表示、ロゴリンク、お問い合わせボタン

## ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## ディレクトリ構造

```
.
├── public/              # 静的ファイル（画像など）
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   ├── content/         # Markdownコンテンツ
│   │   └── pages/       # ページコンテンツ
│   ├── layouts/         # レイアウトコンポーネント
│   └── pages/           # ページルーティング
├── features/            # E2Eテスト（Cucumber）
└── package.json
```

## ライセンス

このプロジェクトは、ソースコードとコンテンツで異なるライセンスを適用しています。

### ソースコード - MIT License

このプロジェクトのソースコード（HTML、CSS、JavaScript、Astroコンポーネントなど）は、MITライセンスの下で公開されています。

**以下の行為が可能です：**
- ✅ 商用利用
- ✅ 改変
- ✅ 配布
- ✅ 私的利用

**条件：**
- 著作権表示とライセンス表示を含めること

詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

### コンテンツ - All Rights Reserved

以下のコンテンツは、株式会社Geoloniaが著作権を保持しており、無断での使用・複製・配布を禁じます：

- 文章・記事
- 画像・グラフィック
- 会社情報
- 製品説明
- ブログ記事・ニュースリリース

**これらのコンテンツを使用する場合は、事前に書面による許可が必要です。**

### 商標 - Registered Trademark

**Geolonia®** および Geolonia ロゴは、株式会社Geoloniaの登録商標です。

以下の使用には、事前に書面による許可が必要です：
- Geolonia の名称
- Geolonia ロゴ
- その他のブランド資産

### お問い合わせ

ライセンスに関するご質問は、[お問い合わせページ](https://www.geolonia.com/contact/)からご連絡ください。

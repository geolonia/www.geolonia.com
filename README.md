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
npm run dev
```

開発サーバーは http://localhost:8080 で起動します。

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

## テスト

E2Eテストは[Cucumber](https://cucumber.io/)と[Playwright](https://playwright.dev/)を使用しています。

### テストの実行

```bash
# 開発サーバーが起動していることを確認（別ターミナルで npm run dev）

# テストの実行
npm test

# CI用（JSON形式のレポート出力）
npm run test:ci
```

### テストの構成

```
features/
├── navigation.feature      # ナビゲーションテスト
├── header-styles.feature   # ヘッダースタイルテスト
├── content.feature         # コンテンツ表示テスト
├── responsive.feature      # レスポンシブデザインテスト
├── step_definitions/       # ステップ定義
└── support/                # テストサポートファイル
```

### テストシナリオ

- **ナビゲーション**: 全メニューページへのアクセス、サブメニューの動作
- **ヘッダースタイル**: ホームページと子ページでのヘッダースタイルの違い
- **コンテンツ**: Markdownコンテンツの正しいレンダリング、リンクの動作
- **レスポンシブ**: デスクトップとモバイルでの表示

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

- **ソースコード**: MIT License
- **コンテンツ**: © 2024 Geolonia Inc. All Rights Reserved
- **商標**: Geolonia® は株式会社Geoloniaの登録商標です

詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

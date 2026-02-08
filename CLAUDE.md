# www.geolonia.com - プロジェクト構成

株式会社Geoloniaのコーポレートサイト

## プロジェクト概要

- **フレームワーク**: Astro 5.x（静的サイトジェネレーター）
- **コンテンツ管理**: Markdown/MDX（Astro Content Collections）
- **テスト**: Cucumber + Playwright（E2Eテスト）
- **開発サーバー**: ポート8080で起動
- **デプロイ**: 静的ファイル生成

## ディレクトリ構造

```
www.geolonia.com/
├── public/                          # 静的ファイル
│   └── images/                      # 画像ファイル
│       ├── geolonia_logo.png        # カラーロゴ（子ページ用）
│       └── geolonia_logo_white.png  # 白ロゴ（ホームページ用）
│
├── src/
│   ├── components/                  # 再利用可能なコンポーネント
│   │   ├── Header.astro             # ヘッダー（ホーム/子ページで自動切替）
│   │   └── Footer.astro             # フッター
│   │
│   ├── layouts/                     # レイアウトコンポーネント
│   │   ├── BaseLayout.astro         # 基本レイアウト
│   │   └── MarkdownPageLayout.astro # マークダウンページ用レイアウト
│   │
│   ├── content/                     # コンテンツコレクション
│   │   ├── config.ts                # コレクション定義
│   │   ├── pages/                   # 静的ページ（Markdown）
│   │   │   ├── company/
│   │   │   │   ├── index.md         # 会社概要
│   │   │   │   └── recruit.md       # 採用情報
│   │   │   ├── products.md
│   │   │   ├── developer.md
│   │   │   └── ...
│   │   ├── blog/                    # ブログ記事（日付順）
│   │   ├── news/                    # お知らせ（日付順）
│   │   └── press/                   # プレスリリース（日付順）
│   │
│   └── pages/                       # ページルーティング
│       ├── index.astro              # トップページ
│       ├── [...slug].astro          # 静的ページ（動的ルート）
│       ├── blog/
│       │   ├── index.astro          # ブログ一覧
│       │   └── [slug].astro         # ブログ記事詳細
│       ├── news/
│       │   ├── index.astro          # お知らせ一覧
│       │   └── [slug].astro         # お知らせ詳細
│       └── press/
│           ├── index.astro          # プレスリリース一覧
│           └── [slug].astro         # プレスリリース詳細
│
├── features/                        # E2Eテスト（Cucumber）
│   ├── navigation.feature           # ナビゲーションテスト
│   ├── header-styles.feature        # ヘッダースタイルテスト
│   ├── content.feature              # コンテンツテスト
│   ├── responsive.feature           # レスポンシブテスト
│   ├── step_definitions/
│   │   └── steps.cjs                # ステップ定義
│   └── support/
│       └── world.cjs                # テストコンテキスト
│
├── astro.config.mjs                 # Astro設定
├── cucumber.cjs                     # Cucumber設定
├── package.json                     # 依存関係とスクリプト
└── README.md                        # プロジェクトドキュメント
```

## 重要な設計パターン

### 1. ヘッダーの動的スタイル切替

`src/components/Header.astro` は、ホームページと子ページで自動的にスタイルを切り替えます。

- **ホームページ** (`/`)
  - 透明背景（`background-color: transparent`）
  - 白色のテキスト
  - 白色のロゴ（`geolonia_logo_white.png`）
  - `position: absolute`（ヒーロー画像の上に重なる）

- **子ページ** (`/company/`, `/products/` など)
  - 白背景（`background-color: #fff`）
  - 暗いテキスト（`#444`）
  - カラーロゴ（`geolonia_logo.png`）
  - `position: relative`（通常のフロー）
  - Box-shadow付き

実装:
```astro
const isHome = Astro.url.pathname === '/';
<header class={`site-header ${isHome ? 'site-header--home' : 'site-header--page'}`}>
```

### 2. コンテンツタイプ

このサイトには4種類のコンテンツタイプがあります：

#### 静的ページ（Pages）
`src/content/pages/` - 会社概要、製品紹介など、日付に依存しないページ

**特徴:**
- マークダウンファイルを追加するだけで自動的にページ生成
- `src/pages/[...slug].astro` が動的にルーティング
- URL: `/company/`, `/products/` など

**新規ページの追加方法:**
```bash
# 例: /services/ ページを作成
cat > src/content/pages/services.md <<EOF
---
title: "サービス"
description: "提供サービス一覧"
---

## サービス内容
...
EOF
```

#### ブログ（Blog）
`src/content/blog/` - 技術ブログ、開発者向け記事

**特徴:**
- 日付順にソート表示
- タグ、カテゴリ機能
- URL: `/blog/`, `/blog/post-name/`

#### お知らせ（News）
`src/content/news/` - 一般的なお知らせ、更新情報

**特徴:**
- 日付順にソート表示
- カテゴリ機能
- URL: `/news/`, `/news/announcement-name/`

#### プレスリリース（Press）
`src/content/press/` - 正式なプレスリリース

**特徴:**
- 日付順にソート表示
- カテゴリ機能
- URL: `/press/`, `/press/release-name/`

### 3. Content Collections

Astro Content Collectionsを使用してコンテンツを管理しています。

**定義:** `src/content/config.ts`
```typescript
// 静的ページ
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lead: z.string().optional(),
  }),
});

// ブログ記事
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// お知らせ
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().optional(),
  }),
});

// プレスリリース
const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().optional(),
  }),
});
```

## 開発ワークフロー

### 開発サーバーの起動

```bash
npm run dev
```

- ポート8080で起動
- ファイル変更を自動検知
- ホットリロード有効

### コンテンツの追加・編集

#### 静的ページの追加
マークダウンファイルを追加するだけで自動的にページが生成されます。

```bash
# 例: /services/ ページを作成
cat > src/content/pages/services.md <<EOF
---
title: "サービス"
description: "提供サービス一覧"
lead: "Geoloniaが提供するサービス"
---

## サービス内容
...
EOF
```

→ 自動的に `/services/` でアクセス可能になります

#### ブログ記事の追加
```bash
cat > src/content/blog/2024-02-08-new-feature.md <<EOF
---
title: "新機能をリリースしました"
description: "○○機能の追加について"
pubDate: 2024-02-08
author: "Geolonia"
tags: ["お知らせ", "新機能"]
---

## 新機能について
...
EOF
```

#### お知らせの追加
```bash
cat > src/content/news/2024-02-08-maintenance.md <<EOF
---
title: "メンテナンスのお知らせ"
description: "定期メンテナンス実施について"
pubDate: 2024-02-08
category: "メンテナンス"
---

## メンテナンス内容
...
EOF
```

#### プレスリリースの追加
```bash
cat > src/content/press/2024-02-08-funding.md <<EOF
---
title: "シリーズA資金調達を実施"
description: "○○億円の資金調達について"
pubDate: 2024-02-08
category: "資金調達"
---

## 概要
...
EOF
```

### テストの実行

```bash
# 開発サーバーを起動（別ターミナル）
npm run dev

# テスト実行
npm test

# CI用（JSON形式のレポート出力）
npm run test:ci
```

### ビルド

```bash
# 型チェック + ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### デプロイチェックリスト

デプロイ前に以下を必ず確認してください：

#### 1. **コード品質チェック**
- [ ] すべての変更をコミット済み
- [ ] `git status` がクリーン
- [ ] コードレビュー完了（該当する場合）

#### 2. **テスト実行**
```bash
# 開発サーバーを起動
npm run dev

# 別ターミナルでテスト実行
npm test
```
- [ ] すべてのE2Eテストがパス
- [ ] 手動で主要ページを確認

#### 3. **ドキュメント更新（重要）**
以下のファイルを**必ず**更新してください：

**llms.txt と llms-full.txt の更新:**
- [ ] `llms.txt` - サイトコンテンツの概要を反映
- [ ] `llms-full.txt` - サイトコンテンツの詳細情報を反映

**⚠️ 重要なルール:**
- これらのファイルは `src/content/pages/` 配下のマークダウンコンテンツから生成すること
- **README.md を参照してはならない**
- ウェブサイトの内容（会社情報、製品情報、サービス内容）を記載する
- 開発者向けの情報ではなく、サイト訪問者向けの情報を含める

**含めるべき情報:**
- 会社概要（`src/content/pages/company/index.md` から）
- プロダクト情報（`src/content/pages/products.md` から）
- サービス内容（各製品ページから）
- 会社のミッションとビジョン
- お問い合わせ情報

**含めてはいけない情報:**
- ❌ npm コマンドや開発手順
- ❌ テストの実行方法
- ❌ ディレクトリ構造の技術的詳細
- ❌ ビルドシステムの情報

これらのファイルは、AIがウェブサイトの**内容**を正しく理解し、
訪問者の質問に適切に答えられるようにするためのものです。

#### 4. **ビルド確認**
```bash
# ビルド実行
npm run build

# ビルド結果を確認
npm run preview
```
- [ ] ビルドエラーがない
- [ ] プレビューで主要ページが正しく表示される
- [ ] 画像やアセットが正しく読み込まれる
- [ ] リンクが正しく機能する

#### 5. **最終チェック**
- [ ] README.md が最新
- [ ] CHANGELOG.md を更新（該当する場合）
- [ ] package.json のバージョンを更新（該当する場合）
- [ ] 環境変数の確認（本番環境）

#### 6. **デプロイ実行**
```bash
# mainブランチにマージ
git checkout main
git merge [feature-branch]
git push origin main
```

#### 7. **デプロイ後確認**
- [ ] 本番サイトが正しく表示される
- [ ] すべてのページにアクセス可能
- [ ] ヘッダー・フッターが正しく表示される
- [ ] レスポンシブデザインが機能している
- [ ] Analytics/モニタリングツールが動作している（該当する場合）

#### 8. **ロールバック手順**
問題が発生した場合：
```bash
# 前のコミットに戻す
git revert HEAD
git push origin main
```

## コーディング規約

### Astroコンポーネント

- ファイル名: PascalCase（例: `Header.astro`, `BaseLayout.astro`）
- スタイルは `<style>` タグ内にスコープ化して記述
- グローバルスタイルは `is:global` を使用

### Markdownコンテンツ

- ファイル名: kebab-case（例: `index.md`, `recruit.md`）
- フロントマターは必須（`title`, `description`）
- 見出しレベル: `##` から開始（`#` はページタイトル用に予約）

### CSS/スタイル

- カラー変数:
  - プライマリ: `#f39813`
  - プライマリダーク: `#c2790f`
  - プライマリビビッド: `#ffa714`
- コンテナ幅: 最大 `1140px`
- ブレークポイント:
  - モバイル: `max-width: 768px`
  - タブレット: `max-width: 991px`
  - デスクトップ: `min-width: 992px`

## テスト構成

### Cucumberテストシナリオ

すべてのテストは日本語（Gherkin）で記述されています。

**主要テストカテゴリ:**

1. **ナビゲーション** (`features/navigation.feature`)
   - すべてのメニューページへのアクセス
   - サブメニューの動作
   - ページ遷移

2. **ヘッダースタイル** (`features/header-styles.feature`)
   - ホームページ: 透明背景 + 白テキスト
   - 子ページ: 白背景 + 暗いテキスト
   - ロゴ画像の切り替え

3. **コンテンツ** (`features/content.feature`)
   - Markdownのレンダリング
   - テーブル表示
   - リンクの動作

4. **レスポンシブ** (`features/responsive.feature`)
   - デスクトップ表示
   - モバイル表示
   - コンテンツ幅

### テストの追加

新しいテストシナリオを追加する場合:

1. `features/` に `.feature` ファイルを作成
2. 必要に応じて `features/step_definitions/steps.cjs` にステップを追加
3. `npm test` で動作確認

## 注意事項

### 重要なファイル

以下のファイルは直接編集しないでください:
- `.astro/` - Astroが自動生成するファイル
- `dist/` - ビルド出力（`.gitignore`済み）
- `node_modules/` - 依存関係

### Git管理

- コミット前に必ずテストを実行
- コミットメッセージは簡潔に、変更内容を明確に
- 大きな変更は機能ごとに分割してコミット

### パフォーマンス

- 画像は適切なサイズに最適化
- 不要なJavaScriptは含めない（Astroは静的HTML生成）
- CSSは必要最小限に

## トラブルシューティング

### ポート8080が使用中

```bash
# ポートを使用しているプロセスを確認
lsof -ti:8080

# プロセスを終了
kill $(lsof -ti:8080)
```

### テストが失敗する

1. 開発サーバーが起動しているか確認（`npm run dev`）
2. ポート8080でアクセスできるか確認（`http://localhost:8080`）
3. ブラウザで手動確認してから再テスト

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .astro dist

# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# 再ビルド
npm run build
```

## 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cucumber.js](https://cucumber.io/docs/cucumber/)
- [Playwright](https://playwright.dev/)

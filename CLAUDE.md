# www.geolonia.com - プロジェクト構成ドキュメント

株式会社Geoloniaのコーポレートサイト

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [ディレクトリ構造](#ディレクトリ構造)
3. [コンテンツタイプ](#コンテンツタイプ)
4. [重要な設計パターン](#重要な設計パターン)
5. [開発ワークフロー](#開発ワークフロー)
6. [テスト](#テスト)
7. [デプロイ](#デプロイ)
8. [トラブルシューティング](#トラブルシューティング)

---

## プロジェクト概要

### 技術スタック

| 項目 | 技術 |
|------|------|
| **フレームワーク** | Astro 5.x（静的サイトジェネレーター） |
| **コンテンツ管理** | Markdown/MDX（Astro Content Collections） |
| **テスト** | Cucumber + Playwright（E2Eテスト） |
| **言語** | TypeScript / JavaScript |
| **開発サーバー** | ポート8080 |
| **デプロイ** | 静的ファイル生成 |

### 特徴

- ✅ **マークダウンベース** - コンテンツをマークダウンで管理
- ✅ **自動ページ生成** - マークダウン追加だけでページ生成
- ✅ **型安全** - Astro Content Collectionsによる型チェック
- ✅ **高速** - 静的HTML生成で高速表示
- ✅ **テスト自動化** - E2Eテストで品質保証

---

## ディレクトリ構造

```
www.geolonia.com/
├── public/                          # 静的ファイル（画像、フォントなど）
│   ├── llms.txt                     # AI向けサイト概要（/llms.txt でアクセス可能）
│   ├── llms-full.txt                # AI向けサイト詳細（/llms-full.txt でアクセス可能）
│   └── images/
│       ├── geolonia_logo.png        # カラーロゴ（子ページ用）
│       ├── geolonia_logo_white.png  # 白ロゴ（ホーム用）
│       └── ...
│
├── src/
│   ├── components/                  # 再利用可能なコンポーネント
│   │   ├── Header.astro             # ヘッダー（ホーム/子で自動切替）
│   │   └── Footer.astro             # フッター
│   │
│   ├── layouts/                     # レイアウトコンポーネント
│   │   ├── BaseLayout.astro         # 基本レイアウト
│   │   └── MarkdownPageLayout.astro # マークダウン用レイアウト
│   │
│   ├── content/                     # ★コンテンツコレクション
│   │   ├── config.ts                # コレクション定義（型安全）
│   │   │
│   │   ├── pages/                   # 📄 静的ページ（日付なし）
│   │   │   ├── company/
│   │   │   │   ├── index.md         # /company/
│   │   │   │   └── recruit.md       # /company/recruit/
│   │   │   ├── products.md          # /products/
│   │   │   ├── developer.md         # /developer/
│   │   │   ├── contact.md           # /contact/
│   │   │   ├── maps/
│   │   │   │   ├── index.md         # /maps/
│   │   │   │   └── dev.md           # /maps/dev/
│   │   │   ├── products/
│   │   │   │   └── faq.md           # /products/faq/
│   │   │   ├── resources/
│   │   │   │   ├── index.md
│   │   │   │   ├── github-for-governments.md
│   │   │   │   ├── geolonia-maps-for-smartcity.md
│   │   │   │   └── wp-jad-dx.md
│   │   │   ├── geolonia-maps-for-smartcity/
│   │   │   │   ├── index.md
│   │   │   │   └── seminar2025.md
│   │   │   ├── address-normalization.md
│   │   │   ├── smartmap.md
│   │   │   ├── information.md       # お知らせ一覧ページ
│   │   │   └── newsrelease.md       # プレスリリース一覧ページ
│   │   │
│   │   ├── blog/                    # 📝 ブログ記事（日付順）
│   │   │   └── .gitkeep             # 空ディレクトリ保持用
│   │   │
│   │   ├── news/                    # 📢 お知らせ（日付順）
│   │   │   └── .gitkeep
│   │   │
│   │   └── press/                   # 📰 プレスリリース（日付順）
│   │       └── .gitkeep
│   │
│   └── pages/                       # ★ページルーティング
│       ├── index.astro              # トップページ
│       │
│       ├── [...slug].astro          # 静的ページ（動的ルート）
│       │                            # src/content/pages/ から自動生成
│       │
│       ├── blog/
│       │   ├── index.astro          # /blog/ - 一覧
│       │   └── [slug].astro         # /blog/記事名/ - 詳細
│       │
│       ├── news/
│       │   ├── index.astro          # /news/ - 一覧
│       │   └── [slug].astro         # /news/お知らせ名/ - 詳細
│       │
│       └── press/
│           ├── index.astro          # /press/ - 一覧
│           └── [slug].astro         # /press/リリース名/ - 詳細
│
├── features/                        # ★E2Eテスト（Cucumber）
│   ├── navigation.feature           # ナビゲーションテスト
│   ├── header-styles.feature        # ヘッダースタイルテスト
│   ├── content.feature              # コンテンツテスト
│   ├── responsive.feature           # レスポンシブテスト
│   ├── hamburger-menu.feature       # ハンバーガーメニューテスト
│   ├── common-components.feature    # 共通コンポーネントテスト
│   ├── step_definitions/
│   │   └── steps.cjs                # ステップ定義（日本語Gherkin）
│   └── support/
│       └── world.cjs                # テストコンテキスト（Playwright）
│
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Pages自動デプロイ
│
├── .gitignore                       # Git除外設定
├── astro.config.mjs                 # Astro設定
├── cucumber.cjs                     # Cucumber設定
├── package.json                     # 依存関係とスクリプト
├── tsconfig.json                    # TypeScript設定
├── LICENSE                          # ライセンス（MIT + コンテンツ保護）
├── README.md                        # プロジェクト説明
└── CLAUDE.md                        # このファイル（開発ガイド）
```

---

## コンテンツタイプ

このサイトには**4種類のコンテンツタイプ**があります。

### コンテンツタイプ比較表

| タイプ | ディレクトリ | 用途 | ソート | URL例 |
|--------|------------|------|--------|-------|
| **📄 Pages** | `src/content/pages/` | 会社概要、製品紹介など固定コンテンツ | なし | `/company/`, `/products/` |
| **📝 Blog** | `src/content/blog/` | 技術記事、開発者向けブログ | 日付降順 | `/blog/new-feature/` |
| **📢 News** | `src/content/news/` | お知らせ、更新情報 | 日付降順 | `/news/maintenance/` |
| **📰 Press** | `src/content/press/` | プレスリリース、メディア向け | 日付降順 | `/press/funding/` |

### 1. 静的ページ（Pages）

**概要:**
- 日付に依存しない固定コンテンツ
- マークダウンファイルを追加するだけで自動的にページ生成
- `src/pages/[...slug].astro` が動的にルーティング

**スキーマ:**
```typescript
{
  title: string;           // 必須: ページタイトル
  description?: string;    // 任意: ページ説明
  lead?: string;          // 任意: リード文
}
```

**追加方法:**
```bash
# 例: /services/ ページを作成
cat > src/content/pages/services.md <<EOF
---
title: "サービス"
description: "Geoloniaが提供するサービス一覧"
lead: "お客様の課題を解決します"
---

## サービス内容

...
EOF
```

→ 自動的に `/services/` でアクセス可能になります

**URL生成ルール:**
- `pages/company/index.md` → `/company/`
- `pages/products.md` → `/products/`
- `pages/maps/dev.md` → `/maps/dev/`

### 2. ブログ（Blog）

**概要:**
- 技術記事、開発者向けブログ
- 日付順に自動ソート
- タグ機能あり

**スキーマ:**
```typescript
{
  title: string;           // 必須: 記事タイトル
  description: string;     // 必須: 記事説明
  pubDate: Date;          // 必須: 公開日
  author?: string;        // 任意: 著者名
  tags?: string[];        // 任意: タグ配列
}
```

**追加方法:**
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

→ `/blog/` に日付順で表示、`/blog/2024-02-08-new-feature/` でアクセス可能

### 3. お知らせ（News）

**概要:**
- 一般的なお知らせ、更新情報
- 日付順に自動ソート
- カテゴリ機能あり

**スキーマ:**
```typescript
{
  title: string;           // 必須: お知らせタイトル
  description: string;     // 必須: お知らせ説明
  pubDate: Date;          // 必須: 公開日
  category?: string;      // 任意: カテゴリ
}
```

**追加方法:**
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

→ `/news/` に日付順で表示、`/news/2024-02-08-maintenance/` でアクセス可能

### 4. プレスリリース（Press）

**概要:**
- 正式なプレスリリース、メディア向け発表
- 日付順に自動ソート
- カテゴリ機能あり

**スキーマ:**
```typescript
{
  title: string;           // 必須: リリースタイトル
  description: string;     // 必須: リリース説明
  pubDate: Date;          // 必須: 公開日
  category?: string;      // 任意: カテゴリ
}
```

**追加方法:**
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

→ `/press/` に日付順で表示、`/press/2024-02-08-funding/` でアクセス可能

---

## 重要な設計パターン

### 1. ヘッダーの動的スタイル切替

`src/components/Header.astro` は、ホームページと子ページで自動的にスタイルを切り替えます。

#### ホームページ (`/`)
- **背景**: 透明（`transparent`）
- **テキスト**: 白色
- **ロゴ**: 白色（`geolonia_logo_white.png`）
- **配置**: `position: absolute`（ヒーロー画像の上に重なる）

#### 子ページ (`/company/`, `/products/` など)
- **背景**: 白色（`#fff`）
- **テキスト**: 暗色（`#444`）
- **ロゴ**: カラー（`geolonia_logo.png`）
- **配置**: `position: relative`（通常のフロー）
- **効果**: Box-shadow付き

#### お問い合わせボタンの枠線
- **ホームページ**: 白色の枠線（`#fff`）
- **子ページ**: オレンジの枠線（`#f39813`）

#### 実装コード
```astro
---
const isHome = Astro.url.pathname === '/';
---
<header class={`site-header ${isHome ? 'site-header--home' : 'site-header--page'}`}>
  <h1 class="site-header-logo">
    <a href="/">
      <img src={isHome ? "/images/geolonia_logo_white.png" : "/images/geolonia_logo.png"} />
    </a>
  </h1>
</header>
```

```css
/* お問い合わせボタンの基本スタイル */
.global-nav-list > li.menu-item-contact > a {
  border: 2px solid #f39813;
  border-radius: 4px;
  padding: 10px 20px !important;
}

/* ホームページでは白い枠線 */
.site-header--home .global-nav-list > li.menu-item-contact > a {
  border-color: #fff;
}
```

### 2. 静的ページの自動生成

`src/pages/[...slug].astro` が `src/content/pages/` 内のすべてのマークダウンファイルを読み取り、自動的にページを生成します。

#### 動作フロー
1. `src/content/pages/` にマークダウンファイルを作成
2. Astroがビルド時にファイルを検出
3. `[...slug].astro` が動的にルートを生成
4. URLが自動的に割り当てられる

#### URL生成ルール
```
src/content/pages/company/index.md  → /company/
src/content/pages/products.md       → /products/
src/content/pages/maps/dev.md       → /maps/dev/
```

**重要:** `src/pages/` にファイルを追加する必要はありません！

### 3. Content Collections（型安全）

Astro Content Collectionsにより、コンテンツのフロントマターが型チェックされます。

**設定ファイル:** `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

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

export const collections = { pages, blog, news, press };
```

**メリット:**
- ✅ フロントマターの型チェック
- ✅ 必須フィールドの検証
- ✅ IDEの自動補完
- ✅ ビルド時エラー検出

---

## 開発ワークフロー

### 開発サーバーの起動

```bash
npm start
```

- **URL**: http://localhost:8080
- **ホットリロード**: 有効
- **自動検知**: ファイル変更を自動で反映
- **自動ブラウザ起動**: 有効（`--open` フラグ）

### コンテンツの追加・編集

#### 静的ページの編集

既存ページを編集する場合：

```bash
# ファイルを開いて編集
vim src/content/pages/company/index.md
```

保存すると自動的に反映されます。

#### 静的ページの追加

新しいページを追加する場合：

```bash
# 例: /partners/ ページを作成
cat > src/content/pages/partners.md <<EOF
---
title: "パートナー"
description: "パートナー企業一覧"
lead: "Geoloniaのパートナー企業"
---

## パートナー企業

- 株式会社A
- 株式会社B
EOF
```

自動的に `/partners/` でアクセス可能になります。

#### ブログ記事の追加

```bash
cat > src/content/blog/2024-02-15-ai-integration.md <<EOF
---
title: "AIを活用した新機能"
description: "AIによる住所自動補完機能をリリース"
pubDate: 2024-02-15
author: "Geolonia開発チーム"
tags: ["AI", "新機能", "住所正規化"]
---

## 概要

AIを活用した住所自動補完機能をリリースしました。

## 主な特徴

1. リアルタイム補完
2. 高精度な候補表示
3. ...
EOF
```

#### お知らせの追加

```bash
cat > src/content/news/2024-02-15-office-move.md <<EOF
---
title: "オフィス移転のお知らせ"
description: "2024年3月1日より新オフィスに移転します"
pubDate: 2024-02-15
category: "お知らせ"
---

## 移転先住所

東京都...
EOF
```

#### プレスリリースの追加

```bash
cat > src/content/press/2024-02-15-partnership.md <<EOF
---
title: "○○社との業務提携を発表"
description: "スマートシティ事業における業務提携について"
pubDate: 2024-02-15
category: "業務提携"
---

## 提携の概要

...
EOF
```

### ビルド

```bash
# 型チェック + ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

ビルド結果は `dist/` ディレクトリに出力されます。

---

## テスト

### E2Eテスト（Cucumber + Playwright）

すべてのテストは日本語（Gherkin）で記述されています。

#### テストの実行

```bash
# 開発サーバーを起動（別ターミナル）
npm start

# テスト実行
npm test

# CI用（JSON形式のレポート出力）
npm run test:ci
```

#### テストカテゴリ

| ファイル | テスト内容 |
|---------|----------|
| `features/navigation.feature` | すべてのメニューページへのアクセス、サブメニュー動作 |
| `features/header-styles.feature` | ヘッダースタイル（ホーム/子ページの切り替え） |
| `features/content.feature` | Markdownレンダリング、テーブル、リンク動作 |
| `features/responsive.feature` | デスクトップ/モバイル表示、コンテンツ幅 |
| `features/hamburger-menu.feature` | モバイルメニューの開閉、サブメニュー展開、オーバーレイ動作 |
| `features/common-components.feature` | ヘッダー・フッター表示、ロゴリンク、お問い合わせボタン枠線 |

#### テストの追加

新しいテストシナリオを追加する場合：

1. `features/` に `.feature` ファイルを作成
2. 必要に応じて `features/step_definitions/steps.cjs` にステップを追加
3. `npm test` で動作確認

**例:**
```gherkin
# features/my-test.feature
機能: 新機能のテスト

  シナリオ: ○○が正しく動作する
    前提 "/" ページを開く
    ならば "○○" が表示される
```

---

## デプロイ

### デプロイ環境

このプロジェクトは2つのデプロイ環境があります：

| 環境 | 用途 | URL | デプロイ方法 |
|------|------|-----|-------------|
| **ステージング** | 確認・テスト | https://geolonia.github.io/www.geolonia.com/ | GitHub Pages（自動） |
| **本番** | 公開サイト | https://www.geolonia.com/ | Netlify（自動） |

### GitHub Pages（ステージング環境）

mainブランチへのプッシュで自動的にステージング環境がデプロイされます。

#### 自動デプロイの仕組み

1. **mainブランチにプッシュ**すると自動的にデプロイが開始されます
2. GitHub Actionsが自動的にビルドを実行
3. ビルド結果が`gh-pages`ブランチにデプロイ
4. GitHub Pagesで公開

#### デプロイ手順

```bash
# 変更をコミット
git add .
git commit -m "Update content"

# mainブランチにプッシュ（自動デプロイ開始）
git push origin main
```

#### デプロイ状況の確認

GitHub Actionsのステータスを確認：

```bash
# ブラウザでActionsページを開く
gh repo view --web
```

または：https://github.com/geolonia/www.geolonia.com/actions

#### 手動デプロイ

必要に応じて手動でデプロイを実行できます：

```bash
# GitHub Actionsで手動実行
gh workflow run deploy.yml
```

#### デプロイ設定ファイル

`.github/workflows/deploy.yml` - GitHub Actionsワークフロー

### Netlify（本番環境）

mainブランチへのプッシュで自動的に本番環境がデプロイされます。

#### 初回セットアップ

1. **Netlifyにサインイン**
   - https://app.netlify.com/

2. **新しいサイトを作成**
   - "Add new site" → "Import an existing project"
   - GitHubを選択して `geolonia/www.geolonia.com` を選択

3. **ビルド設定**
   - Build command: `npm run build:production`
   - Publish directory: `dist`
   - （`netlify.toml` があるので自動設定されます）

4. **カスタムドメイン設定**
   - Site settings → Domain management
   - Custom domain: `www.geolonia.com` を追加
   - DNS設定を行う

#### デプロイ状況の確認

Netlifyダッシュボードで確認：
- https://app.netlify.com/

#### デプロイ設定ファイル

`netlify.toml` - Netlify設定ファイル
- ビルドコマンド: `build:production`（base pathなし）
- セキュリティヘッダー設定
- キャッシュ設定

### デプロイ前チェックリスト

デプロイ前に以下を**必ず**確認してください：

#### ✅ 1. コード品質チェック
- [ ] すべての変更をコミット済み
- [ ] `git status` がクリーン
- [ ] コードレビュー完了（該当する場合）

#### ✅ 2. テスト実行
```bash
# 開発サーバーを起動
npm start

# 別ターミナルでテスト実行
npm test
```
- [ ] すべてのE2Eテストがパス
- [ ] 手動で主要ページを確認

#### ✅ 3. ドキュメント更新（重要）

**llms.txt と llms-full.txt の更新:**
- [ ] `public/llms.txt` - サイトコンテンツの概要を反映（`/llms.txt` でアクセス可能）
- [ ] `public/llms-full.txt` - サイトコンテンツの詳細情報を反映（`/llms-full.txt` でアクセス可能）

**⚠️ 重要なルール:**
- これらのファイルは `src/content/pages/` 配下のマークダウンコンテンツから生成すること
- **README.md を参照してはならない**
- ウェブサイトの内容（会社情報、製品情報、サービス内容）を記載する
- 開発者向けの情報ではなく、サイト訪問者向けの情報を含める

**含めるべき情報:**
- ✅ 会社概要（`src/content/pages/company/index.md` から）
- ✅ プロダクト情報（`src/content/pages/products.md` から）
- ✅ サービス内容（各製品ページから）
- ✅ 会社のミッションとビジョン
- ✅ お問い合わせ情報

**含めてはいけない情報:**
- ❌ npm コマンドや開発手順
- ❌ テストの実行方法
- ❌ ディレクトリ構造の技術的詳細
- ❌ ビルドシステムの情報

これらのファイルは、AIがウェブサイトの**内容**を正しく理解し、訪問者の質問に適切に答えられるようにするためのものです。

#### ✅ 4. ビルド確認
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

#### ✅ 5. 最終チェック
- [ ] README.md が最新
- [ ] CHANGELOG.md を更新（該当する場合）
- [ ] package.json のバージョンを更新（該当する場合）
- [ ] 環境変数の確認（本番環境）

#### ✅ 6. デプロイ実行
```bash
# mainブランチにマージ
git checkout main
git merge [feature-branch]

# プッシュすると自動的にGitHub Pagesにデプロイされます
git push origin main
```

デプロイ状況はGitHub Actionsで確認できます：
- https://github.com/geolonia/www.geolonia.com/actions

#### ✅ 7. デプロイ後確認
- [ ] 本番サイトが正しく表示される
- [ ] すべてのページにアクセス可能
- [ ] ヘッダー・フッターが正しく表示される
- [ ] レスポンシブデザインが機能している
- [ ] Analytics/モニタリングツールが動作している（該当する場合）

### ロールバック手順

問題が発生した場合：

```bash
# 前のコミットに戻す
git revert HEAD
git push origin main
```

---

## コーディング規約

### Astroコンポーネント

- **ファイル名**: PascalCase（例: `Header.astro`, `BaseLayout.astro`）
- **スタイル**: `<style>` タグ内にスコープ化して記述
- **グローバルスタイル**: `is:global` を使用

### Markdownコンテンツ

- **ファイル名**: kebab-case（例: `index.md`, `recruit.md`）
- **フロントマター**: 必須（`title`, `description` など）
- **見出しレベル**: `##` から開始（`#` はページタイトル用に予約）

### CSS/スタイル

**カラー変数:**
- プライマリ: `#f39813`
- プライマリダーク: `#c2790f`
- プライマリビビッド: `#ffa714`

**レイアウト:**
- コンテナ幅: 最大 `1140px`

**ブレークポイント:**

⚠️ **重要**: サイト全体でブレークポイントを統一すること。新しいコンポーネントやスタイルを追加する際は、必ず以下の値を使用してください。

| ブレークポイント | メディアクエリ | 用途 |
|----------------|--------------|------|
| **デスクトップ** | `@media (min-width: 992px)` | デスクトップ専用スタイル |
| **タブレット以下** | `@media (max-width: 991px)` | タブレット・モバイル用スタイル |
| **モバイル** | `@media (max-width: 768px)` | モバイル専用スタイル（必要に応じて） |
| **小型モバイル** | `@media (max-width: 575px)` | 非常に小さい画面用（必要に応じて） |

**推奨される使い方:**
- 主要なレスポンシブ対応には **991px/992px** を使用
- 3列グリッドなどのレイアウトは、991px以下で1列に切り替え
- ヘッダー・フッターなどの主要コンポーネントと統一

---

## トラブルシューティング

### ポート8080が使用中

```bash
# ポートを使用しているプロセスを確認
lsof -ti:8080

# プロセスを終了
kill $(lsof -ti:8080)

# または別のポートを使用
npm run dev -- --port 8081
```

### テストが失敗する

1. 開発サーバーが起動しているか確認（`npm start`）
2. ポート8080でアクセスできるか確認（`http://localhost:8080`）
3. ブラウザで手動確認してから再テスト
4. Playwrightブラウザを再インストール: `npx playwright install`

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

### Markdownが反映されない

1. ファイル名が正しいか確認
2. フロントマターの形式が正しいか確認
3. Content Collectionsスキーマに準拠しているか確認
4. 開発サーバーを再起動

### 型エラーが出る

```bash
# Astroの型定義を再生成
npm run astro sync

# TypeScriptの型チェック
npm run astro check
```

---

## 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cucumber.js](https://cucumber.io/docs/cucumber/)
- [Playwright](https://playwright.dev/)
- [Zod（スキーマ検証）](https://zod.dev/)

---

## Git管理

### コミットメッセージ

- 簡潔に、変更内容を明確に記述
- 大きな変更は機能ごとに分割してコミット
- Co-Authored-Byは追加しない（CLAUDE.mdの global rules参照）

### ブランチ戦略

- `main` - 本番環境
- `feature/*` - 機能開発
- `fix/*` - バグ修正

---

## パフォーマンス最適化

- ✅ 画像は適切なサイズに最適化
- ✅ 不要なJavaScriptは含めない（Astroは静的HTML生成）
- ✅ CSSは必要最小限に
- ✅ フォントは必要なウェイトのみ読み込み

---

## セキュリティ

- ✅ 環境変数は `.env` で管理（`.gitignore` 済み）
- ✅ APIキーはコミットしない
- ✅ 依存関係は定期的に更新（`npm audit`）

---

**最終更新: 2026-02-08**

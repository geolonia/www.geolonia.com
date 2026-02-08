# コンテンツ作成ガイド

株式会社Geoloniaウェブサイトのマークダウンコンテンツ作成ガイドです。

## 📋 目次

1. [基本的な構成](#基本的な構成)
2. [フロントマター](#フロントマター)
3. [マークダウン記法](#マークダウン記法)
4. [ページの追加方法](#ページの追加方法)
5. [OGP設定](#ogp設定)
6. [ベストプラクティス](#ベストプラクティス)

---

## 基本的な構成

マークダウンファイルは以下の2つの部分で構成されます：

```markdown
---
title: "ページタイトル"
description: "ページの説明"
---

## 見出し

本文の内容...
```

1. **フロントマター**（`---` で囲まれた部分）
   - ページのメタデータ（タイトル、説明、OGP情報など）
   - YAML形式で記述

2. **本文**
   - マークダウン形式で記述
   - 見出し、リスト、リンク、画像などを使用可能

---

## フロントマター

### 必須フィールド

| フィールド | 型 | 説明 | 例 |
|-----------|-----|------|-----|
| `title` | 文字列 | ページタイトル | `"会社概要"` |

### 任意フィールド

| フィールド | 型 | 説明 | 例 |
|-----------|-----|------|-----|
| `description` | 文字列 | ページの説明（meta description） | `"株式会社Geoloniaの会社情報"` |
| `lead` | 文字列 | ヒーローセクションのリード文 | `"位置情報テクノロジーで社会課題を解決"` |
| `ogTitle` | 文字列 | SNSシェア時のタイトル | `"【採用情報】Geoloniaで働く"` |
| `ogDescription` | 文字列 | SNSシェア時の説明文 | `"オープンソースで世界を変える仲間を募集"` |
| `ogImage` | 文字列 | SNSシェア時の画像パス | `"/images/recruit-og.png"` |

### 基本例

```markdown
---
title: "プロダクト"
description: "Geoloniaが提供する位置情報テクノロジー製品・サービスのご紹介"
lead: "地図・位置情報の力でビジネスを加速"
---

## Geoloniaのプロダクト

本文...
```

### OGP付き例

```markdown
---
title: "採用情報"
description: "株式会社Geoloniaの採用情報"
lead: "一緒に働く仲間を募集しています"
ogTitle: "【採用情報】Geoloniaでエンジニアを募集中！"
ogDescription: "オープンソースと位置情報テクノロジーで社会課題を解決するエンジニアを募集しています"
ogImage: "/images/recruit-og-image.png"
---

## 募集職種

...
```

---

## マークダウン記法

### 見出し

```markdown
## 大見出し（h2）
### 中見出し（h3）
#### 小見出し（h4）
```

**注意:** `#` (h1) は使用しないでください。ページタイトルが自動的にh1になります。

### 段落とリスト

```markdown
通常の段落は、そのまま書きます。
空行で段落を区切ります。

- 箇条書きリスト
- 項目2
  - ネストした項目

1. 番号付きリスト
2. 項目2
   1. ネストした項目
```

### リンク

```markdown
[リンクテキスト](/path/to/page/)
[外部リンク](https://example.com)
```

**内部リンクの書き方:**
- `/products/` - プロダクトページ
- `/company/` - 会社概要
- `/contact/` - お問い合わせ

**注意:** 内部リンクは必ず `/` で始め、末尾にも `/` をつけてください。

### 画像

```markdown
![代替テキスト](/images/example.png)

[![画像リンク](/images/example.png)](https://example.com/)
```

**画像ファイルの配置:**
- 画像は `public/images/` ディレクトリに配置
- パスは `/images/ファイル名` と記述

**画像のベストプラクティス:**
- ファイル名は英数字とハイフンのみ（日本語NG）
- 適切なサイズに最適化してから配置
- 代替テキストは必ず設定（アクセシビリティ）

### テーブル

```markdown
| 項目 | 内容 |
|------|------|
| 会社名 | 株式会社Geolonia |
| 設立 | 2019年 |
| 所在地 | 東京都 |
```

### 引用

```markdown
> 引用文
> 複数行にわたる引用
```

### コード

**インラインコード:**
```markdown
`npm install` を実行してください。
```

**コードブロック:**
````markdown
```javascript
const map = new geolonia.Map('#map');
```
````

### 強調

```markdown
**太字**
*イタリック*
~~取り消し線~~
```

### 水平線

```markdown
---
```

---

## ページの追加方法

### 静的ページの追加

新しい静的ページを追加するには、`src/content/pages/` にマークダウンファイルを作成します。

#### 例1: トップレベルページ

**ファイル:** `src/content/pages/privacy.md`
**URL:** `https://www.geolonia.com/privacy/`

```markdown
---
title: "プライバシーポリシー"
description: "株式会社Geoloniaのプライバシーポリシー"
---

## プライバシーポリシー

本文...
```

#### 例2: サブディレクトリのページ

**ファイル:** `src/content/pages/products/pricing.md`
**URL:** `https://www.geolonia.com/products/pricing/`

```markdown
---
title: "料金プラン"
description: "Geolonia製品の料金プラン"
---

## 料金プラン

本文...
```

#### 例3: インデックスページ

**ファイル:** `src/content/pages/resources/index.md`
**URL:** `https://www.geolonia.com/resources/`

```markdown
---
title: "各種DX資料"
description: "ダウンロード可能なDX推進資料"
---

## 資料一覧

本文...
```

### URL生成ルール

| マークダウンファイル | 生成されるURL |
|-------------------|--------------|
| `pages/privacy.md` | `/privacy/` |
| `pages/products/pricing.md` | `/products/pricing/` |
| `pages/company/index.md` | `/company/` |
| `pages/resources/index.md` | `/resources/` |

---

## OGP設定

OGP (Open Graph Protocol) は、SNSでページがシェアされた時の表示を制御します。

### 基本設定（最小構成）

OGP設定を省略した場合、以下のデフォルト値が使用されます：

```markdown
---
title: "会社概要"
description: "株式会社Geoloniaの会社情報"
---
```

**結果:**
- OGタイトル: 「会社概要」（titleの値）
- OG説明: 「株式会社Geoloniaの会社情報」（descriptionの値）
- OG画像: デフォルトロゴ画像

### カスタムOGP設定

SNS用に専用のタイトル・説明・画像を設定する場合：

```markdown
---
title: "採用情報"
description: "株式会社Geoloniaの採用情報ページ"
ogTitle: "【2025年度 新卒・中途採用】Geoloniaでエンジニア募集中！"
ogDescription: "オープンソースと地図テクノロジーで社会を変える。フルリモート可、フレックスタイム制。"
ogImage: "/images/recruit-2025-og.png"
---
```

### OGP画像の作成ガイドライン

**推奨サイズ:**
- 1200 × 630 px（Facebook推奨）
- 最小: 600 × 315 px

**ファイル形式:**
- PNG または JPG
- ファイルサイズ: 8MB以下推奨

**配置場所:**
- `public/images/` ディレクトリ
- フロントマターでは `/images/ファイル名.png` と記述

**デザインのポイント:**
- 重要な情報は中央に配置（SNSによって端が切れる場合があるため）
- テキストは大きく読みやすく
- ブランドカラーを使用

### OGP確認ツール

設定後、以下のツールで確認してください：

- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter/X:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

---

## ベストプラクティス

### タイトルの書き方

**良い例:**
```markdown
title: "Geolonia Maps - 高性能地図ライブラリ"
```

**悪い例:**
```markdown
title: "製品｜Geolonia"  # 全角記号はNG
title: "geolonia maps"   # 固有名詞は大文字で
```

### 説明文の書き方

**良い例:**
```markdown
description: "ウェブサイトに簡単に組み込める高性能な地図表示ライブラリ。オープンソースで透明性の高い開発プロセス。"
```

**推奨文字数:** 70〜160文字

**ポイント:**
- ページの内容を端的に説明
- キーワードを自然に含める
- 文末は「。」で終わる

### ファイル名の規則

**良い例:**
- `privacy.md`
- `products-faq.md`
- `company-recruit.md`

**悪い例:**
- `プライバシー.md` # 日本語NG
- `products FAQ.md` # スペースNG
- `Products.md` # 大文字始まりは避ける

### ディレクトリ構造

関連するページはディレクトリにまとめます：

```
src/content/pages/
├── company/
│   ├── index.md          # /company/
│   └── recruit.md        # /company/recruit/
├── products/
│   ├── faq.md           # /products/faq/
│   └── pricing.md       # /products/pricing/
└── privacy.md           # /privacy/
```

### 画像の最適化

1. **適切なサイズにリサイズ**
   - 画面幅1200px程度が上限
   - 不必要に大きい画像は避ける

2. **圧縮**
   - TinyPNG (https://tinypng.com/) などで圧縮
   - 品質とファイルサイズのバランスを取る

3. **次世代フォーマット**
   - WebP形式も検討（ブラウザサポート確認）

### リンクの書き方

**内部リンク（サイト内ページへのリンク）:**
```markdown
[製品一覧](/products/)
[会社概要](/company/)
```

**外部リンク（別サイトへのリンク）:**
```markdown
[Geolonia Blog](https://blog.geolonia.com/)
[GitHub](https://github.com/geolonia)
```

**アンカーリンク（同一ページ内）:**
```markdown
[料金プランへ](#料金プラン)

## 料金プラン
```

### 見出しの階層

見出しは論理的な階層構造を保ちます：

**良い例:**
```markdown
## 製品紹介

### Geolonia Maps

#### 主な特徴

#### 使用例

### スマートマップ

#### 主な特徴
```

**悪い例:**
```markdown
## 製品紹介

#### Geolonia Maps  # h2の次にh4はNG

## 主な特徴  # h2に戻るのはNG
```

---

## トラブルシューティング

### ページが表示されない

1. **ファイル名を確認**
   - `.md` 拡張子がついているか
   - 日本語やスペースを使っていないか

2. **フロントマターを確認**
   - `---` で正しく囲まれているか
   - `title` フィールドが必須

3. **開発サーバーを再起動**
   ```bash
   npm start
   ```

### 画像が表示されない

1. **パスを確認**
   - `/images/` で始まっているか
   - ファイル名は正確か（大文字小文字も区別）

2. **ファイルの配置を確認**
   - `public/images/` に画像ファイルがあるか

3. **画像形式を確認**
   - PNG、JPG、SVG などサポートされる形式か

### OGPが反映されない

1. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア
   - Facebook/Twitter のデバッガーでクリア

2. **フロントマターを確認**
   - フィールド名のスペルミスがないか
   - 文字列は `"` で囲まれているか

3. **画像パスを確認**
   - 絶対パス（`/images/...`）で記述
   - 画像ファイルが存在するか

---

## よくある質問

### Q. どのディレクトリにファイルを作ればいいですか？

**A.** 静的ページは `src/content/pages/` に作成します。

- トップレベル: `src/content/pages/example.md` → `/example/`
- サブページ: `src/content/pages/products/example.md` → `/products/example/`

### Q. ページタイトルとOGタイトルは何が違いますか？

**A.**
- **ページタイトル (title):** ブラウザのタブやページ内に表示されるタイトル
- **OGタイトル (ogTitle):** SNSでシェアされた時に表示されるタイトル

通常は同じでOKですが、SNS向けに短く・魅力的にしたい場合にogTitleを別途設定します。

### Q. 画像サイズの推奨は？

**A.**
- **OGP画像:** 1200 × 630 px
- **コンテンツ画像:** 横幅1200px以下
- **ロゴ・アイコン:** 適切なサイズで（大きすぎない）

### Q. マークダウンでHTMLタグは使えますか？

**A.** はい、使えますが、極力マークダウン記法を使用してください。どうしても必要な場合のみHTMLを使用します。

```markdown
<!-- 可能だが非推奨 -->
<div class="custom-class">内容</div>

<!-- マークダウンで書く方が推奨 -->
## 見出し
通常の段落
```

### Q. リンクに target="_blank" をつけるには？

**A.** 外部リンクは自動的に新しいタブで開きます。内部リンクは同じタブで開きます。

```markdown
[外部リンク](https://example.com/)  <!-- 自動的に新しいタブ -->
[内部リンク](/products/)  <!-- 同じタブ -->
```

---

## 参考リンク

- [Markdown Guide（英語）](https://www.markdownguide.org/)
- [GitHub Markdown仕様](https://github.github.com/gfm/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

---

**最終更新: 2026-02-08**

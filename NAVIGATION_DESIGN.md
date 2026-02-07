# 株式会社Geolonia ウェブサイト - ナビゲーション設計

## 既存サイト分析結果

### 主要ページ構造
- トップページ (/)
- プロダクト (/products/)
- 会社案内 (/company/)
- 新着情報 (/information/)
- ニュースリリース (/newsrelease/)
- お問い合わせ (/contact/)
- FAQ (/faq/)

### 主要製品・サービス
1. **Geolonia Maps** - 高速・軽量・カスタマイズ可能な地図API
2. **Geolonia Maps for Smartcity** - 自治体向けフレームワーク
3. **Smart Map** - 公開型GIS
4. **クイック住所変換** - 住所正規化サービス
5. **住所正規化ソリューション** - エンタープライズ向け
6. **地図ぼうけんラボ** - 教育用プラットフォーム

---

## 提案ナビゲーション構造

### ヘッダーグローバルナビゲーション

```
┌─────────────────────────────────────────────────────────┐
│ [ロゴ] Geolonia                                          │
│                                                          │
│  プロダクト ▼  |  ソリューション  |  企業情報 ▼  |  お問い合わせ │
└─────────────────────────────────────────────────────────┘
```

#### 1. プロダクト（ドロップダウン）
- **Geolonia Maps**
  - 概要
  - 料金プラン
  - ドキュメント
  - デモ
- **Geolonia Maps for Smartcity**
  - 概要
  - 導入事例
- **Smart Map（公開型GIS）**
- **地図ぼうけんラボ**

#### 2. ソリューション（単一ページ）
- 住所正規化ソリューション
- クイック住所変換
- APIサービス
  - 逆ジオコーダー
  - 不動産共通ID
  - 住所正規化API

#### 3. 企業情報（ドロップダウン）
- **会社概要**
- **ニュース**
  - 新着情報
  - ニュースリリース
  - ブログ
- **採用情報**
- **FAQ**

#### 4. お問い合わせ（単一ページ）

---

### フッターナビゲーション

```
┌─────────────────────────────────────────────────────────┐
│  プロダクト          ソリューション      企業情報         │
│  ├ Geolonia Maps    ├ 住所正規化       ├ 会社概要       │
│  ├ Maps Smartcity   ├ APIサービス      ├ ニュース       │
│  ├ Smart Map        └ クイック住所変換  ├ 採用情報       │
│  └ 地図ぼうけんラボ                      └ FAQ           │
│                                                          │
│  リソース            SNS                                 │
│  ├ ドキュメント      ├ GitHub                            │
│  ├ ブログ           ├ Twitter                           │
│  └ お問い合わせ     └ note                              │
│                                                          │
│  © 2024 株式会社Geolonia. All rights reserved.          │
│  利用規約 | プライバシーポリシー                          │
└─────────────────────────────────────────────────────────┘
```

---

## ファイル構造（推奨）

```
src/
├── pages/
│   ├── index.astro                 # トップページ
│   ├── products/
│   │   ├── index.astro            # プロダクト一覧
│   │   ├── geolonia-maps.astro    # Geolonia Maps
│   │   ├── smartcity.astro        # Maps for Smartcity
│   │   ├── smart-map.astro        # Smart Map
│   │   └── chizu-bouken.astro     # 地図ぼうけんラボ
│   ├── solutions/
│   │   ├── index.astro            # ソリューション一覧
│   │   ├── address-normalization.astro
│   │   └── api-services.astro
│   ├── company/
│   │   ├── index.astro            # 会社概要
│   │   └── recruit.astro          # 採用情報
│   ├── news/
│   │   ├── index.astro            # ニュース一覧
│   │   └── [...slug].astro        # 個別記事
│   ├── blog/
│   │   ├── index.astro            # ブログ一覧（既存）
│   │   └── [...slug].astro        # 個別記事（既存）
│   ├── faq.astro                  # FAQ
│   └── contact.astro              # お問い合わせ
│
├── content/
│   ├── blog/                      # ブログ記事（既存）
│   ├── news/                      # ニュース記事
│   └── config.ts                  # コンテンツスキーマ（既存）
│
└── components/
    ├── Header.astro               # ヘッダーナビゲーション
    ├── Footer.astro               # フッターナビゲーション
    └── ProductCard.astro          # プロダクトカード
```

---

## モバイルナビゲーション

ハンバーガーメニュー式で、以下の構造：

```
☰ メニュー
├─ プロダクト
│  ├─ Geolonia Maps
│  ├─ Maps for Smartcity
│  ├─ Smart Map
│  └─ 地図ぼうけんラボ
├─ ソリューション
│  ├─ 住所正規化
│  └─ APIサービス
├─ 企業情報
│  ├─ 会社概要
│  ├─ ニュース
│  ├─ 採用情報
│  └─ FAQ
└─ お問い合わせ
```

---

## 次のステップ

1. ✅ ナビゲーション設計完了
2. ⬜ Header/Footerコンポーネント実装
3. ⬜ 各ページの作成
4. ⬜ コンテンツの移行
5. ⬜ レスポンシブ対応の確認

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  // 各コレクションから情報を取得
  const pages = await getCollection('pages');
  const news = await getCollection('news');
  const press = await getCollection('press');

  // 会社情報ページを取得
  const companyPage = pages.find(p => p.id === 'company/index.md');
  const productsPage = pages.find(p => p.id === 'products.md');

  // テキストコンテンツを生成
  const content = `# 株式会社Geolonia

## 会社概要

株式会社Geoloniaは、位置情報テクノロジーとオープンソースを通じて社会の課題を解決することをミッションとしています。

### ビジョン
位置情報テクノロジーを活用し、より便利で持続可能な社会の実現に貢献します。

### ミッション
オープンソースの力で、地理空間データをすべての人が活用できるようにします。

## 主要プロダクト

### Geolonia Maps
高性能な地図表示ライブラリ。ウェブサイトやアプリケーションに簡単に組み込める、オープンソース技術を基盤とした地図サービスです。

- シンプルで使いやすいAPI
- 高速なレンダリング
- 豊富なカスタマイズオプション
- モバイル対応

### スマートシティのための地理空間データ連携基盤
自治体が保有する地理空間データを統合・管理し、住民サービスの向上や業務効率化を実現するプラットフォームです。

- 地理空間データの一元管理
- 部署間のデータ連携
- オープンデータとしての公開
- 防災・減災への活用

### 公開型GIS「スマートマップ」
専門知識がなくても、直感的な操作で地図を作成・公開できる公開型GISシステムです。

### 住所正規化ソリューション
企業や自治体が保有する住所データを統一された形式に変換し、データの品質を向上させるソリューションです。

## サービス

### 開発者向けサービス
- Geolonia Maps ドキュメント
- コードサンプル
- 開発者ブログ
- 技術サポート

### 各種DX資料
- スマートシティ実現のための地理空間データ連携基盤
- 日本の住所におけるデジタル化の課題
- GitHub for Governments

## お問い合わせ

製品・サービスに関するご質問、お見積りのご依頼は、お問い合わせページからご連絡ください。

https://www.geolonia.com/contact/

---
© ${new Date().getFullYear()} Geolonia Inc. All Rights Reserved.
Geolonia® は株式会社Geoloniaの登録商標です。
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

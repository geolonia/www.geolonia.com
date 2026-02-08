import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  // 会社ページを取得
  const pages = await getCollection('pages');
  const companyPage = pages.find(p => p.id === 'company/index.md');
  const recruitPage = pages.find(p => p.id === 'company/recruit.md');

  const currentYear = new Date().getFullYear();

  // 会社情報を構造化
  const company = {
    meta: {
      title: companyPage?.data.title || '株式会社Geolonia - 会社概要',
      description: companyPage?.data.description || '株式会社Geoloniaの会社情報',
      lastUpdated: new Date().toISOString(),
    },
    basicInfo: {
      name: '株式会社Geolonia',
      nameEn: 'Geolonia Inc.',
      founded: '2019年',
      representative: '代表取締役',
      location: '東京都',
      business: [
        '地図・位置情報サービスの提供',
        '地理空間データ基盤の開発',
        'オープンソースソフトウェアの開発',
      ],
    },
    philosophy: {
      vision: '位置情報テクノロジーを活用し、より便利で持続可能な社会の実現に貢献します。',
      mission: 'オープンソースの力で、地理空間データをすべての人が活用できるようにします。',
    },
    values: [
      {
        title: 'オープンソース',
        description: '透明性の高い開発プロセスを通じて、信頼性の高い製品を提供します。',
      },
      {
        title: '社会課題の解決',
        description: '位置情報テクノロジーで社会の課題を解決します。',
      },
      {
        title: 'イノベーション',
        description: '常に新しい技術に挑戦し、価値を創造します。',
      },
    ],
    products: [
      {
        name: 'Geolonia Maps',
        category: '地図表示ライブラリ',
        url: '/maps/',
      },
      {
        name: 'スマートシティのための地理空間データ連携基盤',
        category: '自治体向けプラットフォーム',
        url: '/geolonia-maps-for-smartcity/',
      },
      {
        name: '公開型GIS「スマートマップ」',
        category: '地図作成・公開システム',
        url: '/smartmap/',
      },
      {
        name: '住所正規化ソリューション',
        category: '住所データ品質向上',
        url: '/address-normalization/',
      },
    ],
    services: [
      {
        category: 'API サービス',
        items: [
          '逆ジオコーダー',
          '不動産共通ID',
          '住所正規化API',
        ],
      },
      {
        category: '教育・学習',
        items: [
          '地図ぼうけんラボ',
          '技術ドキュメント',
          'コードサンプル',
        ],
      },
    ],
    recruitment: {
      available: true,
      url: '/company/recruit/',
      idealCandidates: [
        'オープンソースに情熱を持っている方',
        '地図・位置情報技術に興味がある方',
        'チームワークを大切にできる方',
        '新しい技術の習得に意欲的な方',
        '社会課題の解決に貢献したい方',
      ],
      positions: [
        'ソフトウェアエンジニア（フロントエンド）',
        'ソフトウェアエンジニア（バックエンド）',
        'GISエンジニア',
        'セールス・ビジネス開発',
        'カスタマーサクセス',
      ],
      benefits: [
        'リモートワーク可',
        'フレックスタイム制',
        '最新の開発ツール・環境',
        '技術書籍購入支援',
        'カンファレンス参加支援',
      ],
    },
    contact: {
      url: '/contact/',
      website: 'https://www.geolonia.com',
      businessHours: '平日 10:00-18:00（土日祝日を除く）',
      inquiryTypes: [
        '製品・サービスについて',
        'お見積りのご依頼',
        '技術サポート',
        '業務提携について',
        '採用について',
        'メディア・取材について',
        'その他',
      ],
    },
    social: {
      github: 'https://github.com/geolonia',
    },
    legal: {
      trademark: 'Geolonia® および Geoloniaロゴは、株式会社Geoloniaの登録商標です。',
      copyright: `© ${currentYear} Geolonia Inc. All Rights Reserved.`,
    },
  };

  return new Response(JSON.stringify(company, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

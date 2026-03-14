---
title: "開発者向け情報"
description: "Geolonia製品の開発者向け情報とリソース"
---

## 開発を始める

Geolonia Maps を使えば、たった数行のコードで地図をウェブサイトに埋め込めます。

### 1. JavaScript SDK を読み込む

`</body>` の直前に以下のスクリプトタグを追加してください。

```html
<script src="https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY"></script>
```

### 2. 地図を表示する

HTML に以下の要素を追加するだけで、地図が表示されます。

```html
<div
  class="geolonia"
  data-lat="35.7101"
  data-lng="139.8107"
  data-zoom="14"
>東京スカイツリー</div>
```

### 3. カスタマイズ

マーカーの追加、GeoJSON データの表示、地図スタイルの変更など、`data-*` 属性やJavaScript API を使って柔軟にカスタマイズできます。詳しくは[ドキュメント](https://docs.geolonia.com/)をご覧ください。

## リソース

- [**Geolonia Maps ドキュメント**](https://docs.geolonia.com/) - APIリファレンス、チュートリアル、設定オプション
- [**コードサンプル**](/maps-dev/) - コピー&ペーストで使える実装例
- [**開発者ブログ**](https://blog.geolonia.com/) - 技術記事、アップデート情報、活用事例

## 技術サポート

開発中の技術的な質問や問題については、以下の方法でサポートを受けられます。

- [**Geolonia Maps ドキュメント**](https://docs.geolonia.com/) - よくある質問や設定例を掲載
- [**GitHub Issues**](https://github.com/geolonia) - バグ報告や機能リクエスト
- [**お問い合わせ**](/contact/) - 導入相談やテクニカルサポート

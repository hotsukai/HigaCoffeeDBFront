現在開発は[こっち](https://github.com/Higa-Coffee/HigaCoffeeDBFront)でしてます。

# HiGaDBAPP

## このアプリケーションは?

- [HiGaCoffee](https://sites.google.com/view/higa-coffee)のコーヒーデータベースのモックアップです。
- Nuxt.js + Firebase で作られています。

### *HiGaCoffee*とは

「自分好みのコーヒー」を吟味できる環境づくりを目指す筑波大学の公認学生団体。コーヒーに関するデータ（抽出レシピとレビュー）を都度記録し活用している。

## 実行方法

`.env`ファイルにバックエンドの URI を入力してください  
(例:`API_URL="http://localhost:5000"`)

```bash
# 依存関係インストール
$ yarn install

# ホットリロードありのローカルサーバー立ち上げ
$ yarn dev

# プロダクション用ビルドとホスティング
$ yarn build
$ yarn start

# リント
$ yarn lint
$ yarn lint-fix
```

## ステージング環境

staging ブランチは
[https://staging--higa-database.netlify.app/](https://staging--higa-database.netlify.app/)
に自動デプロイされます。

# G's All Night 自動投稿、集計システム
## 2020年1月11日Gsハッカソン

- ヘッドレスブラウザ	GUIなしでブラウジング
- headless: false でブラウジングするモード
## サンプルコードの流れ
Puppeteerライブラリを読み込み→各種設定→指定したURLにアクセス→セレクタに対してアクションを設定→クローズ

### 実装の流れ
- https://www.facebook.com/groups/183545349248040/
- （オールナイトのページ）にアクセス
- 	ログイン画面にリダイレクトされる
- 	ID,PASSを入力
- 	グループページの表示
- 	テキストエリアをクリック
- 	テキストを貼り付け(GoogleForm)
- 	 投稿ボタンのクリック
- スプレッドシートからGASでデータを拾う
- ？？？（パペティアのトリガー）→GCPで接続できる？！
- パペティアにデータを渡して再度ログイン→投稿

## 起動方法
```
node GsANS.js
```

## .env を作る
```
# パスワードとかの環境変数ファイル
MAILADDRESS=facebookのメールアドレス
PASS=パスワード
```

## 座標取得用JS
```
var test = document.querySelector("._5s61").getBoundingClientRect()
```
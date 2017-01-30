# Hatena Blogs

自分が運営しているはてなブログのテーマやカスタム HTML などを保存しておくリポジトリです。

- [Corredor](http://neos21.hatenablog.com/)
- [Murga](http://neos21.hatenablog.jp/)
- [El Mylar](http://neos21.hateblo.jp/)


## CSS Minify

Clean CSS CLI で CSS を圧縮しています。

npm-scripts での実行の際は、`rimraf` で `dist/css` ディレクトリ配下のファイルを削除し、`npm-run-all` で一括で `cleancss` を実行しています。
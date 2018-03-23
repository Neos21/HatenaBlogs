const fs = require('fs');
const stripBom = require('strip-bom');

// 引数がなければ中止する
if(process.argv.length < 3) {
  console.log('Invalid Arguments, abort.');
  return;
}

// 引数から指定されたファイル一覧を取得する
const files = process.argv.slice(2, process.argv.length);

// ファイルごとに BOM を除去して上書きする
files.forEach((file) => {
  const text = fs.readFileSync(file, 'utf-8');
  const stripped = stripBom(text);
  fs.writeFileSync(file, stripped);
});

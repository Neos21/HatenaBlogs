const fs = require('fs');

// 引数がなければ中止する
if(process.argv.length < 3) {
  return console.log('Invalid Arguments, abort.');
}

// 引数で指定されたファイル名を取得する
const param = process.argv[2];

// 対象のファイルが存在するディレクトリを指定する
const dirPath = './dist/styles/';

if(param === 'ALL') {
  // 拡張子付きのファイル名を全取得してそれぞれ変換する
  const files = fs.readdirSync(dirPath);
  files.forEach((fileName) => {
    stripBomFile(fileName);
  });
}
else {
  // ファイル名指定の場合は拡張子を与えて変換する
  const fileName = `${param}.css`;
  stripBomFile(fileName);
}

// ファイルごとに BOM を除去して上書きする
function stripBomFile(fileName) {
  const filePath = `${dirPath}${fileName}`;
  const originalText = fs.readFileSync(filePath, 'utf-8');
  const strippedText = (originalText.charCodeAt(0) === 0xFEFF) ? originalText.slice(1) : originalText;  // Strip BOM
  fs.writeFileSync(filePath, strippedText);
}

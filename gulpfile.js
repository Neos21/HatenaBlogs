const gulp = require('gulp');
// Gulp プラグインを一括で読み込む
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

/* ================================================================================
 * 関数定義
 * ================================================================================ */

/**
 * CSS を圧縮する Function
 * 
 * @param {String} 圧縮するファイル名。'*' を渡せば src/css/ 配下の全ファイルが対象となる
 * @returns {Stream}
 */
function minCss(fileName) {
  return gulp
    .src(`src/css/${fileName}.css`)  // src/css/ 配下の指定ファイルを対象に圧縮する
    .pipe($.cleanCss(
      {
        compatibility: 'ie7',   // 互換性の設定
        format: {
          breaks: {
            afterComment: true  // コメントの後ろに改行を入れる
          }
        }
      }, (details) => {
        // 圧縮結果をログ出力する
        console.log(`${details.name} : ${details.stats.originalSize} -> ${details.stats.minifiedSize}`);
      }
    ))
    .pipe(gulp.dest('dist/css/'));  // dist/css/ 配下に出力する (対象ディレクトリがなくても OK・ファイルは上書き)
}

/**
 * JavaScript を圧縮する Function
 * 
 * @param {String} 圧縮するファイル名。'*' を渡せば src/js/ 配下の全ファイルが対象となる
 * @returns {Stream}
 */
function minJs(fileName) {
  return gulp
    .src(`src/js/${fileName}.js`)  // src/js/ 配下の指定ファイルを対象に圧縮する
    .pipe($.plumber())  // エラー時にプロセスが落ちないようにするプラグイン
    .pipe($.uglify({
      compress: true,   // 圧縮する 
      mangle: true,     // 変数の難読化を行う
      preserveComments: 'some'  // 「*!」で始まるブロックコメントを残す
    }))
    .pipe(gulp.dest('dist/js/'));  // dist/js/ 配下に出力する (対象ディレクトリがなくても OK・ファイルは上書き)
}

/* ================================================================================
 * タスク定義
 * ================================================================================ */

/**
 * CSS 圧縮 … 全ファイル
 * 
 * @returns {Stream}
 */
gulp.task('min-css', () => {
  return minCss('*');
});

/**
 * CSS 圧縮 … Corredor
 * 
 * @returns {Stream}
 */
gulp.task('min-css-corredor', () => {
  return minCss('Corredor');
});

/**
 * CSS 圧縮 … Murga
 * 
 * @returns {Stream}
 */
gulp.task('min-css-murga', () => {
  return minCss('Murga');
});

/**
 * CSS 圧縮 … El Mylar
 * 
 * @returns {Stream}
 */
gulp.task('min-css-elmylar', () => {
  return minCss('ElMylar');
});

/**
 * CSS 圧縮 … Bit-Archer
 * 
 * @returns {Stream}
 */
gulp.task('min-css-bitarcher', () => {
  return minCss('BitArcher');
});

/**
 * JavaScript 圧縮 … 全ファイル
 * 
 * @returns {Stream}
 */
gulp.task('min-js', () => {
  return minJs('*');
});

/**
 * JavaScript 圧縮 … Corredor
 * 
 * @returns {Stream}
 */
gulp.task('min-js-corredor', () => {
  return minJs('Corredor');
});

/**
 * JavaScript 圧縮 … Murga
 * 
 * @returns {Stream}
 */
gulp.task('min-js-murga', () => {
  return minJs('Murga');
});

/**
 * JavaScript 圧縮 … El Mylar
 * 
 * @returns {Stream}
 */
gulp.task('min-js-elmylar', () => {
  return minJs('ElMylar');
});

/**
 * JavaScript 圧縮 … Bit-Archer
 * 
 * @returns {Stream}
 */
gulp.task('min-js-bitarcher', () => {
  return minJs('BitArcher');
});

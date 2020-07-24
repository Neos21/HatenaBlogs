const gulp = require('gulp');
// Gulp プラグインを一括で読み込む
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

/* ================================================================================
 * 関数定義
 * ================================================================================ */

/**
 * SCSS をビルドする Function
 * 
 * @param {String} ビルドするファイル名。'*' を渡せば src/styles/ 配下の全ファイルが対象となる
 * @return {Stream}
 */
function buildCss(fileName) {
  return gulp
    .src([`./src/styles/${fileName}.scss`])  // エントリポイント
    .pipe($.plumber(function(error) {
      return this.emit('end');
    }))
    .pipe(
      $.sass({
        outputStyle: 'compressed'
      })
      .on('error', $.sass.logError)
    )
    .pipe(gulp.dest('./dist/styles'));      // ./dist/styles/ 配下に出力する
}

/**
 * JavaScript をビルドする Function
 * 
 * @param {String} ビルドするファイル名。'*' を渡せば src/scripts/ 配下の全ファイルが対象となる
 * @return {Stream}
 */
function buildJs(fileName) {
  return gulp
    .src(`src/scripts/${fileName}.js`)  // src/scripts/ 配下の指定ファイルを対象にビルドする
    .pipe($.plumber())  // エラー時にプロセスが落ちないようにするプラグイン
    .pipe($.uglify({
      compress: true,     // ビルドする 
      mangle: true,       // 変数の難読化を行う
      output: {
        comments: 'some'  // 「*!」で始まるブロックコメントを残す
      }
    }))
    .pipe(gulp.dest('dist/scripts/'));  // dist/scripts/ 配下に出力する (対象ディレクトリがなくても OK・ファイルは上書き)
}

/* ================================================================================
 * タスク定義
 * ================================================================================ */

/**
 * CSS ビルド … 全ファイル
 * 
 * @return {Stream}
 */
gulp.task('build-css', () => {
  return buildCss('*');
});

/**
 * CSS ビルド … Corredor
 * 
 * @return {Stream}
 */
gulp.task('build-css-corredor', () => {
  return buildCss('Corredor');
});

/**
 * CSS ビルド … Murga
 * 
 * @return {Stream}
 */
gulp.task('build-css-murga', () => {
  return buildCss('Murga');
});

/**
 * CSS ビルド … El Mylar
 * 
 * @return {Stream}
 */
gulp.task('build-css-elmylar', () => {
  return buildCss('ElMylar');
});

/**
 * JavaScript ビルド … 全ファイル
 * 
 * @return {Stream}
 */
gulp.task('build-js', () => {
  return buildJs('*');
});

/**
 * JavaScript ビルド … Corredor
 * 
 * @return {Stream}
 */
gulp.task('build-js-corredor', () => {
  return buildJs('Corredor');
});

/**
 * JavaScript ビルド … Corredor Check
 * 
 * @return {Stream}
 */
gulp.task('build-js-corredor-check', () => {
  return buildJs('CorredorCheck');
});

/**
 * JavaScript ビルド … Murga
 * 
 * @return {Stream}
 */
gulp.task('build-js-murga', () => {
  return buildJs('Murga');
});

/**
 * JavaScript ビルド … Murga Check
 * 
 * @return {Stream}
 */
gulp.task('build-js-murga-check', () => {
  return buildJs('MurgaCheck');
});

/**
 * JavaScript ビルド … El Mylar
 * 
 * @return {Stream}
 */
gulp.task('build-js-elmylar', () => {
  return buildJs('ElMylar');
});

/**
 * JavaScript ビルド … El Mylar Check
 * 
 * @return {Stream}
 */
gulp.task('build-js-elmylar-check', () => {
  return buildJs('ElMylarCheck');
});

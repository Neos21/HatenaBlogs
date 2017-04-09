'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();  // Gulp プラグインを一括で読み込む

/* ================================================================================
 * 関数定義
 * ================================================================================ */

/**
 * CSS を圧縮する Function
 * 
 * @param {string} 圧縮するファイル名。"*" を渡せば src/css/ 配下の全ファイルが対象となる
 * @return {Stream}
 */
function minCss(fileName) {
  return gulp
    .src("src/css/" + fileName + ".css")  // src/css/ 配下の指定ファイルを対象に圧縮する
    .pipe($.cleanCss(
      {
        compatibility: 'ie7',   // 互換性の設定
        format: {
          breaks: {
            afterComment: true  // コメントの後ろに改行を入れる
          }
        }
      }, function(details) {
        // 圧縮結果をログ出力する
        console.log(details.name + ': ' + details.stats.originalSize + ' -> ' + details.stats.minifiedSize);
      }
    ))
    .pipe(gulp.dest('dist/css/'));  // dist/css/ 配下に出力する (対象ディレクトリがなくても OK・ファイルは上書き)
}

/**
 * JavaScript を圧縮する Function
 * 
 * @param {string} 圧縮するファイル名。"*" を渡せば src/css/ 配下の全ファイルが対象となる
 * @return {Stream}
 */
function minJs(fileName) {
  return gulp
    .src("src/js/" + fileName + ".js")  // src/js/ 配下の指定ファイルを対象に圧縮する
    .pipe($.plumber())  // エラー時にプロセスが落ちないようにするプラグイン
    .pipe($.uglify({
      compress: true,  // 圧縮する 
      mangle: true,    // 変数の難読化を行う
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
 * @return {Stream}
 */
gulp.task('min-css', function() {
  return minCss("*");
});

/**
 * CSS 圧縮 … Corredor
 * 
 * @return {Stream}
 */
gulp.task('min-css-corredor', function() {
  return minCss("Corredor");
});

/**
 * CSS 圧縮 … Murga
 * 
 * @return {Stream}
 */
gulp.task('min-css-murga', function() {
  return minCss("Murga");
});

/**
 * CSS 圧縮 … El Mylar
 * 
 * @return {Stream}
 */
gulp.task('min-css-elmylar', function() {
  return minCss("ElMylar");
});

/**
 * JavaScript 圧縮 … 全ファイル
 * 
 * @return {Stream}
 */
gulp.task('min-js', function() {
  return minJs("*");
});

/**
 * JavaScript 圧縮 … Corredor
 * 
 * @return {Stream}
 */
gulp.task('min-js-corredor', function() {
  return minJs("Corredor");
});

/**
 * JavaScript 圧縮 … Murga
 * 
 * @return {Stream}
 */
gulp.task('min-js-murga', function() {
  return minJs("Murga");
});

/**
 * JavaScript 圧縮 … El Mylar
 * 
 * @return {Stream}
 */
gulp.task('min-js-elmylar', function() {
  return minJs("ElMylar");
});
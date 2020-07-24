const gulp            = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();


// 関数定義
// ================================================================================

/**
 * SCSS をビルドする Function
 * 
 * @param {string} ビルドするファイル名。'*' を渡せば src/styles/ 配下の全ファイルが対象となる
 * @return {function} Gulp タスク
 */
function buildCss(fileName) {
  return (done) => {
    gulp
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
      .pipe(gulp.dest('./dist/styles'));  // ./dist/styles/ 配下に出力する
    done();
  };
}

/**
 * JavaScript をビルドする Function
 * 
 * @param {string} ビルドするファイル名。'*' を渡せば src/scripts/ 配下の全ファイルが対象となる
 * @return {function} Gulp タスク
 */
function buildJs(fileName) {
  return (done) => {
    gulp
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
    done();
  };
}


// タスク定義
// ================================================================================

gulp.task('build-css'         , buildCss('*'       ));  // CSS ビルド … 全ファイル
gulp.task('build-css-corredor', buildCss('Corredor'));  // CSS ビルド … Corredor
gulp.task('build-css-murga'   , buildCss('Murga'   ));  // CSS ビルド … Murga
gulp.task('build-css-elmylar' , buildCss('ElMylar' ));  // CSS ビルド … El Mylar

gulp.task('build-js'               , buildJs('*'            ));  // JavaScript ビルド … 全ファイル
gulp.task('build-js-corredor'      , buildJs('Corredor'     ));  // JavaScript ビルド … Corredor
gulp.task('build-js-corredor-check', buildJs('CorredorCheck'));  // JavaScript ビルド … Corredor Check
gulp.task('build-js-murga'         , buildJs('Murga'        ));  // JavaScript ビルド … Murga
gulp.task('build-js-murga-check'   , buildJs('MurgaCheck'   ));  // JavaScript ビルド … Murga Check
gulp.task('build-js-elmylar'       , buildJs('ElMylar'      ));  // JavaScript ビルド … El Mylar
gulp.task('build-js-elmylar-check' , buildJs('ElMylarCheck' ));  // JavaScript ビルド … El Mylar Check

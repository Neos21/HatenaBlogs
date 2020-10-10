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
      .pipe($.plumber(function(_error) {
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


// タスク定義
// ================================================================================

gulp.task('build-css'         , buildCss('*'       ));  // CSS ビルド … 全ファイル
gulp.task('build-css-corredor', buildCss('Corredor'));  // CSS ビルド … Corredor
gulp.task('build-css-murga'   , buildCss('Murga'   ));  // CSS ビルド … Murga
gulp.task('build-css-elmylar' , buildCss('ElMylar' ));  // CSS ビルド … El Mylar

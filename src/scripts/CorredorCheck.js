/**
 * CSS・JS ファイルのフォールバック用処理
 * 
 * - 本ファイルをビルドしたコードを CorredorHead.html の link・script 要素手前にインラインで記述する
 * - CorredorFooter.html に #n-check 要素を配置しておく (CSS 検証用要素)
 * - Corredor.scss に #n-check { display: none; font-size: 0; } と定義しておく
 * - Corredor.js にて Neos21.scriptLoaded = true と記述しておく
 */

/**
 * 検証用グローバルオブジェクト
 */
Neos21 = {
  /**
   * link 要素または script 要素を head 要素に追加する
   * 
   * @param isLink true なら link 要素・false なら script 要素を生成する
   * @param nextIndex 添字
   * @param nextUrl 読み込むファイル URL
   */
  append: function(isLink, nextIndex, nextUrl) {
    var d = document;
    var s = 'setAttribute';
    var eventValue = 'Neos21.' + (isLink ? 'styles' : 'scripts') + '(' + nextIndex + ');';
    
    var elem = d.createElement(isLink ? 'link' : 'script');
    if(isLink) {
      elem[s]('rel', 'stylesheet');
    }
    elem[s](isLink ? 'href' : 'src', nextUrl);
    elem[s]('onload' , eventValue);
    elem[s]('onerror', eventValue);
    d.querySelector('head').appendChild(elem);
  },
  
  /**
   * CSS ファイルが読み込めているか検証し、必要に応じてフォールバック処理を行う
   * 
   * @param index フォールバック URL の添字
   */
  styles: function(index) {
    // 第1引数が number 型で指定されていなければ中止する
    if(typeof index !== 'number') {
      return;
    }
    
    var w = window;
    var d = document;
    
    // 検証用要素の読み込みを待つため再呼び出しして終了する
    if(!d.readyState || d.readyState === 'interactive') {
      w.addEventListener('load', function() {
        Neos21.styles(index);
      });
      return;
    }
    else if(d.readyState === 'loading') {
      d.addEventListener('DOMContentLoaded', function() {
        Neos21.styles(index);
      });
      return;
    }
    
    // フォールバック URL の定義
    var urls = [
      // https://unpkg.com/@neos21/hatena-blogs/
      'https://unpkg.com/@neos21/hatena-blogs@1.0.4/dist/styles/Corredor.css',
      // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
      'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.4/dist/styles/Corredor.css',
      // http://raw.githack.com/
      'https://raw.githack.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css',
      'https://rawcdn.githack.com/Neos21/HatenaBlogs/a9a8c7d78b940f1d90a8b07e40f04418f407c469/dist/styles/Corredor.css',
      // Raw GitHub
      'https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css'
    ];
    
    // 検証用要素
    var check = d.getElementById('n-check');
    if(!check) {
      // 検証用要素なし・中止
      return;
    }
    
    // 検証用要素にスタイルが適用されているか確認する
    var checkStyle = parseInt(w.getComputedStyle(check).fontSize);
    if(checkStyle === 0) {
      // スタイル適用済なら正常・何もしない
      return;
    }
    
    // フォールバックが必要
    
    // 次の Index 値
    var nextIndex = index + 1;
    
    // フォールバック用 URL がなかったら対応不可・終了
    if(nextIndex >= urls.length) {
      return;
    }
    
    // link 要素を生成し挿入する
    Neos21.append(true, nextIndex, urls[nextIndex]);
  },
  
  /**
   * JS ファイルが読み込めているか検証し、必要に応じてフォールバック処理を行う
   * 
   * @param index フォールバック URL の添字
   */
  scripts: function(index) {
    // 第1引数が number 型で指定されていること
    if(typeof index !== 'number') {
      return;
    }
    
    // フォールバック URL の定義
    var urls = [
      // https://unpkg.com/@neos21/hatena-blogs/
      'https://unpkg.com/@neos21/hatena-blogs@1.0.4/dist/scripts/Corredor.js',
      // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
      'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.4/dist/scripts/Corredor.js',
      // http://raw.githack.com/
      'https://raw.githack.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js',
      'https://rawcdn.githack.com/Neos21/HatenaBlogs/a9a8c7d78b940f1d90a8b07e40f04418f407c469/dist/scripts/Corredor.js',
      // Raw GitHub
      'https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js'
    ];
    
    // 検証用プロパティが存在しているか確認する
    if(Neos21.scriptLoaded) {
      // プロパティがあれば読込済・何もしない
      return;
    }
    
    // フォールバックが必要
    
    // 次の Index 値
    var nextIndex = index + 1;
    
    // フォールバック用 URL がなかったら対応不可・終了
    if(nextIndex >= urls.length) {
      return;
    }
    
    // script 要素を生成し挿入する
    Neos21.append(false, nextIndex, urls[nextIndex]);
  }
};

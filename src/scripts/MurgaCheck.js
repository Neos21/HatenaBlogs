/**
 * CSS・JS ファイルのフォールバック用処理
 * 
 * - 本ファイルをビルドしたコードを MurgaHead.html の link・script 要素手前にインラインで記述する
 * - MurgaFooter.html に #n-check 要素を配置しておく (CSS 検証用要素)
 * - Murga.scss に #n-check { display: none; font-size: 0; } と定義しておく
 * - Murga.js にて Neos21.scriptLoaded = true と記述しておく
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
    var doc = document;
    var setAttribute = 'setAttribute';
    var eventValue = 'Neos21.' + (isLink ? 'styles' : 'scripts') + '(' + nextIndex + ');';
    
    var elem = doc.createElement(isLink ? 'link' : 'script');
    if(isLink) {
      elem[setAttribute]('rel', 'stylesheet');
    }
    elem[setAttribute](isLink ? 'href' : 'src', nextUrl);
    elem[setAttribute]('onload' , eventValue);
    elem[setAttribute]('onerror', eventValue);
    doc.querySelector('head').appendChild(elem);
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
    
    var win = window;
    var doc = document;
    
    // 検証用要素の読み込みを待つため再呼び出しして終了する
    if(!doc.readyState || doc.readyState === 'interactive') {
      win.addEventListener('load', function() {
        Neos21.styles(index);
      });
      return;
    }
    else if(doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', function() {
        Neos21.styles(index);
      });
      return;
    }
    
    // フォールバック URL の定義
    var urls = [
      // https://unpkg.com/@neos21/hatena-blogs/
      'https://unpkg.com/@neos21/hatena-blogs@1.0.8/dist/styles/Murga.css',
      // jsDelivr Raw GitHub
      'https://cdn.jsdelivr.net/gh/Neos21/hatena-blogs@latest/dist/styles/Murga.css',
      // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
      'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.8/dist/styles/Murga.css',
      // http://raw.githack.com/
      'https://raw.githack.com/Neos21/hatena-blogs/master/dist/styles/Murga.css',
      // Raw GitHub
      'https://raw.githubusercontent.com/Neos21/hatena-blogs/master/dist/styles/Murga.css'
    ];
    
    // 検証用要素
    var check = doc.getElementById('n-check');
    if(!check) {
      // 検証用要素なし・中止
      return;
    }
    
    // 検証用要素にスタイルが適用されているか確認する
    var checkStyle = parseInt(win.getComputedStyle(check).fontSize);
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
      'https://unpkg.com/@neos21/hatena-blogs@1.0.8/dist/scripts/Murga.js',
      // jsDelivr Raw GitHub
      'https://cdn.jsdelivr.net/gh/Neos21/hatena-blogs@latest/dist/scripts/Murga.js',
      // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
      'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.8/dist/scripts/Murga.js',
      // http://raw.githack.com/
      'https://raw.githack.com/Neos21/hatena-blogs/master/dist/scripts/Murga.js',
      // Raw GitHub
      'https://raw.githubusercontent.com/Neos21/hatena-blogs/master/dist/scripts/Murga.js'
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

/**
 * CSS・JS ファイルのフォールバック用処理
 * 
 * - 本ファイルをビルドしたコードを CorredorHead.html の link・script 要素手前にインラインで記述する
 * - CorredorFooter.html に #n-check 要素を配置しておく (CSS 検証用要素)
 * - Corredor.scss に #n-check { display: none; font-size: 0; } と定義しておく
 * - Corredor.js にて window.Neos21.scriptLoaded = true と記述しておく
 */

/**
 * 検証用グローバルオブジェクト
 */
window.Neos21 = {};

/**
 * CSS ファイルが読み込めているか検証し、必要に応じてフォールバック処理を行う
 * 
 * @param index フォールバック URL の添字
 */
window.Neos21.styles = function(index) {
  // 検証用要素の読み込みを待つため再呼び出しして終了する
  if(!document.readyState || document.readyState === 'interactive') {
    window.addEventListener('load', function() {
      window.Neos21.styles(index);
    });
    return;
  }
  else if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.Neos21.styles(index);
    });
    return;
  }
  
  // 第1引数が number 型で指定されていること
  if(index === null || index === undefined || typeof index !== 'number') {
    return;
  }
  
  // フォールバック URL の定義
  var urls = [
    // GitHub Pages : デフォルト・指定済みのため使わない (配列の添字確保のためのみ)
    'https://neos21.github.io/HatenaBlogs/dist/styles/Corredor.css',
    // https://unpkg.com/@neos21/hatena-blogs/
    'https://unpkg.com/@neos21/hatena-blogs@1.0.1/dist/styles/Corredor.css',
    // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
    'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.1/dist/styles/Corredor.css',
    // http://raw.githack.com/
    'https://raw.githack.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css',
    'https://rawcdn.githack.com/Neos21/HatenaBlogs/41659670c19e1800253c59d0fae55ff0c6d0d948/dist/styles/Corredor.css',
    // Raw GitHub
    'https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css'
  ];
  
  // 検証用要素
  var check = document.getElementById('n-check');
  if(!check) {
    console.log('検証用要素なし・中止');
    return;
  }
  
  // 検証用要素にスタイルが適用されているか確認する
  var checkStyle = parseInt(window.getComputedStyle(check).fontSize);
  if(checkStyle === 0) {
    // 適用済なら正常・何もしない
    return;
  }
  
  // フォールバックが必要
  
  // 次の Index 値
  var nextIndex = index + 1;
  
  // フォールバック用 URL がなかったら対応不可・終了
  if(nextIndex >= urls.length) {
    console.log('CSS フォールバック不可');
    return;
  }
  
  // link 要素を生成し挿入する
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', urls[nextIndex]);
  link.setAttribute('onload' , 'Neos21.styles(' + nextIndex + ');');
  link.setAttribute('onerror', 'Neos21.styles(' + nextIndex + ');');
  document.querySelector('head').appendChild(link);
};

/**
 * JS ファイルが読み込めているか検証し、必要に応じてフォールバック処理を行う
 * 
 * @param index フォールバック URL の添字
 */
window.Neos21.scripts = function(index) {
  // 第1引数が number 型で指定されていること
  if(index === null || index === undefined || typeof index !== 'number') {
    return;
  }
  
  // フォールバック URL の定義
  var urls = [
    // GitHub Pages : デフォルト・指定済みのため使わない (配列の添字確保のためのみ)
    'https://neos21.github.io/HatenaBlogs/dist/scripts/Corredor.js',
    // https://unpkg.com/@neos21/hatena-blogs/
    'https://unpkg.com/@neos21/hatena-blogs@1.0.1/dist/scripts/Corredor.js',
    // https://www.jsdelivr.com/package/npm/@neos21/hatena-blogs
    'https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.1/dist/scripts/Corredor.js',
    // http://raw.githack.com/
    'https://raw.githack.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js',
    'https://rawcdn.githack.com/Neos21/HatenaBlogs/41659670c19e1800253c59d0fae55ff0c6d0d948/dist/scripts/Corredor.js',
    // Raw GitHub
    'https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js'
  ];
  
  // 検証用プロパティが存在しているか確認する
  if(window.Neos21 && window.Neos21.scriptLoaded) {
    // プロパティ定義済なら正常・何もしない
    return;
  }
  
  // フォールバックが必要
  
  // 次の Index 値
  var nextIndex = index + 1;
  
  // フォールバック用 URL がなかったら対応不可・終了
  if(nextIndex >= urls.length) {
    console.log('JS フォールバック不可');
    return;
  }
  
  // script 要素を生成し挿入する
  var script = document.createElement('script');
  script.setAttribute('src', urls[nextIndex]);
  script.setAttribute('onload' , 'Neos21.scripts(' + nextIndex + ');');
  script.setAttribute('onerror', 'Neos21.scripts(' + nextIndex + ');');
  document.querySelector('head').appendChild(script);
};

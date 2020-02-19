/*! El Mylar : Neo (@Neos21) https://neos21.hateblo.jp/ */
(function(d, c, i, s) {
  // Body 要素に任意のクラス名が存在するか確認する
  var hasClass = function(className) {
    return ~(s + d.body.className + s).replace(/[\n\t]/g, s).indexOf(s + className + s);
  };
  
  // 記事ごとにシェアリンクを追加する
  var appendShareLinks = function(articlesClassName, destClassName) {
    // テンプレートの ul 要素 #n-st (share-template) を取得する
    var template = d[i]('n-st');
    // 複製するので ID 属性を削除しておく
    template.removeAttribute('id');
    
    // 記事ごとにシェアリンクを複製して作っていく
    [].forEach.call(d[c](articlesClassName), function(article) {
      // 記事情報を取得する。記事タイトルのみ URL 用にエンコードしておく
      var entryTitleLink = article[c]('entry-title-link')[0];
      var title = encodeURIComponent(entryTitleLink.innerText);
      var permalink = entryTitleLink.getAttribute('href');
      
      // テンプレート (ul#n-st) を複製する
      var clone = template.cloneNode(true);
      
      // リンク属性を設定する関数 : a.n-s-xx-l は要素特定のためだけに使うクラス
      var setLink = function(snsName, url) {
        clone[c]('n-s-' + snsName + '-l')[0].setAttribute('href', url);
      }
      
      // はてブ用リンク：https://b.hatena.ne.jp/entry/{Permalink}
      setLink('ha', 'https://b.hatena.ne.jp/entry/' + permalink);
      // Twitter 用リンク：https://twitter.com/share?url={Permalink}&amp;text={Title}
      setLink('tw', 'https://twitter.com/share?url=' + permalink + '&amp;text=' + title);
      // Facebook 用リンク：https://www.facebook.com/share.php?u={Permalink}
      setLink('fb', 'https://www.facebook.com/share.php?u=' + permalink);
      // Pocket 用リンク：https://getpocket.com/edit?url={Permalink}&amp;title={Title}
      setLink('po', 'https://getpocket.com/edit?url=' + permalink + '&amp;title=' + title);
      
      // 記事下部に挿入する
      article[c](destClassName)[0].appendChild(clone);
    });
    
    // ラッパー要素 div#n-stw (share-template-wrapper) からテンプレート ul#n-st を削除する
    d[i]('n-stw').removeChild(template);
  };
  
  // フッタの AdSense をページ1つ目の記事の最下部に移す
  var replaceFooterAdSense = function(articleClassName) {
    var footerAdSense = d[i]('n-gaf');  // google-adsense-footer
    var clone = footerAdSense.cloneNode(true);
    footerAdSense.parentNode.removeChild(footerAdSense);
    d[c](articleClassName)[0].appendChild(clone);
  };
  
  // Body 要素のクラス名に応じて記事と挿入先のクラス名が異なるので判定する
  var exec = function() {
    if(hasClass('page-index')) {
      // トップページの場合
      appendShareLinks('hentry', 'customized-footer');
      replaceFooterAdSense('hentry');
    }
    else if(hasClass('page-archive')) {
      // アーカイブページ (月別・カテゴリ別・検索結果) の場合
      appendShareLinks('archive-entry', 'archive-entry-body');
      replaceFooterAdSense('archive-entry');
    }
    else if(hasClass('page-entry')) {
      // 記事ページはフッタ AdSense の移動のみ
      replaceFooterAdSense('hentry');
    }
    
    // タッチ時の反応をさせるため空の関数を設定する
    d.addEventListener('touchstart', function() { });
  };
  
  // フォールバック読み込み時は実行タイミングが変わるので調整する
  if(!d.readyState || d.readyState === 'interactive') {
    window.addEventListener('load', exec);
  }
  else if(d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', exec);
  }
  else {
    exec();
  }
  
  // 検証用オブジェクト・プロパティを定義しておく
  if(!Neos21) {
    Neos21 = {};
  }
  Neos21.scriptLoaded = true;
})(document, 'getElementsByClassName', 'getElementById', ' ');

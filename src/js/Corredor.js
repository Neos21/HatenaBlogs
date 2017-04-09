/*!
 * Neo's World - Corredor - 2017-04-09
 * http://neo.s21.xrea.com/
 * http://neos21.hatenablog.com/
 */
(function(d, c, i, s) {
  // Body 要素に任意のクラス名が存在するか確認する
  var hasClass = function(className) {
    return (s + d.body.className + s).replace(/[\n\t]/g, s).indexOf(s + className + s) !== -1;
  }
  
  // 記事ごとにシェアリンクを追加する
  var appendShareLinks = function(articlesClassName, destClassName) {
    // テンプレートの ul 要素を取得する
    var template = d[i]("neos21-share-template");
    // 複製するので ID 属性を削除しておく
    template.removeAttribute("id");
    // 記事ごとにシェアリンクを複製して作っていく
    Array.prototype.forEach.call(d[c](articlesClassName), function(article) {
      // 記事情報を取得する。記事タイトルのみ URL 用にエンコードしておく
      var entryTitleLink = article[c]("entry-title-link")[0];
      var title = encodeURIComponent(entryTitleLink.innerText);
      var permalink = entryTitleLink.getAttribute("href");
      
      // テンプレート (ul) を複製する
      var clone = template.cloneNode(true);
      
      // リンク属性を設定する関数
      var setLink = function(snsName, url) {
        clone[c]("neos21-share-" + snsName + "-link")[0].setAttribute("href", url);
      }
      
      // はてブ用リンク：http://b.hatena.ne.jp/entry/{Permalink}
      setLink("hatebu", "http://b.hatena.ne.jp/entry/" + permalink);
      // Twitter 用リンク：https://twitter.com/share?url={Permalink}&amp;text={Title}
      setLink("twitter", "https://twitter.com/share?url=" + permalink + "&amp;text=" + title);
      // Facebook 用リンク：http://www.facebook.com/share.php?u={Permalink}
      setLink("facebook", "http://www.facebook.com/share.php?u=" + permalink);
      // Pocket 用リンク：http://getpocket.com/edit?url={Permalink}&amp;title={Title}
      setLink("pocket", "http://getpocket.com/edit?url=" + permalink + "&amp;title=" + title);
      
      // 記事下部に挿入する
      article[c](destClassName)[0].appendChild(clone);
    });
    // テンプレート全体 (div) を削除する
    d[i]("neos21-template").removeChild(template);
  };
  
  // フッタの AdSense をページ1つ目の記事の最下部に移す
  var replaceFooterAdSense = function(articleClassName) {
    var footerAdSense = d[i]("neos21-adsense-footer");
    var clone = footerAdSense.cloneNode(true);
    footerAdSense.parentNode.removeChild(footerAdSense);
    d[c](articleClassName)[0].appendChild(clone);
  };
  
  // Body 要素のクラス名に応じて記事と挿入先のクラス名が異なるので判定する
  d.addEventListener("DOMContentLoaded", function() {
    if(hasClass("page-index")) {
      // トップページの場合
      appendShareLinks("hentry", "customized-footer");
      replaceFooterAdSense("hentry");
    }
    else if(hasClass("page-archive")) {
      // アーカイブページ (月別・カテゴリ別・検索結果) の場合
      appendShareLinks("archive-entry", "archive-entry-body");
      replaceFooterAdSense("archive-entry");
    }
    else if(hasClass("page-entry")) {
      // 記事ページはフッタ AdSense の移動のみ
      replaceFooterAdSense("hentry");
    }
  }, false);
  
})(document, "getElementsByClassName", "getElementById", " ");
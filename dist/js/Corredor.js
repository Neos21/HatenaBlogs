/*! Corredor : Neo (@Neos21) http://neos21.hatenablog.com/ */
!function(e,t,n,r){var o=function(t){return~(r+e.body.className+r).replace(/[\n\t]/g,r).indexOf(r+t+r)},a=function(r,o){var a=e[n]("n-st");a.removeAttribute("id"),Array.prototype.forEach.call(e[t](r),function(e){var n=e[t]("entry-title-link")[0],r=encodeURIComponent(n.innerText),i=n.getAttribute("href"),c=a.cloneNode(!0),d=function(e,n){c[t]("n-s-"+e+"-l")[0].setAttribute("href",n)};d("ha","http://b.hatena.ne.jp/entry/"+i),d("tw","https://twitter.com/share?url="+i+"&amp;text="+r),d("fb","http://www.facebook.com/share.php?u="+i),d("po","http://getpocket.com/edit?url="+i+"&amp;title="+r),e[t](o)[0].appendChild(c)}),e[n]("n-stw").removeChild(a)},i=function(r){var o=e[n]("n-gaf"),a=o.cloneNode(!0);o.parentNode.removeChild(o),e[t](r)[0].appendChild(a)};e.addEventListener("DOMContentLoaded",function(){o("page-index")?(a("hentry","customized-footer"),i("hentry")):o("page-archive")?(a("archive-entry","archive-entry-body"),i("archive-entry")):o("page-entry")&&i("hentry")},!1)}(document,"getElementsByClassName","getElementById"," ");
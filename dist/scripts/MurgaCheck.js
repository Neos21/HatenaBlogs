Neos21={append:function(e,t,s){var a=document,n="setAttribute",o="Neos21."+(e?"styles":"scripts")+"("+t+");",r=a.createElement(e?"link":"script");e&&r[n]("rel","stylesheet"),r[n](e?"href":"src",s),r[n]("onload",o),r[n]("onerror",o),a.querySelector("head").appendChild(r)},styles:function(e){var t,s,a,n,o;"number"==typeof e&&(t=window,(s=document).readyState&&"interactive"!==s.readyState?"loading"!==s.readyState?(a=["https://cdn.jsdelivr.net/gh/Neos21/hatena-blogs@gh-pages/dist/styles/Murga.css","https://raw.githack.com/Neos21/hatena-blogs/gh-pages/dist/styles/Murga.css","https://raw.githubusercontent.com/Neos21/hatena-blogs/gh-pages/dist/styles/Murga.css"],(n=s.getElementById("n-check"))&&0!==parseInt(t.getComputedStyle(n).fontSize)&&(a.length<=(o=e+1)||Neos21.append(!0,o,a[o]))):s.addEventListener("DOMContentLoaded",function(){Neos21.styles(e)}):t.addEventListener("load",function(){Neos21.styles(e)}))},scripts:function(e){var t,s;"number"==typeof e&&(t=["https://cdn.jsdelivr.net/gh/Neos21/hatena-blogs@gh-pages/dist/scripts/Murga.js","https://raw.githack.com/Neos21/hatena-blogs/gh-pages/dist/scripts/Murga.js","https://raw.githubusercontent.com/Neos21/hatena-blogs/gh-pages/dist/scripts/Murga.js"],Neos21.scriptLoaded||(t.length<=(s=e+1)||Neos21.append(!1,s,t[s])))}};
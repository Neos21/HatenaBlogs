Neos21={append:function(e,t,s){var r=document,o="setAttribute",n="Neos21."+(e?"styles":"scripts")+"("+t+");",a=r.createElement(e?"link":"script");e&&a[o]("rel","stylesheet"),a[o](e?"href":"src",s),a[o]("onload",n),a[o]("onerror",n),r.querySelector("head").appendChild(a)},styles:function(e){if("number"==typeof e){var t=window,s=document;if(s.readyState&&"interactive"!==s.readyState)if("loading"!==s.readyState){var r=["https://unpkg.com/@neos21/hatena-blogs@1.0.5/dist/styles/Corredor.css","https://cdn.jsdelivr.net/gh/Neos21/HatenaBlogs@latest/dist/styles/Corredor.css","https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.5/dist/styles/Corredor.css","https://raw.githack.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css","https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/styles/Corredor.css"],o=s.getElementById("n-check");if(o)if(0!==parseInt(t.getComputedStyle(o).fontSize)){var n=e+1;r.length<=n||Neos21.append(!0,n,r[n])}}else s.addEventListener("DOMContentLoaded",function(){Neos21.styles(e)});else t.addEventListener("load",function(){Neos21.styles(e)})}},scripts:function(e){if("number"==typeof e){var t=["https://unpkg.com/@neos21/hatena-blogs@1.0.5/dist/scripts/Corredor.js","https://cdn.jsdelivr.net/gh/Neos21/HatenaBlogs@latest/dist/scripts/Corredor.js","https://cdn.jsdelivr.net/npm/@neos21/hatena-blogs@1.0.5/dist/scripts/Corredor.js","https://raw.githack.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js","https://raw.githubusercontent.com/Neos21/HatenaBlogs/master/dist/scripts/Corredor.js"];if(!Neos21.scriptLoaded){var s=e+1;t.length<=s||Neos21.append(!1,s,t[s])}}}};
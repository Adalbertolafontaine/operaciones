var EntryPoint=function(e){function t(t){for(var r,a,i=t[0],l=t[1],c=t[2],s=0,d=[];s<i.length;s++)a=i[s],o[a]&&d.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(f&&f(t);d.length;)d.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(u.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={7:0},u=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackJsonpEntryPoint=window.webpackJsonpEntryPoint||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var f=l;return u.push([170,0]),n()}({170:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(57)),u=r(n(64)).default.connect();let a=new o.default;function i(){a.enviar("GET","/caso/decomisos","","application/json; charset=utf-8").then(e=>{let t;if((t=e).length>0){let e=document.getElementById("tresultado");e.innerHTML="",t.forEach(t=>{var n=document.createElement("tr");n.setAttribute("class","filas");for(const e in t)if(t.hasOwnProperty(e)){const u=t[e];if("seccion"!==e){var r,o=document.createElement("td");let e,t="";if(u){r=u}else r=0;isNaN(r)||"orden"===u?(e=document.createTextNode(r),o.setAttribute("class",`tablaEST ${t}`)):(e=document.createTextNode((new Intl.NumberFormat).format(r)),o.setAttribute("class",`tablaESN ${t}`)),o.appendChild(e),n.appendChild(o)}}e.appendChild(n)})}})}u.on("nuevo",e=>{i()}),i()}});
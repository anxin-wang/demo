(function(){function lc(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Ma(a){return"function"==typeof a}function tb(a){return a!=h&&-1<(a.constructor+"")[o]("String")}function w(a,b){return h==a||"-"==a&&!b||""==a}function Na(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[o](a[U](0));)a=a[r](1);for(;a&&-1<" \n\r\t"[o](a[U](a[k]-1));)a=a[r](0,a[k]-1);return a}function P(a){var b=1,c=0,d;if(!w(a)){b=0;for(d=a[k]-1;0<=d;d--)c=a.charCodeAt(d),
b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b}function xa(){return C.round(2147483647*C.random())}function Oa(){}function J(a,b){if(Pa instanceof Function)return b?encodeURI(a):Pa(a);q(68);return escape(a)}function B(a){a=a[u]("+")[v](" ");if(Qa instanceof Function)try{return Qa(a)}catch(b){q(17)}else q(68);return unescape(a)}function mc(a,b){if(a){var c=n[Ra]("script");c.type="text/javascript";c.async=g;c.src=a;c.id=b;var d=n.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,
d);return c}}function I(a){return a&&0<a[k]?a[0]:""}function V(a){var b=a?a[k]:0;return 0<b?a[b-1]:""}function nc(a){0==a[o]("www.")&&(a=a[r](4));return a[D]()}function ya(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new W,anchor:""};if(!a)return d;c=a[o]("://");0<=c&&(d.protocol=a[r](0,c),a=a[r](c+3));c=a[Sa]("/|\\?|#");if(0<=c)d.host=a[r](0,c)[D](),a=a[r](c);else return d.host=a[D](),d;c=a[o]("#");0<=c&&(d.anchor=a[r](c+1),a=a[r](0,c));c=a[o]("?");0<=c&&(ub(d.d,a[r](c+1)),a=a[r](0,c));
d.anchor&&b&&ub(d.d,d.anchor);a&&"/"==a[U](0)&&(a=a[r](1));d.path=a;return d}function oc(a,b){function c(a){var b=(a.hostname||"")[u](":")[0][D](),c=(a[K]||"")[D](),c=1*a[Ua]||("http:"==c?80:"https:"==c?443:""),a=a.pathname||"";0==a[o]("/")||(a="/"+a);return[b,""+c,a]}var d=b||n[Ra]("a");d.href=n[x][ha];var e=(d[K]||"")[D](),j=c(d),g=d[Sa]||"",ia=e+"//"+j[0]+(j[1]?":"+j[1]:"");0==a[o]("//")?a=e+a:0==a[o]("/")?a=ia+a:!a||0==a[o]("?")?a=ia+j[2]+(a||g):0>a[u]("/")[0][o](":")&&(a=ia+j[2][r](0,j[2].lastIndexOf("/"))+
"/"+a);d.href=a;e=c(d);return{protocol:(d[K]||"")[D](),host:e[0],port:e[1],path:e[2],Na:d[Sa]||"",url:a||""}}function ub(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[t](c)}for(var d=Na(b)[u]("&"),e=0;e<d[k];e++)if(d[e]){var j=d[e][o]("=");0>j?c(d[e],"1"):c(d[e][r](0,j),d[e][r](j+1))}}function qc(a,b){return w(a)||"["==a[U](0)&&"]"==a[U](a[k]-1)?"-":a[o](n.domain+(b&&"/"!=b?b:""))==(0==a[o]("http://")?7:0==a[o]("https://")?8:0)?"0":a}function Va(a,b,c){!(1<=rc)&&!(1<=100*C.random())&&(a=
["utmt=error","utmerr="+a,"utmwv=5.3.3","utmn="+xa(),"utmsp=1"],b&&a[t]("api="+b),c&&a[t]("msg="+J(c[r](0,100))),y.w&&a[t]("aip=1"),wb(a[v]("&")),rc++)}function f(a){return ja("x"+nd++,a)}function ja(a,b){Wa[a]=!!b;return a}function xb(a){var b=this.plugins_;if(b)return b.get(a)}function za(a,b){for(var b=b||[],c=0;c<b[k];c++){var d=b[c];if(""+a==d||0==d[o](a+"."))return d}return"-"}function od(a){100!=a.get(Aa)&&a.get(L)%1E4>=100*a.get(Aa)&&a[X]()}function pd(a){yb(a.get(Q))&&a[X]()}function qd(a){"file:"==
n[x][K]&&a[X]()}function rd(a){a.get(Xa)||a.set(Xa,n.title,g);a.get(Y)||a.set(Y,n[x].pathname+n[x][Sa],g)}function q(a){sc.set(a)}function Z(a){return"string"==typeof a}function zb(a){return"number"!=typeof a&&(h==Number||!(a instanceof Number))||C.round(a)!=a||NaN==a||a==Ab?l:g}var h=void 0,g=!0,l=!1,Pa=encodeURIComponent,Ab=Infinity,Bb=setTimeout,Qa=decodeURIComponent,C=Math,t="push",U="charAt",o="indexOf",Ua="port",Ra="createElement",H="toString",k="length",u="split",X="stopPropagation",x="location",
Sa="search",K="protocol",ha="href",r="substring",v="join",D="toLowerCase",i,Ya=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},W=function(){this.prefix="ga.";this.R={}};W.prototype.set=function(a,b){this.R[this.prefix+a]=b};W.prototype.get=function(a){return this.R[this.prefix+a]};W.prototype.contains=function(a){return this.get(a)!==h};var rc=0,nd=0,Wa={},Q=f(),tc=f(),uc=f(),$=f(),aa=f(),A=f(),E=f(),ka=f(),Za=f(),$a=f(),Ba=f(),ab=f(),bb=f(),
Ca=f(),cb=f(),Cb=f(),db=f(),Db=f(),Eb=f(),Fb=f(),Gb=f(),Hb=f(),Ib=f(),Jb=f(),Kb=f(),Aa=f(),eb=f(),ba=f(),Lb=f(),fb=f(),gb=f(),hb=f(),la=f(),Mb=f(),vc=f(),R=f(g),wc=ja("currencyCode"),Y=ja("page"),Xa=ja("title"),Da=f(),xc=f(),yc=f(),zc=f(),Ac=f(),Nb=f(),Bc=f(),Cc=f(),Ob=f(),L=f(g),Pb=f(g),ib=f(g),Qb=f(g),jb=f(g),Ea=f(g),ca=f(g),ma=f(g),na=f(g),kb=f(g),da=f(g),M=f(g),oa=f(g),lb=f(g),Fa=f(g),mb=f(g),Rb=f(g),pa=f(g),qa=f(g),ea=f(g),fa=f(g),ga=f(g),ra=f(g),Ga=f(g),Ha=f(g),sd=ja("campaignParams"),Ia=f(),
td=ja("hitCallback"),Dc=f();f();var Ec=f(),Sb=f(),Tb=f(),Fc=f(),Gc=f(),Hc=f(),Ic=f(),Jc=f(),Ja=f(),Ub=f(),Vb=f(),Wb=f();f();var nb=f(),ob=f(),Xb=f(),z=function(a,b,c,d){a[b]=function(){try{return d!=h&&q(d),c.apply(this,arguments)}catch(a){throw Va("exc",b,a&&a.name),a;}}},S=function(a,b,c,d){m.prototype[a]=function(){try{return q(c),lc(this.a.get(b),d)}catch(e){throw Va("exc",a,e&&e.name),e;}}},s=function(a,b,c,d,e){m.prototype[a]=function(j){try{q(c),e==h?this.a.set(b,lc(j,d)):this.a.set(b,e)}catch(g){throw Va("exc",
a,g&&g.name),g;}}},ud=RegExp(/(^|\.)doubleclick\.net$/i),Yb=function(a,b){return ud.test(n[x].hostname)?g:"/"!==b?l:(0==a[o]("www.google.")||0==a[o](".google.")||0==a[o]("google."))&&!(-1<a[o]("google.org"))?g:l},vd=function(a){var b=a.get(aa),c=a.c(E,"/");Yb(b,c)&&a[X]()},Mc=function(){var a={},b={},c=new pb;this.i=function(a,b){c.add(a,b)};var d=new pb;this.e=function(a,b){d.add(a,b)};var e=l,j=l,pc=g;this.T=function(){e=g};this.j=function(a){this.load();this.set(Ia,a,g);a=new wd(this);e=l;d.execute(this);
e=g;b={};this.n();a.Ia()};this.load=function(){e&&(e=l,this.Ja(),Kc(this),j||(j=g,c.execute(this),Lc(this),Kc(this)),e=g)};this.n=function(){e&&(j?(e=l,Lc(this),e=g):this.load())};this.get=function(c){Wa[c]&&this.load();return b[c]!==h?b[c]:a[c]};this.set=function(c,d,e){Wa[c]&&this.load();e?b[c]=d:a[c]=d;Wa[c]&&this.n()};this.z=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==h||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==h?b:c+""};this.Ja=function(){if(pc){var b=
this.c(aa,""),c=this.c(E,"/");Yb(b,c)||(a[A]=a[bb]&&""!=b?P(b):1,pc=l)}}};Mc.prototype.stopPropagation=function(){throw"aborted";};var wd=function(a){var b=this;this.q=0;var c=a.get(td);this.Ta=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ia=function(){!b.q&&c&&Bb(c,10)};a.set(Dc,b,g)},Nc=function(a,b,c){c=c?"":a.c(A,"1");b=b[u](".");if(6!==b[k]||Ka(b[0],c))return l;var c=1*b[1],d=1*b[2],e=1*b[3],j=1*b[4],b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<j&&0<=b))return q(110),l;a.set(L,c);a.set(jb,d);a.set(Ea,e);a.set(ca,
j);a.set(ma,b);return g},Zb=function(a){var b=a.get(L),c=a.get(jb),d=a.get(Ea),e=a.get(ca),j=a.b(ma,1);b==h?q(113):NaN==b&&q(114);0<=b&&0<c&&0<d&&0<e&&0<=j||q(115);return[a.b(A,1),b!=h?b:"-",c||"-",d||"-",e||"-",j][v](".")},Oc=function(a){return[a.b(A,1),a.b(da,0),a.b(M,1),a.b(oa,0)][v](".")},Pc=function(a,b,c){var c=c?"":a.c(A,"1"),d=b[u](".");if(4!==d[k]||Ka(d[0],c))d=null;a.set(da,d?1*d[1]:0);a.set(M,d?1*d[2]:10);a.set(oa,d?1*d[3]:a.get($));return null!=d||!Ka(b,c)},$b=function(a,b){var c=J(a.c(ib,
"")),d=[],e=a.get(R);if(!b&&e){for(var j=0;j<e[k];j++){var g=e[j];g&&1==g.scope&&d[t](j+"="+J(g.name)+"="+J(g.value)+"=1")}0<d[k]&&(c+="|"+d[v]("^"))}return c?a.b(A,1)+"."+c:null},Qc=function(a,b,c){c=c?"":a.c(A,"1");b=b[u](".");if(2>b[k]||Ka(b[0],c))return l;b=b.slice(1)[v](".")[u]("|");0<b[k]&&a.set(ib,B(b[0]));if(1>=b[k])return g;b=b[1][u](-1==b[1][o](",")?"^":",");for(c=0;c<b[k];c++){var d=b[c][u]("=");if(4==d[k]){var e={},j=B(d[1]);e.name=j;e.value=B(d[2]);e.scope=1;a.get(R)[d[0]]=e}}return g},
ac=function(a){var b;b=function(b,e){if(!w(a.get(b))){var j=a.c(b,""),j=j[u](" ")[v]("%20"),j=j[u]("+")[v]("%20");c[t](e+"="+j)}};var c=[];b(pa,"utmcid");b(ga,"utmcsr");b(ea,"utmgclid");b(fa,"utmdclid");b(qa,"utmccn");b(ra,"utmcmd");b(Ga,"utmctr");b(Ha,"utmcct");return(b=c[v]("|"))?[a.b(A,1),a.b(lb,0),a.b(Fa,1),a.b(mb,1),b][v]("."):""},Rc=function(a,b,c){c=c?"":a.c(A,"1");b=b[u](".");if(5>b[k]||Ka(b[0],c))return a.set(lb,h),a.set(Fa,h),a.set(mb,h),a.set(pa,h),a.set(qa,h),a.set(ga,h),a.set(ra,h),a.set(Ga,
h),a.set(Ha,h),a.set(ea,h),a.set(fa,h),l;a.set(lb,1*b[1]);a.set(Fa,1*b[2]);a.set(mb,1*b[3]);var d=b.slice(4)[v]("."),b=function(a){return(a=d.match(a+"=(.*?)(?:\\|utm|$)"))&&2==a[k]?a[1]:h},c=function(b,c){c&&(c=e?B(c):c[u]("%20")[v](" "),a.set(b,c))};-1==d[o]("=")&&(d=B(d));var e="2"==b("utmcvr");c(pa,b("utmcid"));c(qa,b("utmccn"));c(ga,b("utmcsr"));c(ra,b("utmcmd"));c(Ga,b("utmctr"));c(Ha,b("utmcct"));c(ea,b("utmgclid"));c(fa,b("utmdclid"));return g},Ka=function(a,b){return b?a!=b:!/^\d+$/.test(a)},
pb=function(){this.B=[]};pb.prototype.add=function(a,b){this.B[t]({name:a,s:b})};pb.prototype.execute=function(a){try{for(var b=0;b<this.B[k];b++)this.B[b].s.call(p,a)}catch(c){}};var sc=new function(){var a=[];this.set=function(b){a[b]=g};this.Wa=function(){for(var b=[],c=0;c<a[k];c++)a[c]&&(b[C.floor(c/6)]=b[C.floor(c/6)]^1<<c%6);for(c=0;c<b[k];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[U](b[c]||0);return b[v]("")+"~"}},p=window,n=document,yb=function(a){var b=p._gaUserPrefs;
return b&&b.ioo&&b.ioo()||!!a&&p["ga-disable-"+a]===g},T=function(a){for(var b=[],c=n.cookie[u](";"),a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),d=0;d<c[k];d++){var e=c[d].match(a);e&&b[t](e[1])}return b},N=function(a,b,c,d,e,j){if(e=yb(e)?l:Yb(d,c)?l:g){if(b&&0<=p.navigator.userAgent[o]("Firefox"))for(var b=b.replace(/\n|\r/g," "),e=0,f=b[k];e<f;++e){var h=b.charCodeAt(e)&255;if(10==h||13==h)b=b[r](0,e)+"?"+b[r](e+1)}b&&2E3<b[k]&&(b=b[r](0,2E3),q(69));a=a+"="+b+"; path="+c+"; ";j&&(a+="expires="+(new Date((new Date).getTime()+
j)).toGMTString()+"; ");d&&(a+="domain="+d+";");n.cookie=a}},qb,bc,Sc=function(){if(!qb){var a={},b=p.navigator,c=p.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[D]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=n.characterSet||n.charset||"-";try{var d=n.documentElement,e=n.body,g=e&&e.clientWidth&&e.clientHeight,b=[];d&&d.clientWidth&&d.clientHeight&&("CSS1Compat"===n.compatMode||!g)?b=[d.clientWidth,d.clientHeight]:
g&&(b=[e.clientWidth,e.clientHeight]);a.Va=b[v]("x")}catch(f){q(135)}qb=a}},xd=function(){Sc();for(var a=qb,b=p.navigator,a=b.appName+b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(n.cookie?n.cookie:"")+(n.referrer?n.referrer:""),b=a[k],c=p.history[k];0<c;)a+=c--^b++;return P(a)},yd=function(a){Sc();var b=qb;a.set(yc,b.Q);a.set(zc,b.P);a.set(Bc,b.language);a.set(Cc,b.characterSet);a.set(Ac,b.javaEnabled);a.set(Ob,b.Va);if(a.get(Ca)&&a.get(cb)){if(!(b=bc)){var c,d,e;d="ShockwaveFlash";
if((b=(b=p.navigator)?b.plugins:h)&&0<b[k])for(c=0;c<b[k]&&!e;c++)d=b[c],-1<d.name[o]("Shockwave Flash")&&(e=d.description[u]("Shockwave Flash ")[1]);else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(g){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(ia){}e&&(e=e[u](" ")[1][u](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}bc=b;a.set(Nb,
bc)}else a.set(Nb,"-")},zd=function(a){if(Ma(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.g=this.h=this.l="";-1==c&&-1==d?this.g=b:-1==c&&-1!=d?(this.h=b[r](0,d),this.g=b[r](d+1)):-1!=c&&-1==d?(this.l=b[r](0,c),this.g=b[r](c+1)):c>d?(this.h=b[r](0,d),this.l=b[r](d+1,c),this.g=b[r](c+1)):(this.h=b[r](0,d),this.g=b[r](d+1));this.k=a.slice(1);this.Ka=!this.l&&"_require"==this.g;this.J=!this.h&&!this.l&&"_provide"==this.g}},O=function(){z(O.prototype,"push",O.prototype[t],
5);z(O.prototype,"_getPlugin",xb,121);z(O.prototype,"_createAsyncTracker",O.prototype.Ra,33);z(O.prototype,"_getAsyncTracker",O.prototype.Sa,34);this.I=new W;this.p=[]};i=O.prototype;i.Ma=function(a,b,c){var d=this.I.get(a);if(!Ma(d))return l;b.plugins_=b.plugins_||new W;b.plugins_.set(a,new d(b,c||{}));return g};i.push=function(a){var b=G.Ua.apply(this,arguments),b=G.p.concat(b);for(G.p=[];0<b[k]&&!G.O(b[0])&&!(b.shift(),0<G.p[k]););G.p=G.p.concat(b);return 0};i.Ua=function(a){for(var b=[],c=0;c<
arguments[k];c++)try{var d=new zd(arguments[c]);d.J?this.O(d):b[t](d)}catch(e){}return b};i.O=function(a){try{if(a.s)a.s.apply(p);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.h?y:"_gaq"==a.h?G:y.u(a.h);if(a.Ka){if(!this.Ma(a.k[0],b,a.k[2])){if(!a.Oa){var c=oc(""+a.k[1]),d=c[K],e=n[x][K],j;if(j="https:"==d||d==e?g:"http:"!=d?l:"http:"==e){var f;a:{var h=oc(n[x][ha]);if(!c.Na&&!(0<=c.url[o]("?")||0<=c.path[o]("://")||c.host==h.host&&c[Ua]==h[Ua]))for(var i="http:"==c[K]?80:443,Ta=y.S,
b=0;b<Ta[k];b++)if(c.host==Ta[b][0]&&(c[Ua]||i)==(Ta[b][1]||i)&&0==c.path[o](Ta[b][2])){f=g;break a}f=l}j=f&&!yb()}j&&(a.Oa=mc(c.url))}return g}}else a.l&&(b=b.plugins_.get(a.l)),b[a.g].apply(b,a.k)}}catch(m){}};i.Ra=function(a,b){return y.r(a,b||"")};i.Sa=function(a){return y.u(a)};var sa=function(){function a(a,b,c,d){h==j[a]&&(j[a]={});h==j[a][b]&&(j[a][b]=[]);j[a][b][c]=d}function b(a,b,c){if(h!=j[a]&&h!=j[a][b])return j[a][b][c]}function c(a,b){if(h!=j[a]&&h!=j[a][b]){j[a][b]=h;var c=g,d;for(d=
0;d<f[k];d++)if(h!=j[a][f[d]]){c=l;break}c&&(j[a]=h)}}function d(a){var b="",c=l,d,e;for(d=0;d<f[k];d++)if(e=a[f[d]],h!=e){c&&(b+=f[d]);for(var c=[],j=h,q=h,q=0;q<e[k];q++)if(h!=e[q]){j="";q!=r&&h==e[q-1]&&(j+=q[H]()+n);for(var s=e[q],p="",u=h,w=h,x=h,u=0;u<s[k];u++)w=s[U](u),x=o[w],p+=h!=x?x:w;j+=p;c[t](j)}b+=ia+c[v](m)+i;c=l}else c=g;return b}var e=this,j=[],f=["k","v"],ia="(",i=")",m="*",n="!",o={"'":"'0"};o[i]="'1";o[m]="'2";o[n]="'3";var r=1;e.Qa=function(a){return h!=j[a]};e.A=function(){for(var a=
"",b=0;b<j[k];b++)h!=j[b]&&(a+=b[H]()+d(j[b]));return a};e.Pa=function(a){if(a==h)return e.A();for(var b=a.A(),c=0;c<j[k];c++)h!=j[c]&&!a.Qa(c)&&(b+=c[H]()+d(j[c]));return b};e.f=function(b,c,d){if(!Z(d))return l;a(b,"k",c,d);return g};e.o=function(b,c,d){if(!zb(d))return l;a(b,"v",c,d[H]());return g};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};z(e,"_setKey",e.f,89);z(e,"_setValue",e.o,90);z(e,"_getKey",e.getKey,
87);z(e,"_getValue",e.N,88);z(e,"_clearKey",e.L,85);z(e,"_clearValue",e.M,86)},cc=function(a){var b=p.gaGlobal;a&&!b&&(p.gaGlobal=b={});return b},Ad=function(){var a=cc(g).hid;null==a&&(a=xa(),cc(g).hid=a);return a},Bd=function(a){a.set(xc,Ad());var b=cc();if(b&&b.dh==a.get(A)){var c=b.sid;c&&("0"==c&&q(112),a.set(ca,c),a.get(Pb)&&a.set(Ea,c));b=b.vid;a.get(Pb)&&b&&(b=b[u]("."),1*b[1]||q(112),a.set(L,1*b[0]),a.set(jb,1*b[1]))}},Tc,Uc=function(a,b,c){var d=a.c(aa,""),e=a.c(E,"/"),g=a.b(ka,0),a=a.c(Q,
"");N(b,c,e,d,a,g)},Lc=function(a){var b=a.c(aa,"");a.b(A,1);var c=a.c(E,"/"),d=a.c(Q,"");N("__utma",Zb(a),c,b,d,a.get(ka));N("__utmb",Oc(a),c,b,d,a.get(Za));N("__utmc",""+a.b(A,1),c,b,d);var e=ac(a,g);e?N("__utmz",e,c,b,d,a.get($a)):N("__utmz","",c,b,"",-1);(e=$b(a,l))?N("__utmv",e,c,b,d,a.get(ka)):N("__utmv","",c,b,"",-1)},Kc=function(a){var b=a.b(A,1);if(!Nc(a,za(b,T("__utma"))))return a.set(Qb,g),l;var c=!Pc(a,za(b,T("__utmb")));a.set(kb,c);Rc(a,za(b,T("__utmz")));Qc(a,za(b,T("__utmv")));Tc=!c;
return g},Cd=function(a){!Tc&&!(0<T("__utmb")[k])&&(N("__utmd","1",a.c(E,"/"),a.c(aa,""),a.c(Q,""),1E4),0==T("__utmd")[k]&&a[X]())},Xc=function(a){a.get(L)==h?Vc(a):a.get(Qb)&&!a.get(nb)?Vc(a):a.get(kb)&&Wc(a)},Dd=function(a){a.get(Rb)&&!a.get(na)&&(Wc(a),a.set(Fa,a.get(ma)))},Vc=function(a){var b=a.get($);a.set(Pb,g);a.set(L,xa()^xd(a)&2147483647);a.set(ib,"");a.set(jb,b);a.set(Ea,b);a.set(ca,b);a.set(ma,1);a.set(na,g);a.set(da,0);a.set(M,10);a.set(oa,b);a.set(R,[]);a.set(Qb,l);a.set(kb,l)},Wc=function(a){a.set(Ea,
a.get(ca));a.set(ca,a.get($));a.z(ma);a.set(na,g);a.set(da,0);a.set(M,10);a.set(oa,a.get($));a.set(kb,l)},Ed="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "),
Hd=function(a){if(a.get(Cb)&&!a.get(nb)){for(var b=!w(a.get(pa))||!w(a.get(ga))||!w(a.get(ea))||!w(a.get(fa)),c={},d=0;d<rb[k];d++){var e=rb[d];c[e]=a.get(e)}(d=a.get(sd))?(q(149),e=new W,ub(e,d),d=e):d=ya(n[x][ha],a.get(ab)).d;if(!("1"==V(d.get(a.get(Kb)))&&b)){var j=d,f=function(b,c){var c=c||"-",d=V(j.get(a.get(b)));return d&&"-"!=d?B(d):c},d=V(j.get(a.get(Db)))||"-",e=V(j.get(a.get(Gb)))||"-",i=V(j.get(a.get(Fb)))||"-",vb=V(j.get("dclid"))||"-",m=f(Eb,"(not set)"),o=f(Hb,"(not set)"),r=f(Ib),
f=f(Jb);if(w(d)&&w(i)&&w(vb)&&w(e))d=l;else{var s=!w(vb)&&w(e),t=w(r);if(s||t){var p=Yc(a),p=ya(p,g);if((p=Zc(a,p))&&!w(p[1]&&!p[2]))s&&(e=p[0]),t&&(r=p[1])}sb(a,d,e,i,vb,m,o,r,f);d=g}d=d||Fd(a);!d&&!b&&a.get(na)&&(sb(a,h,"(direct)",h,h,"(direct)","(none)",h,h),d=g);if(d&&(a.set(Rb,Gd(a,c)),b="(direct)"==a.get(ga)&&"(direct)"==a.get(qa)&&"(none)"==a.get(ra),a.get(Rb)||a.get(na)&&!b))a.set(lb,a.get($)),a.set(Fa,a.get(ma)),a.z(mb)}}},Fd=function(a){var b=Yc(a),c=ya(b,g);if(!(b!=h&&null!=b&&""!=b&&"0"!=
b&&"-"!=b&&0<=b[o]("://"))||c&&-1<c.host[o]("google")&&c.d.contains("q")&&"cse"==c.path)return l;if((b=Zc(a,c))&&!b[2])return sb(a,h,b[0],h,h,"(organic)","organic",b[1],h),g;if(b||!a.get(na))return l;a:{for(var b=a.get(hb),d=nc(c.host),e=0;e<b[k];++e)if(-1<d[o](b[e])){a=l;break a}sb(a,h,d,h,h,"(referral)","referral",h,"/"+c.path);a=g}return a},Zc=function(a,b){for(var c=a.get(fb),d=0;d<c[k];++d){var e=c[d][u](":");if(-1<b.host[o](e[0][D]())){var j=b.d.get(e[1]);if(j&&(j=I(j),!j&&-1<b.host[o]("google.")&&
(j="(not provided)"),!e[3]||-1<b.url[o](e[3]))){a:{for(var c=j,d=a.get(gb),c=B(c)[D](),f=0;f<d[k];++f)if(c==d[f]){c=g;break a}c=l}return[e[2]||e[0],j,c]}}}return null},sb=function(a,b,c,d,e,g,f,h,k){a.set(pa,b);a.set(ga,c);a.set(ea,d);a.set(fa,e);a.set(qa,g);a.set(ra,f);a.set(Ga,h);a.set(Ha,k)},rb=[qa,pa,ea,fa,ga,ra,Ga,Ha],Gd=function(a,b){function c(a){a=(""+a)[u]("+")[v]("%20");return a[u](" ")[v]("%20")}function d(c){var d=""+(a.get(c)||""),c=""+(b[c]||"");return 0<d[k]&&d==c}if(d(ea)||d(fa))return q(131),
l;for(var e=0;e<rb[k];e++){var j=rb[e],f=b[j]||"-",j=a.get(j)||"-";if(c(f)!=c(j))return g}return l},Id=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Yc=function(a){a=qc(a.get(Da),a.get(E));try{if(Id.test(a))return q(136),a+"?q="}catch(b){q(145)}return a},Kd=function(a){Jd(a,n[x][ha])?(a.set(nb,g),q(12)):a.set(nb,l)},Jd=function(a,b){if(!a.get(Ba))return l;var c=ya(b,a.get(ab)),d=I(c.d.get("__utma")),e=I(c.d.get("__utmb")),j=I(c.d.get("__utmc")),f=I(c.d.get("__utmx")),h=I(c.d.get("__utmz")),
k=I(c.d.get("__utmv")),c=I(c.d.get("__utmk"));if(P(""+d+e+j+f+h+k)!=c){d=B(d);e=B(e);j=B(j);f=B(f);j=Ld(d+e+j+f,h,k,c);if(!j)return l;h=j[0];k=j[1]}if(!Nc(a,d,g))return l;Pc(a,e,g);Rc(a,h,g);Qc(a,k,g);$c(a,f,g);return g},ec=function(a,b,c){var d;d=Zb(a)||"-";var e=Oc(a)||"-",g=""+a.b(A,1)||"-",f=dc(a)||"-",h=ac(a,l)||"-",a=$b(a,l)||"-",k=P(""+d+e+g+f+h+a),i=[];i[t]("__utma="+d);i[t]("__utmb="+e);i[t]("__utmc="+g);i[t]("__utmx="+f);i[t]("__utmz="+h);i[t]("__utmv="+a);i[t]("__utmk="+k);d=i[v]("&");
if(!d)return b;e=b[o]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";g=b[o]("?");0<e&&(c=b[r](e),b=b[r](0,e));return 0>g?b+"?"+d+c:b+"&"+d+c},Ld=function(a,b,c,d){for(var e=0;3>e;e++){for(var g=0;3>g;g++){if(d==P(a+b+c))return q(127),[b,c];var f=b.replace(/ /g,"%20"),h=c.replace(/ /g,"%20");if(d==P(a+f+h))return q(128),[f,h];f=f.replace(/\+/g,"%20");h=h.replace(/\+/g,"%20");if(d==P(a+f+h))return q(129),[f,h];try{var i=b.match("utmctr=(.*?)(?:\\|utm|$)");if(i&&2==i[k]&&(f=b.replace(i[1],J(B(i[1]))),d==
P(a+f+c)))return q(139),[f,c]}catch(l){}b=B(b)}c=B(c)}},ad="|",fc=function(a,b,c,d,e,g,f,h,i){var k=bd(a,b);k||(k={},a.get(la)[t](k));k.id_=b;k.affiliation_=c;k.total_=d;k.tax_=e;k.shipping_=g;k.city_=f;k.state_=h;k.country_=i;k.items_=k.items_||[];return k},cd=function(a,b,c,d,e,g,f){var a=bd(a,b)||fc(a,b,"",0,0,0,"","",""),h;a:{if(a&&a.items_){h=a.items_;for(var i=0;i<h[k];i++)if(h[i].sku_==c){h=h[i];break a}}h=null}i=h||{};i.transId_=b;i.sku_=c;i.name_=d;i.category_=e;i.price_=g;i.quantity_=f;
h||a.items_[t](i);return i},bd=function(a,b){for(var c=a.get(la),d=0;d<c[k];d++)if(c[d].id_==b)return c[d];return null},dd,Md=function(a){if(!dd){var b;b=n[x].hash;var c=p.name,d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b.match(d)||c&&c.match(d))?b[1]:I(T("GASO")))&&b.match(/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i))Uc(a,"GASO",""+b),y._gasoDomain=a.get(aa),y._gasoCPath=a.get(E),a=c[1],mc("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+xa(),"_gasojs");dd=g}},
$c=function(a,b,c){c&&(b=B(b));c=a.b(A,1);b=b[u](".");!(2>b[k])&&/^\d+$/.test(b[0])&&(b[0]=""+c,Uc(a,"__utmx",b[v](".")))},dc=function(a,b){var c=za(a.get(A),T("__utmx"));"-"==c&&(c="");return b?J(c):c},fd=function(a,b){var c=C.min(a.b(Ja,0),100);if(a.b(L,0)%100>=c)return l;var d;if(c=(c=p.performance||p.webkitPerformance)&&c.timing){var e=c.navigationStart;0==e?q(133):d=[c.loadEventStart-e,c.domainLookupEnd-c.domainLookupStart,c.connectEnd-c.connectStart,c.responseStart-c.requestStart,c.responseEnd-
c.responseStart,c.fetchStart-e]}d||(p.top!=p?d=h:(c=(d=p.external)&&d.onloadT,d&&!d.isValidLoadTime&&(c=h),2147483648<c&&(c=h),0<c&&d.setPageReadyTime(),d=c==h?h:[c]));if(d==h)return l;c=d[0];if(c==h||c==Ab||isNaN(c))return l;if(0<c){a:{for(c=1;c<d[k];c++)if(isNaN(d[c])||d[c]==Ab||0>d[c]){c=l;break a}c=g}c?b(ed(d)):b(ed(d.slice(0,1)))}else Ya(p,"load",function(){fd(a,b)},l);return g},Nd=function(a,b,c,d){var e=new sa;e.f(14,90,b[r](0,64));e.f(14,91,a[r](0,64));e.f(14,92,""+gd(c));d!=h&&e.f(14,93,
d[r](0,64));e.o(14,90,c);return e},gd=function(a){return isNaN(a)||0>a?0:5E3>a?10*C.floor(a/10):5E4>a?100*C.floor(a/100):41E5>a?1E3*C.floor(a/1E3):41E5},ed=function(a){for(var b=new sa,c=0;c<a[k];c++)b.f(14,c+1,""+gd(a[c])),b.o(14,c+1,a[c]);return b},m=function(a,b,c){function d(a){return function(b){if((b=b.get(ob)[a])&&b[k])for(var c={type:a,target:e,stopPropagation:function(){throw"aborted";}},d=0;d<b[k];d++)b[d].call(e,c)}}var e=this;this.a=new Mc;this.get=function(a){return this.a.get(a)};this.set=
function(a,b,c){this.a.set(a,b,c)};this.set(Q,b||"UA-XXXXX-X");this.set(uc,a||"");this.set(tc,c||"");this.set($,C.round((new Date).getTime()/1E3));this.set(E,"/");this.set(ka,63072E6);this.set($a,15768E6);this.set(Za,18E5);this.set(Ba,l);this.set(Lb,50);this.set(ab,l);this.set(bb,g);this.set(Ca,g);this.set(cb,g);this.set(Cb,g);this.set(db,g);this.set(Eb,"utm_campaign");this.set(Db,"utm_id");this.set(Fb,"gclid");this.set(Gb,"utm_source");this.set(Hb,"utm_medium");this.set(Ib,"utm_term");this.set(Jb,
"utm_content");this.set(Kb,"utm_nooverride");this.set(Aa,100);this.set(Ja,1);this.set(Ub,l);this.set(eb,"/__utm.gif");this.set(ba,1);this.set(la,[]);this.set(R,[]);this.set(fb,Ed.slice(0));this.set(gb,[]);this.set(hb,[]);this.C("auto");this.set(Da,n.referrer);a=this.a;try{var j=ya(n[x][ha],l),f=Qa(V(j.d.get("utm_referrer")))||"";f&&a.set(Da,f);var i=Qa(I(j.d.get("utm_expid")));i&&a.set(Xb,i)}catch(m){q(146)}this.set(ob,{hit:[],load:[]});this.a.i("0",Kd);this.a.i("1",Xc);this.a.i("2",Hd);this.a.i("3",
Dd);this.a.i("4",d("load"));this.a.i("5",Md);this.a.e("A",pd);this.a.e("B",qd);this.a.e("C",Xc);this.a.e("D",od);this.a.e("E",vd);this.a.e("F",Od);this.a.e("G",Cd);this.a.e("H",rd);this.a.e("I",yd);this.a.e("J",Bd);this.a.e("K",d("hit"));this.a.e("L",Pd);this.a.e("M",Qd);0===this.get($)&&q(111);this.a.T();this.H=h};i=m.prototype;i.m=function(){var a=this.get(Mb);a||(a=new sa,this.set(Mb,a));return a};i.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,g)}};i.K=function(a){if(this.get(Ub))return l;
var b=this,c=fd(this.a,function(c){b.set(Y,a,g);b.t(c)});this.set(Ub,c);return c};i.Ea=function(a){a&&tb(a)?(q(13),this.set(Y,a,g)):"object"===typeof a&&null!==a&&this.La(a);this.H=a=this.get(Y);this.a.j("page");this.K(a)};i.G=function(a,b,c,d,e){if(""==a||!Z(a)||""==b||!Z(b)||c!=h&&!Z(c)||d!=h&&!zb(d))return l;this.set(Sb,a,g);this.set(Tb,b,g);this.set(Fc,c,g);this.set(Gc,d,g);this.set(Ec,!!e,g);this.a.j("event");return g};i.Ga=function(a,b,c,d,e){var f=this.a.b(Ja,0);1*e===e&&(f=e);if(this.a.b(L,
0)%100>=f)return l;c=1*(""+c);if(""==a||!Z(a)||(""==b||!Z(b)||!zb(c)||isNaN(c)||0>c||0>f||100<f)||d!=h&&(""==d||!Z(d)))return l;this.t(Nd(a,b,c,d));return g};i.Fa=function(a,b,c,d){if(!a||!b)return l;this.set(Hc,a,g);this.set(Ic,b,g);this.set(Jc,c||n[x][ha],g);d&&this.set(Y,d,g);this.a.j("social");return g};i.Da=function(){this.set(Ja,10);this.K(this.H)};i.Ha=function(){this.a.j("trans")};i.t=function(a){this.set(vc,a,g);this.a.j("event")};i.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,
d,e){q(91);b.G(a,c,d,e)}}};i.la=function(a){return this.get(a)};i.wa=function(a,b){if(a)if(tb(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};i.addEventListener=function(a,b){var c=this.get(ob)[a];c&&c[t](b)};i.removeEventListener=function(a,b){for(var c=this.get(ob)[a],d=0;c&&d<c[k];d++)if(c[d]==b){c.splice(d,1);break}};i.pa=function(){return"5.3.3"};i.C=function(a){this.get(bb);a="auto"==a?nc(n.domain):!a||"-"==a||"none"==a?"":a[D]();this.set(aa,
a)};i.ua=function(a){this.set(bb,!!a)};i.ma=function(a,b){return ec(this.a,a,b)};i.link=function(a,b){if(this.a.get(Ba)&&a){var c=ec(this.a,a,b);n[x].href=c}};i.ta=function(a,b){this.a.get(Ba)&&a&&a.action&&(a.action=ec(this.a,a.action,b))};i.ya=function(){this.v();var a=this.a,b=n.getElementById?n.getElementById("utmtrans"):n.utmform&&n.utmform.utmtrans?n.utmform.utmtrans:null;if(b&&b.value){a.set(la,[]);for(var b=b.value[u]("UTM:"),c=0;c<b[k];c++){b[c]=Na(b[c]);for(var d=b[c][u](ad),e=0;e<d[k];e++)d[e]=
Na(d[e]);"T"==d[0]?fc(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&cd(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};i.$=function(a,b,c,d,e,g,f,h){return fc(this.a,a,b,c,d,e,g,f,h)};i.Y=function(a,b,c,d,e,g){return cd(this.a,a,b,c,d,e,g)};i.za=function(a){ad=a||"|"};i.ea=function(){this.set(la,[])};i.va=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(Lb))a=l;else if(!b||!c||128<b[k]+c[k])a=l;else{1!=d&&2!=d&&(d=3);var f={};f.name=b;f.value=c;f.scope=d;e.get(R)[a]=f;a=g}a&&this.a.n();return a};i.ka=
function(a){this.a.get(R)[a]=h;this.a.n()};i.qa=function(a){return(a=this.a.get(R)[a])&&1==a.scope?a.value:h};i.Ba=function(a,b,c){this.m().f(a,b,c)};i.Ca=function(a,b,c){this.m().o(a,b,c)};i.ra=function(a,b){return this.m().getKey(a,b)};i.sa=function(a,b){return this.m().N(a,b)};i.fa=function(a){this.m().L(a)};i.ga=function(a){this.m().M(a)};i.ja=function(){return new sa};i.W=function(a){a&&this.get(gb)[t](a[D]())};i.ba=function(){this.set(gb,[])};i.X=function(a){a&&this.get(hb)[t](a[D]())};i.ca=
function(){this.set(hb,[])};i.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[D]()][v](":");if(d||e)a=[a,d,e][v](":");d=this.get(fb);d.splice(c?0:d[k],0,a)}};i.da=function(){this.set(fb,[])};i.ha=function(a){this.a.load();var b=this.get(E),c=dc(this.a);this.set(E,a);this.a.n();$c(this.a,c);this.set(E,b)};i.xa=function(a,b){if(0<a&&5>=a&&tb(b)&&""!=b){var c=this.get(Vb)||[];c[a]=b;this.set(Vb,c)}};i.V=function(a){a=""+a;if(a.match(/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Wb)||[];b[t](a);this.set(Wb,b)}};i.v=function(){this.a.load()};
i.Aa=function(a){a&&""!=a&&(this.set(ib,a),this.a.j("var"))};var Od=function(a){"trans"!==a.get(Ia)&&500<=a.b(da,0)&&a[X]();if("event"===a.get(Ia)){var b=(new Date).getTime(),c=a.b(oa,0),d=a.b(ca,0),c=C.floor(1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(oa,b),a.set(M,C.min(10,a.b(M,0)+c)));0>=a.b(M,0)&&a[X]()}},Qd=function(a){"event"===a.get(Ia)&&a.set(M,C.max(0,a.b(M,10)-1))},ta=function(){var a=[];this.add=function(b,c,d){d&&(c=J(""+c));a[t](b+"="+c)};this.toString=function(){return a[v]("&")}},ua=function(a,
b){(b||2!=a.get(ba))&&a.z(da)},va=function(a,b){b.add("utmwv","5.3.3");b.add("utms",a.get(da));b.add("utmn",xa());var c=n[x].hostname;w(c)||b.add("utmhn",c,g);c=a.get(Aa);100!=c&&b.add("utmsp",c,g)},wa=function(a,b){b.add("utmac",Na(a.get(Q)));a.get(Xb)&&b.add("utmxkey",a.get(Xb),g);a.get(Ec)&&b.add("utmni",1);var c=a.get(Wb);c&&0<c[k]&&b.add("utmdid",c[v]("."));var c=function(a,b){b&&d[t](a+"="+b+";")},d=[];c("__utma",Zb(a));c("__utmz",ac(a,l));c("__utmv",$b(a,g));c("__utmx",dc(a));b.add("utmcc",
d[v]("+"),g);y.w&&b.add("aip",1);b.add("utmu",sc.Wa())},La=function(a,b){for(var c=a.get(Vb)||[],d=[],e=1;e<c[k];e++)c[e]&&d[t](e+":"+J(c[e].replace(/%/g,"%25").replace(/:/g,"%3A").replace(/,/g,"%2C")));d[k]&&b.add("utmpg",d[v](","))},gc=function(a,b){a.get(Ca)&&(b.add("utmcs",a.get(Cc),g),b.add("utmsr",a.get(yc)),a.get(Ob)&&b.add("utmvp",a.get(Ob)),b.add("utmsc",a.get(zc)),b.add("utmul",a.get(Bc)),b.add("utmje",a.get(Ac)),b.add("utmfl",a.get(Nb),g))},hc=function(a,b){a.get(db)&&a.get(Xa)&&b.add("utmdt",
a.get(Xa),g);b.add("utmhid",a.get(xc));b.add("utmr",qc(a.get(Da),a.get(E)),g);b.add("utmp",J(a.get(Y),g),g)},ic=function(a,b){for(var c=a.get(Mb),d=a.get(vc),e=a.get(R)||[],f=0;f<e[k];f++){var i=e[f];i&&(c||(c=new sa),c.f(8,f,i.name),c.f(9,f,i.value),3!=i.scope&&c.f(11,f,""+i.scope))}!w(a.get(Sb))&&!w(a.get(Tb),g)&&(c||(c=new sa),c.f(5,1,a.get(Sb)),c.f(5,2,a.get(Tb)),e=a.get(Fc),e!=h&&c.f(5,3,e),e=a.get(Gc),e!=h&&c.o(5,1,e));c?b.add("utme",c.Pa(d),g):d&&b.add("utme",d.A(),g)},Rd=function(a,b,c){var d=
new ta;ua(a,c);va(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,g);d.add("utmtst",b.affiliation_,g);d.add("utmtto",b.total_,g);d.add("utmttx",b.tax_,g);d.add("utmtsp",b.shipping_,g);d.add("utmtci",b.city_,g);d.add("utmtrg",b.state_,g);d.add("utmtco",b.country_,g);(b=a.get(wc))&&d.add("utmcu",b,g);c||(La(a,d),wa(a,d));return d[H]()},Sd=function(a,b,c){var d=new ta;ua(a,c);va(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,g);d.add("utmipc",b.sku_,g);d.add("utmipn",b.name_,g);d.add("utmiva",b.category_,
g);d.add("utmipr",b.price_,g);d.add("utmiqt",b.quantity_,g);(b=a.get(wc))&&d.add("utmcu",b,g);c||(La(a,d),wa(a,d));return d[H]()},hd=function(a,b){var c=a.get(Ia);if("page"==c)c=new ta,ua(a,b),va(a,c),ic(a,c),gc(a,c),hc(a,c),b||(La(a,c),wa(a,c)),c=[c[H]()];else if("event"==c)c=new ta,ua(a,b),va(a,c),c.add("utmt","event"),ic(a,c),gc(a,c),hc(a,c),b||(La(a,c),wa(a,c)),c=[c[H]()];else if("var"==c)c=new ta,ua(a,b),va(a,c),c.add("utmt","var"),!b&&wa(a,c),c=[c[H]()];else if("trans"==c)for(var c=[],d=a.get(la),
e=0;e<d[k];++e){c[t](Rd(a,d[e],b));for(var f=d[e].items_,h=0;h<f[k];++h)c[t](Sd(a,f[h],b))}else"social"==c?b?c=[]:(c=new ta,ua(a,b),va(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Hc),g),c.add("utmsa",a.get(Ic),g),c.add("utmsid",a.get(Jc),g),ic(a,c),gc(a,c),hc(a,c),La(a,c),wa(a,c),c=[c[H]()]):c=[];return c},Pd=function(a){var b,c=a.get(ba),d=a.get(Dc),e=d&&d.Ta,f=0;if(0==c||2==c){var i=a.get(eb)+"?";b=hd(a,g);for(var l=0,m=b[k];l<m;l++)wb(b[l],e,i,g),f++}if(1==c||2==c){b=hd(a);l=0;for(m=b[k];l<
m;l++)try{wb(b[l],e),f++}catch(n){n&&Va(n.name,h,n.message)}}d&&(d.q=f)},jc="https:"==n[x][K]?"https://ssl.google-analytics.com":"http://www.google-analytics.com",Td=function(a){this.name="len";this.message=a+"-8192"},Ud=function(a){this.name="ff2post";this.message=a+"-2036"},wb=function(a,b,c,d){b=b||Oa;if(d||2036>=a[k]){var e=b,f;f=c||jc+"/__utm.gif?";var h=new Image(1,1);h.src=f+a;h.onload=function(){h.onload=null;h.onerror=null;e()};h.onerror=function(){h.onload=null;h.onerror=null;e()}}else if(8192>=
a[k]){var i=b;if(0<=p.navigator.userAgent[o]("Firefox")&&![].reduce)throw new Ud(a[k]);var l,b=jc+"/p/__utm.gif";if(c=p.XDomainRequest)l=new c,l.open("POST",b);else if(c=p.XMLHttpRequest)c=new c,"withCredentials"in c&&(l=c,l.open("POST",b,g),l.setRequestHeader("Content-Type","text/plain"));l&&(l.onreadystatechange=function(){4==l.readyState&&(i(),l=null)},l.send(a),f=g);f||id(a,i)}else throw new Td(a[k]);},id=function(a,b){if(n.body){a=Pa(a);try{var c=n[Ra]('<iframe name="'+a+'"></iframe>')}catch(d){c=
n[Ra]("iframe"),c.name=a}c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var e=n[x],e=jc+"/u/post_iframe.html#"+Pa(e[K]+"//"+e.host+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Ya(p,"beforeunload",f);var h=l,i=0,k=function(){if(!h){try{if(9<i||c.contentWindow[x].host==n[x].host){h=g;f();var a=p;a.removeEventListener?a.removeEventListener("beforeunload",f,!1):a.detachEvent&&a.detachEvent("onbeforeunload",f);b();return}}catch(d){}i++;Bb(k,
200)}};Ya(c,"load",k);n.body.appendChild(c);c.src=e}else Bb(function(){id(a,b)},100)},F=function(){this.w=l;this.D={};this.F=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=h;z(F.prototype,"_createTracker",F.prototype.r,55);z(F.prototype,"_getTracker",F.prototype.na,0);z(F.prototype,"_getTrackerByName",F.prototype.u,51);z(F.prototype,"_getTrackers",F.prototype.oa,130);z(F.prototype,"_anonymizeIp",F.prototype.aa,16);z(F.prototype,"_getPlugin",xb,120);
var a=function(a,c,d){z(m.prototype,a,c,d)};S("_getName",uc,58);S("_getAccount",Q,64);S("_visitCode",L,54);S("_getClientInfo",Ca,53,1);S("_getDetectTitle",db,56,1);S("_getDetectFlash",cb,65,1);S("_getLocalGifPath",eb,57);S("_getServiceMode",ba,59);s("_setClientInfo",Ca,66,2);s("_setAccount",Q,3);s("_setNamespace",tc,48);s("_setAllowLinker",Ba,11,2);s("_setDetectFlash",cb,61,2);s("_setDetectTitle",db,62,2);s("_setLocalGifPath",eb,46,0);s("_setLocalServerMode",ba,92,h,0);s("_setRemoteServerMode",ba,
63,h,1);s("_setLocalRemoteServerMode",ba,47,h,2);s("_setSampleRate",Aa,45,1);s("_setCampaignTrack",Cb,36,2);s("_setAllowAnchor",ab,7,2);s("_setCampNameKey",Eb,41);s("_setCampContentKey",Jb,38);s("_setCampIdKey",Db,39);s("_setCampMediumKey",Hb,40);s("_setCampNOKey",Kb,42);s("_setCampSourceKey",Gb,43);s("_setCampTermKey",Ib,44);s("_setCampCIdKey",Fb,37);s("_setCookiePath",E,9,0);s("_setMaxCustomVariables",Lb,0,1);s("_setVisitorCookieTimeout",ka,28,1);s("_setSessionCookieTimeout",Za,26,1);s("_setCampaignCookieTimeout",
$a,29,1);s("_setReferrerOverride",Da,49);s("_setSiteSpeedSampleRate",Ja,132);a("_trackPageview",m.prototype.Ea,1);a("_trackEvent",m.prototype.G,4);a("_trackPageLoadTime",m.prototype.Da,100);a("_trackSocial",m.prototype.Fa,104);a("_trackTrans",m.prototype.Ha,18);a("_sendXEvent",m.prototype.t,78);a("_createEventTracker",m.prototype.ia,74);a("_getVersion",m.prototype.pa,60);a("_setDomainName",m.prototype.C,6);a("_setAllowHash",m.prototype.ua,8);a("_getLinkerUrl",m.prototype.ma,52);a("_link",m.prototype.link,
101);a("_linkByPost",m.prototype.ta,102);a("_setTrans",m.prototype.ya,20);a("_addTrans",m.prototype.$,21);a("_addItem",m.prototype.Y,19);a("_clearTrans",m.prototype.ea,105);a("_setTransactionDelim",m.prototype.za,82);a("_setCustomVar",m.prototype.va,10);a("_deleteCustomVar",m.prototype.ka,35);a("_getVisitorCustomVar",m.prototype.qa,50);a("_setXKey",m.prototype.Ba,83);a("_setXValue",m.prototype.Ca,84);a("_getXKey",m.prototype.ra,76);a("_getXValue",m.prototype.sa,77);a("_clearXKey",m.prototype.fa,72);
a("_clearXValue",m.prototype.ga,73);a("_createXObj",m.prototype.ja,75);a("_addIgnoredOrganic",m.prototype.W,15);a("_clearIgnoredOrganic",m.prototype.ba,97);a("_addIgnoredRef",m.prototype.X,31);a("_clearIgnoredRef",m.prototype.ca,32);a("_addOrganic",m.prototype.Z,14);a("_clearOrganic",m.prototype.da,70);a("_cookiePathCopy",m.prototype.ha,30);a("_get",m.prototype.la,106);a("_set",m.prototype.wa,107);a("_addEventListener",m.prototype.addEventListener,108);a("_removeEventListener",m.prototype.removeEventListener,
109);a("_addDevId",m.prototype.V);a("_getPlugin",xb,122);a("_setPageGroup",m.prototype.xa,126);a("_trackTiming",m.prototype.Ga,124);a("_initData",m.prototype.v,2);a("_setVar",m.prototype.Aa,22);s("_setSessionTimeout",Za,27,3);s("_setCookieTimeout",$a,25,3);s("_setCookiePersistence",ka,24,1);a("_setAutoTrackOutbound",Oa,79);a("_setTrackOutboundSubdomains",Oa,81);a("_setHrefExamineLimit",Oa,80)};i=F.prototype;i.na=function(a,b){return this.r(a,h,b)};i.r=function(a,b,c){b&&q(23);c&&q(67);b==h&&(b="~"+
y.U++);a=new m(b,a,c);y.D[b]=a;y.F[t](a);return a};i.u=function(a){a=a||"";return y.D[a]||y.r(h,a)};i.oa=function(){return y.F.slice(0)};i.aa=function(){this.w=g};var jd=function(a){if("prerender"==n.webkitVisibilityState)return l;a();return g},y=new F,kc=p._gat;kc&&Ma(kc._getTracker)?y=kc:p._gat=y;var G=new O,kd=function(){var a=p._gaq,b=l;a&&Ma(a[t])&&(b="[object Array]"==Object.prototype[H].call(Object(a)),!b)?G=a:(p._gaq=G,b&&G[t].apply(G,a))};if(!jd(kd)){q(123);var ld=l,md=function(){if(!ld&&
jd(kd)){ld=g;var a=n,b=md;a.removeEventListener?a.removeEventListener("webkitvisibilitychange",b,!1):a.detachEvent&&a.detachEvent("onwebkitvisibilitychange",b)}};Ya(n,"webkitvisibilitychange",md)}})();

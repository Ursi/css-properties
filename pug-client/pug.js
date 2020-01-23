
			function pug(name, locals, string = false) {
				const templates = {
		
				'table': function(...args) {
					function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (properties) {;pug_debug_line = 1;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 2;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 3;pug_debug_filename = "Pug";
// iterate properties
;(function(){
  var $$obj = properties;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var property = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "Pug";
if (!/ED|NOTE/.test(property.status)) {
;pug_debug_line = 5;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 6;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd class=\"property\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.property) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", property.url, true, true)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 8;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 8;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.status) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var property = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "Pug";
if (!/ED|NOTE/.test(property.status)) {
;pug_debug_line = 5;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 6;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd class=\"property\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.property) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", property.url, true, true)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 8;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 8;pug_debug_filename = "Pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = property.status) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 9;pug_debug_filename = "Pug";
pug_html = pug_html + "\u003Cdiv style=\"height: 100vh;\"\u003E\u003C\u002Fdiv\u003E";}.call(this,"properties" in locals_for_with?locals_for_with.properties:typeof properties!=="undefined"?properties:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}
					return template(...args);
				},
			
		};

		const html = templates[name](locals);
		if (string) {
			return html;
		} else {
			const templateElem = document.createElement('template');
			templateElem.innerHTML = html;
			return templateElem.content;
		}
	}
	
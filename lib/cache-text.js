;(function(){

var $ = require('jquery');
var cache = {};

module.exports = function (url, done) {
	var result = '';

	if (cache[url]) {
		if (done) done(null, cache[url]);
		return cache[url];
	}

	var options = {
					url	 : url,
					async: done !== undefined,
					success: function ( text ) {
						if (done) done(null, text);
						result = cache[url] = text;
					},
					error: function() {
						if (console) console.error('Cannot load ' + url);
						if (done) done(new Error('Cannot load ' + url));
						result = '';
					}
				};

	if ( url.indexOf(".xml") > -1 ) 
		options.dataType = "xml";

	if ( url.indexOf(".json") > -1 ) 
		options.dataType = "json";

	$.ajax( options );

	return result;
}


})();
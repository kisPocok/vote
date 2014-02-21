var url = require('url');
var params = require('../src/config').config;

/*
 * GET home page.
 */
exports.index = function(request, response)
{
	/*
	var userId = request.cookies.userId;
	if (!userId) {
		userId = Math.floor(Math.random() * 1500000);
	}
	response.cookie('userId', userId, {maxAge: 900000, httpOnly: true});
	//console.log(userId);
	*/
    var urlParams = url.parse(request.url, true).query;
    params.code = urlParams.code||null;
	response.render('index', params);
};

exports.admin = function(request, response)
{
    params.title = 'Vote(r) ADMIN';
    response.render('admin', params);
};
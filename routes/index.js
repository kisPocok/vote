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
    params.code = request.params.id;
    params.activeUser = params.users.filter(function(user) {
        return user.code == params.code;
    })[0]||{};
	response.render('index', params);
};

exports.admin = function(request, response)
{
    params.title = 'Vote(r) ADMIN';
    response.render('admin', params);
};
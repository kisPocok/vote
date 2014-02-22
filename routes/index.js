var params = require('../src/config').config;

exports.index = function(request, response)
{
    params.code = request.params.id;
    params.activeUser = params.users.filter(function(user) {
        return user.code == params.code;
    })[0]||{};
    params.socketPort = process.env.PORT || 3000;
	response.render('index', params);
};

exports.admin = function(request, response)
{
    params.title = 'Vote(r) ADMIN';
    params.socketPort = process.env.PORT || 3000;
    response.render('admin', params);
};

var params = require('../src/config').config;

exports.index = function(request, response)
{
    params.code = request.params.id;
    params.activeUser = _getActiveUser(request.params.id);
    params.socketPort = process.env.PORT || 3000;
	response.render('index', params);
};

exports.admin = function(request, response)
{
    var user = _getActiveUser(request.params.id);
    if (!user || !user.admin) {
        return false;
    }
    params.code = request.params.id;
    params.titleAdmin = 'Vote(r) Admin*';
    params.socketPort = process.env.PORT || 3000;
    response.render('admin', params);
};

function _getActiveUser(code)
{
    return params.users.filter(function(user) {
        return user.code == code;
    })[0] || null;
}
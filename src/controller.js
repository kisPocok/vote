var SocketHelper = require('./socketHelper').SocketHelper;
var UserManager = require('./userManager').UserManager();
var config = require('../src/config').config;
var User = require('./user').User;
var fs = require('fs');

var socketHelper, user, votesEnabled = [];

/**
 * @type {function}
 * @param {socket} socket
 */
exports.initApplication = function(socket)
{
	socketHelper = new SocketHelper(socket);
	user = new User(socket.id);
	UserManager.addUser(user);
    _notifyAdminConnectionChanged();

	var emitParams = {
		userId: user.id
	};
	socketHelper.emitToCurrentUser('handshake', emitParams);

    socket.on('admin.voteUpdate', adminVoteUpdate);
    socket.on('admin.removeUpdate', adminRemoveVoteUpdate);
    socket.on('admin.resetUpdate', adminResetVoteUpdate);
    socket.on('user.sendRate', userVoteSend);
    socket.on('user.login', userLogin);
	socket.on('disconnect', disconnect(socket));
};

function adminVoteUpdate(params)
{
    var isAlreadyInTheList = votesEnabled.filter(function(item) {
        return item == params.selectedTeam;
    }).length;
    console.log('isAlreadyInTheList', isAlreadyInTheList)
    if (!isAlreadyInTheList && params.selectedTeam) {
        votesEnabled.push(params.selectedTeam);
    }
    _adminPushUpdate(params.selectedTeam);
}

function adminRemoveVoteUpdate(params)
{
    votesEnabled = votesEnabled.filter(function(item) {
        return item != params.selectedTeam;
    });
    _adminPushUpdate(null);
}

function adminResetVoteUpdate()
{
    votesEnabled = [];
    _adminPushUpdate(null);
}

function _adminPushUpdate(selectedTeam)
{
    var emitParams = {
        team: selectedTeam,
        time: (new Date().getTime()),
        enabledTeams: votesEnabled
    };
    console.log('Admin vote update: ', emitParams);
    console.log('Enabled teams: ', votesEnabled);
    socketHelper.emitToEverybody('vote.update', emitParams);
}

function userLogin(params)
{
    var isValidKey = config.users.filter(function(userData) {
        return userData.code == params.code;
    }).length;

    if (isValidKey) {
        // update user with code
        user.code = params.code;
        console.log('Login success with', params.code);
        loadData(params.code, function(dataObj) {
            var params = {
                lastState: dataObj
            };
            socketHelper.emitToCurrentUser('user.loginSuccess', params);
        });
    } else {
        user.code = null;
        console.log('Login failed with', params.code);
        socketHelper.emitToCurrentUser('user.loginFailed', null);
    }
}

function userVoteSend(params)
{
    console.log('User', user);
    console.log('Data:', params.data);
    saveData(user.code, params.data);
}

function saveData(code, data)
{
    fs.writeFile("/tmp/" + code + ".json", data, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

function loadData(code, callback)
{
    fs.readFile( '/tmp/' + code + '.json', function(err, data) {
        var d = data ? data.toString() : undefined;
        console.log('Loaded data: ', d);
        if (d) {
            callback(JSON.parse(d));
        } else {
            callback(null);
        }
    });
}

function disconnect(socket)
{
    return function()
    {
        var user = UserManager.getUser(socket.id);
        UserManager.removeUser(user);
        console.log('User disconnected: ', user);
        _notifyAdminConnectionChanged();
    };
}

function _notifyAdminConnectionChanged()
{
    // TODO esetleg csak adminokat kéne értesíteni? :)
    socketHelper.emitToEverybody('admin.connectionUpdate', {userCount: UserManager.count()});
}

var SocketHelper = require('./socketHelper').SocketHelper;
var UserManager = require('./userManager').UserManager();
var config = require('../src/config').config;
var User = require('./user').User;
var fs = require('fs');

var socketHelper, user;

/**
 * @type {function}
 * @param {socket} socket
 */
exports.initApplication = function(socket)
{
	socketHelper = new SocketHelper(socket);
	user = new User(socket.id);
	UserManager.addUser(user);

	var emitParams = {
		userId: user.id
	};
	socketHelper.emitToCurrentUser('handshake', emitParams);

    socket.on('admin.voteUpdate', adminVoteUpdate);
    socket.on('user.sendRate', userVoteSend);
    socket.on('user.login', userLogin);
	//socket.on('disconnect', disconnect(socket));
};

function adminVoteUpdate(params)
{
    var emitParams = {
        team: params.selectedTeam
    };
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
        socketHelper.emitToCurrentUser('user.loginSuccess', null);
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
    fs.writeFile("/tmp/" + user.code + ".json", params.data, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

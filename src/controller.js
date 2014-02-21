var SocketHelper = require('./socketHelper').SocketHelper;
var UserManager = require('./userManager').UserManager();
var User = require('./user').User;

var socketHelper, user, devMode = (process.env.DEV == 1);

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
	socketHelper.joinRoomCurrentUser('vote');

	socket.on('admin.voteUpdate', adminVoteUpdate);
	//socket.on('disconnect', disconnect(socket));
};

function adminVoteUpdate(params)
{
    var emitParams = {
        team: params.selectedTeam
    };
    socketHelper.emitToEverybody('vote.update', emitParams);
}

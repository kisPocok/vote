/**
 * User model
 * @type {function}
 * @param {string} socketId
 */
exports.User = function(socketId)
{
	this.id = socketId;
	this.code = null;
	return this;
};

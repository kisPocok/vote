
var user = {};
var socket = io.connect('http://127.0.0.1:3000');
var Vote = new (function Vote()
{
	var self = this;
	/**
	 * @param {object} response
	 */
	self.handshake = function(response)
	{
		user.id = response.userId;
		console.log('Handshake', response.userId);
	};

	/**
	 * @param {object} response
	 */
	self.update = function(response)
	{
        console.log('UPDATE', response);
        if (response.team) {
            var teams = $('.team');
            teams.removeClass('active');
            teams.filter('.' + response.team).addClass('active');
        }
	};

    // TODO remove this
    return self;
});

socket.on('handshake', Vote.handshake);
socket.on('vote.update', Vote.update);

$(function() {
    // TODO onload
});


var user = {};
var socket = io.connect('http://127.0.0.1:3000');
var Vote = new (function Voter()
{
	var self = this;

    /**
     * @param {object} response
     */
    self.handshake = function(response)
    {
        user.id = response.userId;
        //TODO NEM TUDOM ÁTADNI!!! user.code = response.code;
        //console.log('Handshake', response.userId);
    };

    /**
     * @param {object} response
     */
    self.loginSuccess = function(response)
    {
        $('#app').hide();
        $('#app2').show();
    };

    /**
     * @param {object} response
     */
    self.loginFailed = function(response)
    {
        console.error('Hibás kód!');
    };

	/**
	 * @param {object} response
	 */
	self.update = function(response)
	{
        if (response.team) {
            console.log('Update arrived', response);
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
socket.on('user.loginSuccess', Vote.loginSuccess);
socket.on('user.loginFailed', Vote.loginFailed);

$(function() {
    $('#login').click(function() {
        var params = {
            code: $('#clientKey').val()
        };
        console.log('Login with ', params);
        socket.emit('user.login', params);
    });

    $('#app2').find('button').click(function()
    {
        var data = $('#app2').find('select').serialize() + '&time=' + (new Date().getTime());
        var params = {
            user: user,
            data: data
        };
        console.log('Sending rate', params);
        socket.emit('user.sendRate', params);
    });
});

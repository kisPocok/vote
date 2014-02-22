
var user = {};
var socket;
var Vote = new (function Voter()
{
	var self = this;

    /**
     * @param {object} response
     */
    self.handshake = function(response)
    {
        user.id = response.userId;
    };

    self.autoLogin = function()
    {
        var userCode = $('#welcome').data('code');
        if (userCode) {
            var emitParams = {
                code: userCode
            };
            socket.emit('user.login', emitParams);
        }
    };

    /**
     * @param {object} response
     */
    self.loginSuccess = function(response)
    {
        $('#welcome').hide();
        $('#app').show();
        //console.log('Login success', response);
        applyValuesOnForm(response.lastState);
    };

    /**
     * @param {object} response
     */
    self.loginFailed = function()
    {
       if (console && console.error) {
           console.error('Hibás kód!');
       } else {
           alert('Wrong pass!');
       }
    };

    var applyValuesOnForm = function(values)
    {
        var i;
        for (i in values) {
            var item = values[i];
            var teamName = item.name.replace("rates_", "");
            $('.' + teamName + ' input[value=' + item.value + ']').attr('checked', true);
        }
    };

	/**
	 * @param {object} response
	 */
	self.update = function(response)
	{
        var teams = $('.team');
        teams.removeClass('active');
        //console.log('Update arrived', response.enabledTeams);
        var i;
        for (i in response.enabledTeams) {
            teams.filter('.' + response.enabledTeams[i]).addClass('active');
        }

	};

    // TODO remove this
    return self;
});

$(function()
{
    var port = $('#welcome').data('port') || 3000;
    var host = window.location.protocol + '//' + window.location.hostname;
    socket = io.connect(host + ':' + port);
    socket.on('handshake', Vote.handshake);
    socket.on('vote.update', Vote.update);
    socket.on('user.loginSuccess', Vote.loginSuccess);
    socket.on('user.loginFailed', Vote.loginFailed);

    Vote.autoLogin();

    $('#app').find('.voterAction').click(function()
    {
        var teamName = $(this).data('team');
        var formValues = $('#app .' + teamName).find('input[type="radio"]').serializeArray();
        var jsonData = JSON.stringify(formValues);
        var params = {
            user: user,
            data: jsonData
        };
        //console.log('Sending rate', params);
        socket.emit('user.sendRate', params);
    });
});

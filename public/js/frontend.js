
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
        self.update(response);
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
            _setVisibilityToVote(teamName, item.value);
        }
    };

    var _setVisibilityToVote = function(teamName, point)
    {
        if (point) {
            var voteRow = $('.' + teamName + ' .voterBottom');
            var voted = voteRow.find('.voted');
            var notVoted = voteRow.find('.notVoted');
            var cantVoted = voteRow.find('.cantVoted');
            voted.find('.numVoted').text(point);
            voted.show();
            notVoted.hide();
            cantVoted.hide();
            voteRow.parent('li').addClass('active');
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

    self.initScreen = function()
    {
        $('#app').find('.voterAction.submitRate').click(function()
        {
            var teamName = $(this).data('team');
            var formValues = $('#app').find('input[type="radio"]').serializeArray();
            var jsonData = JSON.stringify(formValues);
            var params = {
                user: user,
                data: jsonData,
                code: $('#welcome').data('code')
            };
            _setVisibilityToVote(teamName, $('.' + teamName + ' input:radio:checked').val());

            //console.log('Sending rate', params);
            socket.emit('user.sendRate', params);
        });
        $('#app').find('label').click(function()
        {
            var li = $(this).parent('li');
            li.parent('ul').find('.preactive').removeClass('preactive');
            li.addClass('preactive');
        });
    };

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
    Vote.initScreen();
});

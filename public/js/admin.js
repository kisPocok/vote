
var socket;
$(function()
{
    var app = $('#app');
    var port = app.data('port') || 3000;
    var host = window.location.protocol + '//' + window.location.hostname;
    var socket = io.connect(host + ':' + port);

    // after load the site, update the list
    socket.emit('admin.voteUpdate', {});
    socket.on('vote.update', function(params) {
        var teams = params.enabledTeams;
        teams.sort();
        $('#enabledTeams').text(teams.toString());
    });
    socket.on('admin.connectionUpdate', function(params) {
        $('#connections').text(params.userCount);
        /*
        console.log(params.userList)
        var i, user, list = [];
        for (i in params.userList) {
            user = params.userList[i];
            list.push(user.code);
        }
        console.log(list.toString());
        */
    });

    app.find('button.golive').click(function()
    {
        var team = $('#teamSelector').val();
        var params = {
            selectedTeam: team
        };
        console.log('GoLive', team);
        socket.emit('admin.voteUpdate', params);
    });

    app.find('button.offair').click(function()
    {
        var team = $('#teamSelector').val();
        var params = {
            selectedTeam: team
        };
        console.log('GoOffAir', team);
        socket.emit('admin.removeUpdate', params);
    });

    app.find('button.reset').click(function()
    {
        console.log('Reset');
        socket.emit('admin.resetUpdate');
    });
});

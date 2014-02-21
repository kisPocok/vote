
var socket = io.connect('http://127.0.0.1:3000');
$(function()
{
    // after load the site, update the list
    socket.emit('admin.voteUpdate', {});

    var app = $('#app');
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

socket.on('vote.update', function(params) {
    var teams = params.enabledTeams;
    teams.sort();
    $('#enabledTeams').text(teams.toString());
});

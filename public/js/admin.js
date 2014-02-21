
var socket = io.connect('http://127.0.0.1:3000');
$(function()
{
    $('#app').find('button').click(function() {
        var params = {
            selectedTeam: $('#teamSelector').val()
        };
        socket.emit('admin.voteUpdate', params);
    });
});

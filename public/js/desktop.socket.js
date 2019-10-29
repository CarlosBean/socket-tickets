var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('desktop is required');
}

var desktop = searchParams.get('desktop');
var label = $('small');

console.log(desktop);
$('h1').text('Desktop ' + desktop);

$('button').on('click', function () {
    socket.emit('attendTicket', { desktop: desktop }, function (res) {
        if (res === 'no tickets') {
            alert(res);
            return;
        }
        label.text('Ticket: ' + res.id);
    });
});
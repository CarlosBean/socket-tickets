var socket = io();
var label = $('#lbnewTicket');

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Lost connection with server');
});

socket.on('currentState', function (data) {
    label.text(data.current);
})

$('button').on('click', function () {
    socket.emit('nextTicket', null, function (nextTicket) {
        label.text(nextTicket);
    });
});
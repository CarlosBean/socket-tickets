var socket = io();
var button = document.getElementById('playBtn');

socket.on('currentState', function (data) {
    button.click();

    if (!data.lastFour) { return; }

    for (var i = 1; i < data.lastFour.length + 1; i++) {
        $('#lblTicket' + i).html(data.lastFour[(i - 1)].id);
        $('#lblDesktop' + i).html('Desktop  ' + data.lastFour[(i - 1)].desktop);
    }
});

function playSound() {
    var mp3Source = '<source src="../audio/new-ticket.mp3" type="audio/mpeg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="../audio/new-ticket.mp3">';
    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay">' + mp3Source + embedSource + '</audio>';
}
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('User Connected');

    client.on('disconnect', () => {
        console.log('User Disconnected');
    });

    // Escuchar el cliente
    client.on('nextTicket', (data, cb) => {
        const nextTicket = ticketControl.nextTicket();
        console.log(nextTicket);
        cb(nextTicket);
        // client.broadcast.emit('nextTicket', ticketControl.nextTicket());
    });

    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('attendTicket', (data, cb) => {
        if (!data.desktop) {
            return cb({
                err: true,
                message: 'desktop is required'
            });
        }

        const attendTicket = ticketControl.attendTicket(data.desktop);
        cb(attendTicket);

        client.broadcast.emit('currentState', {
            lastFour: ticketControl.getLastFour()
        });
    })

});
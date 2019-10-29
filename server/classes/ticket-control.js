const fs = require('fs');

class Ticket {
    constructor(id, desktop) {
        this.id = id;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last++;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) { return 'no tickets'; }

        const idTicket = this.tickets[0].id;
        this.tickets.shift();

        const attendTicket = new Ticket(idTicket, desktop);
        this.lastFour.unshift(attendTicket);

        if (this.lastFour.length > 4) { this.lastFour.pop(); }

        console.log('last four: ', this.lastFour);

        this.saveFile();
        return attendTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveFile();
    }

    saveFile() {
        let data = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
    }
}

module.exports = {
    TicketControl
}
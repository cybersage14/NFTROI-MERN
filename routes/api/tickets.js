const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require('../../models/User');
const Event = require('../../models/Event');
const Ticket = require('../../models/Ticket');
const Order = require('../../models/Order');

const credentials = {
    service: 'GMail',
    auth: {
        // These environment variables will be pulled from the .env file
        // user: process.env.MAIL_USER,
        // pass: process.env.MAIL_PASS
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

const transporter = nodemailer.createTransport(credentials);

const formatDateTime = (date) => {
    if (!date) {
        return null
    }
    return new Intl.DateTimeFormat('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true, timeZone: 'Australia/Sydney' }).format(new Date(date))
}

router.get('/', async (req, res) => {
    try {
        let eventId = req.query.eventId;
        const tickets = await Ticket.find({ eventId });
        res.json(tickets);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/orders', async (req, res) => {

    try {
        let attendees = req.body.attendees;
        // console.log(attendees);
        let email = req.body.email;
        let orders = [];
        attendees.forEach(attendee => {
            let index = orders.findIndex(order => order.ticketId === attendee.ticketId);
            if (index >= 0) {
                orders[index].quantity += 1;
                orders[index].attendees.push(attendee.firstName + ' ' + attendee.lastName);
            } else {
                orders.push({ email, ticketId: attendee.ticketId, quantity: 1, attendees: [attendee.firstName + ' ' + attendee.lastName] });
            }
        });
        // console.log(orders);
        ///////     set sold count per ticket
        for(let i=0;i<orders.length;i++){
            let sold = (await Ticket.findById(orders[i].ticketId))?.sold;
            sold += orders[i].quantity;
            await Ticket.findOneAndUpdate({ _id: orders[i].ticketId }, { $set: { sold } });            
        }

        const result = await Order.insertMany(orders);
        if (result) {
            let mail_html = '<h4>You ordered followings.</h4>';
            let eventId = (await Ticket.findById(result[0].ticketId))?.eventId;
            let event = await Event.findById(eventId);
            mail_html += `<p>Event:<a href='http://crypticks.com.au/event/detail/${event._id}'> ${event.name}</a></p><p> Start:${formatDateTime(event.start)}</p>`;
            // console.log(mail_html);
            for (let i = 0; i < result.length; i++) {
                // console.log(i, result[i]);
                let ticket = await Ticket.findById(result[i].ticketId);
                mail_html += `<p>${i + 1}. ${ticket.name} x ${result[i].quantity}</p>`;
                mail_html += `<p>Attendees: ${result[i].attendees.join(',')}</p>`
            }
            const emailData = {
                from: 'guruluckystacker@gmail.com',
                to: email,
                subject: 'Crypticks Order',
                html: mail_html
            }
            console.log(emailData);
            try {
                await transporter.sendMail(emailData);
                console.log('mail sent successfully');
            } catch (err) {
                console.log('send mail', err);
            }
            res.json({ result });
        } else {
            res.status(400).json({ errors: [{ msg: 'Order failed' }] })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
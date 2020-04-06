import React from 'react';
import ReactDOM from 'react-dom';
import  { Booking } from '../components/booking.js';

describe('Booking page', () => {    
    it('Renders user\'s first name', ()=> {
        const user = { firstName: 'Artem' };
        const bookingComponent = <Booking user={user} />;

        var container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(bookingComponent, container);       

        expect(document.body.textContent).toMatch('Artem');
    });
})

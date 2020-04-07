import React from 'react';
import ReactDOM from 'react-dom';
import  { Booking } from '../components/booking.js';

//NB! Never refactor red tests!

describe('Booking page', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = (component) => ReactDOM.render(component, container);     

    it('Renders user\'s first name', ()=> {
        //Arrange
        const user = { firstName: 'Artem' };

        //Act
        render(<Booking user={user} />);

        //Assert
        expect(container.textContent).toMatch('Artem');
    });

    it('Renders first name of another user', ()=> {
        //Arrange
        const user = { firstName: 'Pavel' };

        //Act
        render(<Booking user={user} />);

        //Assert
        expect(container.textContent).toMatch('Pavel');
    });
})

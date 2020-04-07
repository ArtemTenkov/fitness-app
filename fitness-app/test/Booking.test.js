import React from 'react';
import ReactDOM from 'react-dom';
import  { Booking, WorkoutScheduleView } from '../components/booking.js';

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

describe('Workouts schedule view', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
    })

    const today = new Date();        
    const workoutTimeFormat = (time) => {
        const [h, m] = new Date(time).toTimeString().split(':');
        return `${h}:${m}`;
    };
    const workouts = [
        {startsAt: workoutTimeFormat(today.setHours(12, 0))},
        {startsAt: workoutTimeFormat(today.setHours(13, 0))}
    ];

    const render = component =>
        ReactDOM.render(component, container);

    it('renders an ol with a right id', () => {
        //Act
        render(<WorkoutScheduleView 
            workouts={ workouts } />);

        //Assert
        expect(container.querySelector('ol#shedule_view')).not.toBeNull();
    })

    it('renders multiple bookings in ol list', ()=> {
        // Act
        render(<WorkoutScheduleView workouts={workouts} />);

        //Assert
        expect(container.querySelector('ol').children)
            .toHaveLength(2);
    })    

    it('renders each workout in a li', () => {
        
        // Act
        render(<WorkoutScheduleView workouts={workouts} />);

        //Assert
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    })
})

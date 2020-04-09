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


    it('Renders trainers\'s first name', ()=> {
        //Arrange
        const trainer = { firstName: 'Artem' };

        //Act
        render(<Booking trainer={trainer} />);

        //Assert
        expect(container.textContent).toMatch('Artem');
    });

    it('Renders first name of another trainer', ()=> {
        //Arrange
        const trainer = { firstName: 'Pavel' };

        //Act
        render(<Booking trainer={trainer} />);

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
    
    const workouts = [
        {startsAt: today.setHours(12, 0)},
        {startsAt: today.setHours(13, 0)}
    ];

    const render = component =>
        ReactDOM.render(component, container);

        it('Initially shows message that there are no workouts today', () => {
            //Act
            render(<WorkoutScheduleView workouts={[]} />);
    
            //Assert
            expect(container.textContent).toMatch('Nothing planned for today');
        });
    
    
        it('Selects first workout by default', ()=> {
            //Arrange
            const expectedTrainerName = 'biceps and shoulders' 
            const workouts = [
                {
                    startsAt: today.setHours(12, 0),
                    trainer: {firstName: expectedTrainerName}
                }];
    
            //Act
            render(<WorkoutScheduleView workouts={workouts} />)
    
            //Assert
            expect(container.textContent).toMatch(expectedTrainerName)
        })

    it('renders an ol with a right id', () => {
        //Act
        render(<WorkoutScheduleView 
            workouts={ workouts } />);

        //Assert
        expect(container.querySelector('ol#schedule_view')).not.toBeNull();
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

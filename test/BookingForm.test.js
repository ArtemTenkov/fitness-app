import React from 'react';
import { setupContainer } from './testHelpers';
import { BookingForm } from '../src/components/BookingForm';
import ReactUtils from 'react-dom/test-utils';

describe('Workout booking form', ()=>{
    let root, render;
    
    beforeEach(() => {
        ({render, root} = setupContainer());
    })

    const selectorId = 'workoutTypes';
    const form = id => root.querySelector(`form#${id}`);
    const field = name => form('bookingForm').elements[name];

    it('Renders a form', ()=>{
        render(<BookingForm />)
        expect(form('bookingForm')).not.toBeNull();
    });

    describe('Workout type field', ()=> {
        const findOption = (dropdownNode, textContent) => {
            let options = Array.from(dropdownNode.childNodes);
            return options.find(o => o.textContent === textContent);
        } 

        it('Renders as a select box', ()=> {
            render(<BookingForm />)
            expect(field(selectorId)).not.toBeNull();
            expect(field(selectorId).tagName).toEqual('SELECT');
        });

        it('Initially has empty value chosen', () => {
            render(<BookingForm />)
        })

        it('Lists all workout types', () => {
            const expectedWorkoutTypes = ['Body pump', 'HIIT', 'Muai Thai', 'Zumba'];
            render(<BookingForm workoutTypes={expectedWorkoutTypes} />);
            const optionNodes = Array.from(field(selectorId).childNodes);
            const renderedWorkoutTypes = optionNodes.map(node => node.textContent);
            expect(renderedWorkoutTypes).toEqual(
                expect.arrayContaining(expectedWorkoutTypes)
            )
        })

        it('Pre-selects the existing value', ()=> {
            const expectedWorkoutTypes = ['Body pump', 'HIIT', 'Muai Thai', 'Zumba'];
            render(<BookingForm workoutTypes={expectedWorkoutTypes} selectedWorkout="HIIT" />)
            const option = findOption(field(selectorId), 'HIIT');
            expect(option.selected).toBeTruthy();
        })

        it('Renders a label', ()=> {
            const labelFor = id => root.querySelector(`label[for=${id}]`);
            render(<BookingForm />);
            expect(labelFor(selectorId)).not.toBeNull();    
            expect(labelFor(selectorId).textContent).toEqual('Workout type:')        
        })

        it('Assigns select id that matches label for', ()=> {
            render(<BookingForm />)
            expect(field(selectorId).id).toEqual(selectorId)
        })

        it('Saves existing value when submitted', async ()=> {
            const expectedValue = 'HIIT';
            render(<BookingForm workoutTypes={['HIIT', 'BodyPump']} 
            selectedWorkout={expectedValue}
            onSubmit={({ selectedWorkout }) => {
                expect(selectedWorkout).toEqual(expectedValue);
            }} />)

            ReactUtils.Simulate.submit(form('bookingForm'));
            expect.hasAssertions();
        })

        it('Saves new value when submitted', async () => {
            const initialValue = 'BodyPump';
            const expectedValue = 'HIIT';
            render(<BookingForm workoutTypes={['HIIT', 'BodyPump']} 
            selectedWorkout={initialValue}
            onSubmit={({ selectedWorkout }) => {
                expect(selectedWorkout).toEqual(expectedValue);
            }} />)

            ReactUtils.Simulate.change(field(selectorId), {
               target: { value: expectedValue }
            })
            ReactUtils.Simulate.submit(form('bookingForm'));
        })
    })

    describe('Workout booking table', () => {
        const getBookingSlotTable = () => root.querySelector('table#booking_slots');
        
        it('Redenders a table for booking slots', ()=> {
            render(<BookingForm />);
            expect(getBookingSlotTable()).not.toBeNull();
        })

        it('Renders a booking slot for every hour between open and closing times', () => {
            const openingHour = 9;
            const closingHour = 12;
            const getTimesOfTheDay = () => root.querySelectorAll('tbody th');

            render(<BookingForm openingHour={openingHour} closingHour={closingHour} />)
            expect(getTimesOfTheDay()).toHaveLength(3);
            expect(getTimesOfTheDay()[0].textContent).toEqual('09:00');
            expect(getTimesOfTheDay()[1].textContent).toEqual('10:00');
            expect(getTimesOfTheDay()[2].textContent).toEqual('11:00');
        })

        it('Renders an empty cell at the start of header row', () => {
            render(<BookingForm />);
            const headerRow = getBookingSlotTable().querySelector('thead > tr'); 
            console.log(JSON.stringify(headerRow.firstChild.innerHTML))
            expect(headerRow.firstChild.textContent).toEqual('')
        })

        it('Renders a week of available slots', () => {
            const today = new Date(2020, 1, 1);
            render(<BookingForm today={today} />)
            const dates = getBookingSlotTable().querySelectorAll('thead th:not(:first-child)');
            expect(dates).toHaveLength(7);
            expect(dates[0].textContent).toEqual('Sat Feb')
            expect(dates[1].textContent).toEqual('Sun Feb')
            expect(dates[6].textContent).toEqual('Fri Feb')
        })
    })
    
});
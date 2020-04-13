import React from 'react';
import { createContainer } from './domManipulators';
import { BookingForm } from '../src/components/BookingForm';
import ReactUtils from 'react-dom/test-utils';

describe('Booking form', ()=>{
    let container, render;
    
    beforeEach(() => {
        ({render, container} = createContainer());
    })

    const selectorId = 'workoutTypes';
    const form = id => container.querySelector(`form#${id}`);
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

        it('Initially has blank value chosen', () => {
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
            const labelFor = id => container.querySelector(`label[for=${id}]`);
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
    
});
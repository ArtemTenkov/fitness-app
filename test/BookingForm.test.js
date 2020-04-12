import React from 'react';
import { createContainer } from './domManipulators';
import { BookingForm } from '../src/components/BookingForm';
import ReactUtils from 'react-dom/test-utils';

describe('Booking Form', () => {
    let render, container;
    
    beforeEach(() => {
        ({render, container} = createContainer());
    })

    const getBookingForm = () => container.querySelector(`form[id="bookingForm"]`);
    const field = name => getBookingForm().elements[name];

    const expectToBeInputOfTypeText = inputElement => {
        expect(inputElement).not.toBeNull();
        expect(inputElement.type).toEqual('text');
    }

    it('Renders a form', () => {
        render(<BookingForm  />)
        expect(getBookingForm()).not.toBeNull();
    })

    const itRendersAsATextBox = (fieldName) =>  
        it('Renders as a text box', () => {
            render(<BookingForm />);
            expectToBeInputOfTypeText(field(fieldName));
        });

    const itIncludesExistingValue = fieldName =>
        it('Includes existing value', () => {
            let expectedName = 'Somename';
            render(<BookingForm firstName={expectedName} />);
            expect(field(fieldName).value).toEqual(expectedName);
        })

    const itRendersALabel = (fieldName, labelText) =>
        it('Renders a label', () => {
            const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
            render(<BookingForm />)
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(labelText)
        });

    const itAssignsIdThatMatchesLabelId = fieldName =>
        it('Assigns id that matches label id', () => {
            render(<BookingForm />);
            expect(field('firstName').id).toEqual('firstName');
        });

    const itSavesWhenSubmitted = (fieldName, expectedValue) =>
        it('Saves when submitted', async () => {
            const props = {[fieldName]: expectedValue };
            render(<BookingForm { ...props} 
                        onSubmit={({firstName}) => {
                            expect(firstName).toEqual(expectedValue)    
                        }} 
                    />)
            await ReactUtils.Simulate.submit(getBookingForm());    
            expect.hasAssertions();
        })
    
    const itSavesNewWhenSubmitted = (fieldName, newValue) =>
        it('Saves new when submitted', async () => {
            const initialValue = 'initial value';
            render(<BookingForm firstName={initialValue} onSubmit={() =>({firstName}) => {
                expect(firstName).toEqual(newValue)
            }} />)

            await ReactUtils.Simulate.change(field(fieldName), {
                target: { value: newValue }
            })
            await ReactUtils.Simulate.submit(getBookingForm());
        })

    
    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesExistingValue('firstName');        
        itRendersALabel('firstName', 'First name');
        itAssignsIdThatMatchesLabelId('firstName');        
        itSavesWhenSubmitted('firstName');
        itSavesNewWhenSubmitted('firstName', 'New value');
    });
});
import React from 'react';
import { createContainer } from './domManipulators';
import { UserForm } from '../src/components/UserForm';
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
        render(<UserForm  />)
        expect(getBookingForm()).not.toBeNull();
    })

    it('Has a submit button', () => {
        render(<UserForm />);
        expect(container.querySelector('input[type=submit]')).not.toBeNull();
    })

    const itRendersAsATextBox = (fieldName) =>  
        it('Renders as a text box', () => {
            render(<UserForm />);
            expectToBeInputOfTypeText(field(fieldName));
        });

    const itIncludesExistingValue = fieldName =>
        it('Includes existing value', () => {
            let expectedName = 'Somename';
            render(<UserForm {...{[fieldName]: expectedName}} />);
            expect(field(fieldName).value).toEqual(expectedName);
        })

    const itRendersALabel = (fieldName, labelText) =>
        it('Renders a label', () => {
            const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
            render(<UserForm />)
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(labelText)
        });

    const itAssignsIdThatMatchesLabelId = fieldName =>
        it('Assigns input id that matches label for', () => {
            render(<UserForm />);
            expect(field('firstName').id).toEqual('firstName');
        });

    const itSavesWhenSubmitted = (fieldName, expectedValue) =>
        it('Saves when submitted', async () => {
            const props = {[fieldName]: expectedValue };
            render(<UserForm { ...props} 
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
            render(<UserForm firstName={initialValue} onSubmit={() =>({firstName}) => {
                expect(firstName).toEqual(newValue)
            }} />)

            await ReactUtils.Simulate.change(field(fieldName), {
                target: { value: newValue, name: fieldName }
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

    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesExistingValue('lastName');        
        itRendersALabel('lastName', 'Last name');
        itAssignsIdThatMatchesLabelId('lastName');        
        itSavesWhenSubmitted('lastName');
        itSavesNewWhenSubmitted('lastName', 'New value');
    })

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesExistingValue('phoneNumber');        
        itRendersALabel('phoneNumber', 'Phone number');
        itAssignsIdThatMatchesLabelId('phoneNumber');        
        itSavesWhenSubmitted('phoneNumber');
        itSavesNewWhenSubmitted('phoneNumber', 'New value');
    })
});
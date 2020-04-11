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
    const getFirstNameField = () => getBookingForm().elements.firstName;

    const expectToBeInputOfTypeText = inputElement => {
        expect(inputElement).not.toBeNull();
        expect(inputElement.type).toEqual('text');
    }

    it('Renders a form', () => {
        //Act
        render(<BookingForm  />)

        //Aseert
        expect(getBookingForm()).not.toBeNull();
    })

    it('Renders the first name field as a text box', () => {
        //Act
        render(<BookingForm />);

        //Assert
        expectToBeInputOfTypeText(getFirstNameField());
    });

    it('Includes existing value as a first name', () => {
        //Arrange
        let expectedName = 'Artem';

        //Act
        render(<BookingForm firstName={expectedName} />);

        //Assert
        expect(getFirstNameField().value).toEqual(expectedName);
    })

    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    it('Renders a label for a first name field', () => {
        //Act 
        render(<BookingForm />)

        //Assert
        expect(labelFor('firstName')).not.toBeNull();
    })

    it('Assigns id that matches label id to the firstName field', () => {
        //Act
        render(<BookingForm />);

        //Assert
        expect(getFirstNameField().id).toEqual('firstName');
    });

    it('Saves existing first name when submitted', async () => {
        //Arrange 
        const expectedName = 'Artem';

        //Act & assert
        render(<BookingForm firstName={expectedName} onSubmit={({firstName}) => {
            expect(firstName).toEqual(expectedName)
        }} />)

        await ReactUtils.Simulate.submit(getBookingForm());

        expect.hasAssertions();
    })

    it('Saves new first name when submitted', async () => {
        //Arrange 
        const expectedName = 'Artem';

        //Act & assert
        render(<BookingForm firstName={expectedName} onSubmit={() =>({firstName}) => {
            expect(firstName).toEqual(expectedName)
        }} />)

        await ReactUtils.Simulate.change(getFirstNameField(), {
            target: { value: expectedName }
        })
        await ReactUtils.Simulate.submit(getBookingForm());
    })

});
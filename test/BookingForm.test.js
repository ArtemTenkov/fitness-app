import React from 'react';
import { createContainer } from './domManipulators';
import { BookingForm } from '../src/components/BookingForm';

describe('Booking Form', () => {
    let render, container;
    
    beforeEach(() => {
        ({render, container} = createContainer());
    })

    const form = id => container.querySelector(`form[id="${id}"]`);
    const expectToBeInputOfTypeText = inputElement => {
        expect(inputElement).not.toBeNull();
        expect(inputElement.type).toEqual('text');
    }

    it('Renders a form', () => {
        //Act
        render(<BookingForm  />)

        //Aseert
        expect(form('bookingForm')).not.toBeNull();
    })

    it('Renders the first name field as a text box', () => {
        //Act
        render(<BookingForm />);

        //Assert
        const firstNameField = form('bookingForm').elements.firstName;
        expectToBeInputOfTypeText(firstNameField);
    });

    it('Includes existing value as a first name', () => {
        //Arrange
        let expectedName = 'Artem';

        //Act
        render(<BookingForm firstName={expectedName} />);

        //Assert
        const firstNameField = form('bookingForm').elements.firstName;
        expect(firstNameField.value).toEqual(expectedName);
    })

});
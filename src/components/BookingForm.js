import React from 'react';

export const BookingForm = ({firstName}) =>  (
    <form id="bookingForm">
        <input readOnly type="text" name="firstName" value={firstName} />
    </form>)

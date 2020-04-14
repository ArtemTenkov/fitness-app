import React from 'react';

export const WorkoutBookingTable = ({openingHour, closingHour}) => {
    const bookingSlots = dailyBookingSlots(openingHour, closingHour);
    return <table className="table" id="booking_slots">       
        <tbody>
            {bookingSlots.map(slot =><tr key={slot}><th>{toTimeValue(slot)}</th></tr>)}
        </tbody>
    </table>
}

export const toTimeValue = timeStamp => new Date(timeStamp).toTimeString().substring(0,5);

export const dailyBookingSlots = (openingHour, closingHour) => {
   const slotsTotal = closingHour - openingHour;
   const startTime = new Date().setHours(openingHour, 0, 0, 0);
   const increment = 60 * 60 * 1000;
   return Array(slotsTotal)
        .fill([startTime])
        .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]));
}
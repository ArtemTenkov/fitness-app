import React from 'react';

export const WorkoutBookingTable = ({openingHour, closingHour, today}) => {
    const dates = weeklySlotValues(today); 
    const bookingSlots = dailyBookingSlots(openingHour, closingHour, today);
    return <table className="table" id="booking_slots">       
        <thead>
            <tr>
                <th />
                {dates.map(date => (<th key={date}>{toShortDate(date)}</th>))}    
            </tr>
        </thead>
        <tbody>
            {bookingSlots.map(slot =><tr key={slot}><th>{toTimeValue(slot)}</th></tr>)}
        </tbody>
    </table>
}

const toTimeValue = timeStamp => new Date(timeStamp).toTimeString().substring(0,5);
const toShortDate = timeStamp => {
    const [day, dayOfMonth] = new Date(timeStamp)
                                    .toDateString()
                                    .split(' ');
    return `${day} ${dayOfMonth}`
};

const timeIncrements = (startTime, timeSlots, increment) => {
    return Array(timeSlots)
                .fill([startTime])
                .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]));
}

const dailyBookingSlots = (openingHour, closingHour) => {
   const slotsTotal = closingHour - openingHour;
   const startTime = new Date().setHours(openingHour, 0, 0, 0);
   const increment = 60 * 60 * 1000;
   return timeIncrements(startTime, slotsTotal, increment);
}

const weeklySlotValues = (startDate) => {
    const midnight = new Date(startDate).setHours(0, 0, 0, 0)
    const increment = 24 * 60 * 60 * 1000;
    return timeIncrements(midnight, 7, increment)
}
import React, { useState } from 'react';
import { WorkoutBookingTable } from './WorkoutBookingTable';

export const BookingForm = ({workoutTypes, selectedWorkout, onSubmit,  openingHour, closingHour, today}) => {
    const [workoutState, setWorkout] = useState({ selectedWorkout })
    const workout = {selectedWorkout};
    const handleChange = ({target}) => setWorkout({
        ...workout,
        selectedWorkout: target.value
    });

    return <form id="bookingForm" onSubmit={() => onSubmit(workoutState)}>
    <label htmlFor="workoutTypes">Workout type:</label>
    <select name="workoutTypes" id="workoutTypes" value={selectedWorkout} onChange={handleChange}>
        <option />
        {workoutTypes? workoutTypes.map((type, i) => <option key={i}>{type}</option>) : ''}
    </select>
    <WorkoutBookingTable openingHour={openingHour} closingHour={closingHour} today={today} />
</form>
}

BookingForm.defaultProps = {
    today: new Date(),
    openingHour: 7, closingHour: 9,
    workoutTypes: ['Body pump', 'HIIT', 'Muai Thai', 'Zumba']
 }
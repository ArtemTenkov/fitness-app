import React, { useState } from 'react';

export const BookingForm = ({workoutTypes, selectedWorkout, onSubmit}) => {
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
</form>
}

BookingForm.defaultProps = {
    workoutTypes: ['Body pump', 'HIIT', 'Muai Thai', 'Zumba']
 }
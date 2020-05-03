import React, { useState, useCallback } from 'react';
import { WorkoutBookingTable } from './WorkoutBookingTable';

    export const BookingForm = ({
    workoutTypes,
    selectedWorkout,
    onSubmit,
    openingHour,
    closingHour,
    today,
    availableTimeSlots}) => {
    const [workoutState, setWorkout] = useState({ selectedWorkout })
    const workout = {selectedWorkout};
    const handleChange = ({target}) => setWorkout({
        ...workout,
        selectedWorkout: target.value
    });

    const handleStartsAtChange = useCallback(
        ({target : {value}}) => setWorkout(workout => ({
            ...workout, startsAt: parseInt(value)
        })), []
    )

    return <form id="bookingForm" className="container form-group row mt-2 ml-1" onSubmit={() => onSubmit(workoutState)}>
    <label className="col-sm-2" htmlFor="workoutTypes">Workout type:</label>
    <select className="form-control col-sm-10" name="workoutTypes" id="workoutTypes" value={selectedWorkout} onChange={handleChange}>
        <option />
        {workoutTypes? workoutTypes.map((type, i) => <option key={i}>{type}</option>) : ''}
    </select>
    <WorkoutBookingTable openingHour={openingHour} 
    chaeckedTimeSlot={workout.startsAt}
    availableTimeSlots={availableTimeSlots}
    closingHour={closingHour}

     handleChange={handleStartsAtChange}
      today={today} />
</form>
}



BookingForm.defaultProps = {
    today: new Date(),
    openingHour: 9, closingHour: 19,
    workoutTypes: ['Body pump', 'HIIT', 'Muai Thai', 'Zumba']
 }
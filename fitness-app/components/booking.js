import React from 'react';

export const Booking = ({user}) => (
    <div>{user.firstName}</div>
);

export const WorkoutScheduleView = ({workouts}) => (
    <ol id="shedule_view">
     {workouts.map(workout => (
        <li key={workout.startsAt}>{workout.startsAt}</li>))
     }
    </ol>)
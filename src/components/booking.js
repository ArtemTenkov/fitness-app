import React, { useState } from 'react';

export const Booking = ({trainer}) => {
    
    return (
        trainer?
        <div>{trainer.firstName}</div>
        : <div></div>
    );
} 

const workoutTimeFormat = (time) => {
    const [h, m] = new Date(time).toTimeString().split(':');
    return `${h}:${m}`;
};

export const WorkoutScheduleView = ({workouts}) =>{
  const [selectedWorkout, setSelectedWorkout] = useState(0);

  return  (<div id="container">        
             <ol id="schedule_view">
             {workouts.map((workout, i) => 
                             <li key={workout.startsAt}>
                                <button type="button" onClick={() => setSelectedWorkout(i)}>
                                    {workoutTimeFormat(workout.startsAt)}
                                </button>
                             </li>
             )}
            </ol>
                {
                    workouts.length < 1?
                (<p>Nothing planned for today</p>)
                :
                (<Booking {...workouts[selectedWorkout]} />                )
            }
        
    </div>)
    
}

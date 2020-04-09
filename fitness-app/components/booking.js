import React from 'react';

export const Booking = ({trainer}) => (
    trainer?
    <div>{trainer.firstName}</div>
    : <div></div>
);

const workoutTimeFormat = (time) => {
    const [h, m] = new Date(time).toTimeString().split(':');
    return `${h}:${m}`;
};

export const WorkoutScheduleView = ({workouts}) =>{
  return  (<div id="container">        
             <ol id="schedule_view">
             {workouts.map(workout => 
                             <li key={workout.startsAt}>{workoutTimeFormat(workout.startsAt)}</li>
             )}
            </ol>
                {
                    workouts.length < 1?
                (<p>Nothing planned for today</p>)
                :
                (<Booking {...workouts[0]} />                )
            }
        
    </div>)
    
}

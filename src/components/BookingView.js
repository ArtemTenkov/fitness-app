import React, { useState } from 'react';

export const Booking = ({trainer, workoutType, notes}) => {
    
    return (
        trainer?
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Trainer name:</th>
                    <th scope="col">Trainer last name:</th>
                    <th scope="col">Trainer phone number:</th>
                    <th scope="col">Workout type:</th>
                    <th scope="col">Notes:</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{trainer.firstName}</td>
                    <td>{trainer.lastName}</td>
                    <td>{trainer.phoneNumber}</td>
                    <td>{workoutType}</td>
                    <td>{notes}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>        
        : <div></div>
    );
} 

const workoutTimeFormat = (time) => {
    const [h, m] = new Date(time).toTimeString().split(':');
    return `${h}:${m}`;
};

export const WorkoutScheduleView = ({workouts}) =>{
  const [selectedWorkout, setSelectedWorkout] = useState(0);

  return  (<div id="container" className="container p-5">     
                <br />
                <div className="row">
                    <div className="col-md-3">
                    <ul id="schedule_view">
                        {workouts.map((workout, i) => 
                             <li className="list-group-item" key={workout.startsAt}>
                                <button type="button" className="btn btn-secondary" 
                                 onClick={() => setSelectedWorkout(i)}>
                                    {workoutTimeFormat(workout.startsAt)}
                                </button>
                             </li>
                         )}
                    </ul>
                    </div>
                    <div className="col-md-9">
                    {
                    workouts.length < 1?
                        (<p>Nothing planned for today</p>)
                        :
                        (<Booking {...workouts[selectedWorkout]} />                )
                    }
                    </div>
                </div>   
    </div>)
    
}

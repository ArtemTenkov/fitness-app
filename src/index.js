import React from 'react';
import ReactDOM from 'react-dom';
import { WorkoutScheduleView } from './components/booking';
import { sampleWorkouts } from './sampleData';

ReactDOM.render(
  <WorkoutScheduleView workouts={sampleWorkouts} />,
  document.getElementById('root')
);
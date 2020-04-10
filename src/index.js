import React from 'react';
import ReactDOM from 'react-dom';
import { WorkoutScheduleView } from './components/BookingView';
import { sampleWorkouts } from './sampleData';
import './scss/app.scss';

ReactDOM.render(
  <WorkoutScheduleView workouts={sampleWorkouts} />,
  document.getElementById('root')
);
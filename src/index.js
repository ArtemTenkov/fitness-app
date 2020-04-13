import React from 'react';
import ReactDOM from 'react-dom';
import { WorkoutScheduleView } from './components/BookingView';
import { sampleWorkouts } from './sampleData';
import './scss/app.scss';
import { UserForm } from './components/UserForm';

ReactDOM.render(
  <UserForm firstName="Artem" lastName="Tenkov" phoneNumber="0000" />,
  document.getElementById('root')
);
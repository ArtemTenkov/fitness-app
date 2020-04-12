import React from 'react';
import ReactDOM from 'react-dom';
import { WorkoutScheduleView } from './components/BookingView';
import { sampleWorkouts } from './sampleData';
import './scss/app.scss';
import { BookingForm } from './components/BookingForm';

ReactDOM.render(
  <BookingForm firstName="Artem" lastName="Tenkov" phoneNumber="0000" />,
  document.getElementById('root')
);
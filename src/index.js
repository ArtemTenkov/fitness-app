import React from 'react';
import ReactDOM from 'react-dom';
import { WorkoutScheduleView } from './components/BookingView';
import { sampleWorkouts } from './sampleData';
import './scss/app.scss';
import { BookingForm } from './components/BookingForm';

ReactDOM.render(
  <BookingForm openingHour={9} closingHour={13} />,
  document.getElementById('root')
);
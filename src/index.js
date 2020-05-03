import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import { BookingForm } from './components/BookingForm';

const today = new Date();
const availableTimeSlots = [
  {startsAt: today.setHours(9, 0, 0, 0)},
  {startsAt: today.setHours(10, 0, 0, 0)}
];

ReactDOM.render(
  <BookingForm openingHour={9} closingHour={13}
  availableTimeSlots={availableTimeSlots} today={today}
  startsAt={availableTimeSlots[0].startsAt} />,
  document.getElementById('root')
);
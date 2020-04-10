const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleWorkouts = [
  { startsAt: at(9), trainer: { firstName: 'Charlie' } },
  { startsAt: at(10), trainer: { firstName: 'Frankie' } },
  { startsAt: at(11), trainer: { firstName: 'Casey' } },
  { startsAt: at(12), trainer: { firstName: 'Ashley' } },
  { startsAt: at(13), trainer: { firstName: 'Jordan' } },
  { startsAt: at(14), trainer: { firstName: 'Jay' } },
  { startsAt: at(15), trainer: { firstName: 'Alex' } },
  { startsAt: at(16), trainer: { firstName: 'Jules' } },
  { startsAt: at(17), trainer: { firstName: 'Stevie' } }
];
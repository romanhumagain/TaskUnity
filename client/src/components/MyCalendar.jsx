import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="mt-5">
      <Calendar
        onChange={setDate}
        value={date}
        className="p-2 border-0 rounded-lg text-gray-700  dark:text-neutral-200 dark:bg-neutral-900/95 dark:hover:text-gray-500 duration-300"
      />
    </div>
  );
};

export default MyCalendar;

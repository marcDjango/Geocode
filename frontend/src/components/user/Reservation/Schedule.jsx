import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "./Schedule.scss";
import PropTypes from "prop-types";

function MyCalendar({ onDateTimeChange }) {
  const [dateTime, setDateTime] = useState(null);

  const handleDateTimeChange = (selectedDateTime) => {
    setDateTime(selectedDateTime);
    onDateTimeChange(selectedDateTime);
  };

  const minDate = new Date();
  return (
    <div className="calendar-container">
      <DateTimePicker
        onChange={handleDateTimeChange}
        value={dateTime}
        minDate={minDate}
        format="yyyy-MM-dd"
        disableClock
        calendarIcon={null}
      />
    </div>
  );
}

export default MyCalendar;

MyCalendar.propTypes = {
  onDateTimeChange: PropTypes.func.isRequired,
};

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      <DatePicker
        onChange={handleDateTimeChange}
        selected={dateTime}
        minDate={minDate}
        dateFormat="yyyy-MM-dd"
        showTimeSelect={false}
        placeholderText="Sélectionnez une date"
      />
    </div>
  );
}

export default MyCalendar;

MyCalendar.propTypes = {
  onDateTimeChange: PropTypes.func.isRequired,
};

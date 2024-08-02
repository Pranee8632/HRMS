import React, { useState } from 'react';
import './Hoildays.css';
const initialHolidays = [
  { day: "Tuesday", date: "Jan 01, 2019", holiday: "New Year's Day" },
  { day: "Monday", date: "Jan 14, 2019", holiday: "Makar Sankranti / Pongal" },
  { day: "Saturday", date: "Jan 26, 2019", holiday: "Republic Day" },
  { day: "Monday", date: "Mar 04, 2019", holiday: "Maha Shivaratri" },
  { day: "Thursday", date: "Mar 21, 2019", holiday: "Holi" },
  { day: "Friday", date: "Apr 19, 2019", holiday: "Good Friday" },
  { day: "Wednesday", date: "Jun 05, 2019", holiday: "Eid-ul-Fitar" },
  { day: "Thursday", date: "Aug 15, 2019", holiday: "Independence Day" },
  {
    day: "Wednesday",
    date: "Oct 02, 2019",
    holiday: "Mathatma Gandhi Jayanti",
  },
  { day: "Wednesday", date: "Dec 25, 2019", holiday: "Christmas" },
];

const Holidays = () => {

  const [holidays, setHolidays] = useState(initialHolidays);
  const [editMode, setEditMode] = useState(false);
  const [editableHolidays, setEditableHolidays] = useState([
    ...initialHolidays,
  ]);
  const [newHoliday, setNewHoliday] = useState({
    day: "",
    date: "",
    holiday: "",
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHolidays = [...editableHolidays];
    updatedHolidays[index][name] = value;
    setEditableHolidays(updatedHolidays);
  };

  const handleNewHolidayChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday({ ...newHoliday, [name]: value });
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes when leaving edit mode
      setHolidays(editableHolidays);
      if (newHoliday.day && newHoliday.date && newHoliday.holiday) {
        setHolidays([...editableHolidays, newHoliday]);
        setEditableHolidays([...editableHolidays, newHoliday]);
        setNewHoliday({ day: "", date: "", holiday: "" });
      }
    }
    setEditMode(!editMode);
  };

  const handleDeleteClick = (index) => {
    const updatedHolidays = editableHolidays.filter((_, i) => i !== index);
    setEditableHolidays(updatedHolidays);
  };
  return (
    <div className="container">
    <div className="header">
      <h2>Holiday List 2024</h2>
      <button className="edit-button" onClick={handleEditToggle}>
        {editMode ? "Save Changes" : "Edit"}
      </button>
    </div>
    <table className="holiday-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Holiday</th>
        </tr>
      </thead>
      <tbody>
        {editableHolidays.map((holiday, index) => (
          <tr key={index}>
            {editMode ? (
              <>
                <td>
                  <input
                    type="text"
                    name="day"
                    value={holiday.day}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="date"
                    value={holiday.date}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="holiday"
                    value={holiday.holiday}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{holiday.day}</td>
                <td>{holiday.date}</td>
                <td>{holiday.holiday}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>

    {editMode && (
      <div className="add-holiday-form">
        <h3>Add New Holiday</h3>
        <form>
          <input
            type="text"
            name="day"
            placeholder="Day"
            value={newHoliday.day}
            onChange={handleNewHolidayChange}
            required
          />
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={newHoliday.date}
            onChange={handleNewHolidayChange}
            required
          />
          <input
            type="text"
            name="holiday"
            placeholder="Holiday Name"
            value={newHoliday.holiday}
            onChange={handleNewHolidayChange}
            required
          />
        </form>
      </div>
    )}
  </div>
);
};


export default Holidays

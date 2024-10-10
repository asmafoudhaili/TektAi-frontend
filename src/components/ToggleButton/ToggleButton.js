import React, { useState } from 'react';
import './ToggleButton.css'; // Import CSS file for styling

export default function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={handleChange} />
      <span className="slider"></span>
      <span className={`toggle-label ${isToggled ? 'on' : 'off'}`}>
        {isToggled ? 'ON' : 'OFF'}
      </span>
    </label>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa"; // Import the new icon from react-icons/fa

const GroupSelector = ({ setGrouping, setSortOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("status"); // State for selected grouping
  const [selectedSorting, setSelectedSorting] = useState("priority"); // State for selected sorting
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle grouping change
  const handleGroupingChange = (e) => {
    const value = e.target.value;
    setSelectedGrouping(value);
    setGrouping(value);
  };

  // Handle sorting change
  const handleSortingChange = (e) => {
    const value = e.target.value;
    setSelectedSorting(value);
    setSortOption(value);
  };

  return (
    <div className="group-selector" ref={dropdownRef}>
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <FaSlidersH className="dropdown-icon" /> Display
          <span className="dropdown-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label>Grouping: </label>
              <select value={selectedGrouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering: </label>
              <select value={selectedSorting} onChange={handleSortingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSelector;

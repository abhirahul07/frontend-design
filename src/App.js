import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import GroupSelector from "./GroupSelector";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // default grouping
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchData();

    // Restore state from localStorage
    const savedGrouping = localStorage.getItem("grouping");
    const savedSortOption = localStorage.getItem("sortOption");
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSortOption) setSortOption(savedSortOption);
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sortOption", sortOption);
  }, [grouping, sortOption]);

  return (
    <div className="app">
      <GroupSelector setGrouping={setGrouping} setSortOption={setSortOption} />
      <KanbanBoard tickets={tickets} grouping={grouping} sortOption={sortOption} users={users} />
    </div>
  );
};

export default App;

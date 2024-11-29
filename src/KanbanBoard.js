import React from "react";
import Card from "./Card";

// Import SVG icons for statuses and priorities
import todoIcon from './icons_FEtask/To-do.svg';
import inProgressIcon from './icons_FEtask/in-progress.svg';
import doneIcon from './icons_FEtask/Done.svg';
import cancelledIcon from './icons_FEtask/Cancelled.svg';
import BacklogIcon from './icons_FEtask/Backlog.svg';
import addIcon from './icons_FEtask/add.svg';
import moreOptionsIcon from './icons_FEtask/3 dot menu.svg';

// Priority Icons
import urgentPriorityIcon from './icons_FEtask/SVG-UrgentPrioritycolour.svg';
import highPriorityIcon from './icons_FEtask/Img-HighPriority.svg';
import mediumPriorityIcon from './icons_FEtask/Img-MediumPriority.svg';
import lowPriorityIcon from './icons_FEtask/Img-LowPriority.svg';
import noPriorityIcon from './icons_FEtask/No-priority.svg';


const groupAndSortTickets = (tickets, grouping, sortOption, users) => {
  const grouped = {};

  tickets.forEach((ticket) => {
    let key = ticket[grouping];

    if (grouping === "userId") {
      const user = users.find((user) => user.id === ticket.userId);
      key = user ? user.name : null; // Set null for unassigned tickets
    }

    if (grouping === "status") {
      key = getStatusLabel(ticket.status);
    } else if (grouping === "priority") {
      key = getPriorityLabel(ticket.priority);
    }

    if (key !== null) {
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    }
  });

  // Sort tickets within each group based on the selected sort option
  Object.keys(grouped).forEach((group) => {
    grouped[group] = sortTickets(grouped[group], sortOption);
  });

  return grouped;
};

// Function to sort tickets based on the sortOption
const sortTickets = (tickets, sortOption) => {
  return [...tickets].sort((a, b) => {
    if (sortOption === "priority") {
      return b.priority - a.priority; // Descending order of priority (high to low)
    }
    if (sortOption === "title") {
      return a.title.localeCompare(b.title); // Ascending alphabetical order by title
    }
    return 0; // No sorting if no valid sort option is selected
  });
};

// Function to map priority levels to labels
const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    case 0:
      return "No Priority";
    default:
      return priority;
  }
};

// Function to get corresponding icon for priority labels
const getPriorityIcon = (priority) => {
  switch (priority) {
    case "Urgent":
      return <img src={urgentPriorityIcon} alt="Urgent Priority" className="group-icon small" />;
    case "High":
      return <img src={highPriorityIcon} alt="High Priority" className="group-icon small" />;
    case "Medium":
      return <img src={mediumPriorityIcon} alt="Medium Priority" className="group-icon small" />;
    case "Low":
      return <img src={lowPriorityIcon} alt="Low Priority" className="group-icon small" />;
    case "No Priority":
      return <img src={noPriorityIcon} alt="No Priority" className="group-icon small" />;
    default:
      return null;
  }
};

// Function to map status to labels
const getStatusLabel = (status) => {
  switch (status) {
    case "Todo":
      return "Todo";
    case "InProgress":
      return "In progress";
    case "done":
      return "Done";
    case "cancelled":
      return "cancelled";
    case "Backlog":
      return "Backlog";
    default:
      return status;
  }
};

// Function to get corresponding icon for status labels
const getStatusIcon = (status) => {
  switch (status) {
    case "In progress":
      return <img src={inProgressIcon} alt="In progress" className="status-icon small" />;
    case "Todo":
      return <img src={todoIcon} alt="Todo" className="status-icon small" />;
    case "Done":
      return <img src={doneIcon} alt="Done" className="status-icon small" />;
    case "Backlog":
      return <img src={BacklogIcon} alt="Backlog" className="status-icon small" />;
    case "cancelled":
      return <img src={cancelledIcon} alt="cancelled" className="status-icon small" />;
    default:
      return null;
  }
};

// Function to get user icon (either avatar or initials)
const getUserIcon = (userName, users) => {
  const user = users.find((user) => user.name === userName);
  if (user && user.avatar) {
    return <img src={user.avatar} alt={user.name} className="group-icon small user-avatar" />;
  }
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="user-initials group-icon small">
      {initials}
    </div>
  );
};

const KanbanBoard = ({ tickets, grouping, sortOption, users }) => {
  // Define all possible statuses
  const allStatuses = ["Todo", "In progress", "Done", "cancelled", "Backlog"];

  // Define all possible groups based on the grouping option
  const allGroups =
    grouping === "status"
      ? allStatuses
      : grouping === "priority"
      ? ["Urgent", "High", "Medium", "Low", "No Priority"]
      : grouping === "userId"
      ? users
          .filter((user) => tickets.some((ticket) => ticket.userId === user.id))
          .map((user) => user.name) // Include only users with tickets
      : [];

  const groupedTickets = groupAndSortTickets(tickets, grouping, sortOption, users);

  // Ensure all groups are present in groupedTickets
  allGroups.forEach((group) => {
    if (!groupedTickets[group]) {
      groupedTickets[group] = [];
    }
  });

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div className="column" key={group}>
          <div className="column-header">
            <div className="header-content">
              {/* Render icons for priority, status, and user grouping */}
              {grouping === "priority" && getPriorityIcon(group)}
              {grouping === "status" && getStatusIcon(group)}
              {grouping === "userId" && getUserIcon(group, users)}
              <h2>{group}</h2> <span>({groupedTickets[group].length})</span>
            </div>
            <div className="header-actions">
              <button className="add-task-button">
                <img src={addIcon} alt="Add" />
              </button>
              <button className="more-options-button">
                <img src={moreOptionsIcon} alt="More options" />
              </button>
            </div>
          </div>
          {groupedTickets[group].length > 0 ? (
            groupedTickets[group].map((ticket) => (
              <Card key={ticket.id} ticket={ticket} grouping={grouping} />
            ))
          ) : (
            <p></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

import React from "react";

// Import SVG icons for priorities
import urgentPriorityIcon from './icons_FEtask/SVG-UrgentPrioritycolour.svg';
import highPriorityIcon from './icons_FEtask/Img-HighPriority.svg';
import mediumPriorityIcon from './icons_FEtask/Img-MediumPriority.svg';
import lowPriorityIcon from './icons_FEtask/Img-LowPriority.svg';
import noPriorityIcon from './icons_FEtask/No-priority.svg';

// Import SVG icons for statuses
import todoIcon from './icons_FEtask/To-do.svg';
import inProgressIcon from './icons_FEtask/in-progress.svg';
import doneIcon from './icons_FEtask/Done.svg';
import cancelledIcon from './icons_FEtask/Cancelled.svg';
import backlogIcon from './icons_FEtask/Backlog.svg';

// Import feature request icon
import { GoDotFill } from "react-icons/go";

// Function to get the corresponding icon for priority levels
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return <img src={urgentPriorityIcon} alt="Urgent Priority" className="priority-icon" />;
    case 3:
      return <img src={highPriorityIcon} alt="High Priority" className="priority-icon" />;
    case 2:
      return <img src={mediumPriorityIcon} alt="Medium Priority" className="priority-icon" />;
    case 1:
      return <img src={lowPriorityIcon} alt="Low Priority" className="priority-icon" />;
    case 0:
      return <img src={noPriorityIcon} alt="No Priority" className="priority-icon" />;
    default:
      return null;
  }
};

// Function to map status to corresponding icons
const getStatusIcon = (status) => {
  switch (status) {
    case "Todo":
      return <img src={todoIcon} alt="Todo" className="status-icon small" />;
    case "In progress":
      return <img src={inProgressIcon} alt="In progress" className="status-icon small" />;
    case "Done":
      return <img src={doneIcon} alt="Done" className="status-icon small" />;
    case "Blocked":
    case "Cancelled":
      return <img src={cancelledIcon} alt="Cancelled" className="status-icon small" />;
    case "Backlog":
      return <img src={backlogIcon} alt="Backlog" className="status-icon small" />;
    default:
      return null;
  }
};

// Function to get user initials or avatar with dynamic status
const getUserIcon = (userName, avatar, status) => {
  const statusIcon = getStatusIcon(status);

  if (avatar) {
    return (
      <div className="user-icon-with-status">
        <img src={avatar} alt={userName} className="user-avatar" />
        {statusIcon}
      </div>
    );
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="user-icon-with-status">
      <div className="user-initials">{initials}</div>
      {statusIcon}
    </div>
  );
};

const Card = ({ ticket, grouping }) => {
  return (
    <div className="card">
      {/* Card Header */}
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-icon">
          {getUserIcon(ticket.userName || "Unassigned", ticket.userAvatar, ticket.status)}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {grouping === "priority" || grouping === "userId" ? (
          <div className="title-with-priority">
            {getPriorityIcon(ticket.priority)} {/* Priority icon */}
            <h5 className="ticket-title">{ticket.title}</h5>
          </div>
        ) : (
          <h5 className="ticket-title">{ticket.title}</h5>
        )}
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        {grouping === "status" && (
          <div className="priority-tag">
            {getPriorityIcon(ticket.priority)}
          </div>
        )}
        <div className="feature-request">
          <GoDotFill className="feature-icon" />
          <span>Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

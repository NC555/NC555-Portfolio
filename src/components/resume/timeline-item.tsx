import React from "react";

import "@/styles/resume/timeline-item.css";

export interface TimelineItemProps {
  company: string;
  location: string;
  role: string;
  duration: string;
  tasksMarkdown: string;
}

function TimelineItem({
  company,
  location,
  role,
  duration,
  tasksMarkdown,
}: TimelineItemProps) {
  return (
    <li className="timeline-item">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
        <h4 className="text-white-2 text-xl font-bold leading-[1.3]">
          {company}
        </h4>
        <h6 className="text-white-2">
          {location ? <span>📍 {location}</span> : ''}
        </h6>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
        <p className="text-orange-yellow-crayola">
          {role}
        </p>
        <p className="text-white-1">🗓️ {duration}</p>
      </div>
      {tasksMarkdown && (
        <div className="text-white-2 whitespace-pre-line">
          {tasksMarkdown}
        </div>
      )}
    </li>
  );
}

export default TimelineItem;

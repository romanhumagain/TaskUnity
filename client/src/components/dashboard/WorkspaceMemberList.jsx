import React, { useState } from 'react';
import Popover from '../Popover';

const WorkspaceMemberList = ({ users, workspace_id }) => {
  const bg_colors = [
    "red", "teal", "sky", "rose", "purple", "yellow"
  ];

  const [hoveredUser, setHoveredUser] = useState(null);

  return (
    <div className='flex flex-wrap'>
      {users && users.map((data, i) => (
        <div
          key={data._id}
          className="relative"
        >
          <p className={`p-[2px] text-xs font-semibold text-white inline bg-${bg_colors[i]}-500 rounded-full cursor-pointer`}
           onMouseEnter={() => setHoveredUser(data._id)}
           onMouseLeave={() => setHoveredUser(null)}
          >
            {data.full_name.split(' ')[0].charAt(0)}{data.full_name.split(' ')[1].charAt(0)}
          </p>
          {hoveredUser === data._id && (
            <Popover user_id={data._id} workspace_id={workspace_id} />
          )}
        </div>
      ))}
    </div>
  );
}

export default WorkspaceMemberList;

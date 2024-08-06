import React from 'react'

const WorkspaceMemberList = ({ users }) => {
  const bg_colors = [
    "red", "teal", "sky", "rose", "purple", "yellow"
  ]

  return (
    <div className='flex flex-wrap'>
      {users && users.map((data, i) => ((
        <p className={`p-[2px] text-xs font-semibold text-white inline bg-${bg_colors[i]}-500 rounded-full`}>{data.full_name.split(' ')[0].charAt(0)}{data.full_name.split(' ')[1].charAt(0)}</p>
      )))}
    </div>
  )
}

export default WorkspaceMemberList
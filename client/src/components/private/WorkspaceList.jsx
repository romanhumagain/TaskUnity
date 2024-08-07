import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdAlert } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import WorkspaceMemberList from '../dashboard/WorkspaceMemberList';
const WorkspaceList = ({ data }) => {
  return (
    <>
      
        <div className="grid grid-cols-12 items-center mb-2 gap-4 border-b-2 pb-3 border-neutral-200 dark:border-neutral-800 px-2 ">
        
          <div className="col-span-1">
            {data.priority === "high" ? (<FcHighPriority />) : data.priority === "medium" ? (<FcMediumPriority />) : data.priority === "low" ? (<FcLowPriority />) : null}
          </div>
          <Link className='col-span-8' to={`/workspace/${data._id}`}>
          <div className="">
            <p className={`font-semibold text-gray-800 dark:text-neutral-300 text-sm`}>{data?.name}</p>
          </div>
          </Link>
          <div className="col-span-3">
            <WorkspaceMemberList users={data.users} workspace_id = {data._id}/>
          </div>
        </div>
      
    </>
  )
}

export default WorkspaceList
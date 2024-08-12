import React from 'react'
import { BiSolidLike } from "react-icons/bi";
import { FaBug } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { FaComment } from "react-icons/fa6";
import { RiFolderTransferFill } from "react-icons/ri";
import { formatDistanceToNow } from 'date-fns';

const ActivityMessage = ({ data }) => {
  let icon;
  let bgColor;

  switch (data.activity) {
    case 'started':
      icon = <BiSolidLike />;
      bgColor = 'bg-blue-500';
      break;
    case 'completed':
      icon = <IoCheckmarkDoneCircleSharp />;
      bgColor = 'bg-green-500';
      break;
    case 'in-progress':
      icon = <GiProgression />;
      bgColor = 'bg-yellow-500';
      break;
    case 'commented':
      icon = <FaComment />;
      bgColor = 'bg-gray-500';
      break;
    case 'bug':
      icon = <FaBug />;
      bgColor = 'bg-red-500';
      break;
    case 'assigned':
      icon = <RiFolderTransferFill />;
      bgColor = 'bg-purple-500';
      break;
    default:
      icon = <BiSolidLike />;
      bgColor = 'bg-blue-500';
      break;
  }
  return (
    <div className="  rounded-lg p-5 py-3 mb-1">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`${bgColor} p-2 rounded-full`}>
            <p className="text-white text-2xl">{icon}</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-md font-semibold text-gray-900 dark:text-gray-100">{data?.sender.full_name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.activity.charAt(0).toUpperCase() + data.activity.slice(1)} {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{data.message}</p>
        </div>
      </div>
    </div>
  );
};
export default ActivityMessage;

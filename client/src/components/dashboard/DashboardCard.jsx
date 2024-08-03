import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';

const DashboardCard = () => {
  const {
    tasksData,
    pendingTask,
    overdueTask,
    importantTask,
  } = useTask()

  return (
    <div className="rounded-lg grid mt-5 grid-cols-12 gap-5 text-white">

      <Link to="/pending-task" className=" col-span-6 md:col-span-3">
        <div className="mb-4 p-4 bg-sky-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Incomplete Tasks</h3>
          <p className="text-sm">
            {pendingTask?.length > 0
              ? `You have ${pendingTask?.length} incomplete tasks out of ${tasksData?.length} total tasks. Keep pushing!`
              : 'Hooray! All tasks are complete!'}
          </p>
        </div>
      </Link>
      <Link to="/overdue-task" className="col-span-6 md:col-span-3">
        <div className="mb-4 p-4 bg-teal-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          <p className="text-sm">
            {overdueTask?.length> 0
              ? `You have ${overdueTask?.length} overdue tasks. Time to catch up!`
              : 'Woohoo! No overdue tasks. Great job staying on track!'}
          </p>
        </div>
      </Link>
      <Link to="/pending-task" className="col-span-6 md:col-span-3">
        <div className="mb-4 p-4 bg-rose-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Pending Tasks</h3>
          <p className="text-sm">
            {pendingTask?.length > 0
              ? `You have ${pendingTask?.length} pending tasks. Let's get them done!`
              : 'Amazing! No pending tasks. You’re on top of everything!'}
          </p>
        </div>
      </Link>
      <Link to="/important-task" className="col-span-6 md:col-span-3">
        <div className="mb-4 p-4 bg-purple-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Important Tasks</h3>
          <p className="text-sm">
            {importantTask?.length > 0
              ? `You have ${importantTask?.length} important tasks. Focus on what matters most!`
              : 'Fantastic! No important tasks pending. You’re all set!'}
          </p>
        </div>
      </Link>

    </div>
  );
};

export default DashboardCard;

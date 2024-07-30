import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ incompleteTasks, totalTasks, overdueTasks, pendingTasks, importantTasks }) => {
  return (
    <div className="rounded-lg grid mt-5 grid-cols-12 gap-5 text-white">

      <Link to="/pending-task" className="col-span-3">
        <div className="mb-4 p-4 bg-sky-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Incomplete Tasks</h3>
          <p className="text-sm">
            {incompleteTasks > 0
              ? `You have ${incompleteTasks} incomplete tasks out of ${totalTasks} total tasks. Keep pushing!`
              : 'Hooray! All tasks are complete!'}
          </p>
        </div>
      </Link>
      <Link to="/overdue-task" className="col-span-3">
        <div className="mb-4 p-4 bg-teal-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          <p className="text-sm">
            {overdueTasks > 0
              ? `You have ${overdueTasks} overdue tasks. Time to catch up!`
              : 'Woohoo! No overdue tasks. Great job staying on track!'}
          </p>
        </div>
      </Link>
      <Link to="/pending-task" className="col-span-3">
        <div className="mb-4 p-4 bg-rose-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Pending Tasks</h3>
          <p className="text-sm">
            {pendingTasks > 0
              ? `You have ${pendingTasks} pending tasks. Let's get them done!`
              : 'Amazing! No pending tasks. You’re on top of everything!'}
          </p>
        </div>
      </Link>
      <Link to="/important-task" className="col-span-3">
        <div className="mb-4 p-4 bg-purple-400 rounded-xl hover:scale-105 transition-transform duration-700 cursor-pointer shadow-xl">
          <h3 className="text-lg font-semibold">Important Tasks</h3>
          <p className="text-sm">
            {importantTasks > 0
              ? `You have ${importantTasks} important tasks. Focus on what matters most!`
              : 'Fantastic! No important tasks pending. You’re all set!'}
          </p>
        </div>
      </Link>

    </div>
  );
};

export default DashboardCard;

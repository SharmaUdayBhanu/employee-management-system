
import { getTasksFromLocalStorage } from './localstorage';

const AllTask = ({ employeeId }) => {
  const tasks = getTasksFromLocalStorage(employeeId);

  return (
    <div>
      <h3>All Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllTask;
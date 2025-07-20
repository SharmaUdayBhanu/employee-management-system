
import { getTasksFromLocalStorage } from './localstorage';

const TaskList = ({ employeeId }) => {
  const tasks = getTasksFromLocalStorage(employeeId);

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
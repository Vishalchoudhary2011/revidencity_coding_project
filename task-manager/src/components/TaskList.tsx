import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks, updateTaskStatus } from "../api/taskApi";
import {
  deleteTaskData,
  getTasksData,
  selectTasks,
  Task,
  updateTaskStatusData,
} from "../features/taskSlice";
import "./Styles/TaskList.css";

const TaskList = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const getAllTasks = async () => {
    try {
      const data = await getTasks();
      await dispatch(getTasksData(data));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [dispatch]);

  const handleOnEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setStatus(task.completed);
  };

  const handleOnSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId !== null && status !== undefined) {
      try {
        await updateTaskStatus({
          id: editingTaskId,
          completed: status,
        });
        dispatch(
          updateTaskStatusData({ id: editingTaskId, completed: status })
        );

        setEditingTaskId(null);
        setStatus(undefined);
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value === "true");
  };

  const handleOnCancel = () => {
    setEditingTaskId(null);
    setStatus(undefined);
  };

  const handleOnDelete = async (id: number) => {
    await deleteTask(id);
    dispatch(deleteTaskData(id));
  };

  return (
    <div className="TaskTable">
      <table className="task_table_list">
        <thead>
          <tr className="table-row">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Task Completion Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task) => (
            <tr key={task.id} className="table-row">
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                {editingTaskId === task.id ? (
                  <select
                    name="status"
                    id="status"
                    value={status ? "true" : "false"}
                    onChange={handleStatusChange}
                  >
                    <option value="true">Complete</option>
                    <option value="false">Incomplete</option>
                  </select>
                ) : task.completed ? (
                  "Complete"
                ) : (
                  "Incomplete"
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button className="save-button" onClick={handleOnSave}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={handleOnCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleOnEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleOnDelete(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

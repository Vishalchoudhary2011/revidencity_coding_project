import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { createTask } from "../api/taskApi";
import { addTask } from "../features/taskSlice";

import "./Styles/TaskForm.css";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const dispatch = useDispatch();

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const task = { title, description, completed };
    try {
      const newTask = await createTask(task);
      dispatch(addTask(newTask.task)); 
      setTitle("");
      setDescription("");
      setCompleted(false);
      setErrors({});
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="create_form_card">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <label>Task Completion Status</label>
          <div className="task_Status_Change">
            <label>
              <input
                type="radio"
                value="incomplete"
                checked={!completed}
                onChange={() => setCompleted(false)}
              />
              Incomplete
            </label>
            <label>
              <input
                type="radio"
                value="complete"
                checked={completed}
                onChange={() => setCompleted(true)}
              />
              Complete
            </label>
          </div>
        </div>
        <button type="submit">Create Task</button>
      </form>

    </>
  );
};

export default TaskForm;

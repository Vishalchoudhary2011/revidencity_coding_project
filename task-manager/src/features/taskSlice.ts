import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {   
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

     getTasksData: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateTaskStatusData: (state, action: PayloadAction<{ id: number, completed: boolean }>) => {
  
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
      }
    },
    deleteTaskData: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export const { setTasks, addTask, updateTaskStatusData, deleteTaskData, getTasksData } = taskSlice.actions;

export default taskSlice.reducer;

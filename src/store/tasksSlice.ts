import { actualGetData } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type TaskStates = "new" | "inProgress" | "cancelled" | "completed" | null;

export interface ITask {
  id: string;
  title: string;
  createdAt?: string | null;
  completedAt?: string | null;
  cancelledAt?:string | null;
  description: string;
  status: TaskStates;
}

const initialState: ITask[] = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
     addTask: (state, { payload }) => {
      return [
        ...state,
        { id: nanoid(), status: "new", createdAt: actualGetData(), ...payload },
      ];
    },
  changeTaskStatus: (state, { payload }) => {
      const { id, status } = payload;
      const task = state.find((t) => t.id === id);
      if (task) {
        task.status = status;
        switch (status) {
          case "completed":
            task.completedAt = actualGetData();
            task.cancelledAt = null;
            break;
          case "cancelled":
            task.cancelledAt = actualGetData();
            task.completedAt = null;
            break;
          default:
            task.completedAt = null;
            task.cancelledAt = null;
            break;
        }
      }
    },
 editTask: (state, action) => { 
		state = state.map((elem) => {
			if(elem.id === action.payload.id) {
				return {...elem, ...action.payload}
			}
			return elem;
		})
		return state
    },
  },
});

export const { addTask, editTask,changeTaskStatus} = tasksSlice.actions;

export default tasksSlice;

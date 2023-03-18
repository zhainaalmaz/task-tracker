import { actualGetData } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type TaskStates = "new" | "inProgress" | "cancelled" | "completed"| null;

export interface ITask {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
  status: TaskStates;
}

const initialState: ITask[] = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTask: (state, action) => {
	    state.push({id: nanoid(), status: "new", createdAt: actualGetData(), ...action.payload});
    },

    changeTaskStatus: (state, action) => { 
		state = state.map((elem) => {
			if(elem.id === action.payload.id) {
				return {...elem, status: action.payload.status}
			}
			return elem;
		})
		return state
    },

	editTask: (state, action) => { 
		console.log(action.payload);
		state = state.map((elem) => {
			if(elem.id === action.payload.id) {
				return {...elem, ...action.payload}
			}
			return elem;
		})
		return state
    },

    deleteTask: (state, action) => {
		state = state.filter((elem) => elem.id === action.payload.id)
    },
  },
});

export const { addTask, editTask,changeTaskStatus, deleteTask } = tasksSlice.actions;

export default tasksSlice;

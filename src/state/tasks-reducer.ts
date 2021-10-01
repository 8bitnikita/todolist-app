import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskACActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type addTaskACActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusACActionType = {
    type: 'CHANGE-STATUS-TASK'
    id: string
    isDone: boolean
    todolistId: string
}
export type changeTaskTitleStatusACActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}

export type ActionsType =
    removeTaskACActionType
    | addTaskACActionType
    | changeTaskStatusACActionType
    | changeTaskTitleStatusACActionType
    | addTodolistActionType
    | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.id)};
        }
        case 'ADD-TASK': {
            state[action.todolistId] = [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            return {...state}
        }
        case 'CHANGE-STATUS-TASK': {
            let changeBox = state[action.todolistId].find(t => t.id === action.id)
            if (changeBox) {
                changeBox.isDone = action.isDone;
                return {...state};
            } else {
                return {...state}
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let newTitle = state[action.todolistId].find(t => t.id === action.id)
            if (newTitle) {
                newTitle.title = action.title;
                return {...state};
            } else {
                return {...state}
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolistId: string): removeTaskACActionType => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): changeTaskStatusACActionType => {
    return {type: 'CHANGE-STATUS-TASK', id: id, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleStatusAC = (id: string, newTitle: string, todolistId: string): changeTaskTitleStatusACActionType => {
    return {type: 'CHANGE-TASK-TITLE', id: id, title: newTitle, todolistId: todolistId}
}

import React, {ChangeEvent} from 'react';
import {filterValuesType} from './App';
import {AddInputForm} from "./AddInputForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValuesType, todolistId: string) => void
    addNewTask: (taskTitle: string, todolistId: string) => void
    changeBoxStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterValuesType
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {
    // Function to add new Task
    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }

    // Filter Buttons ('All' | 'Active' | 'Completed')
    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)

    // Button to remove Todolist
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3><EditableSpan value={props.title}/> <button onClick={onRemoveTodolistHandler}>x</button> </h3>
            {/*<h3>{props.title} <button onClick={onRemoveTodolistHandler}>x</button> </h3>*/}
            <AddInputForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeBoxStatus(t.id, newIsDoneValue, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeBoxHandler} checked={t.isDone}/>
                            <EditableSpan value={t.title}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {filterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    key: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValuesType, todolistId: string) => void
    addNewTask: (taskTitle: string, todolistId: string) => void
    changeBoxStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterValuesType
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');

    // Input and Button "Add New Task"
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    // Function that checks Input and add Error message
    let [error, setError] = useState<string | null>(null)
    let addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addNewTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is required!')
        }
    }

    // Filter Buttons ('All' | 'Active' | 'Completed')
    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)

    // Button to remove Todolist
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onRemoveTodolistHandler}>x</button>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error': ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
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
                            <span>{t.title}</span>
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
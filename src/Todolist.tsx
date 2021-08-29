import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {filterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValuesType) => void
    addNewTask: (taskTitle: string) => void
    changeBoxStatus: (id: string, isDone: boolean) => void
    // error: string | null
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
            props.addNewTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required!')
        }
    }

    // Filter Buttons ('All' | 'Active' | 'Completed')
    const onAllClickHandler = () => props.changeFilter("All")
    const onActiveClickHandler = () => props.changeFilter("Active")
    const onCompletedClickHandler = () => props.changeFilter("Completed")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeBoxStatus(t.id, newIsDoneValue)
                        }
                        return <li key={t.id}>
                            <input type="checkbox" onChange={onChangeBoxHandler} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
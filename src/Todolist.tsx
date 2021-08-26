import React, {useState} from 'react';
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
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let addTask = () => {
        props.addNewTask(title)
        setTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={e => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id)}}>x</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("All")
                }}>
                    All
                </button>
                <button onClick={() => {
                    props.changeFilter("Active")
                }}>
                    Active
                </button>
                <button onClick={() => {
                    props.changeFilter("Completed")
                }}>
                    Completed
                </button>
            </div>
        </div>
    )
}
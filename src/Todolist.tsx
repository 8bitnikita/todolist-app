import React, {ChangeEvent} from 'react';
import {filterValuesType} from './App';
import {AddInputForm} from "./AddInputForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <h3><EditableSpan value={props.title}/>
                <IconButton onClick={onRemoveTodolistHandler} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddInputForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeBoxStatus(t.id, newIsDoneValue, props.id)
                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox color={"primary"} onChange={onChangeBoxHandler} checked={t.isDone}/>
                            <EditableSpan value={t.title}/>
                            <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'All' ? 'outlined' : 'text'}
                        color={"primary"}
                        // className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'Active' ? 'outlined' : 'text'}
                        color={"default"}
                        // className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                        color={"default"}
                        // className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}
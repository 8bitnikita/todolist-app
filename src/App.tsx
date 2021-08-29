import React, {useState} from 'react';
import './App.css';
import { Todolist } from './Todolist';
import {v1} from "uuid";


export type filterValuesType = 'All' | 'Active' | 'Completed'

const App = () => {
    // useState to delete tasks ----------------------------------
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React JS', isDone: false},
    ])
    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    //------------------------------------------------------------

    // useState to filter buttons ('All' | 'Active' | 'Completed')
    let [filter, setFilter] = useState<filterValuesType>('All');
    let tasksForTodolist = tasks;
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    const changeFilter = (value: filterValuesType) => {
        setFilter(value)
    }
    //------------------------------------------------------------

    // Function to Add tasks -------------------------------------

    const addNewTask = (taskTitle: string) => {
        let task = {id: v1(), title: taskTitle.trim(), isDone: false};
        let newTask = [task, ...tasks]
        setTasks(newTask)
        /*if (taskTitle !== '') {
            setTasks(newTask)
        } else {
            setError('Title is required!')
        }*/

    }
    //------------------------------------------------------------

    // Change box status (true/false) ----------------------------
    const changeBoxStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
         if (task) {
             task.isDone = isDone
             setTasks([...tasks])
         }
    }
    //------------------------------------------------------------

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addNewTask={addNewTask}
                changeBoxStatus={changeBoxStatus}
                // error={error}
            />
        </div>
    );
}

export default App;
import React, {useState} from 'react';
import './App.css';
import Todolist, {filterValueType} from "./Todolist";
import {v1} from "uuid";

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
    let [filter, setFilter] = useState<filterValueType>('All');
    let tasksForTodolist = tasks;
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    const changeFilter = (value: filterValueType) => {
        setFilter(value)
    }
    //------------------------------------------------------------

    // Function to add tasks -------------------------------------
    const addNewTask = (taskTitle: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false};
        let newTask = [task, ...tasks]
        setTasks(newTask)
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
            />
        </div>
    );
}

export default App;
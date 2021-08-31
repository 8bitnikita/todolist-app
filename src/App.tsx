import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";


export type filterValuesType = 'All' | 'Active' | 'Completed'
type TodolistType = {
    id: string
    title: string
    filter: filterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    // useState to delete tasks ----------------------------------
    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }
    //------------------------------------------------------------

    // Function to remove Todolist -------------------------------------
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }
    //------------------------------------------------------------

    // Function to Add tasks -------------------------------------
    const addNewTask = (taskTitle: string, todolistId: string) => {
        let task = {id: v1(), title: taskTitle.trim(), isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    //------------------------------------------------------------

    // Change checkbox status (true/false) ----------------------------
    const changeBoxStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    //------------------------------------------------------------

    // Function to filter buttons ('All' | 'Active' | 'Completed')
    const changeFilter = (value: filterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    //------------------------------------------------------------

    // useState to add Todolists ---------------------------------
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'All'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'All'
        }
    ])
    //------------------------------------------------------------

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React JS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'JS book', isDone: true},
            {id: v1(), title: 'Macbook', isDone: false}
        ]
    })

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks
                    if (tl.filter === 'Active') {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (tl.filter === 'Completed') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            changeBoxStatus={changeBoxStatus}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
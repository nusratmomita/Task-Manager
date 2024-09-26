import { useState, useEffect } from "react";
import './taskManager.css'; // Import the regular CSS file

function TaskManager() {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        const taskName = newTask.trim();
        if (taskName) {
            setTasks([...tasks, { name: taskName, completed: false }]);
            setNewTask('');
        } else {
            alert('Task name cannot be empty!');
        }
    };

    const removeTask = (index) => {
        if (tasks[index].completed) {
            setTasks(tasks.filter((_, i) => i !== index));
        } else {
            alert('Complete the task before deleting!');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);
    const taskStatus = completedTasks.length === tasks.length && tasks.length > 0
        ? 'All tasks completed!'
        : 'There are tasks to complete.';

    return (
        <div className="app">
            <h1 className="header">React Task Manager</h1>

            <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                onKeyUp={(e) => e.key === 'Enter' && addTask()} 
                placeholder="Add a new task" 
            />
            <button onClick={addTask}>Add Task</button>

            <h2>Tasks</h2>

            <ul>
            {tasks.map((task, index) => (
                <li key={index} className="task">
                    <span className={task.completed ? 'completed' : ''}>{task.name}</span>
                    <span className={task.completed ? 'status-done' : 'status-pending'}>
                        {task.completed ? 'Done' : 'Pending'}
                    </span>
                    <div>
                        <button onClick={() => toggleTaskCompletion(index)}>Complete</button>
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </div>
                </li>
            ))}
            </ul>


            {tasks.length === 0 && <p>No tasks available.</p>}
            <h3>Task Status: {taskStatus}</h3>
            <p>Total Tasks: {tasks.length}</p>
            <p>Completed Tasks: {completedTasks.length}</p>
            <p>Incomplete Tasks: {incompleteTasks.length}</p>
        </div>
    );
}

export default TaskManager;

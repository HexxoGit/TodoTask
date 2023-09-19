import { useState } from "react"
import { Task } from "../domain/Task"

export const Todo = ({ task, toggleComplete, deleteTodo }: 
        { task: Task, toggleComplete: (taskId: number) => void, deleteTodo: (taskId: number) => void }) => {
    
    const [completed, setCompleted] = useState(task.completed);

    const handleCheckboxClick = () => {
        setCompleted(!completed);
        toggleComplete(task.id);
    };

    const handleDeleteClick = () => {
        deleteTodo(task.id);
    };

    return (
        <div className='Todo'>
            <input
            type='checkbox'
            checked={completed}
            onChange={handleCheckboxClick}
            className='todo-checkbox'
            />
            <p className={`${task.completed ? 'completed' : ""}`}>{task.name}</p>
            <div className='delete-icon' onClick={handleDeleteClick}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='#000000'
                width='20px'
                height='20px'
                >
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41l5.59 5.59-5.59 5.59L6.41 19 12 13.41l5.59 5.59L19 17.59l-5.59-5.59 5.59-5.59z' />
              </svg>
            </div>
        </div>
    )
}
import { useState } from 'react'
import { Task } from '../domain/Task'

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
            <p className={`${task.completed ? 'completed' : ''}`}>{task.name}</p>
            <div className='delete-icon' onClick={handleDeleteClick}>
              <img src={'/images/icon-cross.svg?url'} alt='Delete Icon' />
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm';
import { Task } from '../domain/Task.ts';
import { Todo } from './Todo.tsx';

export const TodoWrapper = ({ theme } : { theme: string}) => {

    const [todos, setTodos] = useState<Task[]>([]);
    const [filter, setFilter] = useState('Todas');
    const activeTasksCount = Array.isArray(todos)
        ? todos.filter((todo) => !todo.completed).length : 0;

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const parsedTodos = JSON.parse(storedTodos);
            setTodos(parsedTodos);
        }
        console.log("refreshed");
    }, []);

    const addTodo = (todo: any) => {
        const newTask: Task = {
            id: todos.length + 1,
            name: todo,
            completed: false,
        };
        const newTodos = [...todos, newTask];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = (id: number) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = (id: number) => {
        if (Array.isArray(todos)) {
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }
    }

    const filteredTodos = Array.isArray(todos)
        ? todos.filter((todo) => {
            if (filter === 'activas') {
                return !todo.completed;
            } else if (filter === 'completas') {
                return todo.completed;
            }
        return true;
    }): [];
    
    const deleteCompletedTasks = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className={`TodoWrapper ${theme === 'dark' ? 'dark' : 'light'}`}>
            <h1>Lista de tarefas</h1>
            <TodoForm addTodo={addTodo} />
            {todos.length > 0 ? (
                <>
                <div className="list-header">
                    <div className="left-content">{`${activeTasksCount} tarefas em falta`}</div>
                    <div className="filter-dropdown">
                        <label htmlFor="filterSelect">Filtrar por</label>
                        <select
                        id="filterSelect"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value="todas">Todas</option>
                        <option value="activas">Por realizar</option>
                        <option value="completas">Completas</option>
                        </select>
                    </div>
                </div>
                <div className="all-todos">
                    {filteredTodos.map((todo) => (
                    <Todo
                    key={todo.id}
                    task={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}/>
                    ))}
                </div>

                <p className="delete-completed" onClick={deleteCompletedTasks}>
                    Limpar tarefas completas
                </p>
                </>
            ) : null}
        </div>
    );
};


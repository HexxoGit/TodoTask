import { useState } from "react"
import { TodoForm } from "./TodoForm";
import { Task } from "../domain/Task.ts"
import { Todo } from "./Todo.tsx";

export const TodoWrapper = () => {

    const [todos, setTodos] = useState<Task[]>([]);
    const [filter, setFilter] = useState('Todas');
    const activeTasksCount = todos.filter((todo) => !todo.completed).length;

    const addTodo = (todo: any) => {
        const newTask: Task = {
            id: todos.length + 1,
            name: todo,
            completed: false,
        };
        setTodos([...todos, newTask]);
    }

    const toggleComplete = (id: any) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }

    const deleteTodo = (id: number) => setTodos(todos.filter((todo) => todo.id !== id));

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'activas') {
          return !todo.completed;
        } else if (filter === 'completas') {
          return todo.completed;
        }
        return true;
    });
    
    const deleteCompletedTasks = () => {
        const remainingTasks = todos.filter((todo) => !todo.completed);
        setTodos(remainingTasks);
    };

    return (
        <div className='TodoWrapper'>
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


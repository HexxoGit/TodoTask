import { useState } from "react"

export const TodoForm = ({addTodo} : {addTodo:any}) => {

    const [value, setValue] = useState("")

    const handleSubmit = (e:any)=> {
        e.preventDefault();
        if(value) {
            console.log(value);
            addTodo(value);
            setValue("");
        }
    }

    return (
        <div className='TodoForm'>
            <h5>Criar uma nova tarefa</h5>
            <form onSubmit={handleSubmit} className='TodoForm'>
                <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='todo-input'
                    placeholder='Nova Tarefa'
                    maxLength={50}/>
            </form>
        </div>
    )
}

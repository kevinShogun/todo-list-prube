import { FC, useContext } from 'react';
import { Todo as ITodo } from "../interfaces"
import { TodoContext } from '../context';
import '../styles/todoStyle.css';
import '../styles/components.css';


interface TodoProps {
    todo: ITodo;
}
/**
 * Renders a single todo item.
 * @param {TodoProps} props - The props object containing the todo item.
 * @param {ITodo} props.todo - The todo item to be rendered.
 * @returns {JSX.Element} The rendered todo item.
 */
export const Todo: FC<TodoProps> = ({ todo }) => {
    
    const { removeTodo, setCurrentTodo, toggleTodo} = useContext(TodoContext);

    return (
        <div className="todo-container">
            <div className="todo-dropdown">
                <div tabIndex={0} role="button">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a
                        className={`${todo.done && 'hidden'}`}
                        onClick={() => setCurrentTodo(todo)}
                    >Editar </a></li>
                    <li><a
                        onClick={() => removeTodo(todo.id)}
                    >Eliminar</a></li>
                </ul>
            </div>
            <h3 className={`todo-title ${todo.done && 'line-through text-[#6d6a5f]'}` }
            > { todo.title } </h3>
            <p className="todo-text">{todo.body}</p>
            <div className="container-flex">
                <div className='flex gap-3 mt-2'>
                    {todo.categories.map((c, index) => (
                        <div
                            key={index}
                            className={`color-circle ${todo.categories.includes(c) && 'border-2 border-black'}`}
                            data-tip={c.name}
                            style={{ backgroundColor: c.color }}
                        />
                    ))}
                </div>

                <label className="flex items-center space-x-2 mt-3">
                    <input type="checkbox" className="checkbox rounded-md text-primary-500"
                        checked={todo.done}
                        onChange={() => { toggleTodo(todo.id)}}
                    />
                    <span className="todo-bottom-text">Completado</span>
                </label>
            </div>

        </div>
    )
}

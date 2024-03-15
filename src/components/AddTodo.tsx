import { useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoContext } from '../context';
import { Category, Todo } from '../interfaces';
import { toggleModal } from "../helper/modalAction"
import { Modal } from "./Modal"
import '../styles/components.css'

type NewTodo = {
    title: string;
    body: string;
    categories: Category[];
}

/**
 * @description This code defines a React component called AddTodo that is responsible for adding a new todo item. 
 * It uses the useState and useContext hooks from React to manage the state and access the context. 
 * The component renders a button that opens a modal dialog when clicked. 
 * Inside the modal, the user can enter a title, description, and select categories for the new todo item. 
 * The component also handles updating an existing todo item if one is provided through the context.
 * @returns {JSX.Element}
 */

export const AddTodo = () => {

    const [todo, settodo] = useState<NewTodo>({
        title: '',
        body: '',
        categories: []
    });
    const { categories, addTodo, replaceTodo, currentTodo} = useContext(TodoContext);


    useEffect(() => {
        if (currentTodo) {
            settodo({
                title: currentTodo.title,
                body: currentTodo.body,
                categories: currentTodo.categories
            });
            toggleModal({ value: true, id: 'add_todo'});
        }
    }, [currentTodo])


    const setCategories = (c: Category) => {

        if(todo.categories.includes(c)){
            const newCategories = todo.categories.filter((cat) => cat.id !== c.id);
            return settodo({ ...todo, categories: newCategories })
        }else{
            return settodo({ 
                ...todo, 
                categories: [...todo.categories, c]
            })
        }
    }

    const handleAddTodo = () => {
        const newTodo:Todo = {
            ...todo,
            id: uuid(),
        }

        if(currentTodo){
            const updatedTodo = {
                ...currentTodo,
                title: todo.title,
                body: todo.body,
                categories: todo.categories
            }
            replaceTodo(updatedTodo);
        }else{
            addTodo(newTodo);
        }

        settodo({
            title: '',
            body: '',
            categories: []
        });
        toggleModal({ value: false, id: 'add_todo'});

    }

    return (
        <div>
            <button className="btn btn-ghost"
                onClick={() => {
                    toggleModal({ value: true, id: 'add_todo' });
                }}
            >
                Agregar una tarea
                <i className='bx bx-plus'></i>
            </button>
            <br /> <br />
            <Modal
                id="add_todo"
            >
                <h2 className="button-text">
                    Nueva tarea
                </h2>
                <div className="divider" />
                <form method="dialog" className="modal-form" onSubmit={handleAddTodo}>
                    <div className="form-control">
                        <label htmlFor="title">Título: </label>
                        <input type="text" id="title" className='input-text'
                            value={todo.title}
                            onChange={(e) => settodo({ ...todo, title: e.target.value })}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="description">Descripción: </label>
                        <textarea
                            id="description"
                            value={todo.body}
                            className='textarea-form'
                            onChange={(e) => settodo({ ...todo, body: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="color">Categorías: </label>
                        <div className='flex gap-3 mt-2'>
                            {categories?.map((c, index) => (
                                <div
                                    key={index}
                                    className={`color-circle ${todo.categories.includes(c) ? 'border-2 border-black' : ''}`}
                                    data-tip={c.name}
                                    style={{ backgroundColor: c.color }}
                                    onClick={() =>  setCategories(c) }
                                />

                            ))}

                        </div>

                    </div>

                    <button type="submit" className="btn btn-primary">
                        {currentTodo ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>
            </Modal>
        </div>
    )
}

import { useState, useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoContext } from '../context';
import { toggleModal } from '../helper/modalAction';
import { Category } from '../interfaces'
import { COLORS } from '../constants/colors';
import { Modal } from './Modal'
import '../styles/components.css'


/**
 * @description This code defines a React functional component called AddCategory
 * that is responsible for adding and updating categories. 
 * It uses the useState and useContext hooks from React to manage the state and access the context. 
 * The component renders a button that opens a modal dialog when clicked. 
 * Inside the modal, the user can enter a category name and select a color from a predefined list. 
 * The component also listens for changes in the currentCategory context variable and 
 * updates the input fields accordingly.
 * 
 * @returns  {JSX.Element} The rendered todo item.
 */
export const AddCategory = () => {

    const [categoryName, setCategoryName] = useState('');
    const [color, setColor] = useState('');

    const { addCategory, currentCategory, replaceCategory } = useContext(TodoContext);

    useEffect(() => {
        if (currentCategory) {
            setCategoryName(currentCategory.name);
            setColor(currentCategory.color);
            toggleModal({ value: true });
        }
    }, [currentCategory])


    const handleCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (categoryName.trim() === '' || color.trim() === '') {
            return
        }

        const newCategory: Category = {
            id: uuid(),
            name: categoryName,
            color
        }

        if (currentCategory) {
            const updatedCategory = { ...currentCategory, name: categoryName, color }
            replaceCategory(updatedCategory)
        }else{
            addCategory(newCategory);
        }
        
        setCategoryName('');
        setColor('');

        toggleModal({ value: false });
    }

    return (
        <div>
            <button className="btn btn-ghost"
                onClick={() => {
                    toggleModal({ value: true });
                }}
            >
                Agregar una categoria
                <i className='bx bx-plus'></i>
            </button>
            <Modal>
                <h2 className="button-text">
                    Agregar una categoria
                </h2>
                <div className="divider" />
                <form method="dialog" className="modal-form" onSubmit={handleCategory}>
                    <div className="form-control">
                        <label htmlFor="category">Categoria: </label>
                        <input type="text" id="category" className='input-text'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="color">Color: </label>
                        <div className='flex gap-3'>
                            {COLORS.map((c, index) => (
                                <div
                                    key={index}
                                    className={`color-circle ${color === c && 'border-2 border-black'}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                />

                            ))}

                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary">
                        {currentCategory ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>
            </Modal>
        </div>
    )
}

import { useContext } from 'react'
import { MagicMotion } from "react-magic-motion";
import { AddCategory } from "./AddCategory"
import { TodoContext } from "../context";

export const SideBar = () => {

  const { categories, setCurrentCategory, removeCategory } = useContext(TodoContext);

  return (
    <aside className="sidebar">
      <h2 className="font-semibold text-2xl md:text-3xl lg:text-5xl">
        todo
      </h2>

      <MagicMotion>
        <div>
          <ul className="mt-5">
            {categories.map((category) => (
              <li key={category.id} className="list-item">
                <div className='flex w-3/4 items-center gap-2'>
                  <span className="category-color" style={{ backgroundColor: category.color }} />
                  <span className='list-item'>{category.name}</span>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                  </div>
                  <ul tabIndex={0} className="dropdown-item">
                    <li>
                      <a onClick={() => setCurrentCategory(category)}> Editar </a>
                    </li>
                    <li>
                      <a onClick={() => removeCategory(category.id)}> Eliminar </a>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </MagicMotion>

      <div className="divider" />
      <AddCategory />
      <img
        src='./undraw_to_do_re_jaef.svg'
        alt="note list"
        className="w-3/4 mx-auto mt-5 hidden lg:block"
      />
    </aside>
  )
}
/***
 * Edad de 25 a 35 años
talentohumano.ni@grupolgb.com
whatsapp 76221311
 */

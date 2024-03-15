import { useContext } from 'react';
import { MagicMotion } from 'react-magic-motion';
import { TodoContext } from "../context";
import { AddTodo } from "./AddTodo"
import { Todo } from './Todo';

export const TodoScreen = () => {

  const { todos } = useContext(TodoContext);


  return (
    <div
      className="w-full p-3 md:p-5 h-full overflow-y-auto"
    >
      <AddTodo />

      <MagicMotion>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 w-full">

          {
            todos?.map((todo) => (
              <div
                key={todo.id}
                data-testid={todo.title}
              >
                <Todo
                  todo={todo}
                />

              </div>
            ))
          }
        </div>
      </MagicMotion>

    </div>
  )
}

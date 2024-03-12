import { Category, Todo } from "../interfaces";
import { createContext } from 'react'

export interface TodoContextProps {
    todos: Todo[];
    categories: Category[];
    currentCategory: Category | null;
    currentTodo: Todo | null;
    setCurrentTodo: (todo: Todo | null) => void;
    setCurrentCategory: (category: Category | null) => void;
    replaceTodo: (todo: Todo) => void;
    replaceCategory: (category: Category) => void;
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    addCategory: (category: Category) => void;
    removeCategory: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);
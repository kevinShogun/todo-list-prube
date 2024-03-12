import { FC, ReactNode, useReducer, useEffect, useMemo } from 'react';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';
import { Category, Todo } from '../interfaces';

/**
 * TodoProvider component.
 * 
 * This component is responsible for managing the state of todos and categories in the application.
 * It uses the useReducer hook to handle state updates and provides the state and necessary actions
 * to its children components through the TodoContext.Provider.
 * 
 * @component
 * @example
 * return (
 *   <TodoProvider>
 *     <App />
 *   </TodoProvider>
 * )
 */

interface Props {
    children: ReactNode | ReactNode[];
}

export interface TodoState {
    todos: Todo[];
    categories: Category[];
    currentCategory: Category | null;
    currentTodo: Todo | null;
}

const TODO_INITIAL_STATE: TodoState = {
    todos: [],
    categories: [],
    currentCategory: null,
    currentTodo: null,
};




export const TodoProvider: FC<Props> = ({ children }) => {

    // Recupera el estado del localStorage al inicializar el componente
    const initialState = useMemo(() => {
        const storedState = localStorage.getItem('todoState');
        return storedState ? JSON.parse(storedState) : TODO_INITIAL_STATE;
    }, []);

    const [state, dispatch] = useReducer(TodoReducer, initialState);

    useEffect(() => {
        localStorage.setItem('todoState', JSON.stringify(state));
    }, [state]);

    const memoizedState = useMemo(() => state, [state]);


    const addTodo = (todo: Todo) => {
        dispatch({ type: 'addTodo', payload: todo });
    };

    const removeTodo = (id: string) => {
        dispatch({ type: 'removeTodo', payload: id });
    }

    const toggleTodo = (id: string) => {
        dispatch({ type: 'toggleTodo', payload: id });
    }

    const addCategory = (category: Category) => {
        dispatch({ type: 'addCategory', payload: category });
    }

    const removeCategory = (id: string) => {
        dispatch({ type: 'removeCategory', payload: id });
    }

    const setCurrentTodo = (todo: Todo | null) => {
        dispatch({ type: 'setCurrentTodo', payload: todo });
    }

    const setCurrentCategory = (category: Category | null) => {
        dispatch({ type: 'setCurrentCategory', payload: category });
    }

    const replaceTodo = (todo: Todo) => {
        dispatch({ type: 'replaceTodo', payload: todo });
    };

    const replaceCategory = (category: Category) => {
        dispatch({ type: 'replaceCategory', payload: category });
    }

    return (
        <TodoContext.Provider
            value={{
                ...memoizedState,
                addTodo,
                removeTodo,
                toggleTodo,
                addCategory,
                removeCategory,
                setCurrentTodo,
                setCurrentCategory,
                replaceCategory,
                replaceTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};


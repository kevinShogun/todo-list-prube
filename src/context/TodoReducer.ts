import { Category, Todo } from "../interfaces";
import { TodoState } from "./TodoProvider";

type TodoActions =
	| { type: "hydrate"; payload: TodoState }
	| { type: "addTodo"; payload: Todo }
	| { type: "setCurrentTodo"; payload: Todo | null }
	| { type: "setCurrentCategory"; payload: Category | null }
	| { type: "replaceTodo"; payload: Todo }
	| { type: "replaceCategory"; payload: Category }
	| { type: "removeTodo"; payload: string }
	| { type: "toggleTodo"; payload: string }
	| { type: "addCategory"; payload: Category }
	| { type: "removeCategory"; payload: string };

export const TodoReducer = (
	state: TodoState,
	action: TodoActions
): TodoState => {
	switch (action.type) {
        case "hydrate":
            return {
                ...action.payload,
            };

		case "addTodo":
			return {
				...state,
				todos: [...state.todos, action.payload],
			};

		case "removeTodo":
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case "toggleTodo":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload ? { ...todo, done: !todo.done } : todo
				),
			};
		case "setCurrentTodo":
			return {
				...state,
				currentTodo: action.payload,
			};
		case "setCurrentCategory":
			return {
				...state,
				currentCategory: action.payload,
			};
		case "replaceTodo":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo
				),
				currentTodo: null,
			};
		case "replaceCategory":
			return {
				...state,
				categories: state.categories.map((category) =>
					category.id === action.payload.id ? action.payload : category
				),
				currentCategory: null,
			};
		case "addCategory":
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case "removeCategory":
			return {
				...state,
				categories: state.categories.filter(
					(category) => category.id !== action.payload
				),
			};
		default:
			return state;
	}
};

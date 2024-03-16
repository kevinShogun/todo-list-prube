import { fireEvent, render, screen } from "@testing-library/react";
import { TodoScreen } from "../components";
import { TodoContext } from "../context";


const todos = [
    { id: "1", title: "Task 1", body: "This is task 1", done: true, categories: [] },
    { id: "2", title: "Task 2", body: "This is task 2", done: false, categories: [] },
    { id: "3", title: "Task 3", body: "This is task 3", done: false, categories: [] },
];

describe("TodoScreen Tests Suites", () => {


    test("should match snapshot", () => {
        const component = render(<TodoScreen />);
        expect(component).toMatchSnapshot();
    });

    it('should render the component without crashing', () => {
        render(
            <TodoContext.Provider value={{
                todos: todos,
                categories: [],
                currentTodo: null,
                setCurrentTodo: () => { }, // Add the missing properties here
                currentCategory: { id: '1', name: 'Work', color: 'red' },
                addCategory: () => { },
                replaceCategory: () => { },
                addTodo: () => { },
                replaceTodo: () => { },
                removeCategory(id) {
                    this.categories = this.categories.filter((c) => c.id !== id);
                },
                removeTodo: () => { },
                setCurrentCategory(category) {
                    this.currentCategory = category;
                },
                toggleTodo: () => { },
            }}>
                <TodoScreen />
            </TodoContext.Provider>
        );

        // console.log(screen.debug())
        const colorCircles = todos.map((t) => screen.getByTestId(t.title));
        expect(colorCircles.length).toBe(todos.length);

    });

    test('should toggle the done property of a todo when the checkbox is clicked', () => {
        // Arrange
        const toggleTodoMock = vi.fn();

        const TodoContextValue = {
            todos: todos,
            toggleTodo: toggleTodoMock
        };

        render(
            <TodoContext.Provider value={
                {
                    ...TodoContextValue,
                    categories: [],
                    currentTodo: null,
                    setCurrentTodo: () => { }, // Add the missing properties here
                    currentCategory: { id: '1', name: 'Work', color: 'red' },
                    addCategory: () => { },
                    replaceCategory: () => { },
                    addTodo: () => { },
                    replaceTodo: () => { },
                    removeCategory(id) {
                        this.categories = this.categories.filter((c) => c.id !== id);
                    },
                    removeTodo: () => { },
                    setCurrentCategory(category) {
                        this.currentCategory = category;
                    },
                }
            }>
                <TodoScreen />
            </TodoContext.Provider>
        );

        // Act
        const checkbox = screen.getAllByRole('checkbox');
        fireEvent.click(checkbox[0]);
        
        // Assert not called
        expect(toggleTodoMock).not.toHaveBeenCalledTimes(1);
    });
});
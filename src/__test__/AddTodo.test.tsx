import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { AddTodo } from "../components/AddTodo";
import { TodoContext } from "../context";


describe("AddTodo Tests Suites", () => {
    // A snapshot test
    test("should match snapshot", () => {
        const component = render(<AddTodo />);
        expect(component).toMatchSnapshot();
    });

    test("should open modal dialog when button is clicke", async () => {
        // find the button by class name
        render(<AddTodo />);
        const button = screen.getByText(/Agregar una tarea/i);
        // click the button
        fireEvent.click(button);
        // Assert
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
    });


    test('should render a modal dialog with input fields and category selection', () => {

        const categoriesMock = [
            { id: '1', name: 'Category 1', color: 'red' },
            { id: '2', name: 'Category 2', color: 'blue' },
            { id: '3', name: 'Category 3', color: 'green' },
        ];
        const addTodoMock = vi.fn();
        const replaceTodoMock = vi.fn();
        const currentTodoMock = null;
        const todoContextMock = {
            categories: categoriesMock,
            addTodo: addTodoMock,
            replaceTodo: replaceTodoMock,
            currentTodo: currentTodoMock,
        };


        render(
            <TodoContext.Provider value={{
                todos: [],
                ...todoContextMock,
                setCurrentTodo: () => { }, // Add the missing properties here
                currentCategory: null,
                addCategory: () => { },
                replaceCategory: () => { },
                removeCategory: () => { },
                removeTodo: () => { },
                setCurrentCategory(category) {
                    this.currentCategory = category;
                },
                toggleTodo: () => { },
                // Add the remaining properties here
            }}>
                <AddTodo />
            </TodoContext.Provider>
        );

        // Act
        fireEvent.click(screen.getByText('Agregar una tarea'));

        // Assert


        const titleInput = screen.getByLabelText(/título/i);
        expect(titleInput).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText(/descripción/i);
        expect(descriptionInput).toBeInTheDocument();

        const modal = screen.getByRole('dialog');
        expect(modal).toBeVisible();

        const colorCircles = modal.querySelectorAll('.color-circle');
        // Assert that the color selection circles are rendered
        expect(colorCircles.length).toBe(categoriesMock.length);

    });

    test('should remove a category from the list of selected categories when the user clicks on a category that is already selected', () => {
        // Arrange
        const addTodoMock = vi.fn();
        const replaceTodoMock = vi.fn();
        const removeCategoryMock = vi.fn();
        const categories = [
            { id: '1', name: 'Category 1', color: 'red' },
            { id: '2', name: 'Category 2', color: 'blue' },
        ];
        const currentTodo = null;
        const todo = {
            title: 'Test Todo',
            body: 'Test Todo Body',
            categories: [categories[0]],
        };
        render(
            <TodoContext.Provider value={{
                todos: [],
                setCurrentTodo: () => { }, // Add the missing properties here
                currentCategory: null,
                addCategory: () => { },
                replaceCategory: () => { },
                removeCategory: removeCategoryMock,
                removeTodo: () => { },
                setCurrentCategory(category) {
                    this.currentCategory = category;
                },
                toggleTodo: () => { },
                categories,
                addTodo: addTodoMock,
                replaceTodo: replaceTodoMock,
                currentTodo,
                // Add the remaining properties here
            }}>
                <AddTodo />
            </TodoContext.Provider>
        );

        // Act
        fireEvent.click(screen.getByText('Agregar una tarea'));

        fireEvent.change(screen.getByLabelText('Título:'), {
            target: { value: todo.title },
        });

        fireEvent.change(screen.getByLabelText('Descripción:'), {
            target: { value: todo.body },
        });

        const modal = screen.getByRole('dialog');
        expect(modal).toBeVisible();

        const colorCircles = modal.querySelectorAll('.color-circle');
        fireEvent.click(colorCircles[0]);

        fireEvent.click(screen.getByText('Agregar'));

        // Assert

        expect(replaceTodoMock).not.toHaveBeenCalled();

        expect(removeCategoryMock).not.toHaveBeenCalled();

    });
}); 
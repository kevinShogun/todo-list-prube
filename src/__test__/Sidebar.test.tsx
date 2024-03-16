import { fireEvent, render, screen } from "@testing-library/react";
import React, { } from 'react'
import { SideBar } from "../components";
import { TodoContext } from "../context";

const todos = [
    { id: "1", title: "Task 1", body: "This is task 1", done: true, categories: [] },
    { id: "2", title: "Task 2", body: "This is task 2", done: false, categories: [] },
    { id: "3", title: "Task 3", body: "This is task 3", done: false, categories: [] },
];

const categories = [
    { id: "1", name: "Work", color: "red" },
    { id: "2", name: "Personal", color: "blue" },
    { id: "3", name: "Home", color: "green" },
]

describe("TodoScreen Tests Suites", () => {

    test("should match snapshot", () => {
        const component = render(<SideBar />);
        expect(component).toMatchSnapshot();
    });


    test('should render the component without crashing', () => {
        render(
            <TodoContext.Provider value={{
                todos,
                categories,
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
                <SideBar />
            </TodoContext.Provider>
        );

        // console.log(screen.debug())
        const colorCircles = categories.map((c) => screen.getByTestId(c.name));
        expect(colorCircles.length).toBe(todos.length);

    });

    test('should call removeCategory with an invalid category id', async () => {
        const setCurrentCategory = vi.fn();
        const removeCategory = vi.fn();
        vi.spyOn(React, 'useContext').mockReturnValue({
            categories,
            setCurrentCategory,
            removeCategory,
        });

        // Act
        render(
            <TodoContext.Provider value={{
                todos,
                categories,
                currentTodo: null,
                setCurrentTodo: () => { }, // Add the missing properties here
                currentCategory: categories[0],
                addCategory: () => { },
                replaceCategory: () => { },
                addTodo: () => { },
                replaceTodo: () => { },
                removeCategory,
                removeTodo: () => { },
                setCurrentCategory,
                toggleTodo: () => { },
            }}>
                <SideBar />
            </TodoContext.Provider>
        );

        // Assert
        const removeButton = screen.getAllByText('Eliminar');
        fireEvent.click(removeButton[0]);
        expect(removeCategory).toHaveBeenCalledWith(categories[0].id);
    })

});
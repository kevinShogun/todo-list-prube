import { render, screen, configure } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Todo } from "../components/Todo";

configure({ testIdAttribute: 'data-tip' });

const todo = {
    id: '1',
    title: 'Test Todo',
    body: 'Test Body',
    done: false,
    categories: [
        { id: '12', name: 'Category 1', color: 'red' },
        { id: 'sada2', name: 'Category 2', color: 'blue' }
    ]
};

describe("Todo Tests Suites", () => {

    beforeEach(() => {
        render(<Todo todo={todo} />);
    });

    // A snapshot test
    test("should match snapshot", () => {
        const component = render(<Todo todo={todo} />);
        expect(component).toMatchSnapshot();
    });

    test("should render a todo item", async () => {

        expect(screen.getByText(todo.title)).toBeInTheDocument();
        expect(screen.getByText(todo.body)).toBeInTheDocument();
        expect(screen.getByText('Completado')).toBeInTheDocument();
        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
        const colorCircles = todo.categories.map((c) => screen.getByTestId(c.name));
        expect(colorCircles.length).toBe(todo.categories.length);
        
    });

    test('should toggle the "Completado" checkbox when clicked', async () => {
        const checkbox = await screen.findByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    }); 

});
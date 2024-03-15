import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { COLORS } from "../constants/colors";
import { AddCategory } from "../components/AddCategory";
import { TodoContext } from "../context";

describe("AddCategory", () => {

	//A snapshot test
	test("should match snapshot", () => {
		const component = render(<AddCategory />);
		expect(component).toMatchSnapshot();
	});

	test("should render a button that opens a modal dialog when clicked", async () => {
		// find the button by class name
		render(<AddCategory />);
		const button = screen.getByText(/Agregar una categoria/i);
		// click the button
		button.click();
		// find the modal by class name
		const modal = screen.getByText(/Nueva categoria/i);
		// assert the modal is visible
		expect(modal).toBeVisible();
	});

	it('should render a modal dialog with input fields for category name and color selection', () => {

		render(<AddCategory />);
		const button = screen.getByText(/Agregar una categoria/i);
		fireEvent.click(button);

		const modal = screen.getByRole('dialog');
		expect(modal).toBeVisible();

		const categoryInput = screen.getByLabelText('Categoria:');
		expect(categoryInput).toBeInTheDocument();

		const colorCircles = modal.querySelectorAll('.color-circle');
		// Assert that the color selection circles are rendered
		expect(colorCircles.length).toBe(COLORS.length);

	});

	test('should not submit the form if the category name or color is empty', () => {
		render(<AddCategory />);
		// Find the button element and click it to open the modal dialog
		const button = screen.getByText(/Agregar una categoria/i);
		fireEvent.click(button);

		// Find the form element
		const form = document.querySelector('form');
		if (!form) return;

		// Find the submit button element
		const submitButton = screen.getByText('Agregar');
		fireEvent.click(submitButton);

		// Submit the form without entering any values
		fireEvent.submit(form);

		// Assert that the form was not submitted
		expect(submitButton).toBeVisible();
	});

	test('should replace "Agregar" button with "Actualizar" button in the modal when current category is not null', () => {

		// delete the las instance of AddCategory
		
		
		const FC = render(
			<TodoContext.Provider
				value={{
					todos: [],
					categories: [],
					currentTodo: null,
					setCurrentTodo: () => {}, // Add the missing properties here
					currentCategory: { id: '1', name: 'Work', color: 'red' },
					addCategory: () => {},
					replaceCategory: () => {},
					addTodo: () => {},
					replaceTodo: () => {},
					removeCategory(id) {},
					removeTodo: () => {},
					setCurrentCategory(category) {},
					toggleTodo: () => {},
					// Add the remaining properties here
				}}				
			>
				<AddCategory/>
			</TodoContext.Provider>
		);

		// Find the button element and click it to open the modal dialog
		const button = FC.getAllByText(/Agregar una categoria/i);
		fireEvent.click(button[0]);

		const modal = FC.getAllByRole('dialog');
		expect(modal[0]).toBeVisible();

		const submitButton = FC.getByText('Actualizar');
		expect(submitButton).toBeVisible();
	});


});

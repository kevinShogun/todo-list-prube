interface IModalAction {
	value: boolean;
	id?: string | undefined;
}
export const toggleModal = ({ value, id = "my_modal_2", }: IModalAction) => {
	const modal = document.getElementById(id) as HTMLDialogElement;

	if (value) modal.showModal();
	else modal.close();
};

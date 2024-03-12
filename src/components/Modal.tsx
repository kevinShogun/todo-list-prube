
interface ModalProps {
    children: React.ReactNode;
    id?: string;
}

export const Modal = (
    { children, id = 'my_modal_2' }: ModalProps,
) => {

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

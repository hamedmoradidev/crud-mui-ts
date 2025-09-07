import { createContext } from "react";

interface IDialogContext {
    postId: number | null;
    open: boolean;
    modalShow: boolean;
    viewModal: boolean;
    editModal: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    setPostId: (id: number) => void;
    openModal: () => void;
    closeModal: () => void;
    openViewModal: () => void;
    closeViewModal: () => void;
    openEditModal: () => void;
    closeEditModal: () => void;
}

const DialogContext = createContext<IDialogContext>({
    postId: null,
    open: false,
    modalShow: false,
    viewModal: false,
    editModal: false,
    handleClickOpen: () => {},
    handleClose: () => {},
    setPostId: () => {},
    openModal: () => {},
    closeModal: () => {},
    openViewModal: () => {},
    closeViewModal: () => {},
    openEditModal: () => {},
    closeEditModal: () => {},
});

export default DialogContext;

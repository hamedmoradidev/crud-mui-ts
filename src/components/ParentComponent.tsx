import React, { useEffect, useState } from "react";
import AlertDialog from "./AlertDialog.tsx";
import DialogContext from "../contexts/DialogContext.tsx";
import TableComponent from "./TableComponent.tsx";
import Modal from "./Modal.tsx";
import NavComponent from "./NavComponent.tsx";
import ViewModal from "./ViewModal.tsx";
import EditModal from "./EditModal.tsx";
function ParentComponent() {
  const [modalShow, setModalShow] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const partOne = location.pathname.split("/")[1];
  const partTwo = location.pathname.split("/")[2];
  const partThree = location.pathname.split("/")[3];
  const fetchPostByPostId = async (postId: number | null) => {
    if (!postId) return null;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
  };
  useEffect(() => {
    fetchPostByPostId(Number(partTwo));
    setPostId(Number(partTwo));
    if (partOne == "create") {
      setModalShow(true);
    }
    switch (partThree) {
      case "edit":
        setEditModal(true);
        return;
      case "view":
        setViewModal(true);
        return;
      case "delete":
        handleClickOpen();
        return;
      default:
        return;
    }
  }, []);

  const openModal = () => {
    setModalShow(true);
  };
  const openViewModal = () => {
    setViewModal(true);
  };
  const closeViewModal = () => {
    setViewModal(false);
  };
  const closeModal = () => {
    setModalShow(false);
  };
  const [postId, setPostId] = useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  const openEditModal = () => {
    setEditModal(true);
  };
  return (
    <>
      <DialogContext.Provider
        value={{
          open,
          postId,
          setPostId,
          viewModal,
          editModal,
          openEditModal,
          closeEditModal,
          openViewModal,
          closeViewModal,
          modalShow,
          openModal,
          closeModal,
          handleClickOpen,
          handleClose,
        }}
      >
        <NavComponent />
        <Modal />
        <ViewModal />
        <EditModal />
        <AlertDialog />
        <TableComponent />
      </DialogContext.Provider>
    </>
  );
}
export default ParentComponent;

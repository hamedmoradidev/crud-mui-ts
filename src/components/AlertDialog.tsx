import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dialogContext from "../contexts/DialogContext.tsx";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AlertDialog() {
  const { open, handleClose, postId } = useContext(dialogContext);
  const notify = () => toast("your post deleted successfully!");
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Failed to delete post");
      return true;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      notify();
    },
    onError: () => {
      notify();
    },
  });
  const handleDelete = (postId: number | null) => {
    deletePostMutation.mutate(postId!);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete post permanently"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleClose();
              handleDelete(postId);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

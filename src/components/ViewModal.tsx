import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import DialogContext from "../contexts/DialogContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchPostByPostId, fetchUserByUserId } from "./api/fetch.tsx";
function ViewModal() {
  const { postId, viewModal, closeViewModal } = useContext(DialogContext);

  const { data: postData } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostByPostId(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });

  const { data: userData } = useQuery({
    queryKey: ["user", postData?.userId],
    queryFn: () => fetchUserByUserId(postData?.userId ?? null),
    enabled: !!postData?.userId,
    refetchOnWindowFocus: false,
  });

  return (
    <Dialog open={viewModal}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "800px" },
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
        noValidate
        autoComplete="off"
      >
        <CloseIcon
          onClick={closeViewModal}
          style={{ cursor: "pointer", float: "right" }}
        />
        <FormControl fullWidth>
          <TextField label="id" name="id" value={postData?.id || ""} />
          <TextField label="title" name="title" value={postData?.title || ""} />
          <TextField
            label="description"
            name="body"
            value={postData?.body || ""}
          />
          <TextField
            label="author"
            name="author"
            value={postData?.userId || ""}
          />
          <TextField label="name" name="name" value={userData?.name || ""} />
          <TextField label="email" name="email" value={userData?.email || ""} />
          <TextField
            label="username"
            name="username"
            value={userData?.username || ""}
          />
        </FormControl>
      </Box>
    </Dialog>
  );
}

export default ViewModal;

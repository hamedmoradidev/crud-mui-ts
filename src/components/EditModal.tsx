import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import DialogContext from "../contexts/DialogContext.tsx";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import schema from "./schema/schema.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@mui/material";
import type { PostType } from "./interface/interface.tsx";
export default function EditModal() {
  const { editModal, closeEditModal, postId } = useContext(DialogContext);
  const notify = () => toast("your post edited successfully!");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentPost, setCurrentPost] = useState<PostType>({
    userId: "",
    id: "",
    title: "",
    body: "",
  });
  const fetchPostByPostId = async (post_id: number | null) => {
    if (!post_id) return;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post_id}`,
    );
    if (!response.ok) throw new Error("Failed to fetch post");
    const data = await response.json();
    setCurrentPost(data);
    return data;
  };

  const { data, refetch } = useQuery<PostType>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostByPostId(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!postId) return;
    void refetch();
  }, [refetch, postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const handleEdit = async () => {
    try {
      await schema.validate(currentPost, { abortEarly: false });
      setErrors({});
      editPostMutation.mutate(currentPost);
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const editPostMutation = useMutation({
    mutationFn: async (updatedPost: PostType) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      );
      if (!res.ok) throw new Error("Failed to edit post");
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeEditModal();
      notify();
    },
  });

  if (!data) return null;

  if (editModal) {
    return (
      <>
        <Dialog open={editModal}>
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
              zIndex: "1400",
            }}
            noValidate
            autoComplete="off"
          >
            <CloseIcon
              onClick={closeEditModal}
              style={{ cursor: "pointer", float: "right" }}
            ></CloseIcon>
            <Box>
              <TextField
                id="outlined-helperText"
                label="user id"
                name="userId"
                value={data.userId}
                onChange={handleChange}
                error={!!errors.userId}
                helperText={errors.userId}
              />
              <TextField
                id="outlined-helperText"
                label="id"
                name="id"
                value={data.id}
                onChange={handleChange}
                error={!!errors.id}
                helperText={errors.id}
              />
              <TextField
                id="outlined-helperText"
                label="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                id="outlined-helperText"
                label="body"
                name="body"
                value={data.body}
                onChange={handleChange}
                error={!!errors.body}
                helperText={errors.body}
              />
            </Box>
            <Button variant="outlined" onClick={() => handleEdit()}>
              Edit
            </Button>
          </Box>
        </Dialog>
      </>
    );
  }
}

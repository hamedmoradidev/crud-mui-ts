import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import DialogContext from "../contexts/DialogContext.tsx";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ValidationError } from "yup";
import schema from "./schema/schema.tsx";
import type { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Author, Post } from "./interface/interface.tsx";
import { addPostfetch, AuthorsFetch } from "./api/fetch.tsx";

export default function ViewModal() {
  const { modalShow, closeModal } = useContext(DialogContext);
  const [newPost, setNewPost] = useState<Post>({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const { data: authors } = useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: AuthorsFetch,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setNewPost((prev) => ({
      ...prev,
      userId: value,
    }));
  };
  const notify = () => toast("your post added successfully!");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostMutation = useMutation({
    mutationFn: addPostfetch,
    onSuccess: () => {
      closeModal();
      notify();
    },
  });

  const addPost = () => {
    try {
      schema.validateSync(newPost, { abortEarly: false });
      addPostMutation.mutate(newPost);
      setErrors({});
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
  if (!modalShow) return null;
  return (
    <Modal open={modalShow} onClose={closeModal}>
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
          onClick={closeModal}
          style={{ cursor: "pointer", float: "right" }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Author</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newPost.userId}
            label="Author"
            onChange={handleSelectChange}
          >
            {authors?.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="id"
          name="id"
          value={newPost.id}
          onChange={handleChange}
          error={!!errors.id}
          helperText={errors.id}
        />
        <TextField
          label="title"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="description"
          name="body"
          value={newPost.body}
          onChange={handleChange}
          error={!!errors.body}
          helperText={errors.body}
        />
        <Button variant="outlined" onClick={addPost}>
          Add
        </Button>
      </Box>
    </Modal>
  );
}

import Button from "@mui/material/Button";
import { useContext } from "react";
import DialogContext from "../contexts/DialogContext.tsx";
import { useNavigate } from "react-router-dom";
export default function NavComponent() {
  const navigate = useNavigate();

  const { openModal } = useContext(DialogContext);
  const HandleCreate = () => {
    navigate(`/create/`);
  };
  return (
    <Button
      variant="outlined"
      onClick={() => {
        openModal();
        HandleCreate();
      }}
    >
      Create New Post
    </Button>
  );
}
